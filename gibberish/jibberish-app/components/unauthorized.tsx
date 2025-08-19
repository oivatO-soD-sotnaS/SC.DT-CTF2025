import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Unauthorized() {
  return (
    <main className="flex flex-col h-screen w-screen items-center justify-center">
      <Card className='w-lg max-w-full'>
        <CardHeader>
          <CardTitle>401 - Unauthorized</CardTitle>
          <CardDescription>Expired or invalid &apos;jwt_token&apos; cookie..</CardDescription>
        </CardHeader>
      </Card>
      <a className='w-lg max-w-full text-xs text-secondary my-1 hover:underline' href='http://jibber-jabber_container:4001'>See docs</a>
    </main>
  )
}
