import { FaCogs } from 'react-icons/fa';
import { useState } from 'react';
//motion está sendo utilizado, ignorar
import { motion, AnimatePresence } from 'framer-motion';
import DetalhesEngenharia from "../Components/DetalhesEngenharia";
import ButtonSaibaMais from "../Components/ButtonSaibaMais";

function QuadradoSistemas() {
    const [saibaMais, setSaibaMais] = useState(false);

    return (
        <div className="relative">
            <div className="bg-blue-200 rounded-2xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                <div className="bg-blue-300 w-80 h-30 flex items-center justify-center rounded-md mb-4">
                    <FaCogs className="text-blue-800 h-20 w-20 mb-4" />
                </div>

                <h3 className="text-xl text-blue-800 mb-2 font-bold animate-pulse" style={{ textShadow: '0 0 8px #3b82f6' }}>
                    Engenharia de Software
                </h3>

                <p className="text-sm text-black mb-2 text-justify font-semibold">
                    O curso de Engenharia de Software forma profissionais especializados no desenvolvimento de sistemas computacionais, com foco em métodos e técnicas para criação de software de alta qualidade.
                </p>

                <p className="text-sm text-black text-justify font-semibold">
                    Os alunos desenvolvem habilidades em arquitetura de software, metodologias ágeis, qualidade e testes.
                </p>

                <ButtonSaibaMais onClick={() => setSaibaMais(true)}/>
                
            </div>

            <AnimatePresence>
                {saibaMais && (
                    <>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-opacity-50 backdrop-blur-md z-40" />


                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="fixed top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 p-6 rounded-xl shadow-xl z-50 w-200 h-160 flex flex-col justify-between items-center max-sm:w-full max-sm:max-h-screen max-sm:overflow-y-auto max-sm:p-4">

                            <DetalhesEngenharia onClose={() => setSaibaMais(false)} />

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default QuadradoSistemas;

