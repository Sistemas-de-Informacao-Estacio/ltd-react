import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { FaPlus, FaEdit, FaTrash, FaLinkedin, FaGithub, FaInstagram, FaSave, FaTimes } from 'react-icons/fa';

function TeamManagement() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingMember, setEditingMember] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
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
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .order('order_position', { ascending: true });

            if (error) throw error;
            setMembers(data);
        } catch (error) {
            console.error('Erro ao buscar membros:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingMember) {
                const { error } = await supabase
                    .from('team_members')
                    .update(formData)
                    .eq('id', editingMember.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('team_members')
                    .insert([formData]);

                if (error) throw error;
            }

            // Reset form
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
            fetchMembers();
        } catch (error) {
            console.error('Erro ao salvar membro:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (member) => {
        setFormData(member);
        setEditingMember(member);
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este membro?')) {
            try {
                const { error } = await supabase
                    .from('team_members')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                fetchMembers();
            } catch (error) {
                console.error('Erro ao excluir membro:', error);
            }
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
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                            {editingMember ? 'Editar Membro' : 'Adicionar Novo Membro'}
                        </h2>
                        <button
                            onClick={handleCancelEdit}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nome
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
                                Cargo
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descrição
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL da Foto
                            </label>
                            <input
                                type="url"
                                value={formData.photo_url}
                                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="/team/nome-da-foto.jpg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Posição (ordem)
                            </label>
                            <input
                                type="number"
                                value={formData.order_position}
                                onChange={(e) => setFormData({ ...formData, order_position: parseInt(e.target.value) })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://instagram.com/usuario"
                            />
                        </div>

                        <div className="md:col-span-2 flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
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

            {/* Lista de Membros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center mb-4">
                            <img
                                src={member.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4158d0&color=fff&size=64`}
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                <p className="text-sm text-gray-600">{member.role}</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{member.description}</p>

                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                {member.linkedin_url && (
                                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                        <FaLinkedin />
                                    </a>
                                )}
                                {member.github_url && (
                                    <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                                        <FaGithub />
                                    </a>
                                )}
                                {member.instagram_url && (
                                    <a href={member.instagram_url} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                                        <FaInstagram />
                                    </a>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(member)}
                                    className="text-blue-600 hover:text-blue-800 p-1"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(member.id)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeamManagement;