"use client";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";


const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "http://127.0.0.1:3210";
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_bWFnbmV0aWMtZ2F0b3ItODQuY2xlcmsuYWNjb3VudHMuZGV2JA";

const convex = new ConvexReactClient(convexUrl);

import { useConvexAuth as useOriginalConvexAuth } from "convex/react";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const ConvexAuthContext = createContext<AuthState>({ isAuthenticated: false, isLoading: true });

function ConvexAuthWrapper({ children }: { children: ReactNode }) {
    const originalAuth = useOriginalConvexAuth();
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
        return { isAuthenticated: false, isLoading: true };
    }
    return context;
}

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ClerkProvider publishableKey={clerkKey}>
            <ConvexProviderWithClerk
                useAuth={useAuth}
                client={convex}
            >
                <ConvexAuthWrapper>
                    {children}
                </ConvexAuthWrapper>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};
