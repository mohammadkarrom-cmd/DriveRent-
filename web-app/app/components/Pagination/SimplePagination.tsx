"use client"

import { useSettingsContext } from "@/lib/context/settings/setting-context";
import { TextPrimary } from "@/lib/ui/class/classNames";
import { Button, IconButton } from "@/lib/ui/MTFix";
import clsx from "clsx";
import { uniqueId } from "lodash";
import { Dispatch, SetStateAction } from "react";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";

type Props = {
    currentPage: number,
    maxPages: number,
    maxView: number
    setCurrentPage: Dispatch<SetStateAction<number>>

}
const SimplePagination = ({ currentPage, setCurrentPage, maxPages, maxView }: Props) => {
    const { theme } = useSettingsContext();


    const getItemProps = (index: number) =>
    ({
        variant: currentPage === index ? "filled" : "text",
        color: theme === "dark" ? 'white' : "black",
        onClick: () => setCurrentPage(index),
    } as object);

    const next = () => {
        if (currentPage === maxPages) return;

        setCurrentPage(currentPage + 1);
    };

    const prev = () => {
        if (currentPage === 0) return;

        setCurrentPage(currentPage - 1);
    };

    // let space: number = 0;

    // for (let index = 0; index < maxPages; index++) {
    //     pagesE.push(
    //         <IconButton
    //             key={uniqueId()}
    //             {...getItemProps(index)}
    //         >
    //             {index + 1}
    //         </IconButton>
    //     )

    // }
    return (
        <div className={clsx(TextPrimary, "flex items-center gap-4  justify-center rtl:flex-row-reverse")}>
            <Button
                variant="text"
                className="flex items-center gap-2 text-inherit rtl:flex-row-reverse"
                color={theme === "dark" ? 'white' : "black"}
                onClick={prev}
                disabled={currentPage === 0}
            >
                <TfiAngleLeft strokeWidth={2} className="h-4 w-4" /> السابق
            </Button>
            <div className="flex items-center gap-2 rtl:flex-row-reverse">
                {
                    Array.from({ length: maxPages }, (_, index) => {
                        if (index === maxPages - 1 || index === 0 || index > maxPages - maxView + 1 || index < maxView / 2 || index === currentPage) {
                            return (
                                <IconButton
                                    key={uniqueId()}
                                    {...getItemProps(index)}
                                >
                                    {index + 1}
                                </IconButton>
                            )
                        } else {
                            return null
                        }
                    })
                }
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2 text-inherit rtl:flex-row-reverse"
                onClick={next}
                disabled={currentPage === maxPages - 1}
                color={theme === "dark" ? 'white' : "black"}
            >
                التالي
                <TfiAngleRight strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default SimplePagination;