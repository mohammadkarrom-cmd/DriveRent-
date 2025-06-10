"use client"

import useBoolean from '@/lib/hooks/use-boolean';
import { Button } from '@material-tailwind/react';
import { BiSolidUserDetail } from 'react-icons/bi';
import AdminVie2wUserDialog from './AdminVie2wUserDialog';

type Props = {
  userId: number
}
const AdminViewUser = ({ userId }: Props) => {
  const open = useBoolean({ initialState: false });
  return (
    <>
      <Button
        color='blue'
        className='flex gap-0.5'
        onClick={open.onTrue}
      >
        <BiSolidUserDetail
          size={17}
        />
        عرض تفاصيل الحساب
      </Button>
      <AdminVie2wUserDialog
        onToggle={open.onToggle}
        open={open.value}
        userId={userId}
      />
    </>
  )
}

export default AdminViewUser