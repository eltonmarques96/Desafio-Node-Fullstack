import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserRegisterForm } from "@/app/register/components/user-register-form"
import logo from "@/assets/images/OnOnetree logo branco.svg"

export const metadata: Metadata = {
  title: "Regiser",
  description: "OnOneEntrée",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
         <Image
              priority
              src={logo}
              height={128}
              width={128}
              className="mr-2"
              alt="OnOneTree"
            />
            OnOneTree
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
              Create your account
              </h1>
            </div>
            <UserRegisterForm />
          </div>
        </div>
      </div>
    </>
  )
}