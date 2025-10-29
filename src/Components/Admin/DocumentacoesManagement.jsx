import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

function DocumentacoesManagement() {
  const [documentacoes, setDocumentacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    descricao: '',
    conteudo: '',
    tecnologia: '',
    categoria: '',
    nivel: 'Intermediário',
    tempo_leitura: 10,
    icon_url: '',
    cover_image: '',
    tags: '',
    autor: 'Equipe LTD',
    published: true,
    destaque: false
  });

  useEffect(() => {
    fetchDocumentacoes();
  }, []);

  const fetchDocumentacoes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('documentacoes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar documentações:', error);
        alert('Erro ao carregar documentações: ' + error.message);
      } else {
        setDocumentacoes(data || []);
      }
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro ao carregar documentações');
    }
    setLoading(false);
  };

  const gerarSlug = (titulo) => {
    return titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'titulo') {
      setFormData({
        ...formData,
        titulo: value,
        slug: gerarSlug(value)
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Processar tags
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      const dataToSave = {
        ...formData,
        tags: tagsArray,
        tempo_leitura: parseInt(formData.tempo_leitura) || 10
      };

      let result;
      if (editando) {
        const { data, error } = await supabase
          .from('documentacoes')
          .update(dataToSave)
          .eq('id', editando.id)
          .select();

        result = { data, error };
      } else {
        const { data, error } = await supabase
          .from('documentacoes')
          .insert([dataToSave])
          .select();

        result = { data, error };
      }

      if (result.error) {
        console.error('Erro ao salvar:', result.error);
        alert('Erro ao salvar documentação: ' + result.error.message);
      } else {
        alert(editando ? 'Documentação atualizada!' : 'Documentação criada!');
        resetForm();
        fetchDocumentacoes();
      }
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro ao salvar documentação');
    }
    setLoading(false);
  };

  const handleEdit = (doc) => {
    setEditando(doc);
    setFormData({
      titulo: doc.titulo,
      slug: doc.slug,
      descricao: doc.descricao,
      conteudo: doc.conteudo,
      tecnologia: doc.tecnologia,
      categoria: doc.categoria,
      nivel: doc.nivel,
      tempo_leitura: doc.tempo_leitura,
      icon_url: doc.icon_url || '',
      cover_image: doc.cover_image || '',
      tags: doc.tags ? doc.tags.join(', ') : '',
      autor: doc.autor,
      published: doc.published,
      destaque: doc.destaque
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta documentação?')) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('documentacoes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar:', error);
        alert('Erro ao deletar documentação: ' + error.message);
      } else {
        alert('Documentação deletada!');
        fetchDocumentacoes();
      }
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro ao deletar documentação');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEditando(null);
    setFormData({
      titulo: '',
      slug: '',
      descricao: '',
      conteudo: '',
      tecnologia: '',
      categoria: '',
      nivel: 'Intermediário',
      tempo_leitura: 10,
      icon_url: '',
      cover_image: '',
      tags: '',
      autor: 'Equipe LTD',
      published: true,
      destaque: false
    });
  };

  const tecnologiasSugestoes = [
    'Node.js', 'Python', 'Docker', 'Git', 'Golang', 'React', 'TypeScript',
    'VS Code', 'Compiladores', 'Java', 'C#', 'Ruby', 'PHP', 'Rust'
  ];

  const categoriasSugestoes = [
    'Backend', 'Frontend', 'Análise de Dados', 'DevOps', 'Versionamento',
    'Extensões', 'Ciência da Computação', 'Mobile', 'Banco de Dados'
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '30px', color: '#00d4ff' }}>
        📚 Gerenciar Documentações
      </h2>

      {/* Formulário */}
      <div style={{
        background: '#1a1a1a',
        padding: '30px',
        borderRadius: '10px',
        marginBottom: '30px',
        border: '1px solid #333'
      }}>
        <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>
          {editando ? '✏️ Editar Documentação' : '➕ Nova Documentação'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '20px' }}>
            {/* Título */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                Título *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #333',
                  background: '#0a0a0a',
                  color: 'white',
                  fontSize: '1em'
                }}
                placeholder="Ex: Servidor Express com Node.js"
              />
            </div>

            {/* Slug */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                Slug (gerado automaticamente)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #333',
                  background: '#0a0a0a',
                  color: '#00d4ff',
                  fontSize: '1em'
                }}
                placeholder="servidor-express-nodejs"
              />
            </div>

            {/* Descrição */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                Descrição *
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                required
                rows="3"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #333',
                  background: '#0a0a0a',
                  color: 'white',
                  fontSize: '1em',
                  resize: 'vertical'
                }}
                placeholder="Breve descrição da documentação..."
              />
            </div>

            {/* Conteúdo */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                Conteúdo (Markdown) *
              </label>
              <textarea
                name="conteudo"
                value={formData.conteudo}
                onChange={handleInputChange}
                required
                rows="15"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '5px',
                  border: '1px solid #333',
                  background: '#0a0a0a',
                  color: 'white',
                  fontSize: '0.95em',
                  fontFamily: 'monospace',
                  resize: 'vertical'
                }}
                placeholder="# Título&#10;&#10;## Seção&#10;&#10;Conteúdo da documentação..."
              />
            </div>

            {/* Tecnologia e Categoria */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                  Tecnologia *
                </label>
                <input
                  type="text"
                  name="tecnologia"
                  value={formData.tecnologia}
                  onChange={handleInputChange}
                  required
                  list="tecnologias"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    background: '#0a0a0a',
                    color: 'white',
                    fontSize: '1em'
                  }}
                  placeholder="Node.js"
                />
                <datalist id="tecnologias">
                  {tecnologiasSugestoes.map(tech => (
                    <option key={tech} value={tech} />
                  ))}
                </datalist>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                  Categoria *
                </label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  required
                  list="categorias"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    background: '#0a0a0a',
                    color: 'white',
                    fontSize: '1em'
                  }}
                  placeholder="Backend"
                />
                <datalist id="categorias">
                  {categoriasSugestoes.map(cat => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Nível e Tempo de Leitura */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                  Nível *
                </label>
                <select
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    background: '#0a0a0a',
                    color: 'white',
                    fontSize: '1em',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                  Tempo de Leitura (minutos) *
                </label>
                <input
                  type="number"
                  name="tempo_leitura"
                  value={formData.tempo_leitura}
                  onChange={handleInputChange}
                  required
                  min="1"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    background: '#0a0a0a',
                    color: 'white',
                    fontSize: '1em'
                  }}
                />
              </div>
            </div>

            {/* URLs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                  URL do Ícone
                </label>
                <input
                  type="url"
                  name="icon_url"
                  value={formData.icon_url}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    background: '#0a0a0a',
                    color: 'white',
                    fontSize: '1em'
                  }}
                  placeholder="https://exemplo.com/icone.png"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                  URL da Capa
                </label>
                <input
                  type="url"
                  name="cover_image"
                  value={formData.cover_image}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    background: '#0a0a0a',
                    color: 'white',
                    fontSize: '1em'
                  }}
                  placeholder="https://exemplo.com/capa.jpg"
                />
              </div>
            </div>

            {/* Tags e Autor */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    background: '#0a0a0a',
                    color: 'white',
                    fontSize: '1em'
                  }}
                  placeholder="Node.js, Express, Backend, API"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>
                  Autor
                </label>
                <input
                  type="text"
                  name="autor"
                  value={formData.autor}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    background: '#0a0a0a',
                    color: 'white',
                    fontSize: '1em'
                  }}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span style={{ color: '#aaa' }}>Publicado</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="destaque"
                  checked={formData.destaque}
                  onChange={handleInputChange}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span style={{ color: '#aaa' }}>⭐ Destaque</span>
              </label>
            </div>

            {/* Botões */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '12px 30px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '1em',
                  fontWeight: 'bold',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? '⏳ Salvando...' : (editando ? '✏️ Atualizar' : '➕ Criar')}
              </button>

              {editando && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: '12px 30px',
                    background: '#333',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1em'
                  }}
                >
                  ❌ Cancelar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Lista de Documentações */}
      <div>
        <h3 style={{ marginBottom: '20px', color: '#00d4ff' }}>
          📋 Documentações Existentes ({documentacoes.length})
        </h3>

        {loading && <p>Carregando...</p>}

        <div style={{ display: 'grid', gap: '15px' }}>
          {documentacoes.map((doc) => (
            <div
              key={doc.id}
              style={{
                background: '#1a1a1a',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #333',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '20px',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
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
                  <span style={{
                    background: doc.published ? '#4CAF50' : '#f44336',
                    padding: '5px 12px',
                    borderRadius: '15px',
                    fontSize: '0.8em',
                    color: 'white'
                  }}>
                    {doc.published ? '✅ Publicado' : '❌ Não Publicado'}
                  </span>
                </div>

                <h4 style={{ marginBottom: '5px', color: '#00d4ff' }}>
                  {doc.titulo}
                </h4>
                <p style={{ color: '#aaa', fontSize: '0.9em', marginBottom: '5px' }}>
                  {doc.descricao.substring(0, 100)}...
                </p>
                <p style={{ color: '#666', fontSize: '0.85em' }}>
                  {doc.categoria} • ⏱️ {doc.tempo_leitura} min • 👁️ {doc.views} • ❤️ {doc.likes}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleEdit(doc)}
                  style={{
                    padding: '10px 20px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  style={{
                    padding: '10px 20px',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocumentacoesManagement;
