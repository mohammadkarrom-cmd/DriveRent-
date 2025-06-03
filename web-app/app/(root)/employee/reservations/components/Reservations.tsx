"use client"

import Error from '@/app/(root)/error';
import Loading from '@/app/(root)/loading';
import { endpoints } from '@/app/api/common';
import Empty from '@/app/components/views/Empty';
import fetchApi from '@/lib/api/data/dataFetcher';
import { useSettingsContext } from '@/lib/context/settings/setting-context';
import useBoolean from '@/lib/hooks/use-boolean';
import { Backgrounds, CardBackgrounds, shadowPrimary, TextPrimary } from '@/lib/ui/class/classNames';
import { Button, Card, CardHeader, Input, Option, Select, Typography } from '@/lib/ui/MTFix';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import { useState } from 'react';
import { MdOutlineShortText } from 'react-icons/md';
import { TbBrandGoogleBigQuery } from 'react-icons/tb';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import ReservationsTable from './ReservationsTable';


const Reservations = () => {
  const { data: reservations, error, mutate, isLoading } = useSWR(endpoints.reservations.all.list, fetchApi);
  const { theme } = useSettingsContext();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [reversionType, setReversionType] = useState<string>("");

  const [result, setResult] = useState<reservationsType[]>([]);

  const loading = useBoolean({ initialState: false });
  const firstInter = useBoolean({ initialState: true });

  const handleSearch = async () => {
    loading.onTrue();

    const query = endpoints.employee.searchReservation(firstName, lastName, phone, id, reversionType);

    if (!query) {
      toast.warning("ادخل قيم في خيارات البحث", { toastId: "customer-search-warning" })
      setResult([]);
    } else {
      firstInter.onFalse();
      const dataPromise = fetchApi(query);
      dataPromise.then((data) => {
        toast.success("تم البحث بنجاح", { toastId: query })

        setResult(data.data as reservationsType[]);
      }).catch((error) => {
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            toast.error("لا توجد حجوزات متطابقة مع البحث", { toastId: query });
            setResult([]);
          } else {
            toast.error("حدث خطأ في البحث");
          }
        }
      })
    }
    loading.onFalse();
  }

  if (isLoading) return <Loading />
  if (error) {
    if (error instanceof AxiosError) {
      if (error.status === 404) {
        return Empty({
          title: "لا يوجد اي حجوزات مؤقتة حاليا",
          body: "الرجاء التحلي بالصبر و المحاولة لاحقا"
        })
      }
    } else {
      return <Error error={error} />;
    }
  }



  return (
    <Card
      color='transparent'
      shadow
    >
      <CardHeader
        floated={false}
        className={clsx(CardBackgrounds, " m-0 p-5 grid grid-cols-1 md:grid-cols-2 gap-5 rounded-b-none")}
        shadow={false}
      >
        <div
          className='md:col-span-2'
        >
          <Select
            label='نوع الحجز'
            color='green'
            name='category'
            menuProps={{
              className: clsx(Backgrounds, shadowPrimary, TextPrimary, "shadow border-none overflow-scroll "),
            }}
            labelProps={{
              dir: "ltr"
            }}
            value={reversionType}
            onChange={(value) => setReversionType(value)}
          >
            <Option
              value=''
              className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
            >
              غير محدد
            </Option>
            <Option
              value='2'
              className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
            >
              حجز مؤقت
            </Option>
            <Option
              value='3'
              className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
            >
              محجوزة
            </Option>
            <Option
              value='4'
              className={clsx(Backgrounds, TextPrimary, "hover:bg-background-card-light dark:hover:bg-background-card-dark")}
            >
              منتهية الصلاحية
            </Option>
          </Select>
        </div>
        <Input
          label='الاسم الأول'
          type='search'
          labelProps={{
            dir: "ltr"
          }}
          crossOrigin={undefined}
          color={theme === "dark" ? 'white' : "black"}
          className='text-inherit w-full'
          icon={<MdOutlineShortText size={25} />}
          inputMode='search'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label='الأسم الأخير'
          type='search'
          labelProps={{
            dir: "ltr"
          }}
          crossOrigin={undefined}
          color={theme === "dark" ? 'white' : "black"}
          className='text-inherit w-full'
          icon={<MdOutlineShortText size={25} />}
          inputMode='search'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          label='رقم الهاتف'
          type='search'
          labelProps={{
            dir: "ltr"
          }}
          crossOrigin={undefined}
          color={theme === "dark" ? 'white' : "black"}
          className='text-inherit w-full'
          icon={<MdOutlineShortText size={25} />}
          inputMode='search'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          label='الرقم الوطني'
          type='search'
          labelProps={{
            dir: "ltr"
          }}
          crossOrigin={undefined}
          color={theme === "dark" ? 'white' : "black"}
          className='text-inherit w-full'
          icon={<MdOutlineShortText size={25} />}
          inputMode='search'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Button
          variant='gradient'
          className='bg-opacity-40 from-primary-light via-primary-main to-primary-dark h-fit flex items-center justify-center gap-1.5 hover:bg-opacity-100 text-white active:scale-105 transition-all duration-300 md:max-w-96'
          loading={loading.value}
          fullWidth
          onClick={handleSearch}
        >
          بحث <TbBrandGoogleBigQuery />
        </Button>
      </CardHeader>
      {
        firstInter.value ?
          <ReservationsTable
            reservations={reservations.data as reservationsType[]}
            refetch={mutate}
          />
          : result.length > 0
            ? <ReservationsTable
              reservations={result}
              refetch={mutate}
            />

            : <div
              className='p-5 flex flex-col justify-center items-center gap-5'
            >
              <Typography color='red' variant='small'>
                لا يوجد نتائج
              </Typography>
              <Button
                color='amber'
                onClick={() => {
                  setFirstName("");
                  setLastName("");
                  setPhone("");
                  setId("");
                  firstInter.onTrue();
                }}
              >
                إعادة تعيين
              </Button>
            </div>
      }
    </Card>
  )
}

export default Reservations