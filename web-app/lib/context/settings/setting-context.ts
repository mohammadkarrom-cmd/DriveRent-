"use client";

import { createContext, useContext } from "react";

//# update Settings params
//# create settings context type
export type SettingsContextType = {
    theme: ThemeType,
    handleUpdate: ((key: string, newValue: string | number | object) => void)
};

//# create settings context
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettingsContext = (): SettingsContextType => {
    //# consume the setting context from the settings provider
    const context = useContext(SettingsContext);
    //! if null undefined an error
    if (context === undefined) {
        throw new Error('useSettingsContext must be used within a SettingsProvider');
    }
    return context;
};

export default SettingsContext;