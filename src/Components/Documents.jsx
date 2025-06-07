// import { useState } from 'react';
// import { FaDownload, FaFilePdf, FaShieldAlt, FaBrain, FaChartBar, FaEye, FaCalendarAlt, FaFileAlt, FaSearch, FaCog } from 'react-icons/fa';

// function Documents() {
//     const [selectedCategory, setSelectedCategory] = useState('all');
//     const [searchTerm, setSearchTerm] = useState('');

//     const documents = [
//         {
//             id: 1,
//             title: "Checklist Mensal de Segurança da Informação",
//             description: "Guia completo com verificações mensais essenciais para manter a segurança da informação em organizações. Inclui auditoria de sistemas, verificação de backups, análise de logs e validação de políticas de segurança.",
//             category: "cybersecurity",
//             type: "Checklist",
//             pages: "12 páginas",
//             size: "2.3 MB",
//             lastUpdate: "2025-05-15",
//             tags: ["auditoria", "compliance", "ISO 27001", "LGPD"],
//             url: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/blob/main/docs/checklist_mensal_de_seguranca_da_informacao.pdf",
//             downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/raw/main/docs/checklist_mensal_de_seguranca_da_informacao.pdf"
//         },
//         {
//             id: 2,
//             title: "Manual Completo Google Dorks para Cibersegurança",
//             description: "Manual técnico abrangente sobre Google Dorks aplicado à cibersegurança. Inclui técnicas avançadas de OSINT, reconhecimento passivo, identificação de vulnerabilidades e metodologias de ethical hacking através de pesquisas especializadas.",
//             category: "cybersecurity",
//             type: "Manual Técnico",
//             pages: "45 páginas",
//             size: "5.8 MB",
//             lastUpdate: "2025-05-10",
//             tags: ["OSINT", "reconhecimento", "ethical hacking", "penetration testing"],
//             url: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/blob/main/docs/manual_completo_google_dorks_ciberseguranca.pdf",
//             downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/raw/main/docs/manual_completo_google_dorks_ciberseguranca.pdf"
//         },
//         {
//             id: 3,
//             title: "Manual de Segurança Cibernética",
//             description: "Guia fundamental sobre segurança cibernética cobrindo desde conceitos básicos até implementações avançadas. Aborda gestão de riscos, arquitetura de segurança, resposta a incidentes e conformidade regulatória.",
//             category: "cybersecurity",
//             type: "Manual",
//             pages: "78 páginas",
//             size: "8.2 MB",
//             lastUpdate: "2025-05-08",
//             tags: ["fundamentos", "gestão de riscos", "incidentes", "compliance"],
//             url: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/blob/main/docs/manual_de_seguranca_cibernetica.pdf",
//             downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/raw/main/docs/manual_de_seguranca_cibernetica.pdf"
//         },
//         {
//             id: 4,
//             title: "Resumo Prático das ISOs",
//             description: "Síntese executiva das principais normas ISO relacionadas à segurança da informação. Foco nas ISO 27001, 27002, 27005 e 31000, com implementação prática e exemplos de aplicação no setor público.",
//             category: "cybersecurity",
//             type: "Resumo Executivo",
//             pages: "24 páginas",
//             size: "3.1 MB",
//             lastUpdate: "2025-05-05",
//             tags: ["ISO 27001", "ISO 27002", "normas", "implementação"],
//             url: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/blob/main/docs/resumo_pratico_das_isos.pdf",
//             downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/raw/main/docs/resumo_pratico_das_isos.pdf"
//         },
//         {
//             id: 5,
//             title: "Curso Completo ChatGPT",
//             description: "Curso estruturado para dominar o ChatGPT e outras IAs generativas. Inclui técnicas de prompt engineering, casos de uso específicos para o setor público, automação de tarefas e integração com workflows existentes.",
//             category: "ai",
//             type: "Curso",
//             pages: "67 páginas",
//             size: "12.4 MB",
//             lastUpdate: "2025-05-12",
//             tags: ["ChatGPT", "prompt engineering", "automação", "produtividade"],
//             url: "https://github.com/LTD-2025-1-Cyber-Security-Project/inteligencia-artificial/blob/main/docs/curso/curso-chatgpt.pdf",
//             downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/inteligencia-artificial/raw/main/docs/curso/curso-chatgpt.pdf"
//         },
//         {
//             id: 6,
//             title: "Guia Prático de Inteligência Artificial",
//             description: "Manual prático para implementação de soluções de IA no setor público. Cobre desde conceitos fundamentais até implementações específicas, incluindo machine learning, processamento de linguagem natural e visão computacional.",
//             category: "ai",
//             type: "Guia Prático",
//             pages: "89 páginas",
//             size: "15.7 MB",
//             lastUpdate: "2025-05-07",
//             tags: ["machine learning", "NLP", "computer vision", "implementação"],
//             url: "https://github.com/LTD-2025-1-Cyber-Security-Project/inteligencia-artificial/blob/main/docs/manual/guia-pratico-ia.pdf",
//             downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/inteligencia-artificial/raw/main/docs/manual/guia-pratico-ia.pdf"
//         },
//         {
//             id: 7,
//             title: "Guia de Tratamento de Dados",
//             description: "Manual técnico para tratamento e análise de dados em conformidade com a LGPD. Inclui técnicas de limpeza, transformação, análise estatística e visualização de dados, com foco em dados governamentais e transparência pública.",
//             category: "data",
//             type: "Guia Técnico",
//             pages: "56 páginas",
//             size: "9.3 MB",
//             lastUpdate: "2025-05-03",
//             tags: ["LGPD", "análise estatística", "visualização", "transparência"],
//             url: "https://github.com/LTD-2025-1-Cyber-Security-Project/analise-de-dados/blob/main/docs/tratamento_dados/guia_tratamento_de_dados.pdf",
//             downloadUrl: "https://github.com/LTD-2025-1-Cyber-Security-Project/analise-de-dados/raw/main/docs/tratamento_dados/guia_tratamento_de_dados.pdf"
//         }
//     ];

