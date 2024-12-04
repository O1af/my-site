import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import { unified } from "unified";
import yaml from "yaml";
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
    <div className="p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-lg mt-4">Collection of Thoughts</p>
      </header>

      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id}>
                <div className="relative h-[200px] w-full overflow-hidden">
                  {article.thumbnail && (
                    <img
                      src={`/${article.thumbnail}`}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>
                    {new Date(article.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{article.summary}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    to={`/blog/${article.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read More
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default React.memo(Blog);
