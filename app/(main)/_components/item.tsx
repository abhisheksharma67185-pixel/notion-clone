"use client";

import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick: () => void;
    icon: LucideIcon;
}

export const Item = ({
    label,
    onClick,
    icon: IconComponent,
    active,
    documentIcon,
    expanded,
    isSearch,
    level = 0,
    onExpand,
    id,
}: ItemProps) => {
    
    const Router = useRouter();
    const create = useMutation(api.documents.create);

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    }
    
    const onCreate= (
        event:React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;

        const promise = create ({
            title: "Untitled",
            parentDocument: id
        })
        .then((documentId) => {
            if(!expanded) {
                onExpand?.();
            }
            //Router.push(`/documents/${documentId}`);
        });

        toast.promise(promise, {
            loading: "Creating document...",
            success: "Document created!",
            error: "Error creating document",
        })
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div
            onClick={onClick}
            role="button"
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px",

            }}
            className={cn(
                "group min-h-[27px] flex items-center text-muted-foreground font-medium hover:bg-primary/5 text-sm py-1 pr-3 w-full cursor-pointer",
                active && "bg-primary/5 text-primary",
            )}
        >
            {!!id && (
                <div className="h-full rounded-sm hover:bg-neutral-300 mr-1" onClick={handleExpand}>
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </div>
                    )
            }

            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (
            <IconComponent 
                className="shrik-0 h-[18px] mr-2 text-muted-foreground"
            />
            )}
            <span className="truncate">
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-border bg-muted px-1.5 text-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">Ctrl</span>K
                </kbd>
            )}

            {!!id && (
                <div 
                    role="button"
                    onClick={onCreate}
                    className="flex items-center gap-x-2 ml-auto group">
                    <div className="opacity-0 group-hover:opacity-100 ml-auto rounded-sm hover:bg-neutral-300"> 
                        <Plus className="h-4 w-4 text-muted-foreground" />
                     </div>
              </div>
              
            )}
        </div>

    )
}


Item.Skeleton = function ItemSkeleton({ level } : {level?: number }) {
    return (
        <div 
        style={{paddingLeft: level ? `${(level * 12) + 25}px`: "12px"}}
        className="flex gap-x-2 py=[3px]">
            <Skeleton className="h-4 w-4"/>
            <Skeleton className="h-4 w-[30%]"/>

        </div>
    )
}