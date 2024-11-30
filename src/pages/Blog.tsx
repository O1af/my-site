import React, { useEffect, useState } from "react";
import { Link } from "react-router";

interface ArticleMetadata {
  id: string;
  title: string;
}
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
              const firstLine = content.split("\n")[0];
              const id = path.split("/").pop()?.replace(".md", "") || "";
              //get rid of leading # and whitespace
              const title = firstLine?.replace(/^#\s*/, "");

              return {
                id,
                title: title || "Untitled",
              } as ArticleMetadata;
            } catch (error) {
              console.error(`Error processing ${path}:`, error);
              return null;
            }
          })
        );

        setArticles(
          loadedArticles.filter(
            (article): article is ArticleMetadata => article !== null
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

  if (error) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="mt-4 text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="mt-4">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-lg mt-4">Explore my thoughts and tutorials.</p>
      </header>

      <section>
        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="p-4 border rounded hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold">{article.title}</h2>
              <Link
                to={`/blog/${article.id}`}
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
