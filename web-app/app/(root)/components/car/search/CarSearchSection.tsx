"use client"
// import { endpoints } from '@/app/api/common';
// import fetchApi from '@/lib/api/data/dataFetcher';
import useBoolean from '@/lib/hooks/use-boolean';
import { Button, Input } from '@/lib/ui/MTFix'
import { useState } from 'react';
import { MdManageSearch } from 'react-icons/md';
import { TbBrandGoogleBigQuery } from 'react-icons/tb';

type Props = {
  className?: string
}


const CarSearchSection = ({ className }: Props) => {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const loading = useBoolean({initialState: false});
  // const [result, setResult] = useState<CarType[]>(null);

  // const handelSearch = async () => {
  //   loading.onTrue();
  //   const response = await fetchApi(endpoints.cars.customerSearch);
  // }

  return (
    <section
      className={className}
    >
      <section
      className='flex justify-between items-center gap-5'
      >
        <Input
          label='البحث'
          type='search'
          labelProps={{
            dir: "ltr"
          }}
          crossOrigin={undefined}
          color="green"
          className='text-inherit w-full'
          icon={<MdManageSearch size={25} />}
          inputMode='search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          color='green'
          variant='filled'
          size='sm'
          className='text-lg bg-opacity-40 text-green-400 h-fit flex items-center gap-1.5 hover:bg-opacity-100 hover:text-white active:scale-105 transition-all duration-300'
          loading={loading.value}
        >
          بحث <TbBrandGoogleBigQuery /> 
        </Button>
      </section>
    </section>
  )
}

export default CarSearchSection