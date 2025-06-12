import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const AdminMain = ({ children }: Props) => {
    return (
        <main className='p-5 h-[calc(100vh-4rem)] overflow-y-scroll flex-grow'>
            {children}
        </main>
    )
}

export default AdminMain