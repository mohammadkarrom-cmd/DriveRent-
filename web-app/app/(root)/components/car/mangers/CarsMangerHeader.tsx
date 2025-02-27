"use client"
import { useSettingsContext } from '@/lib/context/settings/setting-context';
import { Input } from '@/lib/ui/MTFix'
import { Dispatch, SetStateAction } from 'react';
import { BiSolidCategory } from 'react-icons/bi';
import { IoLogoModelS } from 'react-icons/io';

type Props = {
    model: string
    setModel:Dispatch<SetStateAction<string>>
    brand: string
    setBrand:Dispatch<SetStateAction<string>>
}

const CarsMangerHeader = ({ model,setModel,brand,setBrand }: Props) => {
    const { theme } = useSettingsContext();

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <Input
                label='العلامة التجارية'
                type='search'
                labelProps={{
                    dir: "ltr"
                }}
                crossOrigin={undefined}
                color={theme === "dark" ? 'white' : "black"}
                className='text-inherit w-full'
                icon={<BiSolidCategory size={25} />}
                inputMode='search'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
             <Input
                label='النموذج'
                type='search'
                labelProps={{
                    dir: "ltr"
                }}
                crossOrigin={undefined}
                color={theme === "dark" ? 'white' : "black"}
                className='text-inherit w-full'
                icon={<IoLogoModelS size={25} />}
                inputMode='search'
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />
        </div>
    )
}

export default CarsMangerHeader