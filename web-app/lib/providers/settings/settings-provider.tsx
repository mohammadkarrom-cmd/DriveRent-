"use client";

import { SETTING_STORAGE_KEY } from '@/app/constants'
import SettingsContext, { SettingsContextType } from '@/lib/context/settings/setting-context';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';
import React, { ReactNode, useMemo } from 'react'

type Props = {
    children: ReactNode,
    defaultSettings: SettingsContextType
}

function SettingsProvider({ children, defaultSettings }: Props) {
    //# default settings
    const { value, update } = useLocalStorage(SETTING_STORAGE_KEY, defaultSettings);
    //# memoize the settings
    const memoizedSettings: SettingsContextType = useMemo(() => ({
        theme: value.theme as ThemeType,
        handleUpdate: update,
    }), [value, update]);

    return (
        <SettingsContext.Provider value={memoizedSettings}>
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsProvider