import { AppSidebar } from "@/app/(private)/_components/app-sidebar"
import { ChartAreaInteractive } from "@/app/(private)/_components/chart-area-interactive"
import { DataTable } from "@/app/(private)/_components/data-table"
import { SectionCards } from "@/app/(private)/_components/section-cards"
import { SiteHeader } from "@/app/(private)/_components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "@/app/data.json"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(session === null) {
    return null
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar session={session} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
