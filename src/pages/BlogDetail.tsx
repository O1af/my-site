import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const files = await import.meta.glob("../assets/blog/*.md", {
          as: "raw",
          eager: true,
        });

        const fileContent = files[`../assets/blog/${id}.md`];
        if (fileContent) {
          setContent(fileContent);
        } else {
          setContent("# Article not found");
        }
      } catch (error) {
        setContent("# Error loading article");
      }
    };

    loadArticle();
  }, [id]);

  return (
    <div className="p-8">
      <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default BlogDetail;
