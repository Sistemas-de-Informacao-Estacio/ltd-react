import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUpload, FaFilePdf, FaDownload } from 'react-icons/fa';

function DocumentsManagement() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingDocument, setEditingDocument] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'cybersecurity',
        file_url: '',
        file_size: '',
        pages: 0,
        tags: []
    });
    const [tagInput, setTagInput] = useState('');

    const categories = [
        { value: 'cybersecurity', label: 'Cibersegurança' },
        { value: 'ai', label: 'Inteligência Artificial' },
        { value: 'data', label: 'Análise de Dados' },
        { value: 'development', label: 'Desenvolvimento' }
    ];

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setDocuments(data || []);
        } catch (error) {
            console.error('Erro ao buscar documentos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Por favor, selecione apenas arquivos PDF');
            return;
        }

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `documents/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('documents')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('documents')
                .getPublicUrl(filePath);

            setFormData({
                ...formData,
                file_url: publicUrl,
                file_size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
            });

        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            alert('Erro ao fazer upload do arquivo');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const documentData = {
                ...formData,
                pages: parseInt(formData.pages) || 0,
                tags: formData.tags.length > 0 ? formData.tags : null
            };

            if (editingDocument) {
                const { error } = await supabase
                    .from('documents')
                    .update(documentData)
                    .eq('id', editingDocument.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('documents')
                    .insert([documentData]);

                if (error) throw error;
            }

            handleCancelEdit();
            fetchDocuments();
        } catch (error) {
            console.error('Erro ao salvar documento:', error);
            alert('Erro ao salvar documento');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (document) => {
        setFormData({
            title: document.title,
            description: document.description || '',
            category: document.category,
            file_url: document.file_url,
            file_size: document.file_size || '',
            pages: document.pages || 0,
            tags: document.tags || []
        });
        setEditingDocument(document);
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este documento?')) {
            try {
                const { error } = await supabase
                    .from('documents')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                fetchDocuments();
            } catch (error) {
                console.error('Erro ao excluir documento:', error);
                alert('Erro ao excluir documento');
            }
        }
    };

    const handleCancelEdit = () => {
        setFormData({
            title: '',
            description: '',
            category: 'cybersecurity',
            file_url: '',
            file_size: '',
            pages: 0,
            tags: []
        });
        setEditingDocument(null);
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
            cybersecurity: 'bg-red-100 text-red-800',
            ai: 'bg-purple-100 text-purple-800',
            data: 'bg-green-100 text-green-800',
            development: 'bg-blue-100 text-blue-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const getCategoryLabel = (category) => {
        const labels = {
            cybersecurity: 'Cibersegurança',
            ai: 'Inteligência Artificial',
            data: 'Análise de Dados',
            development: 'Desenvolvimento'
        };
        return labels[category] || category;
    };

    if (loading && documents.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Gerenciar Documentos</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <FaPlus />
                    Adicionar Documento
                </button>
            </div>

            {/* Formulário */}
            {showAddForm && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                            {editingDocument ? 'Editar Documento' : 'Adicionar Novo Documento'}
                        </h2>
                        <button
                            onClick={handleCancelEdit}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descrição *
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Arquivo PDF *
                                </label>
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileUpload}
                                        disabled={uploading}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {uploading && (
                                        <div className="flex items-center gap-2 text-blue-600">
                                            <FaUpload className="animate-pulse" />
                                            <span className="text-sm">Fazendo upload...</span>
                                        </div>
                                    )}
                                    {formData.file_url && (
                                        <div className="flex items-center gap-2 text-green-600">
                                            <FaFilePdf />
                                            <span className="text-sm">Arquivo carregado</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Número de Páginas
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.pages}
                                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tamanho do Arquivo
                                </label>
                                <input
                                    type="text"
                                    value={formData.file_size}
                                    onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                                    placeholder="Ex: 2.5 MB"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    placeholder="Digite uma tag e pressione Enter"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FaTimes className="text-xs" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading || uploading || !formData.file_url}
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

            {/* Lista de Documentos */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                        Documentos ({documents.length})
                    </h3>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Documento
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Categoria
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Detalhes
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
                            {documents.map((doc) => (
                                <tr key={doc.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <FaFilePdf className="text-red-500 mr-3" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                                    {doc.title}
                                                </div>
                                                <div className="text-sm text-gray-500 line-clamp-2">
                                                    {doc.description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(doc.category)}`}>
                                            {getCategoryLabel(doc.category)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div>
                                            {doc.pages && <div>{doc.pages} páginas</div>}
                                            {doc.file_size && <div>{doc.file_size}</div>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(doc.created_at).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            
                                                href={doc.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:text-green-900 p-1"
                                                title="Download"
                                            <a>
                                                <FaDownload />
                                            </a>
                                            <button
                                                onClick={() => handleEdit(doc)}
                                                className="text-blue-600 hover:text-blue-900 p-1"
                                                title="Editar"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(doc.id)}
                                                className="text-red-600 hover:text-red-900 p-1"
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

                {documents.length === 0 && (
                    <div className="text-center py-12">
                        <FaFilePdf className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum documento</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Comece adicionando seu primeiro documento.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DocumentsManagement;