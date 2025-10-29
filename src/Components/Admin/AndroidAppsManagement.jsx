import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { FaAndroid, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaStar, FaDownload } from 'react-icons/fa';

export default function AndroidAppsManagement() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Produtividade',
    icon: '📱',
    color_gradient: 'from-blue-500 to-purple-600',
    features: '',
    tags: '',
    download_url: '',
    version: '1.0.0',
    rating: 4.5,
    downloads: 0,
    published: true
  });

  const categories = [
    'Produtividade',
    'Ferramentas',
    'Educação',
    'Social',
    'Entretenimento',
    'Negócios',
    'Finanças',
    'Saúde'
  ];

  const fetchApps = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('produtos_android_apps')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApps(data || []);
    } catch (error) {
      console.error('Erro ao buscar apps:', error);
      setMessage({ type: 'error', text: 'Erro ao carregar apps' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const appData = {
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim()),
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      rating: parseFloat(formData.rating),
      downloads: parseInt(formData.downloads)
    };

    try {
      if (editing) {
        const { error } = await supabase
          .from('produtos_android_apps')
          .update(appData)
          .eq('id', editing);
        
        if (error) throw error;
        showMessage('success', 'App atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('produtos_android_apps')
          .insert([appData]);
        
        if (error) throw error;
        showMessage('success', 'App criado com sucesso!');
      }

      resetForm();
      fetchApps();
    } catch (error) {
      console.error('Erro ao salvar app:', error);
      showMessage('error', 'Erro ao salvar app');
    }
  };

  const handleEdit = (app) => {
    setEditing(app.id);
    setFormData({
      name: app.name,
      description: app.description,
      category: app.category,
      icon: app.icon,
      color_gradient: app.color_gradient,
      features: Array.isArray(app.features) ? app.features.join('\n') : '',
      tags: Array.isArray(app.tags) ? app.tags.join(', ') : '',
      download_url: app.download_url,
      version: app.version,
      rating: app.rating,
      downloads: app.downloads,
      published: app.published
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este app?')) return;

    try {
      const { error } = await supabase
        .from('produtos_android_apps')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showMessage('success', 'App excluído com sucesso!');
      fetchApps();
    } catch (error) {
      console.error('Erro ao excluir app:', error);
      showMessage('error', 'Erro ao excluir app');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Produtividade',
      icon: '📱',
      color_gradient: 'from-blue-500 to-purple-600',
      features: '',
      tags: '',
      download_url: '',
      version: '1.0.0',
      rating: 4.5,
      downloads: 0,
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
            <FaAndroid className="text-green-500" />
            Gerenciar Apps Android
          </h1>
          <p className="text-gray-400 mt-1">
            Total de apps: {apps.length}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition flex items-center gap-2"
        >
          <FaPlus /> Novo App
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
              {editing ? 'Editar App' : 'Novo App'}
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
                <label className="block text-gray-300 mb-2">Nome do App *</label>
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
                <label className="block text-gray-300 mb-2">Ícone (emoji)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-center text-2xl"
                  maxLength="2"
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
                <label className="block text-gray-300 mb-2">Gradient CSS</label>
                <input
                  type="text"
                  value={formData.color_gradient}
                  onChange={(e) => setFormData({ ...formData, color_gradient: e.target.value })}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="from-blue-500 to-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Downloads</label>
                <input
                  type="number"
                  value={formData.downloads}
                  onChange={(e) => setFormData({ ...formData, downloads: e.target.value })}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">URL de Download *</label>
              <input
                type="url"
                value={formData.download_url}
                onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                required
              />
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
                placeholder="android, app, mobile"
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
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2"
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

      {/* Apps List */}
      <div className="grid grid-cols-1 gap-4">
        {apps.map((app) => (
          <div
            key={app.id}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color_gradient} flex items-center justify-center text-3xl flex-shrink-0`}>
                  {app.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{app.name}</h3>
                    <span className="text-sm text-gray-400">{app.version}</span>
                    {!app.published && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                        Não publicado
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 mb-3">{app.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      {app.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaDownload className="text-blue-400" />
                      {app.downloads?.toLocaleString()} downloads
                    </span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full">
                      {app.category}
                    </span>
                  </div>
                  
                  {app.tags && app.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {app.tags.map((tag, index) => (
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
                  onClick={() => handleEdit(app)}
                  className="bg-blue-500/20 text-blue-400 p-3 rounded-lg hover:bg-blue-500/30 transition"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="bg-red-500/20 text-red-400 p-3 rounded-lg hover:bg-red-500/30 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {apps.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <FaAndroid className="mx-auto text-6xl mb-4 opacity-20" />
          <p className="text-xl">Nenhum app cadastrado ainda</p>
          <p className="text-sm mt-2">Clique em "Novo App" para começar</p>
        </div>
      )}
    </div>
  );
}
