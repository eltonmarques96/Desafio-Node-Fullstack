'use client';

import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { TLogin } from '@/utils/types/auth';
import md5 from 'md5';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { loginAPICall } = useAuth();
    const router = useRouter();

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required')
            .email('Invalid email'),
        password: yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const signInValues: TLogin = {
                    email: values.email,
                    password: md5(values.password),
                };
                const apiReturn = await loginAPICall(signInValues);
                if (apiReturn?.success == true) {
                    router.push('/dashboard');
                } else {
                    throw new Error();
                }
            } catch (error) {
                toast({
                    variant: 'destructive',
                    description: 'Erro ao realizar login',
                });
            } finally {
                setIsLoading(false);
            }
        },
    });

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <>
            <div className={cn('grid gap-6', className)} {...props}>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                value={values.email}
                                onChange={handleChange}
                            />
                            <Label className="" htmlFor="email">
                                Password
                            </Label>
                            <Input
                                id="password"
                                placeholder="your password"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                value={values.password}
                                onChange={handleChange}
                            />
                        </div>
                        <Button disabled={isLoading} type="submit">
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In with Email
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
