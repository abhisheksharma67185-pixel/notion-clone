"use client";

import { ClerkProvider, useAuth } from "@clerk/react";
import { ConvexReactClient, useConvexAuth as useOriginalConvexAuth } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const rawConvexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "http://127.0.0.1:3210";
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_bWFnbmV0aWMtZ2F0b3ItODQuY2xlcmsuYWNjb3VudHMuZGV2JA";

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const ConvexAuthContext = createContext<AuthState>({ isAuthenticated: false, isLoading: true });

function ConvexAuthWrapper({ children }: { children: ReactNode }) {
    let originalAuth = { isAuthenticated: false, isLoading: false };
    try {
        originalAuth = useOriginalConvexAuth();
    } catch {
        // Safe fallback if not inside ConvexProvider
    }
    
    const clerkAuth = useAuth();
    const [timedOut, setTimedOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimedOut(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const isLoading = originalAuth.isLoading && !timedOut;
    const isAuthenticated = originalAuth.isLoading
        ? (timedOut ? Boolean(clerkAuth.isLoaded && clerkAuth.isSignedIn) : false)
        : originalAuth.isAuthenticated;

    return (
        <ConvexAuthContext.Provider value={{ isAuthenticated, isLoading }}>
            {children}
        </ConvexAuthContext.Provider>
    );
}

export function useConvexAuth() {
    const context = useContext(ConvexAuthContext);
    if (!context) {
        return { isAuthenticated: false, isLoading: false };
    }
    return context;
}

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
    const [convexClient, setConvexClient] = useState<ConvexReactClient | null>(null);
    const [isLocalHostOnHttps, setIsLocalHostOnHttps] = useState(false);

    useEffect(() => {
        const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
        const isLocalUrl = rawConvexUrl.includes("127.0.0.1") || rawConvexUrl.includes("localhost");

        if (isHttps && isLocalUrl) {
            setIsLocalHostOnHttps(true);
        } else {
            try {
                setConvexClient(new ConvexReactClient(rawConvexUrl));
            } catch (e) {
                console.error("Convex initialization error:", e);
                setIsLocalHostOnHttps(true);
            }
        }
    }, []);

    if (!convexClient || isLocalHostOnHttps) {
        return (
            <ClerkProvider publishableKey={clerkKey}>
                <ConvexAuthContext.Provider value={{ isAuthenticated: false, isLoading: false }}>
                    {children}
                </ConvexAuthContext.Provider>
            </ClerkProvider>
        );
    }

    return (
        <ClerkProvider publishableKey={clerkKey}>
            <ConvexProviderWithClerk useAuth={useAuth} client={convexClient}>
                <ConvexAuthWrapper>
                    {children}
                </ConvexAuthWrapper>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};
