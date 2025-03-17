// BlogDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react"; // Fixed import
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/utils/PageTransition";
import ScrollProgress from "@/components/utils/ScrollProgress";

const Image = ({ node, ...props }: any) => {
  let style: React.CSSProperties = {
    maxWidth: "100%",
    height: "auto",
    margin: "2rem auto",
    display: "block",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  };

  if (props.title) {
    try {
      const parsedStyles = JSON.parse(props.title);
      style = { ...style, ...parsedStyles };
    } catch (e) {
      console.warn("Invalid JSON in image title for styles:", props.title);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img {...props} style={style} />
    </motion.div>
  );
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setIsLoading(true);
        const files = import.meta.glob("../assets/blog/*.md", {
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
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  const components = {
    img: Image,
    h1: (props: any) => (
      <motion.h1
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent"
        {...props}
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      />
    ),
    h2: (props: any) => (
      <motion.h2
        className="scroll-m-20 text-3xl font-semibold tracking-tight mt-12 mb-6 border-b pb-2"
        {...props}
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      />
    ),
    h3: (props: any) => (
      <motion.h3
        className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-5"
        {...props}
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      />
    ),
    p: (props: any) => (
      <motion.p
        className="leading-7 mb-6 not-first:mt-6"
        {...props}
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      />
    ),
    ul: (props: any) => (
      <motion.ul
        className="my-6 ml-6 list-disc [&>li]:mt-3"
        {...props}
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      />
    ),
    ol: (props: any) => (
      <motion.ol
        className="my-6 ml-6 list-decimal [&>li]:mt-3"
        {...props}
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      />
    ),
    hr: (props: any) => (
      <motion.hr
        className="my-10 border-muted-foreground/20"
        {...props}
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      />
    ),
    blockquote: (props: any) => (
      <motion.blockquote
        className="mt-6 border-l-4 border-primary/50 pl-6 italic text-muted-foreground"
        {...props}
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      />
    ),
    code: (props: any) => (
      <motion.code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
        {...props}
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      />
    ),
  };

  return (
    <PageTransition className="container mx-auto px-4 py-12">
      <ScrollProgress />
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button variant="ghost" asChild className="flex items-center group">
          <Link to="/blog">
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
              className="mr-2 group-hover:-translate-x-1 transition-transform duration-200"
            >
              <polyline points="15 18 9 12 15 6" />
            </motion.svg>
            Back to Blog
          </Link>
        </Button>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ReactMarkdown
              className="prose prose-lg dark:prose-invert max-w-none"
              remarkPlugins={[remarkGfm, remarkFrontmatter]}
              components={components}
            >
              {content}
            </ReactMarkdown>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default BlogDetail;
