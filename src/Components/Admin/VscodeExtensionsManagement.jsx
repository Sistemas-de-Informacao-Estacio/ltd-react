import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { FaCode, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaStar, FaDownload } from 'react-icons/fa';

export default function VscodeExtensionsManagement() {
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Produtividade',
    features: '',
    tags: '',
    marketplace_url: '',
    version: '1.0.0',
    rating: 4.5,
    installs: 0,
    author: 'LTD Team',
    published: true
  });

  const categories = [
    'Produtividade',
    'Snippets',
    'Temas',
    'Debuggers',
    'Formatadores',
    'Linters',
    'Linguagens',
    'Análise de Código',
    'Teste',
    'Extensões de IA'
  ];

  const fetchExtensions = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('ltd_vscode_extensions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExtensions(data || []);
    } catch (error) {
      console.error('Erro ao buscar extensões:', error);
      setMessage({ type: 'error', text: 'Erro ao carregar extensões' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExtensions();
  }, [fetchExtensions]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const extensionData = {
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim()),
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      rating: parseFloat(formData.rating),
      installs: parseInt(formData.installs)
    };

    try {
      if (editing) {
        const { error } = await supabase
          .from('ltd_vscode_extensions')
          .update(extensionData)
          .eq('id', editing);
        
        if (error) throw error;
        showMessage('success', 'Extensão atualizada com sucesso!');
      } else {
        const { error } = await supabase
          .from('ltd_vscode_extensions')
          .insert([extensionData]);
        
        if (error) throw error;
        showMessage('success', 'Extensão criada com sucesso!');
      }

      resetForm();
      fetchExtensions();
    } catch (error) {
      console.error('Erro ao salvar extensão:', error);
      showMessage('error', 'Erro ao salvar extensão');
    }
  };

  const handleEdit = (extension) => {
    setEditing(extension.id);
    setFormData({
      name: extension.name,
      description: extension.description,
      category: extension.category,
      features: Array.isArray(extension.features) ? extension.features.join('\n') : '',
      tags: Array.isArray(extension.tags) ? extension.tags.join(', ') : '',
      marketplace_url: extension.marketplace_url,
      version: extension.version,
      rating: extension.rating,
      installs: extension.installs,
      author: extension.author,
      published: extension.published
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta extensão?')) return;

    try {
      const { error } = await supabase
        .from('ltd_vscode_extensions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showMessage('success', 'Extensão excluída com sucesso!');
      fetchExtensions();
    } catch (error) {
      console.error('Erro ao excluir extensão:', error);
      showMessage('error', 'Erro ao excluir extensão');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Produtividade',
      features: '',
      tags: '',
      marketplace_url: '',
      version: '1.0.0',
      rating: 4.5,
      installs: 0,
      author: 'LTD Team',
      published: true
    });
    setEditing(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FaCode className="text-blue-500" />
            Gerenciar Extensões VS Code
          </h1>
          <p className="text-gray-400 mt-1">
            Total de extensões: {extensions.length}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition flex items-center gap-2"
        >
          <FaPlus /> Nova Extensão
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              {editing ? 'Editar Extensão' : 'Nova Extensão'}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Nome da Extensão *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Categoria *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Descrição *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                rows="3"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Autor *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Versão *</label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Rating (0-5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">URL do Marketplace *</label>
                <input
                  type="url"
                  value={formData.marketplace_url}
                  onChange={(e) => setFormData({ ...formData, marketplace_url: e.target.value })}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Instalações</label>
                <input
                  type="number"
                  value={formData.installs}
                  onChange={(e) => setFormData({ ...formData, installs: e.target.value })}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Funcionalidades (uma por linha)</label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                rows="4"
                placeholder="Funcionalidade 1&#10;Funcionalidade 2&#10;Funcionalidade 3"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Tags (separadas por vírgula)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                placeholder="vscode, extension, productivity"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="published" className="text-gray-300">
                Publicado
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2"
              >
                <FaSave /> {editing ? 'Atualizar' : 'Criar'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Extensions List */}
      <div className="grid grid-cols-1 gap-4">
        {extensions.map((extension) => (
          <div
            key={extension.id}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                  <FaCode className="text-3xl text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{extension.name}</h3>
                    <span className="text-sm text-gray-400">{extension.version}</span>
                    {!extension.published && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                        Não publicado
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">por {extension.author}</p>
                  <p className="text-gray-400 mb-3">{extension.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      {extension.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaDownload className="text-blue-400" />
                      {extension.installs?.toLocaleString()} instalações
                    </span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">
                      {extension.category}
                    </span>
                  </div>
                  
                  {extension.tags && extension.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {extension.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(extension)}
                  className="bg-blue-500/20 text-blue-400 p-3 rounded-lg hover:bg-blue-500/30 transition"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(extension.id)}
                  className="bg-red-500/20 text-red-400 p-3 rounded-lg hover:bg-red-500/30 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {extensions.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <FaCode className="mx-auto text-6xl mb-4 opacity-20" />
          <p className="text-xl">Nenhuma extensão cadastrada ainda</p>
          <p className="text-sm mt-2">Clique em "Nova Extensão" para começar</p>
        </div>
      )}
    </div>
  );
}
