import MyDrawer from '@/app/components/layout/nav/MyDrawer'
import SidebarLinks from '@/app/components/layout/sidebar/SidebarLinks'
import Logo from '@/app/components/Lgo'
import { ROLES } from '@/app/constants'
import AuthGuard from '@/lib/guards/auth-guard'
import RoleGuard from '@/lib/guards/role-guard'
import { CardBackgrounds } from '@/lib/ui/class/classNames'
import { Card, CardBody, CardHeader } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { managerLinks } from './config'


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
                                links={managerLinks}
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
                                    links={managerLinks}
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