import React, { ReactNode } from 'react'
import Header from '../nav/Header'
import Main from '../main/Main'
import Footer from '../footer/Footer'

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
            <Main>
                {children}
            </Main>
            <Footer/>
        </>
    )
}

export default CommonLayout