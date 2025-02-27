import { Typography } from '@/lib/ui/MTFix'
import { ReactNode } from 'react'

type Props = {
  title: string,
  body: string,
  actions?: ReactNode
}

const ManagementPageHeader = ({ title, body, actions }: Props) => {
  return (
    <header className='flex items-center justify-between'>
      <section>
        <Typography
          variant='h2'
          color='green'
          className='text-3xl sm:text-4xl lg:text-5xl transition-all'
        >
          {title}
        </Typography>
        <Typography
          variant='lead'
          className='text-lg sm:text-xl transition-all'
        >
          {body}
        </Typography>
      </section>
      {actions}
    </header>
  )
}

export default ManagementPageHeader