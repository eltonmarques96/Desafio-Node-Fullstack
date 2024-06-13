"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from 'formik';
import * as yup from 'yup';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const schema = yup.object().shape({
      fullName:yup.string().required('Insert your name'),
      email:yup.string().required('Email is required').email('Invalid email'),
      password:yup.string().required('Password is required'),
      passwordconfirmation:yup.string().required('Password Confirmation is required')
    })

    const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      passwordconfirmation: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  });
 
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="full-name">
              Full Name
            </Label>
            <Input
              id="full-name"
              placeholder="Your Full Name"
              type="email"
              autoCapitalize="none"
              autoComplete="full-name"
              autoCorrect="off"
              disabled={isLoading}
              value={values.fullName}
              onChange={handleChange}
            />
            {touched.fullName && errors.fullName && <div>{errors.fullName}</div>}
            <Label className="sr-only" htmlFor="email">
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
            {touched.email && errors.email && <div>{errors.email}</div>}
            <Label className="sr-only" htmlFor="password">
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
            {touched.password && errors.password && <div>{errors.password}</div>}
            <Label className="sr-only" htmlFor="password-confirmation">
              Confirm Password
            </Label>
            <Input
              id="password-confirmation"
              placeholder="your password confirmation"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={values.passwordconfirmation}
              onChange={handleChange}
            />
            {touched.passwordconfirmation && errors.passwordconfirmation && <div>{errors.passwordconfirmation}</div>}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}