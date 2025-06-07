import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaMobileAlt, FaDownload, FaEye, FaSearch } from 'react-icons/fa';

function AppsManagement() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingApp, setEditingApp] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        version: '',
        icon: '📱',
        download_url: '',
        size: '',
        category: 'Desenvolvimento de Software',
        features: [],
        requirements: {
            os: 'Windows 10 ou superior',
            ram: '4 GB de RAM',
            disk: '50 MB de espaço em disco'
        },
        installation_steps: []
    });
    const [featureInput, setFeatureInput] = useState('');
    const [stepInput, setStepInput] = useState('');

    const categories = [
        'Cyber Segurança',
        'Desenvolvimento de Software',
        'Inteligência Artificial',
        'Análise de Dados'
    ];

    const icons = ['📱', '💻', '🔐', '🧠', '📊', '⚙️', '🚀', '🛡️', '🎯', '📈'];

    useEffect(() => {
        fetchApps();
    }, []);

    const fetchApps = async () => {
        try {
            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setApps(data || []);
        } catch (error) {
            console.error('Erro ao buscar aplicativos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const appData = {
                ...formData,
                features: formData.features.length > 0 ? formData.features : null,
                installation_steps: formData.installation_steps.length > 0 ? formData.installation_steps : null
            };

            if (editingApp) {
                const { error } = await supabase
                    .from('applications')
                    .update(appData)
                    .eq('id', editingApp.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('applications')
                    .insert([appData]);

                if (error) throw error;
            }

            handleCancelEdit();
            fetchApps();
        } catch (error) {
            console.error('Erro ao salvar aplicativo:', error);
            alert('Erro ao salvar aplicativo');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (app) => {
        setFormData({
            name: app.name,
            description: app.description,
            version: app.version,
            icon: app.icon || '📱',
            download_url: app.download_url,
            size: app.size,
            category: app.category,
            features: app.features || [],
            requirements: app.requirements || {
                os: 'Windows 10 ou superior',
                ram: '4 GB de RAM',
                disk: '50 MB de espaço em disco'
            },
            installation_steps: app.installation_steps || []
        });
        setEditingApp(app);
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este aplicativo?')) {
            try {
                const { error } = await supabase
                    .from('applications')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                fetchApps();
            } catch (error) {
                console.error('Erro ao excluir aplicativo:', error);
                alert('Erro ao excluir aplicativo');
            }
        }
    };

    const handleCancelEdit = () => {
        setFormData({
            name: '',
            description: '',
            version: '',
            icon: '📱',
            download_url: '',
            size: '',
            category: 'Desenvolvimento de Software',
            features: [],
            requirements: {
                os: 'Windows 10 ou superior',
                ram: '4 GB de RAM',
                disk: '50 MB de espaço em disco'
            },
            installation_steps: []
        });
        setEditingApp(null);
        setShowAddForm(false);
        setFeatureInput('');
        setStepInput('');
    };

    const addFeature = () => {
        if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
            setFormData({
                ...formData,
                features: [...formData.features, featureInput.trim()]
            });
            setFeatureInput('');
        }
    };

    const removeFeature = (featureToRemove) => {
        setFormData({
            ...formData,
            features: formData.features.filter(feature => feature !== featureToRemove)
        });
    };

    // eslint-disable-next-line no-unused-vars
    const addStep = () => {
        if (stepInput.trim() && !formData.installation_steps.includes(stepInput.trim())) {
            setFormData({
                ...formData,
                installation_steps: [...formData.installation_steps, stepInput.trim()]
            });
            setStepInput('');
        }
    };

    // eslint-disable-next-line no-unused-vars
    const removeStep = (stepToRemove) => {
        setFormData({
            ...formData,
            installation_steps: formData.installation_steps.filter(step => step !== stepToRemove)
        });
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Cyber Segurança': 'bg-red-100 text-red-800 border-red-200',
            'Desenvolvimento de Software': 'bg-blue-100 text-blue-800 border-blue-200',
            'Inteligência Artificial': 'bg-purple-100 text-purple-800 border-purple-200',
            'Análise de Dados': 'bg-green-100 text-green-800 border-green-200'
        };
        return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const filteredApps = apps.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && apps.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Gerenciar Aplicativos</h1>
                        <p className="text-purple-100">Gerencie a biblioteca de aplicativos do LTD</p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-white text-purple-600 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors font-semibold"
                    >
                        <FaPlus />
                        Novo Aplicativo
                    </button>
                </div>
            </div>

            {/* Barra de Pesquisa */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar aplicativos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-blue-600 text-2xl font-bold">{apps.length}</div>
                    <div className="text-blue-800 text-sm">Total de Apps</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-600 text-2xl font-bold">
                        {apps.filter(app => app.category === 'Cyber Segurança').length}
                    </div>
                    <div className="text-red-800 text-sm">Cyber Segurança</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-purple-600 text-2xl font-bold">
                        {apps.filter(app => app.category === 'Inteligência Artificial').length}
                    </div>
                    <div className="text-purple-800 text-sm">IA</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-green-600 text-2xl font-bold">
                        {apps.filter(app => app.category === 'Análise de Dados').length}
                    </div>
                    <div className="text-green-800 text-sm">Análise de Dados</div>
                </div>
            </div>

            {/* Formulário */}
            {showAddForm && (
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {editingApp ? 'Editar Aplicativo' : 'Adicionar Novo Aplicativo'}
                        </h2>
                        <button
                            onClick={handleCancelEdit}
                            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Informações Básicas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nome do Aplicativo *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="Ex: Sistema de Gestão Municipal"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Versão *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.version}
                                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                                    placeholder="Ex: 2.0.0"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Categoria *
                                </label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Ícone
                                </label>
                                <select
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                >
                                    {icons.map(icon => (
                                        <option key={icon} value={icon}>
                                            {icon} {icon}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    URL de Download *
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={formData.download_url}
                                    onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    placeholder="https://exemplo.com/download.zip"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Tamanho do Arquivo *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.size}
                                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                    placeholder="Ex: 45.52 MB"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Descrição *
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Descreva as principais funcionalidades e benefícios do aplicativo..."
                            />
                        </div>

                        {/* Funcionalidades */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Funcionalidades
                            </label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                    placeholder="Digite uma funcionalidade"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {formData.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-white px-3 py-2 rounded border"
                                    >
                                        <span className="text-sm">{feature}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(feature)}
                                            className="text-red-600 hover:text-red-800 p-1"
                                        >
                                            <FaTimes className="text-xs" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botões */}
                        <div className="flex gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-purple-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                            >
                                <FaSave />
                                {loading ? 'Salvando...' : 'Salvar Aplicativo'}
                            </button>
                            
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-400 transition-colors font-semibold"
                            >
                                <FaTimes />
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Lista de Aplicativos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.map((app) => (
                    <div key={app.id} className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{app.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">{app.name}</h3>
                                        <p className="text-purple-600 font-medium text-sm">v{app.version}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getCategoryColor(app.category)}`}>
                                    {app.category}
                                </span>
                            </div>

                            <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">{app.description}</p>

                            <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                                <div className="flex items-center gap-1">
                                    <span>📦</span>
                                    <span>{app.size}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>🎯</span>
                                    <span>{app.features?.length || 0} funcionalidades</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                
                                    href={app.download_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                <a>
                                    <FaDownload />
                                    Download
                                </a>
                                <button
                                    onClick={() => handleEdit(app)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                                    title="Editar"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(app.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                                    title="Excluir"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredApps.length === 0 && (
                <div className="text-center py-16 bg-white rounded-lg shadow">
                    <FaMobileAlt className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {searchTerm ? 'Nenhum aplicativo encontrado' : 'Nenhum aplicativo cadastrado'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {searchTerm 
                            ? 'Tente ajustar sua pesquisa ou limpar os filtros.'
                            : 'Comece adicionando seu primeiro aplicativo ao sistema.'
                        }
                    </p>
                    {!searchTerm && (
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                        >
                            Adicionar Primeiro Aplicativo
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default AppsManagement;