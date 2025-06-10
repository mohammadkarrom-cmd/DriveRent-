"use client"
import { useSettingsContext } from '@/lib/context/settings/setting-context';
import { Backgrounds, shadowPrimary, TextPrimary } from '@/lib/ui/class/classNames';
import { Input, Option, Select } from '@/lib/ui/MTFix';
import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { BiSolidCategory } from 'react-icons/bi';
import { IoLogoModelS } from 'react-icons/io';

type Props = {
    model: string
    setModel: Dispatch<SetStateAction<string>>
    brand: string
    setBrand: Dispatch<SetStateAction<string>>
    category: string
    setCategory: Dispatch<SetStateAction<string>>,
    categories: CategoryType[]
}

const CarsMangerHeader = ({ model, setModel, brand, setBrand, category, setCategory, categories }: Props) => {
    const { theme } = useSettingsContext();

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 min-h-fit'>
            <Select
                label='التصنيف'
                color='green'
                value={category}
                onChange={(value) => {
                    setCategory(value);
                }}
                tabIndex={100}
                menuProps={{
                    className: clsx(Backgrounds, shadowPrimary, TextPrimary, "shadow border-none z-50 max-h-[100px] overflow-scroll"),
                    tabIndex: 100
                }}
            >
                <Option
                    value=''
                    className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
                >
                    غير محدد
                </Option>
                {
                    categories.map(category => (
                        <Option
                            value={category.id_car_type.toString()}
                            key={category.id_car_type}
                        >
                            {category.name}
                        </Option>
                    ))
                }
            </Select>
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