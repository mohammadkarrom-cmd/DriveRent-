import dynamic from 'next/dynamic'
import Image from 'next/image'
import React from 'react'

const ParadoxAction = dynamic(() => import("./ParadoxAction"))


const Paradox = () => {
  return (
    <section className='relative '>
      <Image
        src="/backgrounds/highway.jpg"
        width={2000}
        height={2000}
        alt='Paradox'
        className='w-full max-h-[27rem] object-cover'
      />
      <section className="text-center z-20 left-0 w-full h-full flex flex-col justify-center items-center px-10 text-white backdrop-blur-[3px] bg-black bg-opacity-60 absolute top-0 end-0 gap-5 md:gap-10">
        <article>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-0.5 md:mb-2">اكتشف تجربة قيادة غير مسبوقة</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl">اختر من بين أفضل السيارات الفاخرة الموصى بها، واستمتع برحلة لا تُنسى مع خدماتنا المتميزة.</p>
        </article>
        <ParadoxAction />
      </section>
    </section>
  )
}

export default Paradox