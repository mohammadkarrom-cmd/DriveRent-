"use client"
import { TextPrimary } from "@/lib/ui/class/classNames"
import { Carousel, IconButton } from "@/lib/ui/MTFix"
import clsx from "clsx"
import { uniqueId } from "lodash"
import { ReactNode } from "react"
type Props = {
    children: ReactNode
    autoplay: boolean
    loop: boolean
    className?: string
}

const MyCarousel = ({ children, autoplay, loop,className }: Props) => {
    return (
        <Carousel
            transition={{ duration: 1 }}
            dir="ltr"
            className={clsx(className,"rounded-md m-0 p-0 w-full")}
            autoplay={autoplay}
            autoplayDelay={5000}
            loop={loop}
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-10 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={uniqueId()}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-text-light-primary dark:bg-text-dark-primary " : "w-4  bg-text-light-primary/50 dark:bg-text-dark-primary/50"}`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}

            prevArrow={({ handlePrev }) => (
                <IconButton
                    variant="text"
                    size="lg"
                    onClick={handlePrev}
                    className={clsx(TextPrimary, "!absolute top-2/4 left-4 -translate-y-2/4")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                </IconButton>
            )}
            nextArrow={({ handleNext }) => (
                <IconButton
                    variant="text"
                    size="lg"
                    onClick={handleNext}
                    className={clsx(TextPrimary, "!absolute top-2/4 !right-4 -translate-y-2/4")}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                    </svg>
                </IconButton>
            )}
        >
            {children}
        </Carousel>
    );
}

export default MyCarousel