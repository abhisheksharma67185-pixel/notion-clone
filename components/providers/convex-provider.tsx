"use client";

import { ClerkProvider, useAuth } from "@clerk/react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const rawConvexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "http://127.0.0.1:3210";
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_bWFnbmV0aWMtZ2F0b3ItODQuY2xlcmsuYWNjb3VudHMuZGV2JA";

const convex = new ConvexReactClient(rawConvexUrl);

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const ConvexAuthContext = createContext<AuthState>({ isAuthenticated: false, isLoading: true });

function SmartAuthProvider({ children }: { children: ReactNode }) {
    const clerkAuth = useAuth();
    const [timedOut, setTimedOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimedOut(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const isLoading = !clerkAuth.isLoaded && !timedOut;
    const isAuthenticated = Boolean(clerkAuth.isLoaded && clerkAuth.isSignedIn);

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
    return (
        <ClerkProvider publishableKey={clerkKey}>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <SmartAuthProvider>
                    {children}
                </SmartAuthProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};
