import PageHeader from '@/app/components/layout/header/PageHeader'
import NormalLoading from '@/app/components/loaders/NormalLoading'
import dynamic from 'next/dynamic'

const FakeReservation = dynamic(() => import("../components/FakeReservation"), { loading: () => <NormalLoading /> })

const page = () => {

  return (
    <section
      className='p-5 flex flex-col gap-5'
    >
      <PageHeader
        title='الحجوزات الوهمية'
        body='تفقد الحجوزات الوهمية قد يمكن تصحيحها '
      />
      <FakeReservation />
    </section>
  )
}

export default page