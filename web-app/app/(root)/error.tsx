"use client"
import { CardBackgrounds, TextPrimary } from '@/lib/ui/class/classNames'
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import Link from 'next/link'
import { MdHeartBroken } from 'react-icons/md'
import { paths } from '../components/layout/config-nav'


function Error({
  error,
  // reset,
}: {
  error: Error & { digest?: string }
  // reset: () => void
}) {


console.log(error);

  return (
    <section
      className='w-full h-full py-20 px-10'
    >
      <Card
        shadow={false}
        color='transparent'
        className={clsx(CardBackgrounds, TextPrimary)}
      >
        <CardHeader
          shadow={false}
          color='transparent'
          floated={false}
        >
          <Typography
            variant='h4'
            color='red'
            className='flex items-center gap-1.5'
          >
            <MdHeartBroken />
            Error occourd
            <MdHeartBroken />
          </Typography>
        </CardHeader>
        <CardBody
          color='transparent'
        >
          we are sorry an error occourd when tryning to concent to the server
          <br />
          or unknown error throw check the console for more information about the error
        </CardBody>
        <CardFooter
          className='gap-10 flex flex-col md:items-center md:flex-row'
        >
          <Link href={paths.home} >
            <Button
              color='green'
            >
              Go back to home page
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  )
}

export default Error