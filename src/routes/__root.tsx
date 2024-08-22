import { NavBar } from "@/components/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Route as RouteType } from "@/components/navbar";

const AboutChiled = () => {
  return (
    <div>
      <h1>About 2</h1>
      <p>This is the about 2 page</p>
    </div>
  );
};

const routes: RouteType[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
    subRoutes: [
      {
        title: "About 1",
        href: "/about/1",
        children: "This is the about 1 page",
      },
      {
        title: "About 2",
        href: "/about/2",
        children: <AboutChiled />,
      },
    ],
  },
];

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="w-full border-b border-b-gray-900">
        <NavBar routes={routes} className="mx-auto p-2  " />
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
