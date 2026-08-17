import { FileText, Globe2, Play } from "lucide-react";
import githubIcon from "../../assets/icons/github.svg";

export default function ProjectLinkIcon({ url }) {
  if (url.includes("github.com")) {
    return <img className="project-link-icon" src={githubIcon} alt="" />;
  }

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return <Play className="project-link-icon" aria-hidden="true" />;
  }

  if (url.includes("/wiki/")) {
    return <FileText className="project-link-icon" aria-hidden="true" />;
  }

  return <Globe2 className="project-link-icon" aria-hidden="true" />;
}
