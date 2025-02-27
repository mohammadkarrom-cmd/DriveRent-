import { useCallback, useEffect, useMemo, useState } from 'react';



export const useOffsetTop = (top: number = 0 ): boolean => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    const handleScroll = useCallback(() => {
        if (window.scrollY > top) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }, [top]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        //# Initial check
        handleScroll();
        //# clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const memoizedValue = useMemo(() => scrolled, [scrolled]);

    return memoizedValue;
};
