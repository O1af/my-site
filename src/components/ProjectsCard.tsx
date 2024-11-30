import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";

interface ProjectsProps {
  projects: Project[];
}

export const ProjectsCard: React.FC<ProjectsProps> = ({ projects }) => (
  <section id="projects" className="container">
    <h2 className="text-3xl font-bold mb-6">Projects</h2>
    <div
      className="grid gap-6 transition-all duration-300"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
      }}
    >
      {projects.map((project, index) => (
        <Card
          key={index}
          className="group hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          {project.image && (
            <div
              className="relative w-full overflow-hidden"
              style={{ height: "12rem" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-102"
              />
            </div>
          )}
          <CardHeader className="p-6">
            <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
            <CardDescription>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-secondary px-3 py-1 rounded-full transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">{project.description}</CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              variant="link"
              asChild
              className="transition-all duration-300 hover:translate-x-1"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project →
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </section>
);
