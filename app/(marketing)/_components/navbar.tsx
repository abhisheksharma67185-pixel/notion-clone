"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { SignInButton, UserButton, useAuth } from "@clerk/react";
import { Button } from "@/components/ui/button";
import Link  from "next/link";

import { useEffect, useState } from "react";

export const Navbar = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const { isLoaded, isSignedIn } = useAuth();
    const scrollTop = useScrollTop();

    return (
        <div className={cn(
            "z-50 fixed bg-background top-0 flex items-center w-full p-6", scrollTop && "border-b shadow-sm")}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {mounted && isLoaded && isSignedIn ? (
                    <>
                    <Button className="hover:bg-gray-100 hover:text-black" asChild>
                        <Link href="/notion-library">
                            My Pages
                        </Link>
                    </Button>
                    <UserButton />
                    </>
                ) : (
                    <>
                    <SignInButton mode="modal">
                        <Button variant="ghost">
                            Sign In
                        </Button>
                    </SignInButton>
                    <SignInButton mode="modal">
                        <Button className="hover:bg-gray-100 hover:text-black">
                            Get Paperly Free
                        </Button>
                    </SignInButton>
                    </>
                )}
            </div>
        </div>
    );
};


