import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { FaUniversity, FaCity, FaUsers, FaLightbulb, FaHandshake, FaRocket } from 'react-icons/fa';

function About() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white py-16 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-4">
                        Sobre o LTD
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Conheça mais sobre o Laboratório de Transformação Digital e nossa missão de transformar o setor público através da inovação tecnológica
                    </p>
                </div>

                {/* Mission Section */}
                <div className="mb-16" data-aos="fade-right">
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl border border-gray-600">
                        <div className="flex items-center gap-4 mb-6">
                            <FaLightbulb className="text-4xl text-yellow-400" />
                            <h2 className="text-3xl font-bold text-white">Nossa Missão</h2>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            O Laboratório de Transformação Digital (LTD) tem como missão desenvolver soluções tecnológicas inovadoras 
                            que modernizem e otimizem os processos do setor público. Através da parceria estratégica entre a Universidade Estácio 
                            e as prefeituras de São José e Florianópolis, criamos um ambiente de aprendizado prático onde estudantes e profissionais 
                            trabalham em projetos reais que impactam diretamente a vida dos cidadãos.
                        </p>
                    </div>
                </div>

                {/* Partnership Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div data-aos="fade-up" data-aos-delay="100">
                        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <FaUniversity className="text-4xl text-blue-400" />
                                <h3 className="text-2xl font-bold text-blue-300">Universidade Estácio</h3>
                            </div>
                            <p className="text-gray-300 mb-4">
                                A Universidade Estácio fornece a base acadêmica sólida, infraestrutura tecnológica e corpo docente especializado. 
                                Nossos laboratórios estão equipados com as mais modernas tecnologias para desenvolvimento de software, 
                                cibersegurança e análise de dados.
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-blue-300">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                    <span>Infraestrutura tecnológica avançada</span>
                                </div>
                                <div className="flex items-center gap-2 text-blue-300">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                    <span>Corpo docente especializado</span>
                                </div>
                                <div className="flex items-center gap-2 text-blue-300">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                    <span>Metodologia de ensino prático</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="200">
                        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <FaCity className="text-4xl text-green-400" />
                                <h3 className="text-2xl font-bold text-green-300">Prefeituras Parceiras</h3>
                            </div>
                            <p className="text-gray-300 mb-4">
                                As prefeituras de São José e Florianópolis oferecem cenários reais de aplicação, demandas genuínas do setor público 
                                e feedback direto sobre as soluções desenvolvidas. Esta parceria garante que nossos projetos tenham impacto real 
                                na gestão pública.
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-green-300">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    <span>Demandas reais do setor público</span>
                                </div>
                                <div className="flex items-center gap-2 text-green-300">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    <span>Feedback de profissionais experientes</span>
                                </div>
                                <div className="flex items-center gap-2 text-green-300">
                                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                    <span>Implementação em ambiente real</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Objectives Section */}
                <div className="mb-16" data-aos="fade-left">
                    <div className="bg-gradient-to-r from-purple-800/50 to-purple-600/50 p-8 rounded-2xl border border-purple-700/50">
                        <div className="flex items-center gap-4 mb-6">
                            <FaRocket className="text-4xl text-purple-400" />
                            <h2 className="text-3xl font-bold text-white">Nossos Objetivos</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-400 text-purple-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">1</span>
                                    <div>
                                        <h4 className="font-bold text-purple-300 mb-1">Modernização Digital</h4>
                                        <p className="text-gray-300 text-sm">Digitalizar e automatizar processos administrativos do setor público</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-400 text-purple-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">2</span>
                                    <div>
                                        <h4 className="font-bold text-purple-300 mb-1">Formação Prática</h4>
                                        <p className="text-gray-300 text-sm">Capacitar estudantes com experiência real em projetos governamentais</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-400 text-purple-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">3</span>
                                    <div>
                                        <h4 className="font-bold text-purple-300 mb-1">Transparência</h4>
                                        <p className="text-gray-300 text-sm">Desenvolver ferramentas que aumentem a transparência e participação cidadã</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-400 text-purple-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">4</span>
                                    <div>
                                        <h4 className="font-bold text-purple-300 mb-1">Segurança Digital</h4>
                                        <p className="text-gray-300 text-sm">Implementar soluções robustas de cibersegurança no setor público</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-400 text-purple-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">5</span>
                                    <div>
                                        <h4 className="font-bold text-purple-300 mb-1">Inovação Contínua</h4>
                                        <p className="text-gray-300 text-sm">Manter-se atualizado com as mais recentes tecnologias e tendências</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 bg-purple-400 text-purple-900 rounded-full flex items-center justify-center text-sm font-bold mt-1">6</span>
                                    <div>
                                        <h4 className="font-bold text-purple-300 mb-1">Impacto Social</h4>
                                        <p className="text-gray-300 text-sm">Gerar soluções que melhorem diretamente a vida dos cidadãos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Methodology Section */}
                <div className="mb-16" data-aos="fade-up">
                    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
                        <div className="flex items-center gap-4 mb-6">
                            <FaHandshake className="text-4xl text-orange-400" />
                            <h2 className="text-3xl font-bold text-white">Nossa Metodologia</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">1</span>
                                </div>
                                <h4 className="font-bold text-orange-300 mb-2">Identificação</h4>
                                <p className="text-gray-300 text-sm">Mapeamento de necessidades reais junto às prefeituras parceiras</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">2</span>
                                </div>
                                <h4 className="font-bold text-orange-300 mb-2">Desenvolvimento</h4>
                                <p className="text-gray-300 text-sm">Criação colaborativa de soluções por equipes mistas de estudantes e profissionais</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">3</span>
                                </div>
                                <h4 className="font-bold text-orange-300 mb-2">Implementação</h4>
                                <p className="text-gray-300 text-sm">Testes, validação e implementação gradual em ambiente de produção</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="text-center" data-aos="fade-up">
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                        Nossos Valores
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="font-bold text-blue-300 mb-2">Colaboração</h3>
                            <p className="text-gray-400 text-sm">Trabalhamos juntos para alcançar objetivos comuns</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="font-bold text-green-300 mb-2">Excelência</h3>
                            <p className="text-gray-400 text-sm">Buscamos sempre a mais alta qualidade em nossos projetos</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <div className="text-4xl mb-4">🔄</div>
                            <h3 className="font-bold text-purple-300 mb-2">Inovação</h3>
                            <p className="text-gray-400 text-sm">Exploramos novas tecnologias e abordagens constantemente</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <div className="text-4xl mb-4">🌍</div>
                            <h3 className="font-bold text-orange-300 mb-2">Impacto</h3>
                            <p className="text-gray-400 text-sm">Focamos em soluções que beneficiem a sociedade</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;