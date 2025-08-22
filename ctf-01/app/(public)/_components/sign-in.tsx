"use client"

import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeClosed, Skull } from "lucide-react"
import { signIn } from "@/server/users"
import { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "../../../components/ui/kibo-ui/spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(64)
})
export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [seePassword, setSeePassword] = useState<boolean>(false)
  const [isSubmiting, setIssubmiting] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIssubmiting(true)
      const {
        email,
        password
      } = values
      await signIn(email, password)
      toast("Redirecting to dashboard!")
      router.push("/dashboard")
    }catch {
      toast("Incorrect e-mail or password")
    } finally {
      setIssubmiting(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex flex-col items-center gap-2 font-medium"
        >
          <div className="flex size-8 items-center justify-center rounded-md">
            <Skull className="size-6" />
          </div>
          <span className="sr-only">Web hacking 01.</span>
        </div>
        <h1 className="text-xl font-bold">Welcome to Web hacking 01.</h1>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input type={seePassword ? "text" : "password"} placeholder="******" {...field} />
                    <Button size={'icon'} variant={'ghost'} onClick={() => setSeePassword(!seePassword)}>
                      {seePassword ? (
                        <EyeClosed />
                      ) : (
                        <Eye />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmiting}>
            {isSubmiting && <Spinner variant="infinite"/>}
            Sign-in
          </Button>
        </form>
      </Form>
    </div>
  )
}
