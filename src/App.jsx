import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import About from "./Components/About";
import Apps from "./Components/Apps";
import Contact from "./Components/Contact";
import Technologies from "./Components/Technologies";
import WeAre from "./Components/WeAre";
import CyberSec from "./Components/CyberSec";
import Noticias from "./Components/Noticias";
import Documents from "./Components/Documents";
import Footer from "./Components/Footer";
import CookieBanner from "./Components/CookieBanner";

// Admin Components
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import TeamManagement from "./Components/Admin/TeamManagement";
import DocumentsManagement from "./Components/Admin/DocumentsManagement";
import AppsManagement from "./Components/Admin/AppsManagement";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="documents" element={<DocumentsManagement />} />
            <Route path="apps" element={<AppsManagement />} />
          </Route>

          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Nav />
              <div className="flex-1 pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/quem-somos" element={<WeAre />} />
                  <Route path="/apps" element={<Apps />} />
                  <Route path="/cybersec" element={<CyberSec />} />
                  <Route path="/tecnologias" element={<Technologies />} />
                  <Route path="/contato" element={<Contact />} />
                  <Route path="/noticias" element={<Noticias />} />
                  <Route path="/documentos" element={<Documents />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </div>
              <Footer />
              <CookieBanner />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App