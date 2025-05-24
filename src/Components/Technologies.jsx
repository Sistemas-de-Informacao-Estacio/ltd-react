import React, { useState } from 'react';
import { DiPython } from 'react-icons/di';
import { SiJavascript, SiNodedotjs, SiDocker, SiTensorflow } from 'react-icons/si';
import { FaReact, FaNetworkWired, FaCoffee, FaCloud, FaTimes } from 'react-icons/fa';
import { ImDatabase } from "react-icons/im";

function Technologies() {
  const [selectedTech, setSelectedTech] = useState(null);

  const technologies = {
    python: {
      name: "Python",
      icon: <DiPython className="text-6xl text-blue-400 mx-auto mb-4" />,
      description: "Linguagem de programação versátil e poderosa",
      projects: [
        {
          name: "Segurança Digital Avançada",
          category: "Cyber Segurança",
          description: "Sistema de segurança digital para prefeituras com verificação de senhas e detecção de vulnerabilidades"
        },
        {
          name: "Gerador de Senhas",
          category: "Cyber Segurança", 
          description: "Gerador profissional com alta entropia criptográfica seguindo padrões NIST"
        },
        {
          name: "Simulador de Phishing",
          category: "Cyber Segurança",
          description: "Ferramenta para campanhas educacionais de conscientização sobre segurança"
        },
        {
          name: "Neura AI Assistant",
          category: "Inteligência Artificial",
          description: "Sistema desktop com interface moderna integrado à API Dify"
        }
      ]
    },
    java: {
      name: "Java",
      icon: <FaCoffee className="text-6xl text-blue-400 mx-auto mb-4" />,
      description: "Linguagem robusta para desenvolvimento enterprise",
      projects: [
        {
          name: "Sistema de Autoavaliação de Segurança",
          category: "Cyber Segurança",
          description: "Aplicação para prefeituras avaliarem práticas de segurança digital"
        },
        {
          name: "Checklist de Segurança ISO",
          category: "Cyber Segurança",
          description: "Sistema para verificações de conformidade com normas e LGPD"
        }
      ]
    },
    javascript: {
      name: "JavaScript",
      icon: <SiJavascript className="text-6xl text-blue-400 mx-auto mb-4" />,
      description: "Linguagem essencial para desenvolvimento web moderno",
      projects: [
        {
          name: "CurriculoBot",
          category: "Desenvolvimento de Software",
          description: "Assistente interativo para criação de currículos com interface futurista"
        },
        {
          name: "Templates de E-mail",
          category: "Desenvolvimento de Software",
          description: "Conjunto de templates personalizáveis para comunicação institucional"
        },
        {
          name: "Dashboard Financeiro",
          category: "Análise de Dados",
          description: "Visualização interativa de dados orçamentários municipais"
        }
      ]
    },
    react: {
      name: "React",
      icon: <FaReact className="text-6xl text-blue-400 mx-auto mb-4" />,
      description: "Biblioteca para interfaces de usuário dinâmicas",
      projects: [
        {
          name: "Portal TechPrefeitura",
          category: "Desenvolvimento de Software",
          description: "Este próprio website com interface moderna e responsiva"
        },
        {
          name: "Dashboard Financeiro",
          category: "Análise de Dados",
          description: "Interface interativa para análise de dados financeiros municipais"
        }
      ]
    },
    nodejs: {
      name: "Node.js",
      icon: <SiNodedotjs className="text-6xl text-blue-400 mx-auto mb-4" />,
      description: "Runtime JavaScript para desenvolvimento backend",
      projects: [
        {
          name: "Sistema de E-mails",
          category: "Desenvolvimento de Software",
          description: "Backend para gerenciamento de comunicação institucional"
        },
        {
          name: "Encurtador de URL",
          category: "Desenvolvimento de Software",
          description: "API para encurtamento inteligente de URLs com IA"
        }
      ]
    },
    sql: {
      name: "SQL",
      icon: <ImDatabase className="text-6xl text-blue-400 mx-auto mb-4" />,
      description: "Linguagem para gerenciamento de banco de dados",
      projects: [
        {
          name: "Gerador de Ofícios",
          category: "Desenvolvimento de Software",
          description: "Sistema completo com controle de numeração e gestão de usuários"
        },
        {
          name: "Sistema de E-mails",
          category: "Desenvolvimento de Software",
          description: "Gerenciamento de contatos e histórico de comunicações"
        },
        {
          name: "Analisador de Dados Públicos",
          category: "Análise de Dados",
          description: "Processamento e armazenamento de grandes volumes de dados municipais"
        }
      ]
    },
    aws: {
      name: "AWS",
      icon: <FaCloud className="text-6xl text-blue-400 mx-auto mb-4" />,
      description: "Plataforma de computação em nuvem",
      projects: [
        {
          name: "Hospedagem de Aplicações",
          category: "Infraestrutura",
          description: "Deploy e escalabilidade dos sistemas desenvolvidos"
        },
        {
          name: "Armazenamento de Dados",
          category: "Infraestrutura", 
          description: "Backup seguro e distribuído dos dados municipais"
        }
      ]
    },
    docker: {
      name: "Docker",
      icon: <SiDocker className="text-6xl text-blue-400 mx-auto mb-4" />,
      description: "Containerização para desenvolvimento e deploy",
      projects: [
        {
          name: "Ambiente de Desenvolvimento",
          category: "DevOps",
          description: "Padronização de ambientes para toda a equipe"
        },
        {
          name: "Deploy Automatizado",
          category: "DevOps",
          description: "Containerização de aplicações para deploy eficiente"
        }
      ]
    },
    tensorflow: {
      name: "TensorFlow",
      icon: <SiTensorflow className="text-6xl text-blue-400 mx-auto mb-4" />,
      description: "Framework para machine learning e IA",
      projects: [
        {
          name: "Notícias com IA",
          category: "Inteligência Artificial",
          description: "Sistema de análise e categorização automática de notícias"
        },
        {
          name: "Análise Preditiva",
          category: "Análise de Dados",
          description: "Modelos para previsão de tendências em dados municipais"
        }
      ]
    },
    redes: {
      name: "Redes",
      icon: <FaNetworkWired className="text-6xl text-blue-400 mx-auto mb-4" />,
      description: "Configuração e segurança de redes",
      projects: [
        {
          name: "Infraestrutura de Rede",
          category: "Cyber Segurança",
          description: "Configuração segura de redes para as prefeituras"
        },
        {
          name: "Monitoramento de Tráfego",
          category: "Cyber Segurança",
          description: "Sistemas de detecção de intrusão e análise de tráfego"
        }
      ]
    }
  };

  const openModal = (techKey) => {
    setSelectedTech(techKey);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedTech(null);
    document.body.style.overflow = 'auto';
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Cyber Segurança": "text-red-400 border-red-400",
      "Desenvolvimento de Software": "text-blue-400 border-blue-400", 
      "Inteligência Artificial": "text-purple-400 border-purple-400",
      "Análise de Dados": "text-orange-400 border-orange-400",
      "Infraestrutura": "text-green-400 border-green-400",
      "DevOps": "text-yellow-400 border-yellow-400"
    };
    return colors[category] || "text-gray-400 border-gray-400";
  };

  return (
    <div>
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-2 animate-pulse leading-snug">
          Tecnologias Utilizadas no LTD
        </h1>
        <p className="text-2xl font-serif text-white mb-2">
          Ferramentas e linguagens aplicadas em nossos projetos
        </p>
        <p className="text-lg text-gray-300">
          Clique em cada tecnologia para ver os projetos desenvolvidos
        </p>
      </section>

      <section className="w-full max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Object.entries(technologies).map(([key, tech]) => (
            <div 
              key={key}
              onClick={() => openModal(key)}
              className="flex flex-col items-center bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:border-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer hover:bg-white/20"
            >
              {React.cloneElement(tech.icon, { className: "text-2xl text-blue-400 mx-auto mb-4" })}
              <h4 className="text-base font-semibold text-white mb-2">{tech.name}</h4>
              <div className="text-xs text-gray-300 opacity-75">Clique para ver projetos</div>
            </div>
          ))}
        </div>
      </section>

      {selectedTech && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-600">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-600 p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                {technologies[selectedTech].icon}
                <div>
                  <h2 className="text-3xl font-bold text-white">{technologies[selectedTech].name}</h2>
                  <p className="text-gray-300">{technologies[selectedTech].description}</p>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-2xl p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Projetos Desenvolvidos ({technologies[selectedTech].projects.length})
              </h3>
              
              <div className="grid gap-4">
                {technologies[selectedTech].projects.map((project, index) => (
                  <div key={index} className="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-gray-500 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-xl font-bold text-white">{project.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{project.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <button 
                  onClick={closeModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Technologies;