"use client"

import Image from 'next/image'
import React, {  useState } from 'react'
import {  IconButton } from "@/lib/ui/MTFix"
import { AnimatePresence, motion } from "framer-motion"
import { uniqueId } from 'lodash'
import clsx from 'clsx'
import { CardBackgrounds } from '@/lib/ui/class/classNames'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'




type Props = {
    image1: string
    image2: string
    image3: string
}

const CarImageGallery = ({ image1, image2, image3 }: Props) => {
    const [currentImage, setCurrentImage] = useState<number>(0);
    const handleNext = () => {
        if (currentImage === 2) {
            setCurrentImage(0)
        } else {
            setCurrentImage(prev => prev + 1);
        }
    }
    const handlePrev = () => {
        if (currentImage === 0) {
            setCurrentImage(2)
        } else {
            setCurrentImage(prev => prev - 1);
        }
    }
  
    return (
        <figure
            className='w-full lg:max-w-[50%]'
        >
            <section
                className={clsx(CardBackgrounds, ' relative h-96 w-full')}

            >
                <AnimatePresence>
                    {
                        currentImage === 0 &&
                        <motion.div
                            key={uniqueId()}
                            initial={{ opacity: 0, x: -200 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -200 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "linear" }}
                            className="rounded-md absolute w-full overflow-hidden px-[7%]"
                        >

                            <Image
                                width={1000}
                                height={1000}
                                src={image1}
                                alt="car"
                                className="w-full h-96 aspect-square object-contain"
                            />
                        </motion.div>
                    }
                    {
                        currentImage === 1 &&
                        <motion.div
                            key={uniqueId()}
                            initial={{ opacity: 0, x: -200 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "linear" }}
                            className="rounded-md absolute w-full overflow-hidden px-[7%]"
                        >
                            <Image
                                width={1000}
                                height={1000}
                                src={image2}
                                alt="car"
                                className="w-full h-96 aspect-square object-contain"
                            />
                        </motion.div>
                    }
                    {
                        currentImage === 2 &&
                        <motion.div
                            key={uniqueId()}
                            initial={{ opacity: 0, x: -200 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -200 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "linear" }}
                            className="rounded-md absolute w-full overflow-hidden px-[7%]"
                        >
                            <Image
                                width={1000}
                                height={1000}
                                src={image3}
                                alt="car"
                                className="w-full h-96 aspect-square object-contain"
                            />
                        </motion.div>
                    }
                </AnimatePresence>
                <IconButton
                    color='green'
                    className='text-4xl !absolute top-1/2 right-5 -translate-y-1/2 bg-opacity-40 text-green-400 hover:bg-opacity-100 hover:text-white active:scale-105 transition-all duration-300'
                    onClick={handleNext}
                >
                    <FaChevronRight />
                </IconButton>
                <IconButton
                    color='green'
                    className='text-4xl !absolute top-1/2 left-5 -translate-y-1/2 bg-opacity-40 text-green-400 hover:bg-opacity-100 hover:text-white active:scale-105 transition-all duration-300'
                    onClick={handlePrev}
                >
                    <FaChevronLeft />
                </IconButton>
            </section>
            <section
                className='flex gap-2 justify-between items-center w-full mt-5 rtl:flex-row-reverse'
            >
                <div
                    className={clsx(currentImage === 0 ? "bg-text-light-disabled dark:text-text-dark-disabled" : CardBackgrounds, "px-5 rounded-md transition-all duration-500 hover:bg-text-light-disabled dark:hover:bg-text-dark-disabled cursor-pointer hover:scale-105")}
                    onClick={() => setCurrentImage(0)}
                >
                    <Image
                        width={500}
                        height={500}
                        src={image1}
                        alt="car"
                        className="w-40 aspect-square object-contain"
                    />
                </div>
                <div
                    className={clsx(currentImage === 1 ? "bg-text-light-disabled dark:text-text-dark-disabled" : CardBackgrounds, "px-5 rounded-md transition-all duration-500 hover:bg-text-light-disabled dark:hover:bg-text-dark-disabled cursor-pointer hover:scale-105")}
                    onClick={() => setCurrentImage(1)}
                >
                    <Image
                        width={500}
                        height={500}
                        src={image2}
                        alt="car"
                        className="w-40 aspect-square object-contain"
                    />
                </div>
                <div
                    className={clsx(currentImage === 2 ? "bg-text-light-disabled dark:bg-text-dark-disabled" : CardBackgrounds, "px-5 rounded-md transition-all duration-500 hover:bg-text-light-disabled dark:hover:bg-text-dark-disabled cursor-pointer hover:scale-105")}
                    onClick={() => setCurrentImage(2)}
                >
                    <Image
                        width={500}
                        height={500}
                        src={image3}
                        alt="car"
                        className="w-40 aspect-square object-contain"
                    />
                </div>
            </section>
        </figure>
    )
}

export default CarImageGallery