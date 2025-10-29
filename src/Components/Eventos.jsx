import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaShieldAlt, FaTrophy, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Eventos() {
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  // Scroll para o topo quando o componente é montado
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const eventos = [
    {
      id: 'sepesqi',
      titulo: 'Apresentação no SEPESQI 2024',
      subtitulo: 'Semana de Ensino, Pesquisa e Inovação - Estacio',
      data: '15 de Maio de 2024',
      local: 'Estacio - Universidade de Floripa',
      categoria: 'Apresentação Acadêmica',
      icon: FaTrophy,
      color: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-900/30 to-pink-900/30',
      borderColor: 'border-purple-500/20',
      imagens: [
        '/eventos/SEPESQI/apresentacao-ltd.png'
      ],
      descricao: `No dia 15 de Maio de 2024, tivemos a honra de apresentar o projeto Laboratório de Transformação Digital (LTD) durante o evento SEPESQI - Semana de Ensino, Pesquisa e Inovação da Estacio. Este evento é uma plataforma importante para compartilhar inovações acadêmicas e tecnológicas, e nossa participação destacou o impacto do LTD na transformação digital dentro do ambiente educacional.

Durante nossa apresentação, detalhamos as soluções tecnológicas desenvolvidas pelo LTD, enfatizando como elas estão sendo aplicadas para melhorar processos educacionais e administrativos na universidade. Destacamos também os benefícios da integração de tecnologias emergentes, como inteligência artificial e análise de dados, no contexto acadêmico.

A recepção foi extremamente positiva, com muitos participantes expressando interesse em colaborar e aprender mais sobre nossas iniciativas. A participação no SEPESQI reforça nosso compromisso com a inovação e a excelência acadêmica, além de fortalecer nossa rede de contatos dentro da comunidade universitária.

Estamos entusiasmados com as oportunidades futuras que surgirão a partir dessa apresentação e continuaremos a trabalhar arduamente para impulsionar a transformação digital na educação.`,
      destaques: [
        'Apresentação das soluções LTD',
        'Demonstração de tecnologias emergentes',
        'Networking com comunidade acadêmica',
        'Reconhecimento institucional'
      ]
    },
    {
      id: 'seguranca',
      titulo: 'Reunião - Centro de Inovação e Tecnologia',
      subtitulo: 'Parceria com a Prefeitura de São José',
      data: '05 de Junho de 2025',
      local: 'Centro de Inovação e Tecnologia Educacional - São José',
      categoria: 'Treinamento Técnico',
      icon: FaShieldAlt,
      color: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-900/30 to-purple-900/30',
      borderColor: 'border-blue-500/20',
      imagens: [
        '/eventos/seguranca/reuniao.png'
      ],
      descricao: `Hoje pela manhã tivemos uma reunião com a diretora Luciana e sua equipe do Centro de Inovação e Tecnologia Educacional de São José. O objetivo foi alinhar ações conjuntas envolvendo o nosso projeto do Laboratório de Transformação Digital neste semestre.

A principal definição foi a realização de um treinamento técnico voltado à equipe do centro de inovação, com foco nos seguintes temas: Análise de Dados, Inteligência Artificial e Segurança da Informação.

Esse treinamento será ministrado por nós, utilizando as soluções e ferramentas que estamos desenvolvendo no projeto LTD 2025.1 — ou seja, é uma aplicação direta do que estamos criando em um contexto institucional.

📅 A data prevista é 05/06, mas pode ser antecipada conforme a agenda deles.

Essa atividade não é apenas uma entrega — é uma etapa concreta de validação e impacto. Vamos mostrar como a universidade pode contribuir de forma técnica e efetiva com o setor público. Conto com o envolvimento e a dedicação de todos vocês!!!`,
      destaques: [
        'Treinamento em Análise de Dados',
        'Workshop de Inteligência Artificial',
        'Segurança da Informação aplicada',
        'Validação das ferramentas LTD'
      ]
    },
    {
      id: 'seguranca-idosos',
      titulo: 'Workshop - Segurança Digital para Idosos',
      subtitulo: 'Inclusão Digital e Proteção Online',
      data: 'Março de 2024',
      local: 'Centro Comunitário - Florianópolis',
      categoria: 'Workshop Social',
      icon: FaUsers,
      color: 'from-green-500 to-green-600',
      bgGradient: 'from-green-900/30 to-blue-900/30',
      borderColor: 'border-green-500/20',
      imagens: [
        '/eventos/seguranca-idosos/idosos1.png',
        '/eventos/seguranca-idosos/idosos2.png'
      ],
      descricao: `Ensinar os idosos a se protegerem no ambiente digital é uma missão crucial nos dias de hoje. Recentemente, tivemos a oportunidade de conduzir uma reunião focada em segurança digital para idosos, onde abordamos temas essenciais para garantir a proteção deles online.

Ensinamos práticas seguras de navegação, como identificar e evitar golpes comuns, a importância de senhas fortes e atualizações regulares de software. Também discutimos o uso consciente das redes sociais e a proteção de informações pessoais.

A interação foi enriquecedora, com muitos idosos compartilhando suas experiências e dúvidas. Essa iniciativa reforça nosso compromisso em promover a inclusão digital e a segurança para todas as faixas etárias.

E também, mostrando como seria o uso de Wireshark para monitorar a rede doméstica deles, para identificar possíveis ameaças. Demonstramos de forma prática e acessível como a tecnologia pode ser uma aliada na proteção contra crimes digitais.`,
      destaques: [
        'Identificação de golpes digitais',
        'Práticas de navegação segura',
        'Proteção de dados pessoais',
        'Demonstração prática com Wireshark'
      ]
    }
  ];

  const handleVerDetalhes = (evento) => {
    setEventoSelecionado(evento);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVoltar = () => {
    setEventoSelecionado(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (eventoSelecionado) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Botão Voltar */}
          <button
            onClick={handleVoltar}
            className="mb-8 flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 border border-gray-700 hover:border-gray-600"
          >
            <FaArrowLeft />
            Voltar para Eventos
          </button>

          {/* Cabeçalho do Evento */}
          <div className={`bg-gradient-to-r ${eventoSelecionado.color} p-8 md:p-12 rounded-3xl mb-8 shadow-2xl`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <eventoSelecionado.icon className="text-3xl text-white" />
              </div>
              <div>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                  {eventoSelecionado.categoria}
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {eventoSelecionado.titulo}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {eventoSelecionado.subtitulo}
            </p>
            
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>{eventoSelecionado.data}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>{eventoSelecionado.local}</span>
              </div>
            </div>
          </div>

          {/* Galeria de Imagens */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              📸 Galeria de Fotos
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {eventoSelecionado.imagens.map((imagem, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={imagem}
                    alt={`${eventoSelecionado.titulo} - Foto ${index + 1}`}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-80 bg-gray-800 flex items-center justify-center">
                          <span class="text-gray-500">Imagem não disponível</span>
                        </div>
                      `;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Descrição */}
          <div className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-700 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              📝 Sobre o Evento
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-4 text-lg">
              {eventoSelecionado.descricao.split('\n\n').map((paragrafo, index) => (
                <p key={index}>{paragrafo}</p>
              ))}
            </div>
          </div>

          {/* Destaques */}
          <div className={`bg-gradient-to-br ${eventoSelecionado.bgGradient} rounded-3xl p-8 md:p-12 border ${eventoSelecionado.borderColor} backdrop-blur-sm`}>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              ⭐ Principais Destaques
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {eventoSelecionado.destaques.map((destaque, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-200 text-lg">{destaque}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navegação entre eventos */}
          <div className="mt-12 flex justify-between items-center gap-4">
            <button
              onClick={() => {
                const currentIndex = eventos.findIndex(e => e.id === eventoSelecionado.id);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : eventos.length - 1;
                handleVerDetalhes(eventos[prevIndex]);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 border border-gray-700 hover:border-gray-600"
            >
              <FaArrowLeft />
              Evento Anterior
            </button>
            <button
              onClick={() => {
                const currentIndex = eventos.findIndex(e => e.id === eventoSelecionado.id);
                const nextIndex = currentIndex < eventos.length - 1 ? currentIndex + 1 : 0;
                handleVerDetalhes(eventos[nextIndex]);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 border border-gray-700 hover:border-gray-600"
            >
              Próximo Evento
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-blue-500/20 rounded-full text-blue-300 font-semibold mb-6">
            📅 Eventos e Reuniões
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6">
            Nossos Eventos
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Acompanhe as principais reuniões, workshops e apresentações do Laboratório de Transformação Digital
          </p>
        </div>

        {/* Grid de Eventos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className={`group bg-gradient-to-br ${evento.bgGradient} rounded-3xl overflow-hidden border ${evento.borderColor} backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer`}
              onClick={() => handleVerDetalhes(evento)}
            >
              {/* Imagem Principal */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={evento.imagens[0]}
                  alt={evento.titulo}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span class="text-6xl">${evento.id === 'sepesqi' ? '🎓' : evento.id === 'seguranca' ? '🔒' : '👴'}</span>
                      </div>
                    `;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${evento.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <evento.icon className="text-xl text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold">
                    {evento.categoria}
                  </span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {evento.titulo}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {evento.subtitulo}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <FaCalendarAlt className="text-blue-400" />
                    <span>{evento.data}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <FaMapMarkerAlt className="text-green-400" />
                    <span className="line-clamp-1">{evento.local}</span>
                  </div>
                </div>

                <button
                  className={`w-full bg-gradient-to-r ${evento.color} hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg`}
                >
                  Ver Detalhes
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 rounded-3xl p-8 md:p-12 border border-blue-500/20 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Impacto dos Nossos Eventos
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">3+</div>
              <div className="text-gray-300">Eventos Realizados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">200+</div>
              <div className="text-gray-300">Participantes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">2</div>
              <div className="text-gray-300">Parcerias</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">100%</div>
              <div className="text-gray-300">Satisfação</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/ltd/contato"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
          >
            Quer participar dos próximos eventos?
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Eventos;
