import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router";
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
  { title: "Connections", href: "/connections" },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 transition-all duration-300",
        scrolled
          ? "shadow-md border-primary/5"
          : "shadow-none border-transparent"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          <motion.a
            href="/"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h1
              className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Olaf Dsouza
            </motion.h1>
          </motion.a>
          <div className="ml-auto flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationSections.map((section, index) => (
                  <NavigationMenuItem key={section.title}>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                    >
                      <NavigationMenuLink
                        href={section.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "cursor-pointer relative font-medium",
                          location.pathname === section.href
                            ? "text-primary"
                            : "hover:text-primary/80 transition-colors"
                        )}
                      >
                        {section.title}
                        {location.pathname === section.href && (
                          <motion.div
                            className="absolute -bottom-[1.5px] left-0 right-0 h-[2px] bg-primary"
                            layoutId="underline"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </NavigationMenuLink>
                    </motion.div>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <ModeToggle />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default React.memo(Header);