//     const categories = [
//         { 
//             id: 'all', 
//             name: 'Todos os Documentos', 
//             icon: FaFileAlt, 
//             count: documents.length, 
//             color: 'blue',
//             bgClass: 'bg-blue-600',
//             textClass: 'text-blue-400'
//         },
//         { 
//             id: 'cybersecurity', 
//             name: 'Cibersegurança', 
//             icon: FaShieldAlt, 
//             count: documents.filter(doc => doc.category === 'cybersecurity').length, 
//             color: 'red',
//             bgClass: 'bg-red-600',
//             textClass: 'text-red-400'
//         },
//         { 
//             id: 'ai', 
//             name: 'Inteligência Artificial', 
//             icon: FaBrain, 
//             count: documents.filter(doc => doc.category === 'ai').length, 
//             color: 'purple',
//             bgClass: 'bg-purple-600',
//             textClass: 'text-purple-400'
//         },
//         { 
//             id: 'data', 
//             name: 'Análise de Dados', 
//             icon: FaChartBar, 
//             count: documents.filter(doc => doc.category === 'data').length, 
//             color: 'green',
//             bgClass: 'bg-green-600',
//             textClass: 'text-green-400'
//         }
//     ];

//     const filteredDocuments = documents.filter(doc => {
//         const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
//         const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                             doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
//         return matchesCategory && matchesSearch;
//     });

//     const handleDownload = (doc) => {
//         const link = document.createElement('a');
//         link.href = doc.downloadUrl;
//         link.setAttribute('download', '');
//         link.setAttribute('target', '_blank');
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('pt-BR');
//     };

//     const getCategoryInfo = (category) => {
//         const categoryMap = {
//             cybersecurity: {
//                 iconColor: 'text-red-400',
//                 bgColor: 'bg-red-600/20',
//                 textColor: 'text-red-300',
//                 buttonBg: 'bg-red-600',
//                 buttonHover: 'hover:bg-red-700'
//             },
//             ai: {
//                 iconColor: 'text-purple-400',
//                 bgColor: 'bg-purple-600/20',
//                 textColor: 'text-purple-300',
//                 buttonBg: 'bg-purple-600',
//                 buttonHover: 'hover:bg-purple-700'
//             },
//             data: {
//                 iconColor: 'text-green-400',
//                 bgColor: 'bg-green-600/20',
//                 textColor: 'text-green-300',
//                 buttonBg: 'bg-green-600',
//                 buttonHover: 'hover:bg-green-700'
//             }
//         };
//         return categoryMap[category] || {
//             iconColor: 'text-blue-400',
//             bgColor: 'bg-blue-600/20',
//             textColor: 'text-blue-300',
//             buttonBg: 'bg-blue-600',
//             buttonHover: 'hover:bg-blue-700'
//         };
//     };

