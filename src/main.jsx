import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import "../assets/css/style.css";
import "../assets/css/chronos.css";
import projectDetails from "./data/projects";
import { projects } from "./data/home";
import HomePage from "./pages/HomePage";
import ChronosPage from "./pages/ChronosPage";
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

  if (!slug || !isFeaturedProject || !projectDetails[slug]) {
    return <HomePage />;
  }

  if (slug === "turn-based-puzzle-game") {
    return <ChronosPage />;
  }

  return <ProjectPage project={projectDetails[slug]} />;
}

createRoot(document.getElementById("root")).render(<App />);
