import Image from 'next/image'
import { Typography, Button } from '@/lib/ui/MTFix'
import AutoCarousel from '@/app/components/views/AutoCarousel'
import { HiMiniCheckBadge } from 'react-icons/hi2'
import Link from 'next/link'
import { IoLogoModelS } from 'react-icons/io'
import clsx from 'clsx'
import { CardBackgrounds, TextPrimary, TextSecondary } from '@/lib/ui/class/classNames'
import { uniqueId } from 'lodash'
import Logo from '@/app/components/Lgo'



function HomeTestimonial() {
  return (
    <section
      className={clsx(CardBackgrounds, 'flex flex-col p-10 justify-between lg:flex-row lg:h-screen relative')}
      dir='ltr'
    >
      <article
        className='w-full flex flex-col justify-center items-center text-center gap-5'
      >
        <Logo
          disabledLink
          height={80}
          width={200}
        />
        <Typography
          variant='h1'
          className={clsx(TextPrimary, 'text-xl xl:text-2xl')}
        >
          اختر سيارة أحلامك الآن بكل سهولة
        </Typography>
        <Typography
          variant='paragraph'
          className={clsx(TextSecondary, 'lg:max-w-[50%] text-base xl:text-lg')}
        >
          مع خيارات التمويل المرنة التي نقدمها، يمكنك الاستمتاع بقيادة السيارة التي لطالما حلمت بها. سيارات حديثة، راحة مثالية، وخدمة عملاء متاحة 24/7 لتلبية جميع احتياجاتك.
        </Typography>
        <ol
          className='flex justify-between gap-x-10 gap-y-3 flex-wrap'
        >
          <li
            key={uniqueId()}
          >
            <Typography
              variant='small'
              className='flex gap-1 items-center'
            >
              <HiMiniCheckBadge className='text-primary-main' />
              أسطول متنوع من السيارات الفاخرة
            </Typography>
          </li>
          <li
            key={uniqueId()}
          >
            <Typography
              variant='small'
              className='flex gap-1 items-center'
            >
              <HiMiniCheckBadge className='text-primary-main' />
              دعم متواصل على مدار الساعة
            </Typography>
          </li>
        </ol>
        <Button
          variant='filled'
          color='green'
        >
          <Link href="#t-cars" className='flex gap-1 items-center'>
            <IoLogoModelS />
            تصفح السيارات
          </Link>
        </Button>
      </article>
      <figure className='lg:min-w-96 lg:max-w-[600px] relative z-20'>
        <AutoCarousel
          autoplay
          loop
          autoplayDelay={5000}
        >
          <Image
            src="/cars/1.png"
            alt='car'
            width={2000}
            height={2000}
            className='object-contain'
          />
          <Image
            src="/cars/2.png"
            alt='car'
            width={2000}
            height={2000}
            className='object-contain'
          />
        </AutoCarousel>
      </figure>
      <div className="hidden xl:block w-[45%] aspect-square -translate-y-1/4 bg-gradient-to-b from-primary-light to-primary-main rounded-full absolute top-0 -end-[13%] z-0"></div>
    </section>
  )
}

export default HomeTestimonial