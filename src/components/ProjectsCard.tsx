import React, { useRef } from "react";
import { motion, useInView, Variants } from "motion/react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import { ExternalLink, ArrowUpRight } from "lucide-react";

interface ProjectsProps {
  projects: Project[];
}

// Enhanced animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: "spring", stiffness: 100 },
  },
};

export const ProjectsCard: React.FC<ProjectsProps> = React.memo(
  ({ projects }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
      <motion.section
        id="projects"
        className="container py-20"
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="space-y-3 text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col border border-primary/5 hover:border-primary/20 hover:shadow-xl transition-all duration-500 group">
                {/* Project image with gradient overlay */}
                <div className="relative aspect-video overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                      <div className="text-5xl opacity-30 group-hover:opacity-40 transition-opacity duration-300">
                        💻
                      </div>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                    {project.title}
                    <motion.span
                      className="text-primary/0 group-hover:text-primary/80"
                      initial={{ x: -5, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight size={18} />
                    </motion.span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 pt-2 grow">
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-primary/10 text-primary/90 hover:bg-primary/20 transition-colors font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex gap-2 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary hover:text-primary border-primary/30 hover:bg-primary/10 hover:border-primary group-hover:border-primary/50 transition-all duration-300"
                    asChild
                  >
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <ExternalLink size={16} />
                        <span>View Project</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground">Not Public</span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    );
  }
);

export default ProjectsCard;
