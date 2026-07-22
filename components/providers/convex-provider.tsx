"use client";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";


const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "http://127.0.0.1:3210";
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_bWFnbmV0aWMtZ2F0b3ItODQuY2xlcmsuYWNjb3VudHMuZGV2JA";

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ClerkProvider publishableKey={clerkKey}>
            <ConvexProviderWithClerk
                useAuth={useAuth}
                client={convex}
            >
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};
