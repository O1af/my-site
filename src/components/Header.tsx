import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

interface NavSection {
  title: string;
  href: string;
}

const navigationSections: NavSection[] = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog" },
];

const Header: React.FC = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container mx-auto px-4">
      <div className="flex h-16 items-center">
        <a href="/" className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">Olaf Dsouza</h1>
        </a>
        <div className="ml-auto flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationSections.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuLink
                    href={section.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "cursor-pointer"
                    )}
                  >
                    {section.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
