"use client"

import { registerSchemaType } from "@/lib/api/data/zod/schemas";
import { createContext, useContext } from "react";

export type StatusType = "loading" | "authenticated" | "unauthenticated"

export type loginCredentials = {
    username: string,
    password: string
};

export type AuthContextType = {
    user: AuthenticatedUser | null
    status: StatusType,
    login: ({ username, password }: loginCredentials) => void
    register: ({ username, password }: registerSchemaType) => void
    logout: () => void
};


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
    //# consume the setting context from the settings provider
    const context = useContext(AuthContext);
    //! if null undefined an error
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a authProvider');
    }
    return context;
};

export default AuthContext;