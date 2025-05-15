"use client";

import { ReactNode } from "react";
import SettingsProvider from "./settings/settings-provider";
import ToastProvider from "./toast/toast-provider";
import AuthProvider from "./auth/auth-provider";




type Props = {
    children: ReactNode
}

function AppProvider({ children }: Props) {
    return (
        <SettingsProvider
            defaultSettings={{
                theme: "light",
                handleUpdate: () => { }
            }}
        >
            <AuthProvider>
                <ToastProvider />
                {children}
            </AuthProvider>
        </SettingsProvider>
    )
}

export default AppProvider