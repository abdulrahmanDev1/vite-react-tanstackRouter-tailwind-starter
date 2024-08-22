import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@tanstack/react-router";

export type Route = {
  title: string;
  href: string;
  children?: React.ReactNode;
  subRoutes?: Route[];
};

export function NavBar({
  className,
  routes,
}: {
  className?: string;
  routes: Route[];
}) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {routes.map((route) =>
          route.subRoutes ? (
            <NavigationMenuItem key={route.title}>
              <NavigationMenuTrigger>
                <Link to={route.href} className="[&.active]:font-bold">
                  {route.title}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {route.subRoutes.map((subRoute) => (
                    <ListItem
                      key={subRoute.title}
                      title={subRoute.title}
                      href={subRoute.href}
                    >
                      {subRoute.children}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={route.title}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link to={route.href} className="[&.active]:font-extrabold">
                  {route.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
