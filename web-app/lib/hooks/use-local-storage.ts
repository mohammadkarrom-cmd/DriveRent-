"use client";

import { useCallback, useEffect, useState } from 'react';

export type StorageValueType = Record<string, object | string | number | null>;

type UseLocalStorageReturn = {
    value: StorageValueType;
    update: (name: string, newValue: object | string | number) => void;
    reset: () => void;
}

export const useLocalStorage = (key: string, defaultValue: StorageValueType): UseLocalStorageReturn => {
    //# default value for storage item
    const [value, setValue] = useState<StorageValueType>(() => {
        const storedValue = getFromStorage(key);
        return storedValue ? { ...defaultValue, ...storedValue } : defaultValue;
      });
      

    //! handle effect of changing the item key
    useEffect(() => {
        //# get the old value from storage
        const storedValue = getFromStorage(key);

        if (storedValue) {
            setValue((prev: StorageValueType) => ({
                ...prev,
                ...storedValue
            }));
        }
    }, [key]);

    //# update callback for the item
    const updateValue = useCallback((newValue: StorageValueType) => {
        setValue(
            (prev: StorageValueType) => {
                const updatedValue = {
                    ...prev,
                    ...newValue
                };
                setStorage(key, updatedValue);
                return updatedValue;
            }
        );
    }, [key]);

    const update = useCallback((name: string, newValue: object | string | number) => {
        updateValue({ [name]: newValue });
    }, [updateValue]);

    //# reset callback for the item (remove from storage and roll back the state to the default value)
    const reset = useCallback(() => {
        removeFromStorage(key);
        setValue(defaultValue);
    }, [key, defaultValue]);

    return {
        value,
        update,
        reset
    };
};

//# a function to get data from the local storage for a specific key
export const getFromStorage = (key: string): StorageValueType | null => {
    //# initial value
    let value = null;
    //# try to get an item from the local storage and parse it
    try {
        const result = window.localStorage.getItem(key);
        //! check if the item retrieved successfully
        if (result) {
            //# if true parse it to the value
            value = JSON.parse(result);
        }
    } catch (error) {
        console.error(error);
    }

    return value;
}

//# a function to update local storage item value for a specific key
export const setStorage = (key: string, value: StorageValueType): void => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(error);
    }
};

//# a function to remove local storage item value for a specific key
export const removeFromStorage = (key: string): void => {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.error(error);
    }
};
