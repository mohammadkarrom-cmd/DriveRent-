import { Typography } from '@/lib/ui/MTFix'
import { ReactNode } from 'react'

type Props = {
  title: string,
  body: string,
  actions?: ReactNode
}

const PageHeader = ({ title, body, actions }: Props) => {
  return (
    <header className='flex justify-between flex-col gap-y-5 lg:flex-row lg:items-center'>
      <section>
        <Typography
          variant='h2'
          color='green'
          className='text-2xl sm:text-3xl lg:text-4xl transition-all'
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

export default PageHeader