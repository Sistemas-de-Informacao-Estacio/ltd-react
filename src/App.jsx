import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ============================================
// LAYOUT COMPONENTS
// ============================================
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import CookieBanner from './Components/CookieBanner';
import InstallPWA from './Components/InstallPWA';

// ============================================
// PUBLIC PAGES
// ============================================
import Home from './Components/Home';
import About from './Components/About';
import WeAre from './Components/WeAre';
import Technologies from './Components/Technologies';
import Apps from './Components/Apps';
import CyberSec from './Components/CyberSec';
import Documents from './Components/Documents';
import News from './Components/News';
import Contact from './Components/Contact';
import Blog from './Components/Blog';
import AppsAndroid from './Components/AppsAndroid';
import VscodeExtensions from './Components/VscodeExtensions';

// ============================================
// ADMIN PAGES
// ============================================
import AdminLogin from './Components/Admin/AdminLogin';
import AdminLayout from './Components/Admin/AdminLayout';
import AdminDashboard from './Components/Admin/AdminDashboard';
import TeamManagement from './Components/Admin/TeamManagement';
import DocumentsManagement from './Components/Admin/DocumentsManagement';
import AppsManagement from './Components/Admin/AppsManagement';
import NewsManagement from './Components/Admin/NewsManagement';
import BlogManagement from './Components/Admin/BlogManagement';
import AndroidAppsManagement from './Components/Admin/AndroidAppsManagement';
import VscodeExtensionsManagement from './Components/Admin/VscodeExtensionsManagement';

// ============================================
// ROUTE CONFIGURATION
// ============================================

// Rota principal - Home
const homeRoute = { path: '/', element: <Home />, label: 'Home' };

// Rotas LTD - Informações sobre a empresa
const ltdRoutes = [
  { path: '/ltd/sobre', element: <About />, label: 'Sobre' },
  { path: '/ltd/quem-somos', element: <WeAre />, label: 'Quem Somos' },
  { path: '/ltd/contato', element: <Contact />, label: 'Contato' },
];

// Rotas de Produtos - Serviços e produtos oferecidos
const produtosRoutes = [
  { path: '/produtos/apps', element: <Apps />, label: 'Aplicativos' },
  { path: '/produtos/tecnologias', element: <Technologies />, label: 'Tecnologias' },
  { path: '/produtos/docs', element: <Documents />, label: 'Documentos' },
  { path: '/produtos/admin', element: <CyberSec />, label: 'Admin' },
  { path: '/produtos/apps-android', element: <AppsAndroid />, label: 'Apps Android' },
  { path: '/produtos/vscode-extensions', element: <VscodeExtensions />, label: 'Extensões VS Code' },
];

// Rotas Outros - Conteúdo adicional
const outrosRoutes = [
  { path: '/outros/noticias', element: <News />, label: 'Notícias' },
  { path: '/outros/blog', element: <Blog />, label: 'Blog' },
];

// Todas as rotas públicas combinadas
const publicRoutes = [
  homeRoute,
  ...ltdRoutes,
  ...produtosRoutes,
  ...outrosRoutes,
];

// Rotas de administração
const adminRoutes = [
  { path: 'dashboard', element: <AdminDashboard />, label: 'Dashboard' },
  { path: 'team', element: <TeamManagement />, label: 'Equipe' },
  { path: 'documents', element: <DocumentsManagement />, label: 'Documentos' },
  { path: 'apps', element: <AppsManagement />, label: 'Apps' },
  { path: 'android-apps', element: <AndroidAppsManagement />, label: 'Apps Android' },
  { path: 'vscode-extensions', element: <VscodeExtensionsManagement />, label: 'Extensões VS Code' },
  { path: 'news', element: <NewsManagement />, label: 'Notícias' },
  { path: 'blog', element: <BlogManagement />, label: 'Blog' },
];

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  return (
    <Router>
      <div className="App bg-gray-900 min-h-screen">
        <Routes>
          {/* ============================================
              ADMIN ROUTES
              Private routes for administration panel
              ============================================ */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            {adminRoutes.map((route) => (
              <Route 
                key={route.path} 
                path={route.path} 
                element={route.element} 
              />
            ))}
          </Route>

          {/* ============================================
              PUBLIC ROUTES
              Main website pages accessible to all users
              ============================================ */}
          <Route path="/*" element={
            <>
              <Nav />
              <main className="pt-20">
                <Routes>
                  {publicRoutes.map((route) => (
                    <Route 
                      key={route.path} 
                      path={route.path} 
                      element={route.element} 
                    />
                  ))}
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