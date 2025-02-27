"use client";
import { paths } from '@/app/components/layout/config-nav';
import { loginSchema, LoginSchema } from '@/lib/api/data/zod/schemas';
import { useAuthContext } from '@/lib/context/auth/auth-context';
import { useSettingsContext } from '@/lib/context/settings/setting-context';
import useBoolean from '@/lib/hooks/use-boolean';
import { Button, Input, Typography } from '@/lib/ui/MTFix'
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { GiIdCard } from 'react-icons/gi';
import { IoEye } from 'react-icons/io5';
import { PiEyeClosedDuotone } from 'react-icons/pi';



const LoginPage = () => {
  const { login } = useAuthContext();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { theme } = useSettingsContext();
  const showPassword = useBoolean({ initialState: false });

  const onSubmit = (data: LoginSchema) => {
    login({
      username: data.username,
      password: data.password
    });
  };

  return (
    <form className='w-full flex flex-col gap-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input
          label='اسم المستخدم'
          labelProps={{
            dir: "ltr",
          }}
          type='text'
          crossOrigin={undefined}
          color={theme === "dark" ? 'white' : "black"}
          className='text-inherit w-full mb-1'
          icon={<GiIdCard size={25} />}
          inputMode='text'
          {...register("username")}
          error={!!errors.username}
        />
        {!!errors.username && <Typography variant='small' color='red' className='text-xs'>{errors.username.message}</Typography>}
      </div>
      <div>
        <Input
          label='كلمة المرور'
          labelProps={{
            dir: "ltr",
          }}
          crossOrigin={undefined}
          color={theme === "dark" ? 'white' : "black"}
          className='text-inherit w-full'
          type={showPassword.value ? "text" : "password"}
          icon={
            showPassword.value
              ? <IoEye
                size={25}
                onClick={showPassword.onToggle}
                className='cursor-pointer hover:scale-105 mb-1'
              />
              : <PiEyeClosedDuotone
                size={25}
                onClick={showPassword.onToggle}
                className='cursor-pointer hover:scale-105'
              />
          }
          inputMode='text'
          {...register("password")}
          error={!!errors.password}
        />
        {!!errors.password && <Typography variant='small' color='red' className='text-xs'>{errors.password.message}</Typography>}
      </div>

      <Button
        type='submit'
        color={"green"}
        className='active:scale-105'
      >
        تسجيل الدخول
      </Button>
      <section className=''>
        <Typography
          variant='small'
          className='inline-block'
        >
          لست عضواً بعد، لا تتردد في إنشاء حساب والانضمام إلى عائلتنا.
        </Typography>
        <Link
          href={paths.register}
        >
          <Button
            variant='text'
            size='sm'
            color='green'
            className='inline-block px-1.5'
            type='submit'
          >
           إنشاء حساب
          </Button>
        </Link>
      </section>
    </form>
  )
}

export default LoginPage