import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import "../assets/css/style.css";
import "./pages/case-study.css";
import projectDetails from "./data/projects";
import { projects } from "./data/home";
import HomePage from "./pages/HomePage";
import ChronosPage from "./pages/ChronosPage";
import HangshaPage from "./pages/HangshaPage";
import ProjectPage from "./pages/ProjectPage";
import LocationSharingPage from "./pages/LocationSharingPage";

function App() {
  const [route, setRoute] = useState(() => window.location.hash);
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  useEffect(() => {
    if (!route || route.startsWith("#/")) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const sectionId = decodeURIComponent(route.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [route]);
  const slug = route.match(/^#\/projects\/([^/]+)$/)?.[1];
  const isFeaturedProject = projects.some((project) => project.slug === slug);
  const projectTitle = isFeaturedProject ? projectDetails[slug]?.title : null;

  useEffect(() => {
    document.title = projectTitle
      ? `${projectTitle} | 이승현 포트폴리오`
      : "이승현 | Product Engineer";
  }, [projectTitle]);

  if (slug === "campus-event-calendar" && isFeaturedProject) {
    return <HangshaPage />;
  }

  if (!slug || !isFeaturedProject || !projectDetails[slug]) {
    return <HomePage />;
  }

  if (slug === "location-sharing-service") return <LocationSharingPage />;
  if (slug === "turn-based-puzzle-game") return <ChronosPage />;
  return <ProjectPage project={projectDetails[slug]} />;
}

createRoot(document.getElementById("root")).render(<App />);
