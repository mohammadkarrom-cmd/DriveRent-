import React from 'react'
import { footerLinks, socialLinks } from '../config-nav'
import { Typography } from "@/lib/ui/MTFix"
import SocialSection from './SocialSection'
import PagesSection from './PagesSection'
import clsx from 'clsx'
import { CardBackgrounds } from '@/lib/ui/class/classNames'
import NextLogo from '../../NextLogo'


function Footer() {
  return (
    <>
      <hr className='border-black dark:border-white' />
      <footer className={clsx(CardBackgrounds)}>
        <div className='flex flex-col justify-between items-center md:flex-row'>
          <section className='flex flex-col gap-0.5 max-w-96 p-5 mx-auto md:mx-0'>
            <SocialSection
              title={{
                text: "اختر سيارة أحلامك الآن بكل سهولة",
                className: "text-xl"
              }}
              body={{
                text: "مع خيارات التمويل المرنة التي نقدمها، يمكنك الاستمتاع بقيادة السيارة التي لطالما حلمت بها. سيارات حديثة، راحة مثالية، وخدمة عملاء متاحة 24/7 لتلبية جميع احتياجاتك.",
                className: "text-sm"
              }}
              socialLinks={{
                links: socialLinks,
                ContainerClassName: "flex justify-center items-center gap-1 w-fit mt-3"
              }}
            />
          </section>
          <section className='flex justify-center gap-16 items-start w-full'>
            <PagesSection 
            links={footerLinks}
            />
          </section>
        </div>
        <hr className='my-5 border-black dark:border-white' />
        <section className='p-5 pt-0 flex flex-col lg:flex-row justify-between items-center gap-2'>
          <Typography variant='h1' className='text-2xl flex items-center gap-3 rtl:flex-row-reverse'>
            Powered by <NextLogo disabledLink  height={40} width={100} />
          </Typography>
          <Typography variant='small' >
            Copyright © 2025 ghaith ghasb - farouk najjar
          </Typography>
        </section>
      </footer>
    </>
  )
}

export default Footer