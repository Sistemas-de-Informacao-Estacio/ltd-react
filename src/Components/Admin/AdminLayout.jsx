import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { isAdminLoggedIn, adminLogout, getAdminUser } from '../../lib/auth';
import { 
    FaHome, FaUsers, FaFileAlt, FaMobileAlt, FaNewspaper, FaSignOutAlt, 
    FaUser, FaArrowLeft, FaChartBar, FaBlog, FaAndroid, FaCode, FaBook,
    FaBars, FaTimes
} from 'react-icons/fa';

function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [adminUser, setAdminUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (!isAdminLoggedIn()) {
            navigate('/admin/login');
            return;
        }
        
        setAdminUser(getAdminUser());
        
        // Redirecionar para dashboard se estiver na rota base /admin
        if (location.pathname === '/admin' || location.pathname === '/admin/') {
            navigate('/admin/dashboard');
        }
    }, [navigate, location.pathname]);

    const handleLogout = () => {
        if (window.confirm('Tem certeza que deseja sair?')) {
            adminLogout();
            navigate('/admin/login');
        }
    };

    const menuItems = [
        {
            path: '/admin/dashboard',
            icon: FaChartBar,
            label: 'Dashboard',
            badge: null
        },
        {
            path: '/admin/team',
            icon: FaUsers,
            label: 'Equipe',
            badge: null
        },
        {
            path: '/admin/documents',
            icon: FaFileAlt,
            label: 'Documentos',
            badge: null
        },
        {
            path: '/admin/apps',
            icon: FaMobileAlt,
            label: 'Aplicativos',
            badge: null
        },
        {
            path: '/admin/android-apps',
            icon: FaAndroid,
            label: 'Apps Android',
            badge: 'Novo'
        },
        {
            path: '/admin/vscode-extensions',
            icon: FaCode,
            label: 'VS Code Extensions',
            badge: 'Novo'
        },
        {
            path: '/admin/documentacoes',
            icon: FaBook,
            label: 'Documentações',
            badge: 'Novo'
        },
        {
            path: '/admin/news',
            icon: FaNewspaper,
            label: 'Notícias',
            badge: null
        },
        {
            path: '/admin/blog',
            icon: FaBlog,
            label: 'Blog',
            badge: null
        }
    ];

    if (!isAdminLoggedIn()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex">
            {/* Sidebar com design moderno */}
            <div className={`bg-white shadow-2xl min-h-screen relative transition-all duration-300 ${
                sidebarOpen ? 'w-64' : 'w-20'
            }`}>
                {/* Header com gradiente */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    
                    <div className="relative z-10 p-6 border-b border-white border-opacity-20">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className={`text-xl font-bold text-white transition-all duration-300 ${
                                sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'
                            }`}>
                                Admin Panel
                            </h1>
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-all duration-300 hover:scale-110"
                            >
                                {sidebarOpen ? <FaTimes /> : <FaBars />}
                            </button>
                        </div>
                        
                        {adminUser && sidebarOpen && (
                            <div className="flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-3 animate-fade-in">
                                <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-white font-bold">
                                    {adminUser.full_name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{adminUser.full_name}</p>
                                    <p className="text-xs text-blue-100 truncate">{adminUser.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Botão Voltar para Home */}
                <div className="p-4 border-b border-gray-100">
                    <Link
                        to="/"
                        className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all rounded-xl group ${
                            !sidebarOpen && 'justify-center'
                        }`}
                        title="Voltar ao Site"
                    >
                        <FaArrowLeft className="group-hover:animate-pulse flex-shrink-0" />
                        <span className={`font-medium transition-all duration-300 ${
                            sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'
                        }`}>
                            Voltar ao Site
                        </span>
                    </Link>
                </div>
                
                {/* Menu Navigation com scroll */}
                <nav className="mt-2 px-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-xl transition-all duration-300 group relative ${
                                    isActive 
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                                } ${!sidebarOpen && 'justify-center'}`}
                                title={item.label}
                            >
                                <item.icon className={`flex-shrink-0 ${isActive && 'animate-bounce'}`} />
                                <span className={`font-medium flex-1 transition-all duration-300 ${
                                    sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'
                                }`}>
                                    {item.label}
                                </span>
                                {item.badge && sidebarOpen && (
                                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold animate-pulse">
                                        {item.badge}
                                    </span>
                                )}
                                {isActive && (
                                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>
                
                {/* Logout Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-50 to-transparent">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group hover:shadow-lg ${
                            !sidebarOpen && 'justify-center'
                        }`}
                        title="Sair"
                    >
                        <FaSignOutAlt className="group-hover:animate-pulse flex-shrink-0" />
                        <span className={`font-medium transition-all duration-300 ${
                            sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'
                        }`}>
                            Sair
                        </span>
                    </button>
                </div>
            </div>

            {/* Main Content com padding e animação */}
            <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto animate-fade-in">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;