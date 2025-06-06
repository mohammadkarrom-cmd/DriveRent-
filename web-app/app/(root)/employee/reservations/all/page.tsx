import PageHeader from '@/app/components/layout/header/PageHeader'
import NormalLoading from '@/app/components/loaders/NormalLoading'
import dynamic from 'next/dynamic'

const Reservations = dynamic(() => import("../components/Reservations"), { loading: () => <NormalLoading /> })

const page = () => {

  return (
    <section
      className='p-5 flex flex-col gap-5'
    >
      <PageHeader
        title='جميع الحجوزات'
        body='تفقد الحجوزات المؤقتة قبل انتهاء صلاحيتها و راجع الحجوزات الحالية و القديمة '
      />
      <Reservations />
    </section>
  )
}

export default page