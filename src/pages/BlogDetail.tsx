// BlogDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { Button } from "@/components/ui/button";

const Image = ({ node, ...props }: any) => {
  let style: React.CSSProperties = {
    maxWidth: "100%",
    height: "auto",
    margin: "2rem auto",
    display: "block",
  };

  if (props.title) {
    try {
      const parsedStyles = JSON.parse(props.title);
      style = { ...style, ...parsedStyles };
    } catch (e) {
      console.warn("Invalid JSON in image title for styles:", props.title);
    }
  }

  return <img {...props} style={style} />;
};

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
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild>
        <Link to="/blog">← Back to Blog</Link>
      </Button>
      <div className="max-w-3xl mx-auto">
        <ReactMarkdown
          className="space-y-6"
          remarkPlugins={[remarkGfm, remarkFrontmatter]}
          components={{
            img: Image,
            h1: ({ ...props }) => (
              <h1
                className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2
                className="scroll-m-20 text-3xl font-semibold tracking-tight mt-10 mb-4"
                {...props}
              />
            ),
            h3: ({ ...props }) => (
              <h3
                className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4"
                {...props}
              />
            ),
            p: ({ ...props }) => <p className="leading-7 mb-4" {...props} />,
            ul: ({ ...props }) => (
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
            ),
            hr: ({ ...props }) => <hr className="my-8" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDetail;
