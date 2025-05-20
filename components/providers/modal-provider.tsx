"use client"

import { useEffect, useState } from "react";

import { SettingsModal } from "../modals/settings-modal";

export  const ModalProvider = () => {
    
    const [ isMounted, setIsMouted ] = useState(false);

    useEffect(() => {
        setIsMouted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    
    return (
        <>
            <SettingsModal />
        </>
    )
}



