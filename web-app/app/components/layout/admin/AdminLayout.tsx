import { adminLinks } from '@/app/(admin)/admin/config'
import { CardBackgrounds } from '@/lib/ui/class/classNames'
import { Card, CardBody, CardHeader } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import { ReactNode } from 'react'
import Logo from '../../Lgo'
import Header from '../nav/Header'
import MyDrawer from '../nav/MyDrawer'
import SidebarLinks from '../sidebar/SidebarLinks'
import AdminMain from './AdminMain'

type Props = {
    children: ReactNode
    navLinks?: ReactNode,
    MenuLink: MenuLinkType[]

}
const AdminLayout = ({ children, navLinks,MenuLink }: Props) => {
    return (
        <div className='flex'>
            <Card
                className={clsx(CardBackgrounds, "h-screen w-fit max-w-80 p-4 text-inherit rounded-none hidden lg:block shadow-md shadow-background-default-dark dark:shadow-md dark:shadow-background-default-dark")}
                shadow={false}
            >
                <CardHeader
                    color='transparent'
                    floated={false}
                    shadow={false}
                    className='p-5 flex justify-center items-center m-0'
                >
                    <Logo width={150} height={150} disabledLink />
                </CardHeader>
                <CardBody
                    className='p-0'
                >
                    <SidebarLinks
                        links={MenuLink}
                    />
                </CardBody>
            </Card>
            <div className='grow w-full'>
                <Header
                    navigation={navLinks}
                    drawer={
                        <MyDrawer
                            className='p-1 gap-10'
                            hidden='lg'
                        >
                            <Card
                                className=" w-full text-inherit bg-inherit"
                                shadow={false}
                            >
                                <CardBody
                                    className='p-0'
                                >
                                    <SidebarLinks
                                        links={adminLinks}
                                    />
                                </CardBody>
                            </Card>
                        </MyDrawer>
                    }
                />
                <AdminMain>
                    {children}
                </AdminMain>
            </div>
        </div>
    )
}

export default AdminLayout