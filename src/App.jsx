import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import WeAre from './Components/WeAre';
import Apps from './Components/Apps';
import Documents from './Components/Documents';
import News from './Components/News';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

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
      <div className="App">
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
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/we-are" element={<WeAre />} />
                <Route path="/apps" element={<Apps />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/news" element={<News />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;