import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaMobileAlt, FaDownload } from 'react-icons/fa';

function AppsManagement() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingApp, setEditingApp] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
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

    const addStep = () => {
        if (stepInput.trim() && !formData.installation_steps.includes(stepInput.trim())) {
            setFormData({
                ...formData,
                installation_steps: [...formData.installation_steps, stepInput.trim()]
            });
            setStepInput('');
        }
    };

    const removeStep = (stepToRemove) => {
        setFormData({
            ...formData,
            installation_steps: formData.installation_steps.filter(step => step !== stepToRemove)
        });
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Cyber Segurança': 'bg-red-100 text-red-800',
            'Desenvolvimento de Software': 'bg-blue-100 text-blue-800',
            'Inteligência Artificial': 'bg-purple-100 text-purple-800',
            'Análise de Dados': 'bg-green-100 text-green-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    if (loading && apps.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Gerenciar Aplicativos</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <FaPlus />
                    Adicionar Aplicativo
                </button>
            </div>

            {/* Formulário */}
            {showAddForm && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                            {editingApp ? 'Editar Aplicativo' : 'Adicionar Novo Aplicativo'}
                        </h2>
                        <button
                            onClick={handleCancelEdit}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Informações Básicas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome do Aplicativo *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Versão *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.version}
                                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                                    placeholder="Ex: 2.0.0"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                    Ícone
                                </label>
                                <select
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {icons.map(icon => (
                                        <option key={icon} value={icon}>
                                            {icon} {icon}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    URL de Download *
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={formData.download_url}
                                    onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tamanho do Arquivo *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.size}
                                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                    placeholder="Ex: 45.52 MB"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descrição *
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Funcionalidades */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Funcionalidades
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                    placeholder="Digite uma funcionalidade e pressione Enter"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Adicionar
                                </button>
                            </div>
                            <div className="space-y-1">
                                {formData.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
                                    >
                                        <span className="text-sm">{feature}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(feature)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTimes className="text-xs" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Requisitos do Sistema */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Requisitos do Sistema
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Sistema Operacional</label>
                                    <input
                                        type="text"
                                        value={formData.requirements.os}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            requirements: { ...formData.requirements, os: e.target.value }
                                        })}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Memória RAM</label>
                                    <input
                                        type="text"
                                        value={formData.requirements.ram}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            requirements: { ...formData.requirements, ram: e.target.value }
                                        })}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Espaço em Disco</label>
                                    <input
                                        type="text"
                                        value={formData.requirements.disk}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            requirements: { ...formData.requirements, disk: e.target.value }
                                        })}
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Passos de Instalação */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Passos de Instalação
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={stepInput}
                                    onChange={(e) => setStepInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStep())}
                                    placeholder="Digite um passo de instalação e pressione Enter"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={addStep}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Adicionar
                                </button>
                            </div>
                            <div className="space-y-1">
                                {formData.installation_steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
                                    >
                                        <span className="text-sm">{index + 1}. {step}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeStep(step)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTimes className="text-xs" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaSave />
                                {loading ? 'Salvando...' : 'Salvar'}
                            </button>
                            
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-400 transition-colors"
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
                {apps.map((app) => (
                    <div key={app.id} className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:border-gray-300 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{app.icon}</span>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{app.name}</h3>
                                    <p className="text-sm text-gray-600">v{app.version}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(app.category)}`}>
                                {app.category}
                            </span>
                        </div>

                        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{app.description}</p>

                        <div className="text-xs text-gray-500 mb-4">
                            <div>Tamanho: {app.size}</div>
                            <div>Funcionalidades: {app.features?.length || 0}</div>
                        </div>

                        <div className="flex justify-between items-center">
                            
                                href={app.download_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm"
                            <a>
                                <FaDownload />
                                Download
                            </a>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(app)}
                                    className="text-blue-600 hover:text-blue-800 p-1"
                                    title="Editar"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(app.id)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                    title="Excluir"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {apps.length === 0 && (
                <div className="text-center py-12">
                    <FaMobileAlt className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum aplicativo</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Comece adicionando seu primeiro aplicativo.
                    </p>
                </div>
            )}
        </div>
    );
}

export default AppsManagement;