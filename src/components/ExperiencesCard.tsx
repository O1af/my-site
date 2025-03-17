import React, { useRef } from "react";
import { motion, useInView, Variants } from "motion/react";
import { Experience } from "@/types/experience";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseIcon, CalendarIcon } from "lucide-react";

interface ExperiencesProps {
  experiences: Experience[];
}

// Enhanced animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export const ExperiencesCard: React.FC<ExperiencesProps> = React.memo(
  ({ experiences }) => {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    return (
      <motion.section
        id="experience"
        ref={containerRef}
        className="py-16 sm:py-20 relative container max-w-4xl"
      >
        {/* Section header */}
        <motion.div
          className="space-y-3 text-center mb-12"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            My professional journey and roles that have shaped my career path
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Center timeline line */}
          <div className="absolute left-1/2 top-0 -ml-[1px] h-full w-[1px] bg-gradient-to-b from-primary/80 via-primary/30 to-primary/10 md:block hidden" />

          {/* Experiences */}
          <div className="space-y-12 relative">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="md:grid md:grid-cols-5 md:gap-8 relative group"
                custom={index}
                variants={timelineItemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {/* Company info */}
                <div className="md:col-span-2 space-y-2 md:text-right mb-4 md:mb-0">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                    {experience.company}
                  </h3>
                  <p className="text-primary text-sm font-medium flex items-center md:justify-end gap-2">
                    {experience.title.replace(/^[🎥📚💻⚙️]+\s/, "")}
                    {experience.title.match(/^[🎥📚💻⚙️]+/) && (
                      <span className="text-xl order-first md:order-last">
                        {experience.title.match(/^[🎥📚💻⚙️]+/)}
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-1.5 md:justify-end text-muted-foreground">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <p className="text-xs font-medium">{experience.period}</p>
                  </div>
                </div>

                {/* Center icon marker */}
                <div className="hidden md:flex md:items-center md:justify-center relative z-10">
                  <motion.div
                    className="h-10 w-10 rounded-full border-2 border-primary/40 bg-background flex items-center justify-center shadow-md group-hover:shadow-primary/20 group-hover:border-primary transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <BriefcaseIcon className="h-5 w-5 text-primary" />
                  </motion.div>
                </div>

                {/* Experience details */}
                <div className="md:col-span-2">
                  <Card className="overflow-hidden border border-primary/10 bg-gradient-to-br from-card to-card/95 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group-hover:border-primary/30">
                    <CardContent className="p-5 text-sm">
                      <p className="mb-4 text-muted-foreground leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Skills badges */}
                      {experience.skills && experience.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {experience.skills.map((skill, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-primary/10 text-primary/90 hover:bg-primary/20 transition-colors text-xs py-0.5 font-medium"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}

            {/* Enhanced end marker */}
            {experiences.length > 0 && (
              <div className="hidden md:flex justify-center relative z-10">
                <motion.div
                  className="w-3 h-3 rounded-full bg-primary/70 shadow-sm shadow-primary/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </motion.section>
    );
  }
);

export default ExperiencesCard;
