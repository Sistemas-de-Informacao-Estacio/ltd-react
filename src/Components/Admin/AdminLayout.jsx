import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FaHome, FaUsers, FaFileAlt, FaMobileAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { supabase } from '../../lib/supabase';

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Verificar se o usuário está autenticado
        checkUser();
    }, []);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/admin/login';
    };

    const navigationItems = [
        { name: 'Dashboard', href: '/admin', icon: FaHome },
        { name: 'Membros da Equipe', href: '/admin/team', icon: FaUsers },
        { name: 'Documentos', href: '/admin/documents', icon: FaFileAlt },
        { name: 'Aplicativos', href: '/admin/apps', icon: FaMobileAlt },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gray-900 fixed lg:static inset-y-0 left-0 z-50`}>
                <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
                    <span className="text-white font-bold text-lg">Admin LTD</span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white hover:text-gray-300"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>
                
                <nav className="mt-8">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center px-6 py-3 text-sm font-medium ${
                                    isActive
                                        ? 'bg-gray-800 text-white border-r-4 border-blue-500'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                } transition-colors duration-200`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                
                <div className="absolute bottom-0 w-full">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-6 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    >
                        <FaSignOutAlt className="mr-3 h-5 w-5" />
                        Sair
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-0">
                {/* Top Bar */}
                <div className="bg-white shadow-sm border-b">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
                                >
                                    <FaBars size={20} />
                                </button>
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Painel Administrativo
                                </h1>
                            </div>
                            
                            {user && (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-500">
                                        Bem-vindo, {user.email}
                                    </span>
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}

export default AdminLayout;