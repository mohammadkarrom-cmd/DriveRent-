import PageHeader from '@/app/components/layout/header/PageHeader'
import NormalLoading from '@/app/components/loaders/NormalLoading'
import dynamic from 'next/dynamic'

const TemporaryReservations = dynamic(() => import("../components/TemporaryReservations"), { loading: () => <NormalLoading /> })

const page = () => {

  return (
    <section
      className='p-5 flex flex-col gap-5'
    >
      <PageHeader
        title='الحجوزات المؤقتة'
        body='تفقد الحجوزات المؤقتة قبل انتهاء صلاحيتها '
      />
      <TemporaryReservations />
    </section>
  )
}

export default page