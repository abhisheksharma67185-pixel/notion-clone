"use client";

import { Spinner } from "@/components/spinner";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/react";
import { useConvexAuth } from "@/components/providers/convex-provider";
import { useEffect } from "react";

const NotionLibraryLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const clerkAuth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && clerkAuth.isLoaded && !isAuthenticated && !clerkAuth.isSignedIn) {
            router.push("/");
        }
    }, [isLoading, isAuthenticated, clerkAuth.isLoaded, clerkAuth.isSignedIn, router]);

    if (isLoading || !clerkAuth.isLoaded) {
        return (
            <div className="flex h-dvh items-center justify-center">
                <Spinner size="md" />
            </div>
        );
    }

    return <>{children}</>;
};

export default NotionLibraryLayout;
