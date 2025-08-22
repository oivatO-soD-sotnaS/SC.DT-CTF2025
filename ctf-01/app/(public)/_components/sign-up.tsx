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
import { signUp } from "@/server/users"
import { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "../../../components/ui/kibo-ui/spinner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(5).max(64),
    email: z.email(),
    password: z.string().min(6).max(64)
})

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [seePassword, setSeePassword] = useState<boolean>(false)
  const [isSubmiting, setIssubmiting] = useState<boolean>(false)
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIssubmiting(true)
      const {
        name,
        email,
        password
      } = values
      await signUp(email, password, name)
      toast("Redirecting to dashboard!")
      router.push("/dashboard")
    }catch (error) {
      toast("User account unavailable")
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
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
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
            Sign-up
          </Button>
        </form>
      </Form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