//     return (
//         <div className="min-h-screen bg-gray-900 text-white py-16 px-6">
//             <div className="max-w-7xl mx-auto">
//                 <div className="text-center mb-12">
//                     <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-4">
//                         📚 Biblioteca de Documentos Técnicos
//                     </h1>
//                     <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//                         Acesse nossa coleção completa de manuais, guias e documentos técnicos desenvolvidos pelo 
//                         Laboratório de Transformação Digital para modernização do setor público
//                     </p>
//                 </div>

//                 <div className="mb-8">
//                     <div className="max-w-md mx-auto relative">
//                         <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Pesquisar documentos..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
//                         />
//                     </div>
//                 </div>

//                 <div className="mb-12">
//                     <div className="flex flex-wrap justify-center gap-4">
//                         {categories.map((category) => {
//                             const IconComponent = category.icon;
//                             const isActive = selectedCategory === category.id;
//                             const buttonClass = isActive 
//                                 ? `flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${category.bgClass} text-white shadow-lg`
//                                 : 'flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 bg-gray-800 text-gray-300 hover:bg-gray-700';
                            
//                             return (
//                                 <button
//                                     key={category.id}
//                                     onClick={() => setSelectedCategory(category.id)}
//                                     className={buttonClass}
//                                 >
//                                     <IconComponent className="text-xl" />
//                                     <span className="font-medium">{category.name}</span>
//                                     <span className={isActive ? 'px-2 py-1 rounded-full text-xs font-bold bg-white/20' : 'px-2 py-1 rounded-full text-xs font-bold bg-gray-700'}>
//                                         {category.count}
//                                     </span>
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
//                     {filteredDocuments.map((doc) => {
//                         const catInfo = getCategoryInfo(doc.category);
                        
//                         return (
//                             <div key={doc.id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                
//                                 <div className="flex items-start justify-between mb-4">
//                                     <div className="flex items-center gap-3">
//                                         <FaFilePdf className={`text-2xl ${catInfo.iconColor}`} />
//                                         <div>
//                                             <span className={`px-3 py-1 ${catInfo.bgColor} ${catInfo.textColor} text-xs font-medium rounded-full`}>
//                                                 {doc.type}
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <button
//                                         onClick={() => handleDownload(doc)}
//                                         className={`p-2 ${catInfo.buttonBg} ${catInfo.buttonHover} text-white rounded-lg transition-colors`}
//                                         title="Download PDF"
//                                     >
//                                         <FaDownload />
//                                     </button>
//                                 </div>

//                                 <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
//                                     {doc.title}
//                                 </h3>

//                                 <p className="text-gray-300 text-sm mb-4 line-clamp-3">
//                                     {doc.description}
//                                 </p>

//                                 <div className="space-y-2 mb-4">
//                                     <div className="flex items-center gap-2 text-xs text-gray-400">
//                                         <FaFileAlt />
//                                         <span>{doc.pages}</span>
//                                         <span>•</span>
//                                         <span>{doc.size}</span>
//                                     </div>
//                                     <div className="flex items-center gap-2 text-xs text-gray-400">
//                                         <FaCalendarAlt />
//                                         <span>Atualizado em {formatDate(doc.lastUpdate)}</span>
//                                     </div>
//                                 </div>

//                                 <div className="flex flex-wrap gap-2 mb-4">
//                                     {doc.tags.map((tag, index) => (
//                                         <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
//                                             #{tag}
//                                         </span>
//                                     ))}
//                                 </div>

//                                 <div className="flex gap-2">
//                                     </div>
//                                     <button
//                                         onClick={() => handleDownload(doc)}
//                                         className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 ${catInfo.buttonBg} ${catInfo.buttonHover} text-white rounded-lg transition-colors text-sm font-medium`}
//                                     >
//                                         <FaDownload />
//                                         Download
//                                     </button>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {filteredDocuments.length === 0 && (
//                     <div className="text-center py-12">
//                         <FaSearch className="text-6xl text-gray-600 mx-auto mb-4" />
//                         <h3 className="text-2xl font-bold text-gray-400 mb-2">Nenhum documento encontrado</h3>
//                         <p className="text-gray-500">Tente ajustar os filtros ou termo de pesquisa</p>
//                     </div>
//                 )}

