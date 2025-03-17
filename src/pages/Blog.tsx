import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import { unified } from "unified";
import yaml from "yaml";
import { PageTransition } from "@/components/utils/PageTransition";
import { AnimatedHeading } from "@/components/utils/AnimatedHeading";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

interface ArticleMetadata {
  id: string;
  title: string;
  date: Date;
  summary: string;
  thumbnail?: string;
}
const parseDateLocal = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        const files = import.meta.glob<string>("../assets/blog/*.md", {
          as: "raw",
          eager: false,
        });

        const loadedArticles = await Promise.all(
          Object.entries(files).map(async ([path, loader]) => {
            try {
              const content = await loader();
              const id = path.split("/").pop()?.replace(".md", "") || "";

              const processor = unified()
                .use(remarkParse)
                .use(remarkFrontmatter, ["yaml"]);

              const parsed = processor.parse(content);
              const frontmatter = parsed.children.find(
                (child) => child.type === "yaml"
              );

              let metadata: Partial<ArticleMetadata> = {
                id: "",
                title: "",
                date: new Date(),
                summary: "",
              };
              if (frontmatter && frontmatter.type === "yaml") {
                const parsedFrontmatter = yaml.parse(frontmatter.value);
                metadata = {
                  ...metadata,
                  ...parsedFrontmatter,
                  date: parsedFrontmatter.date
                    ? parseDateLocal(parsedFrontmatter.date)
                    : new Date(),
                };
              }

              return {
                id,
                title: metadata.title || "Untitled",
                date: metadata.date || new Date(),
                summary: metadata.summary || "No summary available",
                thumbnail: metadata.thumbnail || undefined,
              } as ArticleMetadata;
            } catch (error) {
              console.error(`Error processing ${path}:`, error);
              return null;
            }
          })
        );

        setArticles(
          loadedArticles
            .filter((article): article is ArticleMetadata => article !== null)
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load articles"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <PageTransition className="container mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <AnimatedHeading level={1} gradient={true}>
          Blog
        </AnimatedHeading>
        <motion.p
          className="text-xl mt-4 text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Sharing thoughts, ideas, and discoveries
        </motion.p>
      </header>

      {error && (
        <motion.p className="text-red-500 text-center p-4 mb-8 bg-red-50 rounded-lg">
          {error}
        </motion.p>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <section>
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {articles.map((article) => (
              <motion.div key={article.id} variants={item}>
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <div className="relative h-[220px] w-full overflow-hidden bg-muted">
                    <img
                      src={`/${article.thumbnail}`}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold hover:text-primary transition-colors duration-200">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="font-medium">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grow">
                    <p className="text-muted-foreground">{article.summary}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link
                      to={`/blog/${article.id}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Read More
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </motion.svg>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}
    </PageTransition>
  );
};

export default React.memo(Blog);
