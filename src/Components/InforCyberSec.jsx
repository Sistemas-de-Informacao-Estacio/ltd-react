import { FaShieldAlt,  FaUserShield, FaLock, FaSearch, FaFire, FaGraduationCap } from "react-icons/fa";

function InforCyberSec() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 py-6">
            <div className="flex flex-col items-center bg-gray-800 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:bg-gray-800/60 hover:backdrop-blur-sm
            transition-transform duration-300 shadow-lg w-full sm:w-56 md:w-64">
                <FaShieldAlt className="text-2xl text-blue-400 mx-auto mb-4" />
                <h4 className="text-base font-semibold text-white mb-2">
                    Proteção contra Malware
                </h4>
                <p className="text-white text-base">
                    Sistemas de detecção e prevenção de software malicioso, com monitoramento em tempo real e resposta a incidentes.
                </p>
            </div>

            <div className="flex flex-col items-center bg-gray-800 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:bg-gray-800/60 hover:backdrop-blur-sm
            transition-transform duration-300 shadow-lg w-full sm:w-56 md:w-64">
                <FaUserShield className="text-2xl text-blue-400 mx-auto mb-4" />
                <h4 className="text-base font-semibold text-white mb-2">
                    Segurança de Acesso 
                </h4>
                <p className="text-white text-base">
                   Implementação de autenticação em múltiplos fatores e gerenciamento seguro de credenciais para os sistemas municipais.
                </p>
            </div>

             <div className="flex flex-col items-center bg-gray-800 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:bg-gray-800/60 hover:backdrop-blur-sm
            transition-transform duration-300 shadow-lg w-full sm:w-56 md:w-64">
                <FaLock className="text-2xl text-blue-400 mx-auto mb-4" />
                <h4 className="text-base font-semibold text-white mb-2">
                    Criptografia de Dados 
                </h4>
                <p className="text-white text-base">
                   Soluções para garantir a confidencialidade e integridade de dados sensíveis durante armazenamento e transmissão.
                </p>
            </div>

             <div className="flex flex-col items-center bg-gray-800 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:bg-gray-800/60 hover:backdrop-blur-sm
            transition-transform duration-300 shadow-lg w-full sm:w-56 md:w-64">
                <FaSearch className="text-2xl text-blue-400 mx-auto mb-4" />
                <h4 className="text-base font-semibold text-white mb-2">
                    Análise de Vulnerabilidades 
                </h4>
                <p className="text-white text-base">
                   Identificação proativa de falhas de segurança em sistemas, aplicativos e infraestrutura de TI.
                </p>
            </div>

            <div className="flex flex-col items-center bg-gray-800 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:bg-gray-800/60 hover:backdrop-blur-sm
            transition-transform duration-300 shadow-lg w-full sm:w-56 md:w-64">
                <FaFire className="text-2xl text-blue-400 mx-auto mb-4" />
                <h4 className="text-base font-semibold text-white mb-2">
                    Resposta a Incidentes
                </h4>
                <p className="text-white text-base">
                   Procedimentos e ferramentas para lidar rapidamente com violações de segurança e minimizar danos.
                </p>
            </div>

            <div className="flex flex-col items-center bg-gray-800 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:bg-gray-800/60 hover:backdrop-blur-sm
            transition-transform duration-300 shadow-lg w-full sm:w-56 md:w-64">
                <FaGraduationCap className="text-2xl text-blue-400 mx-auto mb-4" />
                <h4 className="text-base font-semibold text-white mb-2">
                    Conscientização e Treinamento 
                </h4>
                <p className="text-white text-base">
                   Programas educativos para servidores sobre ameaças digitais e práticas seguras de uso de tecnologia.
                </p>
            </div>

        </div>
    );
}

export default InforCyberSec;