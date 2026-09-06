import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import "../assets/css/style.css";
import "./pages/case-study.css";
import projectDetails from "./data/projects";
import HomePage from "./pages/HomePage";
import ChronosPage from "./pages/ChronosPage";
import HangshaPage from "./pages/HangshaPage";
import ProjectPage from "./pages/ProjectPage";
import LocationSharingPage from "./pages/LocationSharingPage";
import getHomeContent from "./locales/home";

function App() {
  const { t, i18n } = useTranslation("common");
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
  const isFeaturedProject = [
    "campus-event-calendar",
    "word-connection-game",
    "location-sharing-service",
    "turn-based-puzzle-game",
  ].includes(slug);
  const projectTitle = isFeaturedProject
    ? getHomeContent(i18n.resolvedLanguage).projects.find((project) => project.slug === slug)?.name
    : null;

  useEffect(() => {
    document.title = projectTitle
      ? t("document.projectTitle", { title: projectTitle })
      : t("document.homeTitle");
    document.querySelector('meta[name="description"]')?.setAttribute("content", t("document.description"));
  }, [projectTitle, route, t, i18n.resolvedLanguage]);

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
