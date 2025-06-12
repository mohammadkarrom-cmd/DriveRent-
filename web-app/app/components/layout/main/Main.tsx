import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const Main = ({ children }: Props) => {
    return (
        <main className='p-0 min-h-[calc(100vh-4rem)]'>
            {children}
        </main>
    )
}

export default Main