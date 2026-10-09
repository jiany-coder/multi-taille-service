import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import LocalPage from "@/pages/LocalPage";
import BlogIndex from "@/pages/BlogIndex";
import ArticlePage from "@/pages/ArticlePage";
import NotFound from "@/pages/NotFound";
import { SERVICES } from "@/data/services";
import { LOCAL_PAGES } from "@/data/localPages";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return null;
};

export function AppRoutes() {
  return (
    <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/conseils" element={<BlogIndex />} />
            <Route path="/conseils/:slug" element={<ArticlePage />} />
            {SERVICES.map((s) => (
              <Route key={s.slug} path={`/${s.slug}`} element={<ServicePage service={s} />} />
            ))}
            {LOCAL_PAGES.map((p) => (
              <Route key={p.slug} path={`/${p.slug}`} element={<LocalPage page={p} />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
    </Layout>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SmoothScroll />
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
