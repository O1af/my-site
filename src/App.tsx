import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";
import { AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import Connections from "./pages/Connections";

// AnimatePresence wrapper component to get location from router
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/connections" element={<Connections />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => (
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Router>
      <Header />
      <main className="min-h-[calc(100vh-8rem)]">
        <AnimatedRoutes />
      </main>
      <Footer />
    </Router>
  </ThemeProvider>
);

export default React.memo(App);
