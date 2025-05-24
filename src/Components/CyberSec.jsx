import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { FaShieldAlt, FaLock, FaEye, FaBug, FaUserSecret, FaServer, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

function CyberSec() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    const securityServices = [
        {
            icon: FaLock,
            title: "Auditoria de Segurança",
            description: "Avaliação completa da infraestrutura de TI das prefeituras, identificando vulnerabilidades e propondo soluções.",
            features: ["Análise de vulnerabilidades", "Teste de penetração", "Relatório executivo", "Plano de correção"]
        },
        {
            icon: FaEye,
            title: "Monitoramento 24/7",
            description: "Sistema de monitoramento contínuo para detectar e responder rapidamente a ameaças de segurança.",
            features: ["Detecção de intrusão", "Análise de logs", "Alertas em tempo real", "Dashboard de segurança"]
        },
        {
            icon: FaBug,
            title: "Análise de Malware",
            description: "Identificação e análise de software malicioso, com desenvolvimento de soluções de proteção customizadas.",
            features: ["Sandbox analysis", "Reverse engineering", "Assinatura de malware", "Proteção proativa"]
        },
        {
            icon: FaUserSecret,
            title: "Ethical Hacking",
            description: "Testes de penetração éticos para identificar falhas de segurança antes que sejam exploradas por atacantes.",
            features: ["Pentest web applications", "Teste de rede", "Engenharia social", "Relatório detalhado"]
        }
    ];

    const threatStats = [
        { number: "95%", label: "Redução de Incidentes", color: "green" },
        { number: "24/7", label: "Monitoramento Ativo", color: "blue" },
        { number: "1000+", label: "Ameaças Bloqueadas/Mês", color: "red" },
        { number: "99.9%", label: "Uptime Garantido", color: "purple" }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white py-16 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-4">
                        Segurança da Informação
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Protegendo dados sensíveis e infraestruturas críticas do setor público com soluções avançadas de cibersegurança
                    </p>
                </div>

                {/* Threat Landscape */}
                <div className="mb-16" data-aos="fade-right">
                    <div className="bg-gradient-to-r from-red-900/50 to-red-700/50 p-8 rounded-2xl border border-red-800/50">
                        <div className="flex items-center gap-4 mb-6">
                            <FaExclamationTriangle className="text-4xl text-red-400" />
                            <h2 className="text-3xl font-bold text-white">Cenário Atual de Ameaças</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-red-300 mb-4">Principais Ameaças</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <FaShieldAlt className="text-red-400" />
                                        <span className="text-gray-300">Ransomware direcionado ao setor público</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaShieldAlt className="text-red-400" />
                                        <span className="text-gray-300">Vazamento de dados pessoais de cidadãos</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaShieldAlt className="text-red-400" />
                                        <span className="text-gray-300">Ataques de engenharia social</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaShieldAlt className="text-red-400" />
                                        <span className="text-gray-300">Vulnerabilidades em sistemas legados</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-red-300 mb-4">Nossa Resposta</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <FaLock className="text-green-400" />
                                        <span className="text-gray-300">Implementação de Zero Trust Architecture</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaLock className="text-green-400" />
                                        <span className="text-gray-300">Criptografia end-to-end para dados sensíveis</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaLock className="text-green-400" />
                                        <span className="text-gray-300">Treinamento contínuo de servidores</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaLock className="text-green-400" />
                                        <span className="text-gray-300">Modernização de infraestrutura crítica</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-16" data-aos="fade-up">
                    {threatStats.map((stat, index) => (
                        <div key={index} className={`bg-${stat.color}-900/30 p-6 rounded-xl text-center border border-${stat.color}-800/50`}>
                            <div className={`text-3xl font-bold text-${stat.color}-400 mb-2`}>{stat.number}</div>
                            <div className="text-gray-300">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Security Services */}
                <div className="mb-16" data-aos="fade-left">
                    <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                        Nossos Serviços de Segurança
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {securityServices.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <div key={index} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-red-500 transition-all duration-300">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-red-600/20 rounded-xl">
                                            <IconComponent className="text-2xl text-red-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                                    </div>
                                    <p className="text-gray-300 mb-4">{service.description}</p>
                                    <div className="space-y-2">
                                        {service.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                                <span className="text-gray-400 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Compliance Section */}
                <div className="mb-16" data-aos="fade-right">
                    <div className="bg-gradient-to-r from-blue-900/50 to-blue-700/50 p-8 rounded-2xl border border-blue-800/50">
                        <div className="flex items-center gap-4 mb-6">
                            <FaServer className="text-4xl text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">Conformidade e Regulamentações</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-blue-900/30 p-6 rounded-xl">
                                <h3 className="font-bold text-blue-300 mb-3">LGPD</h3>
                                <p className="text-gray-300 text-sm mb-4">
                                    Implementação completa da Lei Geral de Proteção de Dados, garantindo conformidade total no tratamento de dados pessoais.
                                </p>
                                <div className="text-blue-400 text-xs">
                                    • Mapeamento de dados pessoais<br/>
                                    • Políticas de privacidade<br/>
                                    • Gestão de consentimento<br/>
                                    • Relatórios de impacto
                                </div>
                            </div>
                            <div className="bg-blue-900/30 p-6 rounded-xl">
                                <h3 className="font-bold text-blue-300 mb-3">ISO 27001</h3>
                                <p className="text-gray-300 text-sm mb-4">
                                    Sistema de Gestão de Segurança da Informação baseado na norma internacional ISO 27001.
                                </p>
                                <div className="text-blue-400 text-xs">
                                    • Análise de riscos<br/>
                                    • Controles de segurança<br/>
                                    • Gestão de incidentes<br/>
                                    • Auditoria interna
                                </div>
                            </div>
                            <div className="bg-blue-900/30 p-6 rounded-xl">
                                <h3 className="font-bold text-blue-300 mb-3">Marco Civil</h3>
                                <p className="text-gray-300 text-sm mb-4">
                                    Adequação ao Marco Civil da Internet e outras regulamentações específicas do setor público.
                                </p>
                                <div className="text-blue-400 text-xs">
                                    • Neutralidade da rede<br/>
                                    • Proteção de registros<br/>
                                    • Transparência de dados<br/>
                                    • Responsabilidade civil
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Tools */}
                <div className="mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                        Ferramentas e Tecnologias
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: "SIEM", description: "Security Information and Event Management" },
                            { name: "EDR/XDR", description: "Endpoint/Extended Detection and Response" },
                            { name: "Firewall WAF", description: "Web Application Firewall" },
                            { name: "Pentest Tools", description: "Ferramentas de Teste de Penetração" },
                            { name: "Vulnerability Scanner", description: "Scanner de Vulnerabilidades" },
                            { name: "DLP", description: "Data Loss Prevention" },
                            { name: "PAM", description: "Privileged Access Management" },
                            { name: "SOAR", description: "Security Orchestration, Automation and Response" }
                        ].map((tool, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-xl border border-gray-700 text-center hover:border-purple-500 transition-colors">
                                <h3 className="font-bold text-purple-300 mb-2">{tool.name}</h3>
                                <p className="text-gray-400 text-xs">{tool.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Incident Response */}
                <div className="text-center" data-aos="fade-up">
                    <div className="bg-gradient-to-r from-orange-900/50 to-orange-700/50 p-8 rounded-2xl border border-orange-800/50">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <FaChartLine className="text-4xl text-orange-400" />
                            <h2 className="text-3xl font-bold text-white">Resposta a Incidentes</h2>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
                            Nossa equipe de resposta a incidentes está disponível 24/7 para garantir que qualquer ameaça seja 
                            neutralizada rapidamente, minimizando impactos e mantendo a continuidade dos serviços públicos.
                        </p>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">1</span>
                                </div>
                                <h4 className="font-bold text-orange-300 mb-2">Detecção</h4>
                                <p className="text-gray-300 text-sm">Identificação automática de ameaças</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">2</span>
                                </div>
                                <h4 className="font-bold text-orange-300 mb-2">Contenção</h4>
                                <p className="text-gray-300 text-sm">Isolamento rápido da ameaça</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">3</span>
                                </div>
                                <h4 className="font-bold text-orange-300 mb-2">Erradicação</h4>
                                <p className="text-gray-300 text-sm">Eliminação completa da ameaça</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">4</span>
                                </div>
                                <h4 className="font-bold text-orange-300 mb-2">Recuperação</h4>
                                <p className="text-gray-300 text-sm">Restauração dos serviços</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CyberSec;