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
  SquareTerminal,
  Heart,
  type LucideIcon
} from "lucide-react"

// Import custom icons
import { HeartIcon, DressIcon, MapsIcon, SupportIcon, FeedbackIcon, SidebarIcon } from "@/components/icons"

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

// Modify the custom components file (This is what you should do in your icons.tsx file)
// Here we're showing what should be done, but in actual implementation
// you would need to modify the icons.tsx file directly

// Option 1: If you can modify your NavMain, NavProjects, and NavSecondary components:
// Change their types to accept React.ComponentType<React.SVGProps<SVGSVGElement>> for icons

// Option 2: If you can modify your icons.tsx file:
// Instead of exporting your custom icons directly, export LucideIcon components that use your SVG paths

// Option 3: Create adapter components in this file for each icon
const LucideDressIcon = (props: React.SVGProps<SVGSVGElement>) => <DressIcon {...props} />;
const LucideSupportIcon = (props: React.SVGProps<SVGSVGElement>) => <SupportIcon {...props} />;
const LucideFeedbackIcon = (props: React.SVGProps<SVGSVGElement>) => <FeedbackIcon {...props} />;
const LucideHeartIcon = (props: React.SVGProps<SVGSVGElement>) => <HeartIcon {...props} />;
const LucideMapsIcon = (props: React.SVGProps<SVGSVGElement>) => <MapsIcon {...props} />;

// Data structure containing user information, navigation items, and projects
const data = {
  user: {
    name: "Santushti Boutique",
    email: "sbstylehub@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Design",
      url: "#",
      // Use type assertion to tell TypeScript this is a LucideIcon
      icon: LucideDressIcon as unknown as LucideIcon,
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
      url: "/contact",
      icon: LucideSupportIcon as unknown as LucideIcon,
    },
    {
      title: "Feedback",
      url: "#",
      icon: LucideFeedbackIcon as unknown as LucideIcon,
    },
  ],
  projects: [
    {
      name: "Liked Images",
      url: "/likes",
      icon: LucideHeartIcon as unknown as LucideIcon,
    },
    {
      name: "Shop Info",
      target: "_blank",
      url: "https://maps.app.goo.gl/Ko4Unnp3rqJ4bMjw6",
      icon: LucideMapsIcon as unknown as LucideIcon,
    }
  ],
}

// AppSidebar component that takes all props from Sidebar and spreads them
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
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
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}