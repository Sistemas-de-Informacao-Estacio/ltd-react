import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

function Nav() {
    const [menu, setMenu] = useState(false);
    const location = useLocation();

    const closeMenu = () => {
        setMenu(false);
    };

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Sobre', path: '/sobre' },
        { name: 'Quem Somos', path: '/quem-somos' },
        { name: 'Apps', path: '/apps' },
        { name: 'CyberSec', path: '/cybersec' },
        { name: 'Tecnologias', path: '/tecnologias' },
        { name: 'Docs', path: '/documentos' },
        { name: 'Contato', path: '/contato' },
        { name: 'Notícias', path: '/noticias' }
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="bg-gray-800 fixed top-0 left-0 w-full px-6 py-4 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <FontAwesomeIcon icon={faCity} className="text-2xl text-blue-400" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                        TechPrefeitura
                    </span>
                </Link>

                <button
                    className="md:hidden text-2xl text-white"
                    onClick={() => setMenu(!menu)}
                    aria-label="Toggle menu"
                >
                    {menu ? <FaRegTimesCircle /> : <IoMdMenu />}
                </button>

                <ul className={`
                    ${menu ? 'flex' : 'hidden'} md:flex
                    flex-col md:flex-row
                    absolute md:relative top-full md:top-auto left-0 md:left-auto
                    w-full md:w-auto
                    bg-gray-800 md:bg-transparent
                    border-t md:border-t-0 border-gray-700
                    p-4 md:p-0
                    gap-2 md:gap-6
                    transition-all duration-300
                `}>
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                onClick={closeMenu}
                                className={`
                                    block w-full md:w-auto text-left md:text-center
                                    px-4 py-2 rounded-lg
                                    transition-all duration-300
                                    hover:text-green-400 hover:bg-white/10
                                    relative
                                    ${isActive(item.path)
                                        ? 'text-green-400 bg-white/20 border-l-4 md:border-l-0 md:border-b-2 border-green-400' 
                                        : 'text-white border-l-4 md:border-l-0 border-transparent'
                                    }
                                `}
                            >
                                {item.name}
                                {isActive(item.path) && (
                                    <>
                                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-400 hidden md:block"></span>
                                        <span className="absolute -left-3 top-1/2 w-2 h-2 bg-green-400 rounded-full -translate-y-1/2 md:hidden"></span>
                                    </>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;