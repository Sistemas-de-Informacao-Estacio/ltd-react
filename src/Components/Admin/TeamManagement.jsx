import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUpload, FaUser } from 'react-icons/fa';

function TeamManagement() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingMember, setEditingMember] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        description: '',
        photo_url: '',
        linkedin_url: '',
        github_url: '',
        instagram_url: '',
        order_position: 0
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            setError(null);
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .order('order_position', { ascending: true });

            if (error) throw error;
            setMembers(data || []);
        } catch (error) {
            console.error('Erro ao buscar membros:', error);
            setError('Erro ao carregar membros da equipe');
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
            const filePath = `team/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            setFormData({
                ...formData,
                photo_url: publicUrl
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
        setError(null);

        try {
            if (editingMember) {
                const { error } = await supabase
                    .from('team_members')
                    .update({
                        ...formData,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', editingMember.id);

                if (error) throw error;
            } else {
                // Definir order_position automaticamente
                const maxOrder = members.length > 0 ? Math.max(...members.map(m => m.order_position || 0)) : 0;
                
                const { error } = await supabase
                    .from('team_members')
                    .insert([{
                        ...formData,
                        order_position: maxOrder + 1
                    }]);

                if (error) throw error;
            }

            handleCancelEdit();
            await fetchMembers();
            alert(editingMember ? 'Membro atualizado com sucesso!' : 'Membro adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar membro:', error);
            setError('Erro ao salvar membro da equipe: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (member) => {
        setFormData({
            name: member.name || '',
            role: member.role || '',
            description: member.description || '',
            photo_url: member.photo_url || '',
            linkedin_url: member.linkedin_url || '',
            github_url: member.github_url || '',
            instagram_url: member.instagram_url || '',
            order_position: member.order_position || 0
        });
        setEditingMember(member);
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este membro da equipe?')) {
            return;
        }

        try {
            setError(null);
            setLoading(true);

            const { error } = await supabase
                .from('team_members')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Erro do Supabase:', error);
                throw error;
            }

            await fetchMembers();
            alert('Membro removido com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir membro:', error);
            setError('Erro ao excluir membro: ' + error.message);
            alert('Erro ao excluir membro. Verifique as permissões.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setFormData({
            name: '',
            role: '',
            description: '',
            photo_url: '',
            linkedin_url: '',
            github_url: '',
            instagram_url: '',
            order_position: 0
        });
        setEditingMember(null);
        setShowAddForm(false);
        setError(null);
    };

    if (loading && members.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Gerenciar Equipe</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                    disabled={loading}
                >
                    <FaPlus />
                    Adicionar Membro
                </button>
            </div>

            {/* Exibir erro se houver */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Formulário */}
            {showAddForm && (
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {editingMember ? 'Editar Membro' : 'Adicionar Novo Membro'}
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome Completo *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="Digite o nome completo"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cargo *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="Ex: Desenvolvedor Frontend"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    value={formData.linkedin_url}
                                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="https://linkedin.com/in/usuario"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    GitHub
                                </label>
                                <input
                                    type="url"
                                    value={formData.github_url}
                                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="https://github.com/usuario"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    value={formData.instagram_url}
                                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="https://instagram.com/usuario"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Foto de Perfil
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
                                    {formData.photo_url && (
                                        <div className="flex items-center gap-2">
                                            <img 
                                                src={formData.photo_url} 
                                                alt="Preview" 
                                                className="w-12 h-12 rounded-full object-cover border border-gray-300"
                                            />
                                            <span className="text-sm text-green-600">Imagem carregada</span>
                                        </div>
                                    )}
                                </div>
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
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                placeholder="Conte um pouco sobre a experiência e especialidades deste membro"
                            />
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

            {/* Lista de Membros */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900">
                        Membros da Equipe ({members.length})
                    </h3>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Membro
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cargo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contato
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {member.photo_url ? (
                                                    <img
                                                        className="h-10 w-10 rounded-full object-cover border border-gray-300"
                                                        src={member.photo_url}
                                                        alt={member.name}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                ) : null}
                                                <div 
                                                    className={`h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ${member.photo_url ? 'hidden' : 'flex'}`}
                                                >
                                                    <FaUser className="text-gray-500" />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {member.name}
                                                </div>
                                                <div className="text-sm text-gray-500 line-clamp-2">
                                                    {member.description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {member.role}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex gap-2 mt-1">
                                            {member.linkedin_url && (
                                                <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                                    LinkedIn
                                                </a>
                                            )}
                                            {member.github_url && (
                                                <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                                                    GitHub
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(member)}
                                                className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Editar"
                                                disabled={loading}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(member.id)}
                                                className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Excluir"
                                                disabled={loading}
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

                {members.length === 0 && (
                    <div className="text-center py-12">
                        <FaUser className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum membro</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Comece adicionando o primeiro membro da equipe.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeamManagement;