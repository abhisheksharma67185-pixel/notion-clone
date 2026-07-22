"use client";

import { Spinner } from "@/components/spinner";
import { Navigation } from "./_components/navigation";
import { useRouter } from "next/navigation";
import { SearchCommand } from "@/components/search-command";
import { useAuth } from "@clerk/react";
import { useConvexAuth } from "@/components/providers/convex-provider";
import { useEffect } from "react";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
             <div className="flex justify-center items-center h-full">
                <Spinner size="md"/>
             </div>
        );
    }

    return (
        <div className="flex h-full">
            <Navigation/>
            <main className="flex-1 overflow-y-auto h-full">
                <SearchCommand />
                {children}
            </main>
        </div>

    );
}

export default MainLayout;