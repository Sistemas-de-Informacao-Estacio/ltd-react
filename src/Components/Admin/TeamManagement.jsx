import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUpload, FaUser } from 'react-icons/fa';

function TeamManagement() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingMember, setEditingMember] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        photo_url: '',
        linkedin: '',
        github: '',
        email: '',
        specialties: []
    });
    const [specialtyInput, setSpecialtyInput] = useState('');

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMembers(data || []);
        } catch (error) {
            console.error('Erro ao buscar membros:', error);
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

        try {
            const memberData = {
                ...formData,
                specialties: formData.specialties.length > 0 ? formData.specialties : null
            };

            if (editingMember) {
                const { error } = await supabase
                    .from('team_members')
                    .update(memberData)
                    .eq('id', editingMember.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('team_members')
                    .insert([memberData]);

                if (error) throw error;
            }

            handleCancelEdit();
            fetchMembers();
        } catch (error) {
            console.error('Erro ao salvar membro:', error);
            alert('Erro ao salvar membro da equipe');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (member) => {
        setFormData({
            name: member.name,
            role: member.role,
            bio: member.bio || '',
            photo_url: member.photo_url || '',
            linkedin: member.linkedin || '',
            github: member.github || '',
            email: member.email || '',
            specialties: member.specialties || []
        });
        setEditingMember(member);
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este membro da equipe?')) {
            try {
                const { error } = await supabase
                    .from('team_members')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                fetchMembers();
            } catch (error) {
                console.error('Erro ao excluir membro:', error);
                alert('Erro ao excluir membro da equipe');
            }
        }
    };

    const handleCancelEdit = () => {
        setFormData({
            name: '',
            role: '',
            bio: '',
            photo_url: '',
            linkedin: '',
            github: '',
            email: '',
            specialties: []
        });
        setEditingMember(null);
        setShowAddForm(false);
        setSpecialtyInput('');
    };

    const addSpecialty = () => {
        if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
            setFormData({
                ...formData,
                specialties: [...formData.specialties, specialtyInput.trim()]
            });
            setSpecialtyInput('');
        }
    };

    const removeSpecialty = (specialtyToRemove) => {
        setFormData({
            ...formData,
            specialties: formData.specialties.filter(spec => spec !== specialtyToRemove)
        });
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
                >
                    <FaPlus />
                    Adicionar Membro
                </button>
            </div>

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
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="email@exemplo.com"
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    LinkedIn
                                </label>
                                <input
                                    type="url"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
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
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                    placeholder="https://github.com/usuario"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Biografia *
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                placeholder="Conte um pouco sobre a experiência e especialidades deste membro"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Especialidades
                            </label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={specialtyInput}
                                    onChange={(e) => setSpecialtyInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                                    placeholder="Digite uma especialidade e pressione Enter"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                />
                                <button
                                    type="button"
                                    onClick={addSpecialty}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Adicionar
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.specialties.map((specialty, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-200"
                                    >
                                        {specialty}
                                        <button
                                            type="button"
                                            onClick={() => removeSpecialty(specialty)}
                                            className="text-blue-600 hover:text-blue-800 ml-1"
                                        >
                                            <FaTimes className="text-xs" />
                                        </button>
                                    </span>
                                ))}
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
                                    Especialidades
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
                                                    {member.bio}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {member.role}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {member.specialties?.slice(0, 3).map((spec, index) => (
                                                <span key={index} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {spec}
                                                </span>
                                            ))}
                                            {member.specialties?.length > 3 && (
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600">
                                                    +{member.specialties.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {member.email && (
                                            <div>{member.email}</div>
                                        )}
                                        <div className="flex gap-2 mt-1">
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                                    LinkedIn
                                                </a>
                                            )}
                                            {member.github && (
                                                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
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
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(member.id)}
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