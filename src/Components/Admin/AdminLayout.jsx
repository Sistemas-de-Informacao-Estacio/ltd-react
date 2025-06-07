import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { isAdminLoggedIn, adminLogout, getAdminUser } from '../../lib/auth';
import { FaHome, FaUsers, FaFileAlt, FaMobileAlt, FaNewspaper, FaSignOutAlt, FaUser } from 'react-icons/fa';

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
    }, [navigate]);

    const handleLogout = () => {
        if (window.confirm('Tem certeza que deseja sair?')) {
            adminLogout();
            navigate('/admin/login');
        }
    };

    const menuItems = [
        {
            path: '/admin/dashboard',
            icon: FaHome,
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
            path: '/admin/news',
            icon: FaNewspaper,
            label: 'Notícias'
        }
    ];

    if (!isAdminLoggedIn()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="bg-white shadow-lg w-64 min-h-screen">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                    {adminUser && (
                        <div className="mt-2 flex items-center gap-2">
                            <FaUser className="text-gray-500 text-sm" />
                            <span className="text-sm text-gray-600">{adminUser.full_name}</span>
                        </div>
                    )}
                </div>
                
                <nav className="mt-6">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                                    isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
                                }`}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                
                <div className="absolute bottom-6 left-6 right-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <FaSignOutAlt />
                        <span>Sair</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;