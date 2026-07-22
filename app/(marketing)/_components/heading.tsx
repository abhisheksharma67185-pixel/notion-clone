"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/react";

import { useEffect, useState } from "react";

export const Heading = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const { isLoaded, isSignedIn } = useAuth();

    if (!mounted || !isLoaded) {
        return (
            <div className="max-w-3xl space-y-4">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                    Your Ideas, Documents, & Plans. Unified. Welcome to <span className="underline">Paperly</span>
                </h1>
                <h3 className="text-base sm:text-xl md: text-2xl font-medium pop p-4">
                    Paperly is a connected workplace where <br/> better, faster work happens.
                </h3>
                <SignInButton>
                    <Button className="h-4, w-4, ml-2 hover:bg-slate-100 hover:text-black">
                        Get Paperly Free <ArrowRight/>
                    </Button>
                </SignInButton>
            </div>
        );
    }

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your Ideas, Documents, & Plans. Unified. Welcome to <span className="underline">Paperly</span>
            </h1>
            <h3 className="text-base sm:text-xl md: text-2xl font-medium pop p-4">
                Paperly is a connected workplace where <br/> better, faster work happens.
            </h3>

            {isSignedIn ? (
                <Button className="h-4, w-4, ml-2 hover:bg-slate-100 hover:text-black" asChild>
                    <Link href="/notion-library">
                        Enter Paperly <ArrowRight/>
                   </Link>
                </Button>
            ) : (
                <SignInButton>
                    <Button className="h-4, w-4, ml-2 hover:bg-slate-100 hover:text-black">
                        Get Paperly Free <ArrowRight/>
                    </Button>
                </SignInButton>
            )}

        </div>
    )

}

