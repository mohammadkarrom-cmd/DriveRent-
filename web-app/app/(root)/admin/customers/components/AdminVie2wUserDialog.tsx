"use client"
import { CardBackgrounds } from '@/lib/ui/class/classNames'
import { Dialog, DialogBody, DialogHeader, Typography } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import { IoCarSport } from 'react-icons/io5'
import AdminUserDetails from './AdminUserDetails'

type Props = {
    userId: number
    open: boolean,
    onToggle: () => void
}

const AdminVie2wUserDialog = ({ onToggle, open, userId }: Props) => {

    return (
        <Dialog
            open={open}
            handler={onToggle}
            size='xl'
            className={clsx(CardBackgrounds)}
        >
            <DialogHeader>
                <Typography
                    variant='h3'
                    color='green'
                >
                    <IoCarSport className='inline-block me-1' />إضافة سيارة جديدة إلى المخزون
                </Typography>
            </DialogHeader>
            <DialogBody>
                <AdminUserDetails
                    userId={userId}
                    onClose={onToggle}
                />
            </DialogBody>
        </Dialog>
    )
}

export default AdminVie2wUserDialog