import { FiX } from 'react-icons/fi';

function DetalhesEngenharia({ onClose }) {
    return (
        <div>
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-500 transition">
                <FiX size={24} />
            </button>


            <h3 className="text-3xl font-bold mb-4 text-blue-900">
                Nossa Equipe
            </h3>

            <h4 className="text-3xl font-bold mb-4 text-gray-900">
                Composição da Equipe:
            </h4>

            <p className="text-white text-justify">
                O Laboratório de Tecnologia e Desenvolvimento (LTD) conta com uma equipe diversificada de estudantes em diferentes estágios de formação, desde calouros até veteranos próximos à formatura.
            </p>

            <h4 className="text-3xl font-bold mb-4 text-gray-900">
                Estrutura de trabalho:
            </h4>

            <p className="text-white text-justify">
                Os alunos mais experientes atuam como líderes técnicos e mentores dos iniciantes, criando um ambiente de aprendizado colaborativo. Essa dinâmica permite que os projetos sejam desenvolvidos com qualidade, ao mesmo tempo em que proporciona desenvolvimento profissional para todos os envolvidos.
            </p>

            <h4 className="text-3xl font-bold mb-4 text-gray-900">
                Áreas de atuação:
            </h4>

            <ul className="list-disc pl-6 text-white">
                <li>
                    Desenvolvimento Full Stack
                </li>
                <li>
                    Ciência de Dados e Análise
                </li>
                <li>
                    Segurança da Informação
                </li>
                <li>
                    Inteligência Artificial e Machine Learning
                </li>
                <li>
                    Automação de Processos
                </li>
                <li>
                    UX/UI Design
                </li>
                <li>
                    Gestão de Projetos de TI
                </li>
            </ul>
            <h4 className="text-3xl font-bold mb-4 text-gray-900">
                Supervisão:
            </h4>
            <p className="text-white text-justify">
                Todos os projetos são supervisionados por professores especialistas em suas respectivas áreas, garantindo a qualidade técnica e a aplicação correta dos conceitos teóricos.
            </p>

            <button onClick={onClose} className="text-white bg-blue-900 border-2 border-black px-20 py-2 rounded-2xl hover:bg-gray-800 hover:text-white transition">
                Fechar
            </button>

        </div>
    )
};

export default DetalhesEngenharia;