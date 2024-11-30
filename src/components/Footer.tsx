import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => (
  <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" asChild>
            <a
              href="mailto:web@olafdsouza.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://linkedin.com/in/olafdsouza"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/o1af"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Olaf Dsouza
        </p>
      </div>
    </div>
  </footer>
);

export default React.memo(Footer);
