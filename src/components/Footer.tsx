import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    icon: Mail,
    href: "mailto:web@olafdsouza.com",
    label: "Email Contact",
    color: "hover:text-blue-500",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/olafdsouza",
    label: "LinkedIn Profile",
    color: "hover:text-blue-600",
  },
  {
    icon: Github,
    href: "https://github.com/o1af",
    label: "GitHub Profile",
    color: "hover:text-gray-900 dark:hover:text-white",
  },
];

const Footer: React.FC = () => (
  <motion.footer
    className="border-t border-primary/5 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col items-center gap-4">
        {/* Social links section */}
        <motion.div
          className="flex items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <span className="text-sm text-muted-foreground mr-1">
            Let's Connect:
          </span>
          {socialLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -3, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className={`${link.color} rounded-full p-2 h-auto w-auto`}
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright section */}
        <motion.div
          className="text-center pt-2 w-full max-w-sm flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span>© {new Date().getFullYear()} Olaf Dsouza</span>
            <span className="inline-block w-1 h-1 rounded-full bg-primary/30"></span>
            <span className="text-muted-foreground/70 text-[0.7rem]">
              Built with React & TypeScript
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  </motion.footer>
);

export default React.memo(Footer);