//                 <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8">
//                     <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
//                         📊 Estatísticas da Biblioteca
//                     </h2>
//                     <div className="grid md:grid-cols-4 gap-6 text-center">
//                         <div className="bg-blue-600/20 p-6 rounded-xl">
//                             <div className="text-3xl font-bold text-blue-400 mb-2">{documents.length}</div>
//                             <div className="text-gray-300">Total de Documentos</div>
//                         </div>
//                         <div className="bg-red-600/20 p-6 rounded-xl">
//                             <div className="text-3xl font-bold text-red-400 mb-2">
//                                 {documents.filter(doc => doc.category === 'cybersecurity').length}
//                             </div>
//                             <div className="text-gray-300">Cibersegurança</div>
//                         </div>
//                         <div className="bg-purple-600/20 p-6 rounded-xl">
//                             <div className="text-3xl font-bold text-purple-400 mb-2">
//                                 {documents.filter(doc => doc.category === 'ai').length}
//                             </div>
//                             <div className="text-gray-300">Inteligência Artificial</div>
//                         </div>
//                         <div className="bg-green-600/20 p-6 rounded-xl">
//                             <div className="text-3xl font-bold text-green-400 mb-2">
//                                 {documents.reduce((acc, doc) => acc + parseInt(doc.pages), 0)}
//                             </div>
//                             <div className="text-gray-300">Total de Páginas</div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-12 text-center">
//                     <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-8 rounded-2xl">
//                         <h2 className="text-2xl font-bold text-white mb-4">
//                             💡 Contribua com a Biblioteca
//                         </h2>
//                         <p className="text-blue-100 mb-6">
//                             Tem sugestões de documentos ou quer contribuir com nosso acervo? Entre em contato!
//                         </p>
//                         <a>
//                             href="/contato"
//                             className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
//                             <FaCog />
//                             Entre em Contato
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Documents;


import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FaDownload, FaFilePdf, FaShieldAlt, FaBrain, FaChartBar, FaCalendarAlt, FaFileAlt, FaSearch, FaCog } from 'react-icons/fa';

