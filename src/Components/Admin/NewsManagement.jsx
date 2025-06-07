import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUpload, FaNewspaper, FaEye, FaEyeSlash, FaStar } from 'react-icons/fa';

function NewsManagement() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingNews, setEditingNews] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        image_url: '',
        author: 'Admin',
        category: 'Geral',
        published: true,
        featured: false,
        tags: []
    });
    const [tagInput, setTagInput] = useState('');

    const categories = [
        'Geral',
        'Tecnologia', 
        'Cibersegurança',
        'Inteligência Artificial',
        'Desenvolvimento',
        'Eventos',
        'Empresa'
    ];

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setNews(data || []);
        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecione apenas arquivos de imagem');
            return;
        }

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `news/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            setFormData({
                ...formData,
                image_url: publicUrl
            });

        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            alert('Erro ao fazer upload da imagem');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newsData = {
                ...formData,
                tags: formData.tags.length > 0 ? formData.tags : null,
                updated_at: new Date().toISOString()
            };

            if (editingNews) {
                const { error } = await supabase
                    .from('news')
                    .update(newsData)
                    .eq('id', editingNews.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('news')
                    .insert([newsData]);

                if (error) throw error;
            }

            handleCancelEdit();
            fetchNews();
        } catch (error) {
            console.error('Erro ao salvar notícia:', error);
            alert('Erro ao salvar notícia');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (newsItem) => {
        setFormData({
            title: newsItem.title,
            content: newsItem.content,
            excerpt: newsItem.excerpt || '',
            image_url: newsItem.image_url || '',
            author: newsItem.author || 'Admin',
            category: newsItem.category,
            published: newsItem.published,
            featured: newsItem.featured,
            tags: newsItem.tags || []
        });
        setEditingNews(newsItem);
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
            try {
                const { error } = await supabase
                    .from('news')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                fetchNews();
            } catch (error) {
                console.error('Erro ao excluir notícia:', error);
                alert('Erro ao excluir notícia');
            }
        }
    };

    const togglePublished = async (id, published) => {
        try {
            const { error } = await supabase
                .from('news')
                .update({ published: !published })
                .eq('id', id);

            if (error) throw error;
            fetchNews();
        } catch (error) {
            console.error('Erro ao alterar status:', error);
        }
    };

    const toggleFeatured = async (id, featured) => {
        try {
            const { error } = await supabase
                .from('news')
                .update({ featured: !featured })
                .eq('id', id);

            if (error) throw error;
            fetchNews();
        } catch (error) {
            console.error('Erro ao alterar destaque:', error);
        }
    };

    const handleCancelEdit = () => {
        setFormData({
            title: '',
            content: '',
            excerpt: '',
            image_url: '',
            author: 'Admin',
            category: 'Geral',
            published: true,
            featured: false,
            tags: []
        });
        setEditingNews(null);
        setShowAddForm(false);
        setTagInput('');
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()]
            });
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Geral': 'bg-gray-100 text-gray-800',
            'Tecnologia': 'bg-blue-100 text-blue-800',
            'Cibersegurança': 'bg-red-100 text-red-800',
            'Inteligência Artificial': 'bg-purple-100 text-purple-800',
            'Desenvolvimento': 'bg-green-100 text-green-800',
            'Eventos': 'bg-yellow-100 text-yellow-800',
            'Empresa': 'bg-indigo-100 text-indigo-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    if (loading && news.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Gerenciar Notícias</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <FaPlus />
                    Adicionar Notícia
                </button>
            </div>

            {/* Formulário */}
            {showAddForm && (
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {editingNews ? 'Editar Notícia' : 'Adicionar Nova Notícia'}
                        </h2>
                        <button
                            onClick={handleCancelEdit}
                            className="text-gray-500 hover:text-gray-700 p-1"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="Digite o título da notícia"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categoria *
                                </label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Autor
                                </label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="Nome do autor"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Resumo
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="Breve resumo da notícia (será exibido na listagem)"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Conteúdo *
                                </label>
                                <textarea
                                    required
                                    rows={8}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="Conteúdo completo da notícia"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Imagem de Capa
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    />
                                    {uploading && (
                                        <div className="flex items-center gap-2 text-blue-600">
                                            <FaUpload className="animate-pulse" />
                                            <span className="text-sm">Fazendo upload...</span>
                                        </div>
                                    )}
                                    {formData.image_url && (
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={formData.image_url} 
                                                alt="Preview" 
                                                className="w-20 h-20 rounded-lg object-cover border border-gray-300"
                                            />
                                            <span className="text-sm text-green-600">Imagem carregada</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags
                                </label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                        placeholder="Digite uma tag e pressione Enter"
                                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    />
                                    <button
                                        type="button"
                                        onClick={addTag}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-200"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="text-blue-600 hover:text-blue-800 ml-1"
                                            >
                                                <FaTimes className="text-xs" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.published}
                                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Publicar imediatamente</span>
                                </label>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Marcar como destaque</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                <FaSave />
                                {loading ? 'Salvando...' : 'Salvar'}
                            </button>
                            
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-400 transition-colors font-medium"
                            >
                                <FaTimes />
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de Notícias */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">
                        Notícias ({news.length})
                    </h3>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Notícia
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Categoria
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Data
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {news.map((newsItem) => (
                                <tr key={newsItem.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {newsItem.image_url && (
                                                <img
                                                    className="h-12 w-12 rounded-lg object-cover mr-4 border border-gray-300"
                                                    src={newsItem.image_url}
                                                    alt={newsItem.title}
                                                />
                                            )}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                                        {newsItem.title}
                                                    </div>
                                                    {newsItem.featured && (
                                                        <FaStar className="text-yellow-500 text-sm" title="Destaque" />
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500 line-clamp-2">
                                                    {newsItem.excerpt || newsItem.content.substring(0, 100) + '...'}
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    Por: {newsItem.author}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(newsItem.category)}`}>
                                            {newsItem.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            newsItem.published 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {newsItem.published ? 'Publicado' : 'Rascunho'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(newsItem.created_at).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => toggleFeatured(newsItem.id, newsItem.featured)}
                                                className={`p-2 rounded-lg transition-colors ${
                                                    newsItem.featured 
                                                        ? 'text-yellow-600 hover:bg-yellow-50' 
                                                        : 'text-gray-400 hover:bg-gray-50'
                                                }`}
                                                title={newsItem.featured ? 'Remover destaque' : 'Marcar como destaque'}
                                            >
                                                <FaStar />
                                            </button>
                                            <button
                                                onClick={() => togglePublished(newsItem.id, newsItem.published)}
                                                className={`p-2 rounded-lg transition-colors ${
                                                    newsItem.published 
                                                        ? 'text-green-600 hover:bg-green-50' 
                                                        : 'text-gray-400 hover:bg-gray-50'
                                                }`}
                                                title={newsItem.published ? 'Despublicar' : 'Publicar'}
                                            >
                                                {newsItem.published ? <FaEye /> : <FaEyeSlash />}
                                            </button>
                                            <button
                                                onClick={() => handleEdit(newsItem)}
                                                className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(newsItem.id)}
                                                className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Excluir"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {news.length === 0 && (
                    <div className="text-center py-12">
                        <FaNewspaper className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma notícia</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Comece adicionando sua primeira notícia.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewsManagement;