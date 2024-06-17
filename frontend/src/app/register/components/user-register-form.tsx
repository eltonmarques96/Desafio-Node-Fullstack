"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from "@/services/httpRequest"
import md5 from 'md5'
import { useToast } from "@/components/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { toast } = useToast();

  const schema = yup.object().shape({
      username:yup.string().required('Insert your username'),
      email:yup.string().required('Email is required').email('Invalid email'),
      password:yup.string().required('Password is required'),
      passwordconfirmation:yup.string().required('Password Confirmation is required').oneOf([yup.ref('password')], 'Passwords must match')
    })

    const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordconfirmation: "",
    },
    validationSchema: schema,

    onSubmit: async (values) => {
      try {
        setIsLoading(true)
        const response = await api.post("/users", {
          username: values.username,
          email: values.email,
          password: md5(values.password),
        })
        if(response.status === 200){
          toast({
            description: "Usuário Criado com Sucesso",
          })
        }
        else if (response.status === 409){
          toast({
            description: "Usuário já existente",
          })
        }
        else{
          throw new Error(response.data)
        }
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Erro ao criar usuário",
        })
      }
      finally {
        setIsLoading(false)
      }
    },
  });
 
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="" htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Your username"
                type="text"
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect="off"
                disabled={isLoading}
                value={values.username}
                onChange={handleChange}
              />
              {touched.username && errors.username && <div>{errors.username}</div>}
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
              {touched.email && errors.email && <div>{errors.email}</div>}
              <Label className="" htmlFor="password">
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
              <Label className="" htmlFor="passwordconfirmation">
                Confirm Password
              </Label>
              <Input
                id="passwordconfirmation"
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
            <Button disabled={isLoading} type='submit'>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}