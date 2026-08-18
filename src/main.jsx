import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import "../assets/css/style.css";
import projectDetails from "./data/projects";
import { projects } from "./data/home";
import HomePage from "./pages/HomePage";
import HangshaPage from "./pages/HangshaPage";
import ProjectPage from "./pages/ProjectPage";

function App() {
  const [route, setRoute] = useState(() => window.location.hash);
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [route]);
  const slug = route.match(/^#\/projects\/([^/]+)$/)?.[1];
  const isFeaturedProject = projects.some((project) => project.slug === slug);

  if (slug === "campus-event-calendar" && isFeaturedProject) {
    return <HangshaPage />;
  }

  return slug && isFeaturedProject && projectDetails[slug] ? (
    <ProjectPage project={projectDetails[slug]} />
  ) : (
    <HomePage />
  );
}

createRoot(document.getElementById("root")).render(<App />);