function Documents() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setDocuments(data || []);
        } catch (error) {
            console.error('Erro ao buscar documentos:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { 
            id: 'all', 
            name: 'Todos os Documentos', 
            icon: FaFileAlt, 
            count: documents.length, 
            color: 'blue',
            bgClass: 'bg-blue-600',
            textClass: 'text-blue-400'
        },
        { 
            id: 'cybersecurity', 
            name: 'Cibersegurança', 
            icon: FaShieldAlt, 
            count: documents.filter(doc => doc.category === 'cybersecurity').length, 
            color: 'red',
            bgClass: 'bg-red-600',
            textClass: 'text-red-400'
        },
        { 
            id: 'ai', 
            name: 'Inteligência Artificial', 
            icon: FaBrain, 
            count: documents.filter(doc => doc.category === 'ai').length, 
            color: 'purple',
            bgClass: 'bg-purple-600',
            textClass: 'text-purple-400'
        },
        { 
            id: 'data', 
            name: 'Análise de Dados', 
            icon: FaChartBar, 
            count: documents.filter(doc => doc.category === 'data').length, 
            color: 'green',
            bgClass: 'bg-green-600',
            textClass: 'text-green-400'
        }
    ];

    const filteredDocuments = documents.filter(doc => {
        const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
        return matchesCategory && matchesSearch;
    });

    const handleDownload = (doc) => {
        const link = document.createElement('a');
        link.href = doc.file_url;
        link.setAttribute('download', '');
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const getCategoryInfo = (category) => {
        const categoryMap = {
            cybersecurity: {
                iconColor: 'text-red-400',
                bgColor: 'bg-red-600/20',
                textColor: 'text-red-300',
                buttonBg: 'bg-red-600',
                buttonHover: 'hover:bg-red-700'
            },
            ai: {
                iconColor: 'text-purple-400',
                bgColor: 'bg-purple-600/20',
                textColor: 'text-purple-300',
                buttonBg: 'bg-purple-600',
                buttonHover: 'hover:bg-purple-700'
            },
            data: {
                iconColor: 'text-green-400',
                bgColor: 'bg-green-600/20',
                textColor: 'text-green-300',
                buttonBg: 'bg-green-600',
                buttonHover: 'hover:bg-green-700'
            }
        };
        return categoryMap[category] || {
            iconColor: 'text-blue-400',
            bgColor: 'bg-blue-600/20',
            textColor: 'text-blue-300',
            buttonBg: 'bg-blue-600',
            buttonHover: 'hover:bg-blue-700'
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-4">
                            📚 Biblioteca de Documentos Técnicos
                        </h1>
                        <p className="text-xl text-gray-300">
                            Carregando documentos...
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-4">
                        📚 Biblioteca de Documentos Técnicos
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Acesse nossa coleção completa de manuais, guias e documentos técnicos desenvolvidos pelo 
                        Laboratório de Transformação Digital para modernização do setor público
                    </p>
                </div>

                <div className="mb-8">
                    <div className="max-w-md mx-auto relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar documentos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => {
                            const IconComponent = category.icon;
                            const isActive = selectedCategory === category.id;
                            const buttonClass = isActive 
                                ? `flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${category.bgClass} text-white shadow-lg`
                                : 'flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 bg-gray-800 text-gray-300 hover:bg-gray-700';
                            
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={buttonClass}
                                >
                                    <IconComponent className="text-xl" />
                                    <span className="font-medium">{category.name}</span>
                                    <span className={isActive ? 'px-2 py-1 rounded-full text-xs font-bold bg-white/20' : 'px-2 py-1 rounded-full text-xs font-bold bg-gray-700'}>
                                        {category.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredDocuments.map((doc) => {
                        const catInfo = getCategoryInfo(doc.category);
                        
                        return (
                            <div key={doc.id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <FaFilePdf className={`text-2xl ${catInfo.iconColor}`} />
                                        <div>
                                            <span className={`px-3 py-1 ${catInfo.bgColor} ${catInfo.textColor} text-xs font-medium rounded-full`}>
                                                {doc.category}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownload(doc)}
                                        className={`p-2 ${catInfo.buttonBg} ${catInfo.buttonHover} text-white rounded-lg transition-colors`}
                                        title="Download PDF"
                                    >
                                        <FaDownload />
                                    </button>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">
                                    {doc.title}
                                </h3>

                                <p className="text-gray-300 text-sm mb-4">
                                    {doc.description || 'Descrição não disponível'}
                                </p>

                                <div className="space-y-2 mb-4">
                                    {doc.pages && (
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <FaFileAlt />
                                            <span>{doc.pages} páginas</span>
                                            {doc.file_size && (
                                                <>
                                                    <span>•</span>
                                                    <span>{doc.file_size}</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <FaCalendarAlt />
                                        <span>Atualizado em {formatDate(doc.created_at)}</span>
                                    </div>
                                </div>

                                {doc.tags && doc.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {doc.tags.map((tag, index) => (
                                            <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDownload(doc)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 ${catInfo.buttonBg} ${catInfo.buttonHover} text-white rounded-lg transition-colors text-sm font-medium`}
                                    >
                                        <FaDownload />
                                        Download
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredDocuments.length === 0 && (
                    <div className="text-center py-12">
                        <FaSearch className="text-6xl text-gray-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">Nenhum documento encontrado</h3>
                        <p className="text-gray-500">Tente ajustar os filtros ou termo de pesquisa</p>
                    </div>
                )}

                <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                        📊 Estatísticas da Biblioteca
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6 text-center">
                        <div className="bg-blue-600/20 p-6 rounded-xl">
                            <div className="text-3xl font-bold text-blue-400 mb-2">{documents.length}</div>
                            <div className="text-gray-300">Total de Documentos</div>
                        </div>
                        <div className="bg-red-600/20 p-6 rounded-xl">
                            <div className="text-3xl font-bold text-red-400 mb-2">
                                {documents.filter(doc => doc.category === 'cybersecurity').length}
                            </div>
                            <div className="text-gray-300">Cibersegurança</div>
                        </div>
                        <div className="bg-purple-600/20 p-6 rounded-xl">
                            <div className="text-3xl font-bold text-purple-400 mb-2">
                                {documents.filter(doc => doc.category === 'ai').length}
                            </div>
                            <div className="text-gray-300">Inteligência Artificial</div>
                        </div>
                        <div className="bg-green-600/20 p-6 rounded-xl">
                            <div className="text-3xl font-bold text-green-400 mb-2">
                                {documents.reduce((acc, doc) => acc + (doc.pages || 0), 0)}
                            </div>
                            <div className="text-gray-300">Total de Páginas</div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            💡 Contribua com a Biblioteca
                        </h2>
                        <p className="text-blue-100 mb-6">
                            Tem sugestões de documentos ou quer contribuir com nosso acervo? Entre em contato!
                        </p>
                        
                            href="/contato"
                            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                            <FaCog />
                            Entre em Contato
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Documents;