import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import Home from "../Components/Home";
import About from "../Components/About";
import Apps from "../Components/Apps";
import Contact from "../Components/Contact";
import Technologies from "../Components/Technologies";
import WeAre from "../Components/WeAre";
import CyberSec from "../Components/CyberSec";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

function Nav() {
    const [click, setClick] = useState('Home');
    const [menu, setMenu] = useState(false);

    const handleChange = (page) => {
        setClick(page);
        setMenu(false);
    };

    const render = () => {
        switch (click) {
            case 'Home':
                return <Home />;
            case 'Sobre':
                return <About />;
            case 'Apps':
                return <Apps />;
            case 'Contato':
                return <Contact />;
            case 'Tecnologias':
                return <Technologies />;
            case 'Quem Somos':
                return <WeAre />;
            case 'CyberSec':
                return <CyberSec />;

        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start pt-20">
            <nav className="bg-gray-800 fixed top-0 left-0 w-full px-6 py-4 z-50 shadow-md flex flex-col items-center">
                <div className="flex items-center gap-4 mb-4 animate-pulse">
                    <FontAwesomeIcon icon={faCity} style={{ fontSize: '30px' }} className="text-white mr-2 p-4 pl-5" />
                    <span className="text-[30px] font-bold  bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">TechPrefeitura</span>
                </div>
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setMenu(!menu)}
                    aria-label="Toggle menu">
                    {menu ? <FaRegTimesCircle /> : <IoMdMenu />}

                </button>

                <ul className={`
                      flex flex-col md:flex-row md:items-center md:gap-6
                      text-lg mt-4 md:mt-2 transition-all duration-300
                      ${menu ? 'block' : 'hidden'} md:flex
                `}>
                    {['Home', 'Sobre', 'Quem Somos', 'Apps', 'CyberSec', 'Tecnologias', 'Contato'].map((page) => (
                        <li key={page} onClick={() => handleChange(page)} className="group relative px-4 py-2 cursor-pointer transition-all duration-300 hover:text-green-400 hover:bg-white/20  hover:rounded-lg group-hover:translate-x-1">
                            <span className="relative">

                                {page}

                                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"></span>
                                <span className="absolute -left-3 top-1/2 w-2 h-2 bg-green-400 rounded-full opacity-0 -translate-y-1/2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"></span>
                            </span>

                        </li>
                    ))}


                </ul>
                <div>

                </div>

            </nav>
            <div className="mt-50">{render()}</div>
        </div>
    );
};

export default Nav;