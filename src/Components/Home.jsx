import { Link } from "react-router-dom";
import ButtonSaibaMais from "../Components/ButtonSaibaMais";
import { FaDownload, FaAndroid, FaUsers, FaCity, FaCode, FaShieldAlt, FaBrain, FaDatabase, FaRocket, FaCalendarAlt, FaStar, FaArrowRight, FaChartLine } from "react-icons/fa";

function Home() {
  const handleDownloadApp = () => {
    const link = document.createElement('a');
    link.href = "https://github.com/LTD-2025-1-Cyber-Security-Project/desenvolvimento/releases/download/v2.0.0/geradorcurriculo.exe";
    link.setAttribute('download', '');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const timelineData = [
    {
      year: "2023",
      month: "Julho",
      title: "Proteção Digital para Idosos",
      description: "Iniciamos nosso projeto focado na construção de ferramentas e sites para ajudar na segurança da informação, especialmente protegendo os idosos que são mais vulneráveis a golpes digitais.",
      icon: FaShieldAlt,
      color: "from-red-500 to-red-600",
      achievements: ["Ferramentas anti-phishing", "Guias de segurança", "Workshops educativos"]
    },
    {
      year: "2024",
      month: "Janeiro - Dezembro",
      title: "Recolocação no Mercado de Trabalho",
      description: "Expandimos nosso foco para ajudar pessoas na recolocação profissional, desenvolvendo sites e aplicações que geram currículos, portfolios e ferramentas de capacitação.",
      icon: FaUsers,
      color: "from-blue-500 to-blue-600",
      achievements: ["Gerador de currículos", "Sites de portfolio", "Plataformas de capacitação", "Ferramentas de networking"]
    },
    {
      year: "2025",
      month: "Janeiro - Presente",
      title: "Ecossistema Tecnológico Completo",
      description: "Atualmente criamos um ecossistema completo com ferramentas de IA, Cibersegurança, Banco de Dados, Marketing Digital, desenvolvimento Full-Stack e Machine Learning usando Python, Streamlit e diversas tecnologias modernas.",
      icon: FaBrain,
      color: "from-purple-500 to-purple-600",
      achievements: ["Ferramentas de IA", "Sistemas de ML", "Apps desktop Python", "Soluções Streamlit", "Dashboards avançados", "APIs robustas"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2s"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4s"></div>
        </div>
        
        <div className="relative text-center p-8 mb-16 min-h-screen flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6 leading-tight">
              Laboratório de
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Transformação Digital
              </span>
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1 max-w-xs"></div>
              <FaRocket className="text-blue-400 text-2xl animate-bounce" />
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1 max-w-xs"></div>
            </div>
            <p className="text-xl md:text-2xl font-light max-w-4xl text-center mx-auto mb-8 text-gray-300 leading-relaxed">
              Uma parceria inovadora entre a <span className="text-blue-300 font-semibold">Estácio</span> e as Prefeituras de 
              <span className="text-purple-300 font-semibold"> São José</span> e 
              <span className="text-pink-300 font-semibold"> Florianópolis</span> para revolucionar o setor público através da tecnologia
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <Link 
              to="/apps" 
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3"
            >
              <FaRocket className="group-hover:animate-pulse" />
              Explorar Aplicativos
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/sobre">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                Saiba Mais
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
              <div className="text-gray-300 text-sm">Aplicativos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-green-400 mb-2">2</div>
              <div className="text-gray-300 text-sm">Prefeituras</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-purple-400 mb-2">7+</div>
              <div className="text-gray-300 text-sm">Especialistas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-pink-400 mb-2">50+</div>
              <div className="text-gray-300 text-sm">Projetos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent mb-4">
              Nossa Jornada de Transformação
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Acompanhe a evolução do LTD e como temos impactado diferentes áreas ao longo do tempo
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

            {timelineData.map((item, index) => (
              <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline Dot */}
                <div className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center z-10 shadow-lg`}>
                  <item.icon className="text-white text-sm" />
                </div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8 md:ml-0' : 'md:ml-8'} md:w-1/2`}>
                  <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center gap-3 mb-4">
                      <FaCalendarAlt className="text-blue-400" />
                      <span className="text-blue-300 font-semibold">{item.month} {item.year}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-blue-300 flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        Principais Conquistas:
                      </h4>
                      <ul className="space-y-1">
                        {item.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Nossas Especialidades</h2>
            <p className="text-xl text-gray-300">Tecnologias de ponta para transformar o setor público</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/quem-somos" className="group">
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-8 rounded-2xl text-center hover:from-blue-800/60 hover:to-blue-700/60 transition-all duration-300 border border-blue-500/20 hover:border-blue-400/40 transform hover:scale-105">
                <FaUsers className="text-5xl text-blue-400 mx-auto mb-6 group-hover:animate-bounce" />
                <h3 className="text-xl font-bold text-blue-300 mb-3">Equipe Especializada</h3>
                <p className="text-gray-300 leading-relaxed">Profissionais qualificados trabalhando em projetos reais para modernizar a gestão pública</p>
              </div>
            </Link>

            <Link to="/sobre" className="group">
              <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 p-8 rounded-2xl text-center hover:from-green-800/60 hover:to-green-700/60 transition-all duration-300 border border-green-500/20 hover:border-green-400/40 transform hover:scale-105">
                <FaCity className="text-5xl text-green-400 mx-auto mb-6 group-hover:animate-bounce" />
                <h3 className="text-xl font-bold text-green-300 mb-3">Parcerias Municipais</h3>
                <p className="text-gray-300 leading-relaxed">Colaboração estratégica com prefeituras para desenvolver soluções customizadas</p>
              </div>
            </Link>

            <Link to="/tecnologias" className="group">
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 p-8 rounded-2xl text-center hover:from-purple-800/60 hover:to-purple-700/60 transition-all duration-300 border border-purple-500/20 hover:border-purple-400/40 transform hover:scale-105">
                <FaCode className="text-5xl text-purple-400 mx-auto mb-6 group-hover:animate-bounce" />
                <h3 className="text-xl font-bold text-purple-300 mb-3">Tecnologias Modernas</h3>
                <p className="text-gray-300 leading-relaxed">Stack tecnológico de ponta incluindo IA, Python, React e muito mais</p>
              </div>
            </Link>

            <Link to="/cybersec" className="group">
              <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 p-8 rounded-2xl text-center hover:from-red-800/60 hover:to-red-700/60 transition-all duration-300 border border-red-500/20 hover:border-red-400/40 transform hover:scale-105">
                <FaShieldAlt className="text-5xl text-red-400 mx-auto mb-6 group-hover:animate-bounce" />
                <h3 className="text-xl font-bold text-red-300 mb-3">Segurança Digital</h3>
                <p className="text-gray-300 leading-relaxed">Proteção avançada e soluções de cibersegurança para o setor público</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Areas de Atuacao */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-4">
              Áreas de Atuação Atual
            </h2>
            <p className="text-xl text-gray-300">Soluções completas para modernização digital</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/apps" className="group">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <FaCode className="text-3xl text-blue-400" />
                  <h3 className="text-2xl font-bold text-blue-300">Desenvolvimento Full-Stack</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Sistemas web e desktop personalizados, incluindo geradores de documentos, dashboards interativos, APIs robustas e ferramentas de produtividade desenvolvidas com Python, Streamlit, React e tecnologias modernas.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Streamlit</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">APIs</span>
                </div>
              </div>
            </Link>

            <Link to="/cybersec" className="group">
              <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 p-8 rounded-2xl border border-red-500/20 hover:border-red-400/40 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <FaShieldAlt className="text-3xl text-red-400" />
                  <h3 className="text-2xl font-bold text-red-300">Cibersegurança Avançada</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Ferramentas de proteção digital, sistemas de detecção de vulnerabilidades, simuladores de ataques para treinamento e soluções anti-phishing especializadas para o setor público.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">Anti-Phishing</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">Pentesting</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">Monitoramento</span>
                </div>
              </div>
            </Link>

            <Link to="/apps" className="group">
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <FaBrain className="text-3xl text-purple-400" />
                  <h3 className="text-2xl font-bold text-purple-300">Inteligência Artificial & ML</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Soluções de IA para automação de processos, análise preditiva, machine learning, processamento de linguagem natural e assistentes virtuais especializados para o setor público.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Machine Learning</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">NLP</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">AutoML</span>
                </div>
              </div>
            </Link>

            <Link to="/apps" className="group">
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 p-8 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <FaChartLine className="text-3xl text-green-400" />
                  <h3 className="text-2xl font-bold text-green-300">Análise de Dados & BI</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Dashboards avançados, análise de big data, business intelligence, visualizações interativas e ferramentas de tomada de decisão baseada em dados para gestão pública eficiente.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Dashboards</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Big Data</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">BI</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Apps Android Destaque */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              📱 Nossos Apps Android
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Aplicativos móveis desenvolvidos para facilitar seu dia a dia com tecnologia de ponta
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* NAF Digital */}
            <div className="group bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-gray-900/50 p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  📊
                </div>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold">NAF</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">NAF Digital</h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                Sistema completo de gestão para Núcleo de Apoio Contábil e Fiscal. Moderniza e otimiza atendimentos, 
                facilitando o trabalho de estudantes e coordenadores.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Gestão de atendimentos
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Multiplataforma
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Interface moderna
                </div>
              </div>

              <a
                href="https://naf.ltdestacio.com.br/apk/naf.apk"
                download
                className="group/btn w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg"
              >
                <FaAndroid className="text-xl group-hover/btn:animate-pulse" />
                <span className="font-semibold">Baixar APK</span>
                <FaDownload className="text-sm group-hover/btn:animate-bounce" />
              </a>
            </div>

            {/* Social Dev */}
            <div className="group bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-gray-900/50 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  👥
                </div>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold">Social</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">Social Dev</h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                Plataforma que conecta desenvolvedores e entusiastas de tecnologia. Promove colaboração e 
                compartilhamento de conhecimento com fóruns, tutoriais e eventos.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Fóruns de discussão
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Tutoriais interativos
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Eventos e networking
                </div>
              </div>

              <a
                href="https://socialdev.ltdestacio.com.br/apk/socialdev.apk"
                download
                className="group/btn w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg"
              >
                <FaAndroid className="text-xl group-hover/btn:animate-pulse" />
                <span className="font-semibold">Baixar APK</span>
                <FaDownload className="text-sm group-hover/btn:animate-bounce" />
              </a>
            </div>

            {/* Currículo Bot */}
            <div className="group bg-gradient-to-br from-green-900/30 via-green-800/20 to-gray-900/50 p-8 rounded-2xl border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  🤖
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold">IA</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">Currículo Bot</h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                Aplicativo inovador que utiliza inteligência artificial para criar currículos profissionais. 
                Modelos personalizáveis e sugestões automáticas tornam tudo simples e rápido.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Inteligência Artificial
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Modelos profissionais
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Rápido e eficiente
                </div>
              </div>

              <a
                href="https://curriculobot.ltdestacio.com.br/apk/curriculobot.apk"
                download
                className="group/btn w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg"
              >
                <FaAndroid className="text-xl group-hover/btn:animate-pulse" />
                <span className="font-semibold">Baixar APK</span>
                <FaDownload className="text-sm group-hover/btn:animate-bounce" />
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/produtos/apps-android"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
            >
              Ver Todos os Apps Android
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Extensão VS Code Destaque */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-blue-900/40 p-10 md:p-16 rounded-3xl border border-blue-500/30 backdrop-blur-md shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold">VS Code Extension</span>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Algorithm Complexity Analyzer Pro
                </h2>
                <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                  Extensão profissional para análise de complexidade de algoritmos diretamente no VS Code. 
                  Identifica Big O, otimiza código e fornece sugestões inteligentes em tempo real.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Análise de Complexidade Automática</h4>
                      <p className="text-gray-400 text-sm">Identifica Big O notation em tempo real</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Sugestões de Otimização</h4>
                      <p className="text-gray-400 text-sm">Recomendações para melhorar performance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Suporte Multi-linguagem</h4>
                      <p className="text-gray-400 text-sm">JavaScript, Python, Java, C++ e mais</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=EstevamSouza.algorithm-complexity-analyzer-pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg font-semibold"
                  >
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
                    </svg>
                    Instalar no VS Code
                  </a>
                  <Link
                    to="/produtos/vscode-extensions"
                    className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-semibold"
                  >
                    Ver Detalhes
                    <FaArrowRight />
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gray-900/50 rounded-2xl p-6 border border-blue-500/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-400 text-sm font-mono">algorithm-analyzer.js</span>
                  </div>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="text-purple-400">// Complexidade: O(n²)</div>
                    <div className="text-gray-400">function bubbleSort(arr) {'{'}</div>
                    <div className="text-gray-400 ml-4">for (let i = 0; i {'<'} arr.length; i++) {'{'}</div>
                    <div className="text-gray-400 ml-8">for (let j = 0; j {'<'} arr.length - 1; j++) {'{'}</div>
                    <div className="bg-yellow-500/10 text-yellow-400 ml-12 p-2 rounded border-l-4 border-yellow-500">
                      ⚠️ Algoritmo quadrático detectado
                    </div>
                    <div className="text-gray-400 ml-8">{'}'}</div>
                    <div className="text-gray-400 ml-4">{'}'}</div>
                    <div className="text-gray-400">{'}'}</div>
                    <div className="mt-4 bg-green-500/10 text-green-400 p-3 rounded border-l-4 border-green-500">
                      💡 Sugestão: Use Array.sort() O(n log n)
                    </div>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <div className="text-2xl font-bold text-blue-400">4.9★</div>
                    <div className="text-xs text-gray-400">Avaliação</div>
                  </div>
                  <div className="px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
                    <div className="text-2xl font-bold text-green-400">10K+</div>
                    <div className="text-xs text-gray-400">Downloads</div>
                  </div>
                  <div className="px-4 py-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                    <div className="text-2xl font-bold text-purple-400">Free</div>
                    <div className="text-xs text-gray-400">Gratuito</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-300 mb-6">
            "Transformando ideias em soluções digitais para um setor público mais eficiente e moderno"
          </h2>
          <div className="flex justify-center gap-8 text-sm text-gray-400 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              📍 Florianópolis, SC
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              🎓 Estácio de Sá
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              🤝 Parcerias Públicas
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              💻 Open Source
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;