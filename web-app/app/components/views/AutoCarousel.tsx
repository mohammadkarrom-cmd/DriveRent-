"use client"
import { Carousel } from "@/lib/ui/MTFix"
import { ReactNode } from "react"
type Props = {
    children: ReactNode
    autoplay: boolean,
    autoplayDelay?: number
    loop: boolean
}

const AutoCarousel = ({ children, autoplay, loop, autoplayDelay }: Props) => {
    return (
        <Carousel
            transition={{ duration: 1 }}
            className="m-0 !p-0 w-full"
            dir="ltr"
            autoplay={autoplay}
            autoplayDelay={autoplayDelay || 1000}
            loop={loop}
            navigation={() => (<></>)}

            prevArrow={() => (<></>)}
            nextArrow={() => (<></>)}
        >
            {children}
        </Carousel>
    );
}

export default AutoCarousel