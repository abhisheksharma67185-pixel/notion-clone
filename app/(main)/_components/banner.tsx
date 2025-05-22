"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
    documentId: Id<"documents">
}

export const Banner = ({
    documentId
}: BannerProps) => {

    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Deleting page...",
            success: "Page deleted!",
            error: "Failed to delete page"
        }); 

        router.push("/documents")
    };

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring page...",
            success: "Page restored!",
            error: "Failed to restore page"
        });
    };
    return (
        <div className="w-full text-center bg-rose-500 justify-center flex gap-x-2 items-center text-sm text-white p-2 ">
            <p>
              This page has been deleted.
            </p>
            <Button
              size="sm"
              onClick={onRestore}
              variant="outline"
              className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto"
            >
                Restore page
            </Button>
            <ConfirmModal onConfirm={onRemove}>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto"
                >
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    )
}


