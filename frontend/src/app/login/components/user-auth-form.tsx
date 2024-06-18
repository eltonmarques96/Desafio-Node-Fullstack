"use client"

import * as React from "react"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast";
import api from "@/services/httpRequest";
import md5 from "md5";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const schema = yup.object().shape({
    email:yup.string().required('Email is required').email('Invalid email'),
    password:yup.string().required('Password is required'),
  })

  const formik = useFormik({
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema: schema,
  onSubmit: async (values) => {
    try {
      setIsLoading(true)
      const response = await api.post("/users/login", {
        email: values.email,
        password: md5(values.password),
      })
      if(response.status === 200){
        toast({
          description: "Seja bem vindo",
        })
      }
      else{
        throw new Error(response.data)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Erro ao realizar login",
      })
    }
    finally {
      setIsLoading(false)
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
});

const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
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
            <Button disabled={isLoading} type='submit'>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}