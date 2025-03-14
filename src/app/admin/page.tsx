import React from "react";
import { AppSidebar } from "../../components/sidebar-admin";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Properly defined BentoGrid Component with TypeScript props
interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({ children, className = "" }) => (
  <div className={`grid ${className}`}>
    {children}
  </div>
);

// Properly defined BentoGridItem Component with TypeScript props
interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
}

const BentoGridItem: React.FC<BentoGridItemProps> = ({ children, className = "" }) => (
  <div className={`p-4 rounded-lg ${className}`}>
    {children}
  </div>
);

export default function Page() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "350px",
      } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Inbox</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Bento Grid Section */}
          <BentoGrid className="grid-cols-1 md:grid-cols-3 gap-4">
            {/* Item 1: Email Overview */}
            <BentoGridItem className="col-span-1 md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Email Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Total Emails: 24</p>
                  <p>Unread: 6</p>
                  <p>Sent: 18</p>
                </CardContent>
              </Card>
            </BentoGridItem>

            {/* Item 2: Quick Actions */}
            <BentoGridItem className="col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Compose New Email</li>
                    <li>Mark All as Read</li>
                    <li>Archive Selected</li>
                  </ul>
                </CardContent>
              </Card>
            </BentoGridItem>

            {/* Item 3: Recent Activity */}
            <BentoGridItem className="col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Sent email to William Smith - 09:34 AM</p>
                  <p>Received email from Alice Smith - Yesterday</p>
                </CardContent>
              </Card>
            </BentoGridItem>

            {/* Item 4: Email Categories */}
            <BentoGridItem className="col-span-1 md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Email Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Work: 10 emails</p>
                  <p>Personal: 8 emails</p>
                  <p>Promotions: 6 emails</p>
                </CardContent>
              </Card>
            </BentoGridItem>
          </BentoGrid>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}