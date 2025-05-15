import { TextPrimary, TextSecondary } from '@/lib/ui/class/classNames';
import { Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem, Typography } from '@/lib/ui/MTFix';
import clsx from 'clsx';
import { uniqueId } from 'lodash';
import { ReactNode } from 'react';
import { BiSolidUserAccount } from 'react-icons/bi';
import { GiHouseKeys } from 'react-icons/gi';
import { IoLogoModelS } from 'react-icons/io';

type timeLineType = {
    title: string,
    body: string,
    icon: ReactNode
}

const HowWeWorks = () => {
    const timelines: timeLineType[] = [
        {
            title: 'الخطوة الأولى: إنشاء حساب',
            body: 'قم بإنشاء حساب وانضم إلى عائلتنا للاستمتاع بخدماتنا الرائعة',
            icon: <BiSolidUserAccount size={30} />
        },
        {
            title: 'الخطوة الثانية : اختيار السيارة',
            body: 'تصفح سيارتنا الرائعة واختر ما يناسب حالتك المالية واحتياجاتك',
            icon: <IoLogoModelS size={30} />
        },
        {
            title: 'الخطوة الثالثة: الدفع والاستلام',
            body: 'انتظر تأكيد الحجز الخاص بك ثم توجه إلى متجرنا وادفع الإيجار واستلم سيارتك المستأجرة مباشرة',
            icon: <GiHouseKeys size={30} />
        },
    ]
    return (
        <section
            className='p-5'
        >
            <Typography
                variant='h1'
                as="h3"
                color='green'
                className='mb-2'
            >
                طريقة عمل بسيطة و سريعة
            </Typography>
            <Timeline>
                {
                    timelines.map((timeline, index) => (
                        <TimelineItem
                            key={uniqueId()}
                        >
                            {
                                !(index + 1 === timelines.length) &&
                                <TimelineConnector
                                    className='text-primary-light rtl:right-0'
                                    dir=''
                                />
                            }
                            <TimelineHeader
                                className={TextPrimary}
                            >
                                <TimelineIcon className={("bg-primary-main p-2.5")}>
                                    {timeline.icon}
                                </TimelineIcon>
                                <Typography variant="h3" className='text-2xl sm:text-4xl'>
                                    {timeline.title}
                                </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-8">
                                <Typography className={clsx(TextSecondary, " text-lg sm:text-2xl")}>
                                    {timeline.body}
                                </Typography>
                            </TimelineBody>
                        </TimelineItem>
                    ))
                }
            </Timeline>
        </section>
    )
}

export default HowWeWorks