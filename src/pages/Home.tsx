import React from "react";
import { motion, Variants } from "motion/react";
import { PageTransition } from "@/components/utils/PageTransition";
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
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

const projects: Project[] = [
  {
    title: "Azure AI Adapter",
    description: `Developed an open-source package for the Vercel AI SDK
that enables access to 1,000+ models on Microsoft Azure, including DeepSeek-R1 & Meta LLama`,
    link: "https://www.npmjs.com/package/@quail-ai/azure-ai-provider",
    image: "/azure-ai.png",
    tags: ["Typescript", "Vercel AI SDK", "Azure", "Open Source"],
  },
  {
    title: "Air Quality Monitoring Platform",
    description:
      "Created a platform integrating 90+ sensors for continuous air quality monitoring. Built a web interface with SolidJS and implemented CI/CD pipelines using GCP.",
    link: "https://detroitair.umich.edu/",
    image: "/detroit-air.png",
    tags: ["SolidJS", "MySQL", "Google Cloud"],
  },
  {
    title: "Distributed Key-Value Store",
    description: `Developed five distributed key-value store projects over a six-month period:
1. primary backup formally verified in dafny
2. two-phase commit (2PC) with sharding and refinement formally verified in dafny
3. primary backup in Go
4. Paxos-based in Go
5. Paxos implementation with sharding in Go.`,
    image: "/key-value.png",
    tags: ["Dafny", "Go", "Paxos", "2PC", "Distributed Systems"],
  },
];

const experiences: Experience[] = [
  {
    title: "🎥 Incoming Software Engineer Intern",
    company: "Netflix",
    period: "May 2025 - Aug 2025",
    description: "Ads Platform Team",
    skills: [""],
  },
  {
    title: "📚 Teaching Assistant",
    company: "University of Michigan",
    period: "Aug 2024 - Dec 2024",
    description:
      "Guided students through Operating Systems concepts such as concurrency and memory management. Conducted weekly lab sessions for 30+ students.",
    skills: [
      "Operating Systems",
      "Concurrency",
      "Memory Management",
      "Teaching",
    ],
  },
  {
    title: "💻 Software Engineer Intern",
    company: "MeetYourClass",
    period: "May 2024 - July 2024",
    description:
      "Migrated backend infrastructure to NestJS, implemented end-to-end testing, and reduced cloud costs by 14% through optimization.",
    skills: ["NestJS", "TypeScript", "E2E Testing", "Cloud Optimization"],
  },
  {
    title: "⚙️ Software Engineer Intern",
    company: "Infinite Degrees",
    period: "Aug 2022 - Dec 2022",
    description:
      "Led API development and utilized BeautifulSoup for data scraping. Managed data API for dynamic ranking models.",
    skills: ["API Development", "Python", "BeautifulSoup", "Data Analysis"],
  },
];

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Home: React.FC = () => (
  <PageTransition className="h-full">
    <ScrollArea className="h-full">
      <main className="flex flex-col items-center py-12 space-y-20">
        <motion.section
          id="about"
          className="container max-w-5xl"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shrink-0 border-4 border-primary/80 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <img
                src="/PFP.JPEG"
                alt="Olaf Dsouza"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="flex-1 space-y-4 sm:space-y-5 text-center md:text-left">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                  Olaf Dsouza
                </h1>
                <p className="text-lg text-primary/80 font-medium">
                  Software Engineer & CS Student
                </p>
              </div>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                👋 Hi there! I'm a junior at the University of Michigan pursuing
                a Bachelor's in Computer Science with a strong passion for
                Operating Systems and Distributed Systems. Here's a quick
                snapshot of my journey so far:
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
                {[
                  "C++",
                  "React",
                  "TypeScript",
                  "Node.js",
                  "AWS",
                  "Systems Programming",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 justify-center md:justify-start pt-2">
                <Button variant="default" size="sm" className="group">
                  <DownloadIcon className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Resume
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        <ExperiencesCard experiences={experiences} />

        <ProjectsCard projects={projects} />

        <motion.section
          id="education"
          className="container pb-16 max-w-4xl"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Education
          </h2>

          <div className="space-y-6">
            {/* Masters Program */}
            <Card className="overflow-hidden border border-primary/10 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 max-w-2xl mx-auto group">
              <div className="relative overflow-hidden">
                <CardHeader className="space-y-1 p-6 pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        University of Michigan
                      </CardTitle>
                      <CardDescription className="text-base text-primary/80">
                        M.S. in Computer Science and Engineering
                      </CardDescription>
                    </div>
                    <span className="font-medium text-sm bg-primary/10 text-primary px-3 py-1 rounded-full self-start">
                      Aug 2025 - May 2026
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-2">
                  <div className="mt-2 text-muted-foreground">
                    <p className="mb-2 font-medium">Focus Areas:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Distributed Systems",
                        "Database Systems",
                        "Compilers",
                      ].map((course) => (
                        <span
                          key={course}
                          className="text-sm bg-primary/5 text-primary/90 px-3 py-1 rounded-full border border-primary/10 hover:bg-primary/10 transition-colors"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Bachelors Program */}
            <Card className="overflow-hidden border border-primary/10 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 max-w-2xl mx-auto group">
              <div className="relative overflow-hidden">
                <CardHeader className="space-y-1 p-6 pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        University of Michigan
                      </CardTitle>
                      <CardDescription className="text-base text-primary/80">
                        B.S. in Computer Science
                      </CardDescription>
                    </div>
                    <span className="font-medium text-sm bg-primary/10 text-primary px-3 py-1 rounded-full self-start">
                      Aug 2022 - May 2025
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-2">
                  <div className="mt-2 text-muted-foreground">
                    <p className="mb-2 font-medium">Relevant Coursework:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Advanced Operating Systems",
                        "Data Structures & Algorithms",
                        "Formal Verification of Distributed Systems",
                        "Distributed Systems",
                        "Database Systems",
                        "Software Engineering Principles",
                        "Computer Architecture",
                      ].map((course) => (
                        <span
                          key={course}
                          className="text-sm bg-primary/5 text-primary/90 px-3 py-1 rounded-full border border-primary/10 hover:bg-primary/10 transition-colors"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </motion.section>
      </main>
    </ScrollArea>
  </PageTransition>
);

export default React.memo(Home);
