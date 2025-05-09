import { FaLaptop } from 'react-icons/fa';


function QuadradoQuemSomos() {
    return (
        <div className="bg-blue-200 rounded-2xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <div className="bg-blue-300 w-80 h-30 flex items-center justify-center rounded-md mb-4">
                <FaLaptop className="text-blue-800 h-20 w-20 mb-4" />
            </div>

            <h3 className="text-xl text-blue-800 mb-2 font-bold animate-pulse"  style={{ textShadow: '0 0 8px #3b82f6' }}>Sistemas de informação</h3>

            <p className="text-sm text-black mb-2 text-justify font-semibold">O curso de Sistemas de Informação forma profissionais capazes de administrar o fluxo de informações geradas e distribuídas por redes de computadores dentro e fora das organizações.
            </p>

            <p className="text-sm text-black text-justify font-semibold">Os alunos desenvolvem competências em programação, banco de dados, redes, análise de sistemas, gestão de TI e segurança da informação.
            </p>

            <button className="text-white bg-blue-500 border-2 border-blue-800 px-20 py-2 rounded-2xl hover:bg-blue-800 hover:text-white transition">Saiba mais</button>
        </div>
    );
}

export default QuadradoQuemSomos;

