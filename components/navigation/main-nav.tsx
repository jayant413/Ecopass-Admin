"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.organizationId}`,
      label: "Dashboard",
      active: pathName === `/${params.organizationId}`,
    },
    {
      href: `/${params.organizationId}/passengers`,
      label: "Passengers",
      active: pathName === `/${params.organizationId}/passengers`,
    },
    {
      href: `/${params.organizationId}/conductors`,
      label: "Conductors",
      active: pathName === `/${params.organizationId}/conductors`,
    },
    {
      href: `/${params.organizationId}/buses`,
      label: "Buses",
      active: pathName === `/${params.organizationId}/buses`,
    },
    {
      href: `/${params.organizationId}/bus-routes`,
      label: "Bus routes",
      active: pathName === `/${params.organizationId}/bus-routes`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white "
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
