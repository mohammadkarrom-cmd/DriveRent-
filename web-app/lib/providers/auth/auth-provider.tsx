"use client"
import { endpoints } from '@/app/api/common'
import { paths } from '@/app/components/layout/config-nav'
import { REFRESH_TOKEN } from '@/app/constants'
import dataMutate from '@/lib/api/data/dataMutate'
import { registerSchemaType } from '@/lib/api/data/zod/schemas'
import { METHODS, setHeaderToken } from '@/lib/api/setup/api'
import AuthContext, { AuthContextType, loginCredentials, StatusType } from '@/lib/context/auth/auth-context'
import { getFromStorage, removeFromStorage, useLocalStorage } from '@/lib/hooks/use-local-storage'
import { AxiosError } from 'axios'
import { isArray, unset } from 'lodash'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
    children: ReactNode
}



const AuthProvider = ({ children }: Props) => {
    const refreshToken = useLocalStorage(REFRESH_TOKEN, { token: null });
    const router = useRouter();


    const [user, setUser] = useState<AuthenticatedUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const initUser = async () => {
            const response = dataMutate(endpoints.auth.refreshToken, METHODS.POST, { refresh: refreshToken.value.token });

            await response.then((value: AuthenticatedUser) => {
                setUser(value as AuthenticatedUser);
                setHeaderToken(value.access);
                setAuthenticated(true)
                setLoading(false)
            }).catch(() => {
                setAuthenticated(false);
                setLoading(false)
            });
        }
        initUser();

    }, [refreshToken.value.token]);

    const status: StatusType = loading
        ? "loading"
        : authenticated
            ? "authenticated"
            : "unauthenticated";

    const memoizedValues: AuthContextType = useMemo(
        () => ({
            user: user,
            status: status,
            login: async (data: loginCredentials) => {
                const response = dataMutate(endpoints.auth.login, METHODS.POST, data);
                await response.then((value: LoginType) => {
                    router.replace(paths.home)
                    toast.success("تم تسجيل الدخول بنجاح")
                    toast.info(`اهلا بعودتك ${value.first_name} ${value.last_name}`)
                    refreshToken.update("token", value.refresh);
                    setUser(value as AuthenticatedUser);
                    setHeaderToken(value.access);
                    setAuthenticated(true)
                }).catch(error => {
                    if (error instanceof AxiosError) {
                        if (error.response.data && error.response.data?.message) {
                            if (isArray(error.response.data?.message )) {
                                error.response.data?.message.map((m) => {
                                    toast.error(m)
                                })
                            } else {
                                toast.error(error.response.data?.message)
                            }
                        } else if (error.status === 400) {
                            toast.error("بيانات الدخول غير صحيحة")
                        } else {
                            toast.error("خطأ بالأتصال")
                        }
                    } else {
                        toast.error("خطأ بالأتصال")
                    }
                });
            },
            register: async (data: registerSchemaType) => {
                const formData = data;
                unset(formData, "confirm_password");
                const response = dataMutate(endpoints.auth.register, METHODS.POST, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                await response.then((value: LoginType) => {
                    router.replace(paths.home)
                    toast.info("تم إنشاء الحساب بنجاح. يرجى انتظار تفعيل الحساب من قبل الإدارة.")
                    refreshToken.update("token", value.refresh);
                    setUser(value as AuthenticatedUser);
                    setHeaderToken(value.access);
                    setAuthenticated(true)
                }).catch(error => {
                    if (error instanceof AxiosError) {
                        if (error.response.data && error.response.data?.message) {
                            if (isArray(error.response.data?.message )) {
                                error.response.data?.message.map((m) => {
                                    toast.error(m)
                                })
                            } else {
                                toast.error(error.response.data?.message)
                            }
                        } else if (error.status === 400) {
                            toast.error("الرقم الوطني أو اسم المستخدم موجود بالفعل")
                        } else {
                            toast.error("خطأ بالأتصال")
                        }
                    } else {
                        toast.error("خطأ بالأتصال")
                    }
                });
            },
            logout: async () => {
                const refreshToken = getFromStorage(REFRESH_TOKEN);
                const response = dataMutate(endpoints.auth.logout, METHODS.POST, { refresh: refreshToken.token }, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                await response.then(() => {
                    router.replace(paths.home)
                    setAuthenticated(false)
                    setUser(null)
                    toast.success("تم تسجيل الخروج بنجاح")
                    removeFromStorage(REFRESH_TOKEN)
                }).catch(error => {
                    console.log(error);
                    toast.success("حدث خطأ أثناء تسجيل الخروج")
                });
            }
        }),
        [user, status, refreshToken.value.token]
    );

    return <AuthContext.Provider value={memoizedValues}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider