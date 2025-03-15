import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useMetric } from "@/schema/tinybase-schema";
import { Link } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import * as React from "react";
import { LuFolders, LuShoppingCart } from "react-icons/lu";
import { Badge } from "./ui/badge";

export function MainSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const cartItems = useMetric('total_products') as number
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Tinyshop</span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="customScrollStyle">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Link to="/products" >
                                {({ isActive }) => (
                                    <SidebarMenuButton className={cn(isActive ? "font-bold" : "font-semibold")} tooltip={"schedular"} variant={isActive ? "outline" : "default"}>
                                        <LuFolders className="ml-2 size-4" />
                                        products
                                    </SidebarMenuButton>
                                )}
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link to="/cart">
                                {({ isActive }) => (
                                    <SidebarMenuButton className={cn(isActive ? "font-bold" : "font-semibold", "relative")} tooltip={"blog"} variant={isActive ? "outline" : "default"}>
                                        <LuShoppingCart className="ml-2 size-4" />
                                        cart
                                        {cartItems > 0 && <Badge className="min-w-5 px-1">{cartItems}</Badge>}
                                    </SidebarMenuButton>
                                )}
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
