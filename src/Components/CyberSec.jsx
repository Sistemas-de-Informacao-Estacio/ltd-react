import { useState, useEffect } from "react";
import { FaShieldAlt, FaLock, FaBug, FaUserSecret, FaNetworkWired, FaExclamationTriangle, FaCheckCircle, FaRocket, FaCode, FaDatabase, FaFingerprint, FaEye } from "react-icons/fa";
import InforCyberSec from "../Components/InforCyberSec";

function CyberSec() {
  const [site, setSite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if(site) {
      window.open("https://cybershield-ecru.vercel.app/", "_blank");
      setSite(false);
    }
  }, [site]);

  const features = [
    {
      icon: FaShieldAlt,
      titulo: "Proteção Avançada",
      descricao: "Sistemas de defesa multicamadas para infraestrutura crítica",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaUserSecret,
      titulo: "Análise de Vulnerabilidades",
      descricao: "Testes de penetração e análise de segurança contínua",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FaBug,
      titulo: "Detecção de Ameaças",
      descricao: "Monitoramento em tempo real e resposta a incidentes",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: FaNetworkWired,
      titulo: "Segurança de Rede",
      descricao: "Firewalls avançados e proteção de perímetro",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const services = [
    {
      icon: FaLock,
      titulo: "Treinamento de Equipes",
      descricao: "Capacitação de servidores em práticas de segurança digital e conscientização sobre ameaças cibernéticas"
    },
    {
      icon: FaFingerprint,
      titulo: "Autenticação Segura",
      descricao: "Implementação de autenticação multifator e controle de acesso granular"
    },
    {
      icon: FaDatabase,
      titulo: "Proteção de Dados",
      descricao: "Criptografia de ponta a ponta e backup seguro de informações sensíveis"
    },
    {
      icon: FaEye,
      titulo: "Monitoramento 24/7",
      descricao: "Vigilância contínua de sistemas e detecção proativa de anomalias"
    },
    {
      icon: FaCode,
      titulo: "Análise de Código",
      descricao: "Revisão de segurança em aplicações e correção de vulnerabilidades"
    },
    {
      icon: FaExclamationTriangle,
      titulo: "Resposta a Incidentes",
      descricao: "Plano de contingência e recuperação rápida em caso de ataques"
    }
  ];

  const stats = [
    { label: "Ameaças Bloqueadas", value: "10K+", icon: FaShieldAlt },
    { label: "Sistemas Protegidos", value: "50+", icon: FaLock },
    { label: "Uptime", value: "99.9%", icon: FaCheckCircle },
    { label: "Vulnerabilidades Corrigidas", value: "200+", icon: FaBug }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-red-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2s"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4s"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-block px-6 py-3 bg-red-500/20 rounded-full text-red-300 font-semibold mb-6 border border-red-500/30">
              🛡️ Segurança da Informação
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-300 via-red-300 to-purple-300 bg-clip-text text-transparent mb-6 leading-tight">
              CyberSec
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Práticas e ferramentas avançadas para proteção dos sistemas e dados municipais contra ameaças cibernéticas
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1 max-w-xs"></div>
              <FaShieldAlt className="text-blue-400 text-3xl animate-pulse" />
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1 max-w-xs"></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <stat.icon className="text-3xl text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent mb-4">
              Recursos de Segurança
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Soluções completas para proteger a infraestrutura digital do setor público
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300`}>
                  <feature.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {feature.titulo}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CyberShield Portal */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-red-900/40 backdrop-blur-md rounded-3xl overflow-hidden border border-blue-500/30 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center p-12 md:p-16">
              <div data-aos="fade-right">
                <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-semibold mb-4 border border-blue-500/30">
                  🚀 Portal Especializado
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  CyberShield Portal
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Portal especializado em cibersegurança para municípios, desenvolvido pelos alunos do LTD. 
                  Uma plataforma completa com treinamentos, ferramentas e recursos de conscientização em segurança.
                </p>

                <InforCyberSec/>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-400 text-xl mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Treinamentos interativos para servidores públicos</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-400 text-xl mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Ferramentas de análise de vulnerabilidades</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-400 text-xl mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Recursos de conscientização sobre ameaças</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-400 text-xl mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Simulações de ataques para treinamento</span>
                  </div>
                </div>

                <button
                  onClick={() => setSite(true)}
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  <FaRocket className="group-hover:animate-pulse" />
                  Acessar Portal
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              <div className="relative" data-aos="fade-left">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 border border-gray-700">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-400 text-sm font-mono">cybershield.portal</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                        <FaShieldAlt className="text-green-400 text-2xl" />
                        <div>
                          <div className="text-green-400 font-semibold">Sistema Protegido</div>
                          <div className="text-gray-400 text-sm">Todas as verificações passaram</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <FaNetworkWired className="text-blue-400 text-2xl" />
                        <div>
                          <div className="text-blue-400 font-semibold">Rede Monitorada</div>
                          <div className="text-gray-400 text-sm">Tráfego analisado em tempo real</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                        <FaFingerprint className="text-purple-400 text-2xl" />
                        <div>
                          <div className="text-purple-400 font-semibold">Autenticação Ativa</div>
                          <div className="text-gray-400 text-sm">MFA habilitado para todos</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-300 to-purple-400 bg-clip-text text-transparent mb-4">
              Serviços Oferecidos
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Soluções completas de segurança para proteger sua infraestrutura digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                  <service.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {service.titulo}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-r from-red-900/40 via-purple-900/40 to-blue-900/40 backdrop-blur-md p-12 md:p-16 rounded-3xl border border-red-500/30 shadow-2xl text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-purple-600/10 to-blue-600/10"></div>
            <div className="relative z-10">
              <div className="inline-block p-4 bg-red-500/20 rounded-2xl mb-6">
                <FaShieldAlt className="text-5xl text-red-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
                Proteja Seus Sistemas Agora
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Não espere um ataque acontecer. Entre em contato conosco e descubra como podemos 
                fortalecer a segurança digital da sua instituição.
              </p>
              <button
                onClick={() => window.location.href = '/ltd/contato'}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <FaLock />
                Solicitar Consultoria
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CyberSec;