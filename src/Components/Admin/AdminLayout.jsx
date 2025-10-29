import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { isAdminLoggedIn, adminLogout, getAdminUser } from '../../lib/auth';
import { FaHome, FaUsers, FaFileAlt, FaMobileAlt, FaNewspaper, FaSignOutAlt, FaUser, FaArrowLeft, FaChartBar, FaBlog, FaAndroid, FaCode } from 'react-icons/fa';

function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [adminUser, setAdminUser] = useState(null);

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
            label: 'Dashboard'
        },
        {
            path: '/admin/team',
            icon: FaUsers,
            label: 'Equipe'
        },
        {
            path: '/admin/documents',
            icon: FaFileAlt,
            label: 'Documentos'
        },
        {
            path: '/admin/apps',
            icon: FaMobileAlt,
            label: 'Aplicativos'
        },
        {
            path: '/admin/android-apps',
            icon: FaAndroid,
            label: 'Apps Android'
        },
        {
            path: '/admin/vscode-extensions',
            icon: FaCode,
            label: 'Extensões VS Code'
        },
        {
            path: '/admin/news',
            icon: FaNewspaper,
            label: 'Notícias'
        },
        {
            path: '/admin/blog',
            icon: FaBlog,
            label: 'Blog'
        }
    ];

    if (!isAdminLoggedIn()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="bg-white shadow-lg w-64 min-h-screen relative">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
                    <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                    {adminUser && (
                        <div className="mt-2 flex items-center gap-2">
                            <FaUser className="text-blue-100 text-sm" />
                            <span className="text-sm text-blue-100">{adminUser.full_name}</span>
                        </div>
                    )}
                </div>
                
                {/* Botão Voltar para Home */}
                <div className="p-4 border-b border-gray-200">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg group"
                    >
                        <FaArrowLeft className="group-hover:animate-pulse" />
                        <span className="font-medium">Voltar ao Site</span>
                    </Link>
                </div>
                
                {/* Menu Navigation */}
                <nav className="mt-6">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                                    isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 bg-gradient-to-r from-blue-50 to-blue-100' : ''
                                }`}
                            >
                                <item.icon className={isActive ? 'text-blue-600' : ''} />
                                <span className={`font-medium ${isActive ? 'text-blue-600' : ''}`}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                
                {/* Logout Button */}
                <div className="absolute bottom-6 left-6 right-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                    >
                        <FaSignOutAlt className="group-hover:animate-pulse" />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-50">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;