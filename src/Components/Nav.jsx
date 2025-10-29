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
        { 
            name: 'LTD', 
            path: null, 
            submenu: [
                { name: 'Sobre', path: '/ltd/sobre' },
                { name: 'Quem Somos', path: '/ltd/quem-somos' },
                { name: 'Eventos', path: '/ltd/eventos' },
                { name: 'Contato', path: '/ltd/contato' }
            ]
        },
        { 
            name: 'Produtos', 
            path: null, 
            submenu: [
                { name: 'Apps', path: '/produtos/apps' },
                { name: 'Tecnologias', path: '/produtos/tecnologias' },
                { name: 'Docs', path: '/produtos/docs' },
                { name: 'Admin', path: '/produtos/admin' },
                { name: 'Apps Android', path: '/produtos/apps-android' },
                { name: 'Extensões VS Code', path: '/produtos/vscode-extensions' }
            ]
        },
        { 
            name: 'Outros', 
            path: null, 
            submenu: [
                { name: 'Notícias', path: '/outros/noticias' },
                { name: 'Blog', path: '/outros/blog' },
                { name: 'Documentações', path: '/outros/documentacoes' }
            ]
        },
        { name: 'Admin', path: '/admin' }
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
                    <div className="relative">
                        <img 
                            src="/estacio.jpeg" 
                            alt="Estácio Logo" 
                            className="w-10 h-10 rounded-lg object-cover border-2 border-blue-400 shadow-lg"
                            onError={(e) => {
                                // Fallback caso a imagem não carregue
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-lg hidden">
                            LTD
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                            TechPrefeitura
                        </span>
                        <span className="text-xs text-gray-400 -mt-1">
                            Estácio • LTD
                        </span>
                    </div>
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
                    {menuItems.map((item, index) => (
                        <li key={index} className="relative group">
                            {item.submenu ? (
                                // Item com submenu (dropdown)
                                <div>
                                    <button
                                        className={`
                                            block w-full md:w-auto text-left md:text-center
                                            px-4 py-2 rounded-lg
                                            transition-all duration-300
                                            hover:text-green-400 hover:bg-white/10
                                            text-white
                                            flex items-center gap-2
                                        `}
                                    >
                                        {item.name}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {/* Submenu */}
                                    <ul className="
                                        md:absolute md:top-full md:left-0 
                                        md:bg-gray-900 md:rounded-lg md:shadow-xl
                                        md:min-w-[200px] md:py-2
                                        md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible
                                        md:transition-all md:duration-300
                                        ml-4 md:ml-0 mt-2 md:mt-0
                                        flex flex-col gap-1
                                    ">
                                        {item.submenu.map((subItem, subIndex) => (
                                            <li key={subIndex}>
                                                <Link
                                                    to={subItem.path}
                                                    onClick={closeMenu}
                                                    className={`
                                                        block px-4 py-2 rounded-lg
                                                        transition-all duration-300
                                                        hover:text-green-400 hover:bg-white/10
                                                        ${isActive(subItem.path)
                                                            ? 'text-green-400 bg-white/20' 
                                                            : 'text-gray-300'
                                                        }
                                                    `}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                // Item normal (sem submenu)
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
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Nav;