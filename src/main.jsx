import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'
import '../assets/css/style.css'
import projectDetails from './data/projects'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'

function App() {
  const [route, setRoute] = useState(() => window.location.hash)
  useEffect(() => { const onHashChange = () => setRoute(window.location.hash); window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange) }, [])
  const slug = route.match(/^#\/projects\/([^/]+)$/)?.[1]
  return slug && projectDetails[slug] ? <ProjectPage project={projectDetails[slug]} /> : <HomePage />
}

createRoot(document.getElementById('root')).render(<App />)
