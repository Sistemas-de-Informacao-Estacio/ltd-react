import { FaUsers } from 'react-icons/fa';
import { useState } from 'react';
//motion está sendo utilizado, ignorar
import { motion, AnimatePresence } from 'framer-motion';
import DetalhesEquipe from "../Components/DetalhesEquipe";


function QuadradoEquipe() {
    const [saibaMais, setSaibaMais] = useState(false);

    return (
        <div className="relative">
            <div className="bg-blue-200 rounded-2xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
                <div className="bg-blue-300 w-80 h-30 flex items-center justify-center rounded-md mb-4">
                    <FaUsers className="text-blue-800 h-20 w-20 mb-4" />
                </div>

                <h3 className="text-xl text-blue-800 mb-2 font-bold animate-pulse" style={{ textShadow: '0 0 8px #3b82f6' }}>
                    Nossa Equipe
                </h3>

                <p className="text-sm text-black mb-2 text-justify font-semibold">
                    O curso de Sistemas de Informação forma profissionais capazes de administrar o fluxo de informações geradas e distribuídas por redes de computadores dentro e fora das organizações.
                </p>

                <p className="text-sm text-black text-justify font-semibold">
                    Os alunos desenvolvem competências em programação, banco de dados, redes, análise de sistemas, gestão de TI e segurança da informação.
                </p>

                <button onClick={() => setSaibaMais(true)} className="text-white bg-blue-500 border-2 border-blue-800 px-20 py-2 rounded-2xl hover:bg-blue-800 hover:text-white transition">
                    Saiba mais
                </button>
            </div>

            <AnimatePresence>
                {saibaMais && (
                    <>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-opacity-50 backdrop-blur-md z-40" >
                        </motion.div>


                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="fixed top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 p-6 rounded-xl shadow-xl z-50 w-200 h-180 flex flex-col justify-between items-center max-sm:w-full max-sm:max-h-screen max-sm:overflow-y-auto max-sm:p-4">

                            <DetalhesEquipe onClose={() => setSaibaMais(false)} />

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default QuadradoEquipe;
