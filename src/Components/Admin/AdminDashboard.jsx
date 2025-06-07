import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaFileAlt, FaMobileAlt, FaChartLine, FaPlus, FaArrowRight } from 'react-icons/fa';
import { supabase } from '../../lib/supabase';

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalMembers: 0,
        totalDocuments: 0,
        totalApps: 0,
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [membersResponse, documentsResponse, appsResponse] = await Promise.all([
                supabase.from('team_members').select('*', { count: 'exact' }),
                supabase.from('documents').select('*', { count: 'exact' }),
                supabase.from('applications').select('*', { count: 'exact' })
            ]);

            setStats({
                totalMembers: membersResponse.count || 0,
                totalDocuments: documentsResponse.count || 0,
                totalApps: appsResponse.count || 0,
                recentActivity: [
                    ...(documentsResponse.data || []).slice(0, 3).map(doc => ({
                        type: 'document',
                        title: doc.title,
                        date: doc.created_at
                    })),
                    ...(appsResponse.data || []).slice(0, 3).map(app => ({
                        type: 'app',
                        title: app.name,
                        date: app.created_at
                    }))
                ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
            });
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">Dashboard Administrativo</h1>
                <p className="text-blue-100">Bem-vindo ao painel de controle do LTD</p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Membros da Equipe</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalMembers}</p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <FaUsers size={24} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link 
                            to="/admin/team" 
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                        >
                            Ver equipe <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Documentos</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalDocuments}</p>
                        </div>
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <FaFileAlt size={24} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link 
                            to="/admin/documents" 
                            className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
                        >
                            Ver documentos <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Aplicativos</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalApps}</p>
                        </div>
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                            <FaMobileAlt size={24} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link 
                            to="/admin/apps" 
                            className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
                        >
                            Ver aplicativos <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                    <FaPlus className="text-blue-500" />
                    Ações Rápidas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        to="/admin/team"
                        className="group flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                    >
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors mr-4">
                                <FaUsers size={20} />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Adicionar Membro</span>
                                <p className="text-xs text-gray-500">Gerenciar equipe</p>
                            </div>
                        </div>
                    </Link>
                    
                    <Link
                        to="/admin/documents"
                        className="group flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
                    >
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors mr-4">
                                <FaFileAlt size={20} />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-green-600">Adicionar Documento</span>
                                <p className="text-xs text-gray-500">Gerenciar biblioteca</p>
                            </div>
                        </div>
                    </Link>
                    
                    <Link
                        to="/admin/apps"
                        className="group flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
                    >
                        <div className="flex items-center">
                            <div className="p-3 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors mr-4">
                                <FaMobileAlt size={20} />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-600">Adicionar Aplicativo</span>
                                <p className="text-xs text-gray-500">Gerenciar aplicações</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Atividade Recente */}
            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <FaChartLine className="text-blue-500" />
                        Atividade Recente
                    </h3>
                </div>
                <div className="p-6">
                    {stats.recentActivity.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Nenhuma atividade recente</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {stats.recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className={`p-2 rounded-full ${
                                        activity.type === 'document' 
                                            ? 'bg-green-100 text-green-600' 
                                            : 'bg-purple-100 text-purple-600'
                                    }`}>
                                        {activity.type === 'document' ? <FaFileAlt size={16} /> : <FaMobileAlt size={16} />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            {activity.type === 'document' ? 'Documento' : 'Aplicativo'} adicionado: {activity.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(activity.date).toLocaleDateString('pt-BR', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;