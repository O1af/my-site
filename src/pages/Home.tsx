import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Project } from "@/types/project";
import { ProjectsCard } from "@/components/ProjectsCard";
import { Experience } from "@/types/experience";
import { ExperiencesCard } from "@/components/ExperiencesCard";

const projects: Project[] = [
  {
    title: "Multithreaded Network File Server",
    description:
      "Developed a crash-consistent network file server supporting concurrency with Boost threads and reader-writer locks. Leveraged POSIX sockets for seamless client communication.",
    link: "#",
    tags: ["C++", "Concurrency", "POSIX Sockets"],
  },
  {
    title: "Air Quality Monitoring Platform",
    description:
      "Created a platform integrating 90+ sensors for continuous air quality monitoring. Built a web interface with SolidJS and implemented CI/CD pipelines using GCP.",
    link: "https://detroitair.umich.edu/",
    tags: ["SolidJS", "MySQL", "Google Cloud"],
  },
  {
    title: "Job Indicator",
    description:
      "Developed a full-stack web application with React, Node.js, and AWS. Integrated data pipelines and PostgreSQL for job market analysis.",
    link: "#",
    tags: ["React", "AWS", "Node.js", "PostgreSQL"],
  },
];

const experiences: Experience[] = [
  {
    title: "🎥 Incoming Software Engineer Intern",
    company: "Netflix",
    period: "May 2025 - Aug 2025",
    description: "Ads Platform Team",
  },
  {
    title: "📚 Teaching Assistant",
    company: "University of Michigan",
    period: "Aug 2024 - Dec 2024",
    description:
      "Guided students through Operating Systems concepts such as concurrency and memory management. Conducted weekly lab sessions for 30+ students.",
  },
  {
    title: "💻 Software Engineer Intern",
    company: "MeetYourClass",
    period: "May 2024 - July 2024",
    description:
      "Migrated backend infrastructure to NestJS, implemented end-to-end testing, and reduced cloud costs by 14% through optimization.",
  },
  {
    title: "⚙️ Software Engineer Intern",
    company: "Infinite Degrees",
    period: "Aug 2022 - Dec 2022",
    description:
      "Led API development and utilized BeautifulSoup for data scraping. Managed data API for dynamic ranking models.",
  },
];

const Home: React.FC = () => (
  <ScrollArea className="h-full">
    <main className="flex flex-col items-center py-6 space-y-12">
      <section id="about" className="container">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="/PFP.JPEG"
              alt="Olaf Dsouza"
              className="w-full h-full object-cover object-center transition-transform hover:scale-105"
            />
          </div>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight">Olaf Dsouza</h1>
            <p className="text-lg text-muted-foreground">
              👋 Hi there! I'm Olaf Dsouza, a junior at the University of
              Michigan pursuing a Bachelor's in Computer Science with a strong
              passion for Operating Systems and Distributed Systems. Here's a
              quick snapshot of my journey so far:
            </p>
          </div>
        </div>
      </section>

      <ExperiencesCard experiences={experiences} />

      <ProjectsCard projects={projects} />

      <section id="education" className="container">
        <h2 className="text-3xl font-bold mb-6 text-center">Education</h2>
        <Card>
          <CardHeader>
            <CardTitle>University of Michigan</CardTitle>
            <CardDescription>B.S. in Computer Science</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Expected May 2025</p>
          </CardContent>
        </Card>
      </section>
    </main>
  </ScrollArea>
);

export default React.memo(Home);
