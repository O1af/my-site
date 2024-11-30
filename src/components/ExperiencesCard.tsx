import React from "react";
import { Experience } from "@/types/experience";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ExperiencesProps {
  experiences: Experience[];
}

export const ExperiencesCard: React.FC<ExperiencesProps> = React.memo(
  ({ experiences }) => (
    <section id="experience" className="container">
      <h2 className="text-3xl font-bold mb-6">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={index}>
            <div className="flex flex-col md:flex-row">
              {exp.image && (
                <div className="relative h-48 md:w-48 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex-1">
                <CardHeader>
                  <CardTitle>{exp.title}</CardTitle>
                  <CardDescription>
                    {exp.company} • {exp.period}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{exp.description}</p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
);
