import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const Main = ({ children }: Props) => {
    return (
        <main className='p-0 min-h-screen'>
            {children}
        </main>
    )
}

export default Main