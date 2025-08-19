import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Forbidden() {
    
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Card className='w-lg max-w-full'>
        <CardHeader>
          <CardTitle>403 - Access Denied</CardTitle>
          <CardDescription>Admin only access is allowed.</CardDescription>
        </CardHeader>
      </Card>
    </main>
  )
}
