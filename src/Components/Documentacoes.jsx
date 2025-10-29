import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import '../Noticias.css';

function Documentacoes() {
  const [documentacoes, setDocumentacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroTecnologia, setFiltroTecnologia] = useState('Todas');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroNivel, setFiltroNivel] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [docSelecionada, setDocSelecionada] = useState(null);

  // Buscar documentações
  useEffect(() => {
    fetchDocumentacoes();
  }, []);

  const fetchDocumentacoes = async () => {
    try {
      setLoading(true);
      console.log('📚 Buscando documentações...');

      const { data, error, count } = await supabase
        .from('documentacoes')
        .select('*', { count: 'exact' })
        .eq('published', true)
        .order('created_at', { ascending: false });

      console.log('📦 Resposta do Supabase:', { data, error, count });

      if (error) {
        console.error('❌ Erro do Supabase:', error);
        throw error;
      }

      if (data) {
        console.log(`✅ ${data.length} documentações carregadas`);
        setDocumentacoes(data);
      }
    } catch (err) {
      console.error('❌ Erro ao carregar documentações:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obter tecnologias únicas
  const tecnologias = ['Todas', ...new Set(documentacoes.map(doc => doc.tecnologia))];
  const categorias = ['Todas', ...new Set(documentacoes.map(doc => doc.categoria))];
  const niveis = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

  // Filtrar documentações
  const documentacoesFiltradas = documentacoes.filter(doc => {
    const matchTecnologia = filtroTecnologia === 'Todas' || doc.tecnologia === filtroTecnologia;
    const matchCategoria = filtroCategoria === 'Todas' || doc.categoria === filtroCategoria;
    const matchNivel = filtroNivel === 'Todos' || doc.nivel === filtroNivel;
    const matchSearch = doc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       doc.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    return matchTecnologia && matchCategoria && matchNivel && matchSearch;
  });

  // Formatar data
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Renderizar conteúdo com markdown simples
  const renderConteudo = (conteudo) => {
    return conteudo.split('\n').map((linha, index) => {
      // Títulos
      if (linha.startsWith('### ')) {
        return <h3 key={index} style={{ marginTop: '20px', color: '#00d4ff' }}>{linha.replace('### ', '')}</h3>;
      }
      if (linha.startsWith('## ')) {
        return <h2 key={index} style={{ marginTop: '25px', color: '#00d4ff', borderBottom: '2px solid #00d4ff', paddingBottom: '5px' }}>{linha.replace('## ', '')}</h2>;
      }
      if (linha.startsWith('# ')) {
        return <h1 key={index} style={{ marginTop: '30px', color: '#00d4ff' }}>{linha.replace('# ', '')}</h1>;
      }
      
      // Código
      if (linha.startsWith('```')) {
        return null; // Ignorar delimitadores de código
      }
      
      // Listas
      if (linha.startsWith('- ')) {
        return <li key={index} style={{ marginLeft: '20px' }}>{linha.replace('- ', '')}</li>;
      }
      
      // Parágrafo normal
      if (linha.trim()) {
        return <p key={index} style={{ lineHeight: '1.6', marginBottom: '10px' }}>{linha}</p>;
      }
      
      return <br key={index} />;
    });
  };

  if (loading) {
    return (
      <div className="noticias-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando documentações...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="noticias-container">
        <div className="error-message">
          <h2>⚠️ Erro ao carregar documentações</h2>
          <p>{error}</p>
          <button onClick={fetchDocumentacoes} className="btn-retry">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // Modal de documentação completa
  if (docSelecionada) {
    return (
      <div className="noticias-container">
        <div className="noticia-completa">
          <button 
            onClick={() => setDocSelecionada(null)} 
            className="btn-voltar"
            style={{ 
              position: 'sticky', 
              top: '20px', 
              zIndex: 1000,
              marginBottom: '20px'
            }}
          >
            ← Voltar
          </button>

          {docSelecionada.cover_image && (
            <img 
              src={docSelecionada.cover_image} 
              alt={docSelecionada.titulo}
              className="noticia-imagem-completa"
              style={{ maxWidth: '100%', borderRadius: '10px', marginBottom: '20px' }}
            />
          )}

          <div className="doc-header" style={{ marginBottom: '30px' }}>
            <h1 style={{ color: '#00d4ff', fontSize: '2.5em', marginBottom: '15px' }}>
              {docSelecionada.titulo}
            </h1>
            
            <div className="doc-meta" style={{ 
              display: 'flex', 
              gap: '15px', 
              flexWrap: 'wrap',
              marginBottom: '20px'
            }}>
              <span className="badge" style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '8px 15px',
                borderRadius: '20px',
                color: 'white',
                fontSize: '0.9em'
              }}>
                📚 {docSelecionada.tecnologia}
              </span>
              <span className="badge" style={{ 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                padding: '8px 15px',
                borderRadius: '20px',
                color: 'white',
                fontSize: '0.9em'
              }}>
                🎯 {docSelecionada.categoria}
              </span>
              <span className="badge" style={{ 
                background: docSelecionada.nivel === 'Iniciante' ? '#4CAF50' : 
                           docSelecionada.nivel === 'Intermediário' ? '#FF9800' : '#F44336',
                padding: '8px 15px',
                borderRadius: '20px',
                color: 'white',
                fontSize: '0.9em'
              }}>
                📊 {docSelecionada.nivel}
              </span>
              <span className="badge" style={{ 
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                padding: '8px 15px',
                borderRadius: '20px',
                color: 'white',
                fontSize: '0.9em'
              }}>
                ⏱️ {docSelecionada.tempo_leitura} min
              </span>
            </div>

            <p style={{ 
              fontSize: '1.2em', 
              color: '#aaa', 
              lineHeight: '1.6',
              marginBottom: '15px'
            }}>
              {docSelecionada.descricao}
            </p>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '15px 0',
              borderTop: '1px solid #333',
              borderBottom: '1px solid #333',
              marginBottom: '30px'
            }}>
              <span style={{ color: '#888' }}>
                ✍️ {docSelecionada.autor}
              </span>
              <span style={{ color: '#888' }}>
                📅 {formatarData(docSelecionada.created_at)}
              </span>
              <span style={{ color: '#888' }}>
                👁️ {docSelecionada.views} visualizações
              </span>
            </div>

            {docSelecionada.tags && docSelecionada.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {docSelecionada.tags.map((tag, index) => (
                  <span 
                    key={index}
                    style={{
                      background: '#333',
                      padding: '5px 12px',
                      borderRadius: '15px',
                      fontSize: '0.85em',
                      color: '#00d4ff'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="doc-conteudo" style={{ 
            background: '#1a1a1a',
            padding: '30px',
            borderRadius: '10px',
            fontSize: '1.1em',
            lineHeight: '1.8'
          }}>
            {renderConteudo(docSelecionada.conteudo)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="noticias-container">
      <header className="noticias-header">
        <h1 className="noticias-titulo">📚 Documentações Técnicas</h1>
        <p className="noticias-subtitulo">
          Tutoriais e guias completos sobre diversas tecnologias
        </p>
      </header>

      {/* Barra de Pesquisa */}
      <div className="search-bar" style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="🔍 Pesquisar documentações..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '15px 20px',
            fontSize: '1.1em',
            borderRadius: '30px',
            border: '2px solid #333',
            background: '#1a1a1a',
            color: 'white',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#00d4ff'}
          onBlur={(e) => e.target.style.borderColor = '#333'}
        />
      </div>

      {/* Filtros */}
      <div className="filtros" style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <select
          value={filtroTecnologia}
          onChange={(e) => setFiltroTecnologia(e.target.value)}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: '2px solid #333',
            background: '#1a1a1a',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1em'
          }}
        >
          {tecnologias.map(tech => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </select>

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: '2px solid #333',
            background: '#1a1a1a',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1em'
          }}
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={filtroNivel}
          onChange={(e) => setFiltroNivel(e.target.value)}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: '2px solid #333',
            background: '#1a1a1a',
            color: 'white',
            cursor: 'pointer',
            fontSize: '1em'
          }}
        >
          {niveis.map(nivel => (
            <option key={nivel} value={nivel}>{nivel}</option>
          ))}
        </select>

        {(filtroTecnologia !== 'Todas' || filtroCategoria !== 'Todas' || filtroNivel !== 'Todos' || searchTerm) && (
          <button
            onClick={() => {
              setFiltroTecnologia('Todas');
              setFiltroCategoria('Todas');
              setFiltroNivel('Todos');
              setSearchTerm('');
            }}
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              border: 'none',
              background: '#ff4444',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1em'
            }}
          >
            Limpar Filtros
          </button>
        )}
      </div>

      {/* Estatísticas */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px',
          borderRadius: '15px',
          flex: '1',
          minWidth: '200px'
        }}>
          <h3 style={{ margin: 0, fontSize: '2em' }}>{documentacoesFiltradas.length}</h3>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Documentações</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding: '20px',
          borderRadius: '15px',
          flex: '1',
          minWidth: '200px'
        }}>
          <h3 style={{ margin: 0, fontSize: '2em' }}>{tecnologias.length - 1}</h3>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Tecnologias</p>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: '20px',
          borderRadius: '15px',
          flex: '1',
          minWidth: '200px'
        }}>
          <h3 style={{ margin: 0, fontSize: '2em' }}>{categorias.length - 1}</h3>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Categorias</p>
        </div>
      </div>

      {/* Grid de Documentações */}
      <div className="noticias-grid">
        {documentacoesFiltradas.length === 0 ? (
          <div style={{ 
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '50px',
            color: '#888'
          }}>
            <h2>📭 Nenhuma documentação encontrada</h2>
            <p>Tente ajustar os filtros ou buscar por outros termos</p>
          </div>
        ) : (
          documentacoesFiltradas.map((doc) => (
            <div 
              key={doc.id} 
              className="noticia-card"
              style={{
                cursor: 'pointer',
                transform: 'scale(1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onClick={() => setDocSelecionada(doc)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {doc.cover_image && (
                <img 
                  src={doc.cover_image} 
                  alt={doc.titulo}
                  className="noticia-imagem"
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: '10px 10px 0 0'
                  }}
                />
              )}

              <div className="noticia-content" style={{ padding: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginBottom: '12px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '5px 12px',
                    borderRadius: '15px',
                    fontSize: '0.8em',
                    color: 'white'
                  }}>
                    {doc.tecnologia}
                  </span>
                  <span style={{ 
                    background: doc.nivel === 'Iniciante' ? '#4CAF50' : 
                               doc.nivel === 'Intermediário' ? '#FF9800' : '#F44336',
                    padding: '5px 12px',
                    borderRadius: '15px',
                    fontSize: '0.8em',
                    color: 'white'
                  }}>
                    {doc.nivel}
                  </span>
                  {doc.destaque && (
                    <span style={{ 
                      background: 'gold',
                      padding: '5px 12px',
                      borderRadius: '15px',
                      fontSize: '0.8em',
                      color: '#000'
                    }}>
                      ⭐ Destaque
                    </span>
                  )}
                </div>

                <h2 className="noticia-titulo-card" style={{ 
                  fontSize: '1.5em',
                  marginBottom: '10px',
                  color: '#00d4ff'
                }}>
                  {doc.titulo}
                </h2>

                <p className="noticia-descricao" style={{ 
                  color: '#aaa',
                  marginBottom: '15px',
                  lineHeight: '1.5'
                }}>
                  {doc.descricao}
                </p>

                {doc.tags && doc.tags.length > 0 && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '5px', 
                    flexWrap: 'wrap',
                    marginBottom: '15px'
                  }}>
                    {doc.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        style={{
                          background: '#333',
                          padding: '3px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75em',
                          color: '#00d4ff'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="noticia-footer" style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '15px',
                  borderTop: '1px solid #333',
                  fontSize: '0.9em',
                  color: '#888'
                }}>
                  <span>⏱️ {doc.tempo_leitura} min</span>
                  <span>👁️ {doc.views}</span>
                  <span>❤️ {doc.likes}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Documentacoes;
