
import PageHeader from '@/app/components/layout/header/PageHeader'
import { Button } from '@/lib/ui/MTFix'
import Link from 'next/link'
import { TbBrandGoogleBigQuery } from 'react-icons/tb'
import { paths } from '@/app/components/layout/config-nav'
import CarsPageContent from './components/CarsPageContent'


const CarsPage = () => {
 

  return (
    <section
      className='p-5 flex flex-col gap-5'
    >
      <PageHeader
        title='سيارتنا الرائعة'
        body='تصفح سيارتنا الرائعة واختر ما يناسب حالتك المالية واحتياجاتك'
        actions={
          <Link
            href={paths.cars.search}
          >
            <Button
              color='green'
              variant='filled'
              size='sm'
              className='text-lg bg-opacity-40 text-green-400 h-fit flex items-center gap-1.5 hover:bg-opacity-100 hover:text-white active:scale-105 transition-all duration-300'
            >
              بحث <TbBrandGoogleBigQuery />
            </Button>
          </Link>
        }
      />
      <CarsPageContent />
      
    </section>
  )
}

export default CarsPage