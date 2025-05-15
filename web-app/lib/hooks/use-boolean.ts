import { useCallback, useState } from 'react';

type UseBooleanProps = {
    initialState: boolean;
}

type UseBoolean = {
    value: boolean;
    onTrue: () => void;
    onFalse: () => void;
    onToggle: () => void;
}

const useBoolean = ({ initialState }: UseBooleanProps): UseBoolean => {
    const [value, setValue] = useState<boolean>(initialState);

    const onTrue = useCallback(() => {
        setValue(true);
    }, []);

    const onFalse = useCallback(() => {
        setValue(false);
    }, []);

    const onToggle = useCallback(() => {
        setValue(prev => !prev);
    }, []);

    return {
        value,
        onTrue,
        onFalse,
        onToggle
    };
}

export default useBoolean;
