import { FiX } from 'react-icons/fi';

function DetalhesQuemSomos({ onClose }) {
    return (
        <div>
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500 transition">
                <FiX size={24}/>
            </button>
            

            <h3 className="text-3xl font-bold mb-4 text-blue-900">
                Sistemas de informação
            </h3>

            <h4 className="text-3xl font-bold mb-4 text-gray-900">
                O que o curso oferece:
            </h4>

            <p className="text-white text-justify">
                O curso de Sistemas de Informação forma profissionais capazes de administrar o fluxo de informações geradas e distribuídas por redes de computadores dentro e fora das organizações. O profissional projeta, implementa e gerencia sistemas informatizados, garantindo que as necessidades de informação dos usuários sejam atendidas.
            </p>

            <h4 className="text-3xl font-bold mb-4 text-gray-900">
                Conhecimentos Adquiridos:
            </h4>
            <ul>
                <li>
                    Desenvolvimento de software e aplicações web
                </li>
                <li>
                    Gerenciamento de bancos de dados
                </li>
                <li>
                    Redes de computadores e segurança da informação
                </li>
                <li>
                    Análise de sistemas e requisitos
                </li>
                <li>
                    Gestão de projetos de TI
                </li>
                <li>
                    Inteligência de negócios e análise de dados
                </li>
                <li>
                    Governança de TI
                </li>
            </ul>
            <h4 className="text-3xl font-bold mb-4 text-gray-900">
                Mercado de trabalho
            </h4>
            <p className="text-white text-justify">
                O profissional de Sistemas de Informação pode atuar em empresas de desenvolvimento de software, departamentos de TI de organizações públicas e privadas, consultorias em tecnologia, startups, ou como empreendedor digital.
            </p>

            <button onClick={onClose} className="text-white bg-blue-900 border-2 border-black px-20 py-2 rounded-2xl hover:bg-gray-800 hover:text-white transition">
                Fechar
            </button>

        </div>
    )
};

export default DetalhesQuemSomos;