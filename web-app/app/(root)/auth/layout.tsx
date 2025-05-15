import Image from 'next/image'
import { ReactNode } from 'react'
import { Card, CardBody, CardHeader } from '@/lib/ui/MTFix'
import QuestGuard from '@/lib/guards/quest-guard'
import clsx from 'clsx'
import { CardBackgrounds } from '@/lib/ui/class/classNames'
import Logo from '@/app/components/Lgo'


type Props = {
    children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
    return (
        <QuestGuard>
            <section className={clsx(CardBackgrounds,'flex justify-between items-center h-screen md:h-fit md:m-5 shadow shadow-gray-700 text-inherit md:rounded-md')}>
                <figure className='hidden lg:block lg:w-full'>
                    <Image
                        src="/cars/1.png"
                        width={1000}
                        height={1000}
                        className='w-full object-contain'
                        alt='cars rental store'
                    />
                </figure>
                <fieldset className='w-full '>
                    <Card
                        color='transparent'
                        shadow={false}
                        className='justify-around items-center text-inherit'
                    >
                        <CardHeader
                            color='transparent'
                            shadow={false}
                            floated={false}
                            className='p-5'
                        >
                            <Logo
                                disabledLink
                                height={40}
                                width={200}
                            />
                        </CardHeader>
                        <CardBody
                            className='w-full'
                        >
                            {children}

                        </CardBody>
                    </Card>
                </fieldset>
            </section>
        </QuestGuard>
    )
}

export default AuthLayout