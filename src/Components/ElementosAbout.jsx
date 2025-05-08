import { ImDatabase } from "react-icons/im";
import { MdSecurity } from "react-icons/md";
import {FaCode} from "react-icons/fa";
import { AiOutlineRobot } from "react-icons/ai";


function ElementosAbout() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 ">
            <div className="flex-strart bg-white/10 border border-white/20 rounded-xl p-4 text-center  group-hover:opacity-100 group-hover:translate-x-1 hover:scale-105 transition-transform duration-300 shadow-lg">
            <ImDatabase className="text-2xl text-blue-400 mx-auto mb-4"/>
            <h4 className="text-base font-semibold text-white mb-2">Banco de Dados</h4>
            <p className="text-white text-xs max-w-xs"> Desenvolvimento e otimização de sisitemas de banco de dados

            </p>
            </div>

            <div className="flex-strart bg-white/10 border border-white/20 rounded-xl p-4 text-center  group-hover:opacity-100 group-hover:translate-x-1 hover:scale-105 transition-transform duration-300 shadow-lg">
            <MdSecurity className="text-2xl text-blue-400 mx-auto mb-4"/>
            <h4 className="text-base font-semibold text-white mb-2">Cybersegurança</h4>
            <p className="text-white text-xs max-w-xs"> Proteção de dados e sisitemas contra ameaças cibernéticas

            </p>
            </div>

            <div className="flex-strart bg-white/10 border border-white/20 rounded-xl p-4 text-center  group-hover:opacity-100 group-hover:translate-x-1 hover:scale-105 transition-transform duration-300 shadow-lg">
            <FaCode className="text-2xl text-blue-400 mx-auto mb-4"/>
            <h4 className="text-base font-semibold text-white mb-2">Programação</h4>
            <p className="text-white text-xs max-w-xs"> Desenvolvimento de software e aplicações web

            </p>
            </div>

            <div className="flex-strart bg-white/10 border border-white/20 rounded-xl p-4 text-center  group-hover:opacity-100 group-hover:translate-x-1 hover:scale-105 transition-transform duration-300 shadow-lg">
            <AiOutlineRobot className="text-2xl text-blue-400 mx-auto mb-4"/>
            <h4 className="text-base font-semibold text-white mb-2">Inteligência Artificial</h4>
            <p className="text-white text-xs max-w-xs"> Aplicações práticas de IA para o setor público

            </p>
            </div>

        </div>
    )
};

export default ElementosAbout;