"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal, Heart
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Santushti Boutique",
    email: "santushtiboutiqueonline@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Design",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Indian",
          url: "#",
        },
        {
          title: "Weston",
          url: "#",
        },
        {
          title: "Weston Dress",
          url: "#",
        },
        {
          title: "Indian Dress",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Liked Images",
      url: "/likes",
      icon: Heart,
    },
    {
      name: "Shop Info",
      target: "_blank",
      url: "https://maps.app.goo.gl/Ko4Unnp3rqJ4bMjw6",
      icon: Map,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <>
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">SBstylehub</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
          <Dialog>
            <DialogTrigger><NavSecondary items={data.navSecondary} className="mt-auto" /></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thanks To Show Your Support</DialogTitle>
                <br></br>
              <Input type="text" placeholder="Enter Your UPI Id" />
                <DialogDescription>
                  Your Support Towards Our Project
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

    </>
  )
}
