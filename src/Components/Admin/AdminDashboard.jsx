import { useState, useEffect } from 'react';
import { FaUsers, FaFileAlt, FaMobileAlt, FaChartLine } from 'react-icons/fa';
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
        <div className="space-y-6">
            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <FaUsers size={24} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Membros da Equipe</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalMembers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <FaFileAlt size={24} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Documentos</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalDocuments}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                            <FaMobileAlt size={24} />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Aplicativos</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalApps}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Atividade Recente */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <FaChartLine className="mr-2" />
                        Atividade Recente
                    </h3>
                </div>
                <div className="p-6">
                    {stats.recentActivity.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">Nenhuma atividade recente</p>
                    ) : (
                        <div className="space-y-4">
                            {stats.recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center space-x-3">
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
                                            {new Date(activity.date).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                        href="/admin/team"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        <FaUsers className="text-blue-500 mr-3" size={20} />
                        <span className="text-sm font-medium text-gray-700">Adicionar Membro</span>
                    
                    
                        href="/admin/documents"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                        <FaFileAlt className="text-green-500 mr-3" size={20} />
                        <span className="text-sm font-medium text-gray-700">Adicionar Documento</span>
                    
                    
                        href="/admin/apps"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
                        <FaMobileAlt className="text-purple-500 mr-3" size={20} />
                        <span className="text-sm font-medium text-gray-700">Adicionar Aplicativo</span>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;