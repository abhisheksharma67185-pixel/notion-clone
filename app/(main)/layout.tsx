"use client";

import { Spinner } from "@/components/spinner";
import { Navigation } from "./_components/navigation";
import { redirect } from "next/navigation";
import { SearchCommand } from "@/components/search-command";
import { useAuth } from "@clerk/react";
import { useConvexAuth } from "@/components/providers/convex-provider";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const clerkAuth = useAuth();

    if (isLoading) {
        return (
             <div className="flex justify-center items-center h-full">
                <Spinner size="md"/>
             </div>
        );
    }

    if (!isAuthenticated && clerkAuth.isLoaded && !clerkAuth.isSignedIn) {
        return redirect("/");
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