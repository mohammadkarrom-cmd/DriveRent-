import { ReactNode } from 'react'
import { Card, CardBody, CardHeader } from '@/lib/ui/MTFix'
import SidebarLinks from '@/app/components/layout/sidebar/SidebarLinks'
import { adminLinks } from './config'
import MyDrawer from '@/app/components/layout/nav/MyDrawer'
import AuthGuard from '@/lib/guards/auth-guard'
import clsx from 'clsx'
import { CardBackgrounds } from '@/lib/ui/class/classNames'
import RoleGuard from '@/lib/guards/role-guard'
import { ROLES } from '@/app/constants'
import Logo from '@/app/components/Lgo'


type Props = {
    children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
    return (
        <AuthGuard>
            <RoleGuard
                roles={[ROLES.MANGER]}
            >
                <section className='flex '>
                    <Card className={clsx(CardBackgrounds, "h-screen w-full max-w-80 p-4 text-inherit rounded-none hidden lg:block")}>
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
                                links={adminLinks}
                            />
                        </CardBody>
                    </Card>
                    <MyDrawer
                        className='p-1 gap-10'
                        hidden='lg'
                    >
                        <Card className=" w-full text-inherit bg-inherit">
                            <CardBody
                                className='p-0'
                            >
                                <SidebarLinks
                                    links={adminLinks}
                                />
                            </CardBody>
                        </Card>
                    </MyDrawer>
                    <section className=' p-5 w-full h-[calc(100vh-4rem)] overflow-y-scroll flex-grow'>
                        {children}
                    </section>
                </section>
            </RoleGuard>
        </AuthGuard>
    )
}

export default AdminLayout