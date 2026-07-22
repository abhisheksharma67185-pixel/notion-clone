"use client";

import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import { useAuth } from "@clerk/react";
import { useConvexAuth } from "@/components/providers/convex-provider";

const NotionLibraryLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const clerkAuth = useAuth();

    if (isLoading) {
        return (
            <div className="flex h-dvh items-center justify-center">
                <Spinner size="md" />
            </div>
        );
    }

    if (!isAuthenticated && clerkAuth.isLoaded && !clerkAuth.isSignedIn) {
        return redirect("/");
    }

    return <>{children}</>;
};

export default NotionLibraryLayout;
