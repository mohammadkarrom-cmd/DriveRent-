"use client"

import React, { useEffect, useState } from 'react'

type TimeLeftType = {
    mint: number
    second: number
}

const CountDown = ({ mint, second }: TimeLeftType) => {
    const [timeLeft, SetTimeLeft] = useState<TimeLeftType>({ mint, second });

    useEffect(() => {
        const totalSecondes = (timeLeft.mint * 60) + timeLeft.second;

        if (totalSecondes > 0) {
            const interval = setInterval(() => {
                SetTimeLeft(() => {
                    const newTotalSeconde = totalSecondes - 1;
                    const newMint = Math.floor(newTotalSeconde / 60);
                    const newSecond = newTotalSeconde % 60;
                    return {
                        mint: newMint,
                        second: newSecond
                    };
                })
            }, 1000);

            return () => clearInterval(interval);
        };

    }, [timeLeft]);

    return (
        <>
            {`${parseInt(timeLeft.mint.toString())} دقيقة و ${parseInt(timeLeft.second.toString())} ثانية`}
        </>
    )
}

export default CountDown