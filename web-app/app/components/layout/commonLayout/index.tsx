import { ReactNode } from 'react'
import Footer from '../footer/Footer'
import Main from '../main/Main'
import Header from '../nav/Header'

type Props = {
    children: ReactNode
    navLinks?: ReactNode,
    drawer?: ReactNode

}
const CommonLayout = ({ children, navLinks, drawer }: Props) => {
    return (
        <>
            <Header
                navigation={navLinks}
                drawer={drawer}
            />
            <div
                className='h-[calc(100vh-4rem)] overflow-y-scroll'
            >
                <Main>
                    {children}
                </Main>
                <Footer />
            </div>
        </>
    )
}

export default CommonLayout