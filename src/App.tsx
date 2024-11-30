import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const App: React.FC = () => (
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  </ThemeProvider>
);

export default App;
