import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Home from './Components/Home';
import WeAre from './Components/WeAre';
import Apps from './Components/Apps';
import Documents from './Components/Documents';
import News from './Components/News';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import About from './Components/About';
import Technologies from './Components/Technologies';
import CyberSec from './Components/CyberSec';
import CookieBanner from './Components/CookieBanner';
import InstallPWA from './Components/InstallPWA';

// Admin Components
import AdminLogin from './Components/Admin/AdminLogin';
import AdminLayout from './Components/Admin/AdminLayout';
import AdminDashboard from './Components/Admin/AdminDashboard';
import TeamManagement from './Components/Admin/TeamManagement';
import DocumentsManagement from './Components/Admin/DocumentsManagement';
import AppsManagement from './Components/Admin/AppsManagement';
import NewsManagement from './Components/Admin/NewsManagement';

function App() {
  return (
    <Router>
      <div className="App bg-gray-900 min-h-screen">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="documents" element={<DocumentsManagement />} />
            <Route path="apps" element={<AppsManagement />} />
            <Route path="news" element={<NewsManagement />} />
          </Route>

          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Nav />
              <main className="pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/quem-somos" element={<WeAre />} />
                  <Route path="/apps" element={<Apps />} />
                  <Route path="/tecnologias" element={<Technologies />} />
                  <Route path="/cybersec" element={<CyberSec />} />
                  <Route path="/documentos" element={<Documents />} />
                  <Route path="/noticias" element={<News />} />
                  <Route path="/contato" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <CookieBanner />
              <InstallPWA />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;