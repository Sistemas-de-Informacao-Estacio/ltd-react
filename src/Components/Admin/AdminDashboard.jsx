import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    FaUsers, FaFileAlt, FaMobileAlt, FaChartLine, FaPlus, FaArrowRight, 
    FaAndroid, FaCode, FaBlog, FaNewspaper, FaBook, FaTrophy, FaRocket,
    FaEye, FaHeart, FaDownload, FaArrowUp, FaArrowDown, FaCheckCircle
} from 'react-icons/fa';
import { supabase } from '../../lib/supabase';
import StatsChart from './StatsChart';
import './AdminStyles.css';

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalMembers: 0,
        totalDocuments: 0,
        totalApps: 0,
        totalAndroidApps: 0,
        totalVscodeExtensions: 0,
        totalBlogPosts: 0,
        totalNews: 0,
        totalDocumentacoes: 0,
        recentActivity: [],
        monthlyGrowth: {
            members: 0,
            documents: 0,
            apps: 0
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [
                membersResponse, 
                documentsResponse, 
                appsResponse,
                androidAppsResponse,
                vscodeExtensionsResponse,
                blogPostsResponse,
                newsResponse,
                documentacoesResponse
            ] = await Promise.all([
                supabase.from('team_members').select('*', { count: 'exact' }),
                supabase.from('documents').select('*', { count: 'exact' }),
                supabase.from('applications').select('*', { count: 'exact' }),
                supabase.from('produtos_android_apps').select('*', { count: 'exact' }),
                supabase.from('produtos_vscode_extensions').select('*', { count: 'exact' }),
                supabase.from('blog_posts').select('*', { count: 'exact' }),
                supabase.from('news').select('*', { count: 'exact' }),
                supabase.from('documentacoes').select('*', { count: 'exact' })
            ]);

            // Calcular crescimento mensal (simulado - em produção, use dados reais)
            const monthlyGrowth = {
                members: Math.floor(Math.random() * 20) + 5,
                documents: Math.floor(Math.random() * 30) + 10,
                apps: Math.floor(Math.random() * 15) + 5
            };

            setStats({
                totalMembers: membersResponse.count || 0,
                totalDocuments: documentsResponse.count || 0,
                totalApps: appsResponse.count || 0,
                totalAndroidApps: androidAppsResponse.count || 0,
                totalVscodeExtensions: vscodeExtensionsResponse.count || 0,
                totalBlogPosts: blogPostsResponse.count || 0,
                totalNews: newsResponse.count || 0,
                totalDocumentacoes: documentacoesResponse.count || 0,
                monthlyGrowth,
                recentActivity: [
                    ...(documentsResponse.data || []).slice(0, 2).map(doc => ({
                        type: 'document',
                        icon: FaFileAlt,
                        title: doc.title,
                        date: doc.created_at,
                        color: 'green'
                    })),
                    ...(appsResponse.data || []).slice(0, 2).map(app => ({
                        type: 'app',
                        icon: FaMobileAlt,
                        title: app.name,
                        date: app.created_at,
                        color: 'purple'
                    })),
                    ...(androidAppsResponse.data || []).slice(0, 2).map(app => ({
                        type: 'android',
                        icon: FaAndroid,
                        title: app.name,
                        date: app.created_at,
                        color: 'blue'
                    })),
                    ...(blogPostsResponse.data || []).slice(0, 2).map(post => ({
                        type: 'blog',
                        icon: FaBlog,
                        title: post.title,
                        date: post.created_at,
                        color: 'pink'
                    }))
                ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8)
            });
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                  
                    <div className="relative inline-block">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <FaRocket className="text-blue-600 text-4xl animate-bounce" />
                        </div>
                    </div>
                    <p className="mt-6 text-gray-600 font-medium text-lg">Carregando dashboard...</p>
                </div>
            </div>
        );
    }

    // eslint-disable-next-line no-unused-vars
    const StatCard = ({ title, value, icon: Icon, color, link, growth }) => (
        <Link 
            to={link}
            className="group bg-white rounded-2xl shadow-lg p-6 border-l-4 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
            style={{ borderLeftColor: color }}
        >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <Icon className="w-full h-full" style={{ color }} />
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`} 
                         style={{ backgroundColor: `${color}15` }}>
                        <Icon className="text-3xl" style={{ color }} />
                    </div>
                    {growth && (
                        <div className={`flex items-center gap-1 text-sm font-semibold ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {growth > 0 ? <FaArrowUp /> : <FaArrowDown />}
                            {Math.abs(growth)}%
                        </div>
                    )}
                </div>
                
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                    <p className="text-4xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {value}
                    </p>
                </div>
                
                <div className="mt-4 flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform duration-300" style={{ color }}>
                    Ver detalhes <FaArrowRight className="ml-2 text-xs" />
                </div>
            </div>
        </Link>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header com Gradiente Animado */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-shimmer"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                                <FaTrophy className="text-yellow-300 animate-bounce" />
                                Dashboard Administrativo
                            </h1>
                            <p className="text-blue-100 text-lg">Bem-vindo ao centro de controle do LTD Estácio</p>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-4 text-center">
                                <p className="text-sm text-blue-100 mb-1">Total de Conteúdo</p>
                                <p className="text-3xl font-bold">
                                    {stats.totalMembers + stats.totalDocuments + stats.totalApps + 
                                     stats.totalAndroidApps + stats.totalVscodeExtensions + 
                                     stats.totalBlogPosts + stats.totalNews + stats.totalDocumentacoes}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estatísticas Principais - Grid 4 colunas */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaChartLine className="text-blue-600" />
                    Visão Geral
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Membros da Equipe"
                        value={stats.totalMembers}
                        icon={FaUsers}
                        color="#3B82F6"
                        link="/admin/team"
                        growth={stats.monthlyGrowth.members}
                    />
                    <StatCard
                        title="Documentos"
                        value={stats.totalDocuments}
                        icon={FaFileAlt}
                        color="#10B981"
                        link="/admin/documents"
                        growth={stats.monthlyGrowth.documents}
                    />
                    <StatCard
                        title="Aplicativos"
                        value={stats.totalApps}
                        icon={FaMobileAlt}
                        color="#8B5CF6"
                        link="/admin/apps"
                        growth={stats.monthlyGrowth.apps}
                    />
                    <StatCard
                        title="Notícias"
                        value={stats.totalNews}
                        icon={FaNewspaper}
                        color="#F59E0B"
                        link="/admin/news"
                    />
                </div>
            </div>

            {/* Produtos - Grid 4 colunas */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaRocket className="text-purple-600" />
                    Produtos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Apps Android"
                        value={stats.totalAndroidApps}
                        icon={FaAndroid}
                        color="#3DDC84"
                        link="/admin/android-apps"
                    />
                    <StatCard
                        title="VS Code Extensions"
                        value={stats.totalVscodeExtensions}
                        icon={FaCode}
                        color="#007ACC"
                        link="/admin/vscode-extensions"
                    />
                    <StatCard
                        title="Posts do Blog"
                        value={stats.totalBlogPosts}
                        icon={FaBlog}
                        color="#EC4899"
                        link="/admin/blog"
                    />
                    <StatCard
                        title="Documentações"
                        value={stats.totalDocumentacoes}
                        icon={FaBook}
                        color="#6366F1"
                        link="/admin/documentacoes"
                    />
                </div>
            </div>

            {/* Ações Rápidas com Cards Interativos */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaPlus className="text-blue-600" />
                    Ações Rápidas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { to: '/admin/team', icon: FaUsers, label: 'Adicionar Membro', desc: 'Gerenciar equipe', color: 'blue' },
                        { to: '/admin/documents', icon: FaFileAlt, label: 'Adicionar Documento', desc: 'Gerenciar biblioteca', color: 'green' },
                        { to: '/admin/apps', icon: FaMobileAlt, label: 'Adicionar App', desc: 'Gerenciar aplicações', color: 'purple' },
                        { to: '/admin/blog', icon: FaBlog, label: 'Novo Post', desc: 'Criar conteúdo', color: 'pink' },
                        { to: '/admin/android-apps', icon: FaAndroid, label: 'App Android', desc: 'Adicionar produto', color: 'green' },
                        { to: '/admin/vscode-extensions', icon: FaCode, label: 'Extensão VS Code', desc: 'Adicionar extensão', color: 'blue' },
                        { to: '/admin/news', icon: FaNewspaper, label: 'Nova Notícia', desc: 'Publicar novidade', color: 'orange' },
                        { to: '/admin/documentacoes', icon: FaBook, label: 'Documentação', desc: 'Tutorial técnico', color: 'indigo' }
                    ].map((action, idx) => (
                        <Link
                            key={idx}
                            to={action.to}
                            className={`group flex flex-col items-center justify-center p-6 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-${action.color}-500 hover:bg-${action.color}-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                        >
                            <div className={`p-4 rounded-full bg-${action.color}-100 text-${action.color}-600 group-hover:bg-${action.color}-600 group-hover:text-white transition-colors duration-300 mb-3`}>
                                <action.icon className="text-2xl" />
                            </div>
                            <span className={`text-sm font-bold text-gray-700 group-hover:text-${action.color}-600 text-center mb-1`}>
                                {action.label}
                            </span>
                            <p className="text-xs text-gray-500 text-center">{action.desc}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Atividade Recente Melhorada */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FaChartLine />
                        Atividade Recente
                    </h3>
                </div>
                <div className="p-6">
                    {stats.recentActivity.length === 0 ? (
                        <div className="text-center py-12">
                            <FaCheckCircle className="text-gray-300 text-6xl mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">Nenhuma atividade recente</p>
                            <p className="text-gray-400 text-sm mt-2">Comece adicionando conteúdo ao sistema</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stats.recentActivity.map((activity, index) => {
                                const Icon = activity.icon;
                                const colorClasses = {
                                    green: 'bg-green-100 text-green-600',
                                    purple: 'bg-purple-100 text-purple-600',
                                    blue: 'bg-blue-100 text-blue-600',
                                    pink: 'bg-pink-100 text-pink-600'
                                };
                                
                                return (
                                    <div 
                                        key={index} 
                                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-100 hover:border-gray-300 hover:shadow-md group"
                                    >
                                        <div className={`p-3 rounded-xl ${colorClasses[activity.color]} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                                            <Icon className="text-xl" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-900 mb-1 truncate">
                                                {activity.title}
                                            </p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                <FaCheckCircle className="text-green-500" />
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
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Métricas de Performance (Simulado) */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaChartLine className="text-purple-600" />
                    Analytics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatsChart 
                        title="Crescimento Mensal" 
                        data={[45, 52, 61, 73, 89, 102]} 
                        color="#3b82f6"
                    />
                    <StatsChart 
                        title="Novos Usuários" 
                        data={[12, 19, 23, 28, 35, 42]} 
                        color="#10b981"
                    />
                    <StatsChart 
                        title="Engajamento" 
                        data={[67, 71, 68, 75, 82, 88]} 
                        color="#8b5cf6"
                    />
                </div>
            </div>

            {/* Métricas Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <FaEye className="text-4xl opacity-80" />
                        <div className="text-right">
                            <p className="text-sm opacity-90">Visualizações</p>
                            <p className="text-3xl font-bold">12.4K</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <FaArrowUp />
                        <span>+23% este mês</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <FaHeart className="text-4xl opacity-80" />
                        <div className="text-right">
                            <p className="text-sm opacity-90">Curtidas</p>
                            <p className="text-3xl font-bold">8.2K</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <FaArrowUp />
                        <span>+18% este mês</span>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                        <FaDownload className="text-4xl opacity-80" />
                        <div className="text-right">
                            <p className="text-sm opacity-90">Downloads</p>
                            <p className="text-3xl font-bold">5.7K</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <FaArrowUp />
                        <span>+31% este mês</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;