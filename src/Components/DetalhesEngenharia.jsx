import { FiX } from 'react-icons/fi';

function DetalhesEngenharia({ onClose }) {
    return (
        <div>
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500 transition">
                <FiX size={24} />
            </button>


            <h3 className="text-3xl font-bold mb-4 text-blue-900">
                Engenharia de Software
            </h3>

            <h4 className="text-3xl font-bold mb-4 text-gray-900">
                O que o curso oferece:
            </h4>

            <p className="text-white text-justify">
                O curso de Engenharia de Software forma profissionais especializados no desenvolvimento de sistemas computacionais, com foco em métodos, técnicas e ferramentas para a criação de software de alta qualidade, confiável e eficiente.
            </p>

            <h4 className="text-3xl font-bold mb-4 text-gray-900">
                Conhecimentos Adquiridos:
            </h4>
            <ul className="list-disc pl-6 text-white">
                <li>
                    Arquitetura e design de software
                </li>
                <li>
                    Metodologias ágeis e tradicionais de desenvolvimento
                </li>
                <li>
                    Engenharia de requisitos
                </li>
                <li>
                    Qualidade e testes de software
                </li>
                <li>
                    DevOps e integração contínua
                </li>
                <li>
                    Padrões de projeto e refatoração
                </li>
                <li>
                    Gerenciamento de configuração e mudanças
                </li>
            </ul>
            <h4 className="text-3xl font-bold mb-4 text-gray-900">
                Mercado de trabalho
            </h4>
            <p className="text-white text-justify">
                O Engenheiro de Software pode atuar como desenvolvedor, arquiteto de software, analista de requisitos, testador, gerente de projetos de TI, ou especialista em qualidade de software, em empresas de diversos portes e setores.
            </p>

            <button onClick={onClose} className="text-white bg-blue-900 border-2 border-black px-20 py-2 rounded-2xl hover:bg-gray-800 hover:text-white transition">
                Fechar
            </button>

        </div>
    )
};

export default DetalhesEngenharia;