import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FaCalendar, FaUser, FaTag, FaStar, FaSearch, FaTimes, FaNewspaper, FaClock, FaEye, FaArrowRight, FaFilter } from 'react-icons/fa';

function News() {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchNews();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        filterNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [news, selectedCategory, searchTerm]);

    const fetchNews = async () => {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setNews(data || []);
        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterNews = () => {
        let filtered = news;

        if (selectedCategory !== 'Todas') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(search) ||
                item.content.toLowerCase().includes(search) ||
                item.excerpt?.toLowerCase().includes(search) ||
                item.tags?.some(tag => tag.toLowerCase().includes(search))
            );
        }

        setFilteredNews(filtered);
    };

    const categories = ['Todas', ...new Set(news.map(item => item.category))];
    
    const featuredNews = news.filter(item => item.featured).slice(0, 1);

    const getCategoryColor = (category) => {
        const colors = {
            'Geral': 'from-gray-500 to-gray-600',
            'Tecnologia': 'from-blue-500 to-cyan-500',
            'Cibersegurança': 'from-red-500 to-orange-500',
            'Inteligência Artificial': 'from-purple-500 to-pink-500',
            'Desenvolvimento': 'from-green-500 to-emerald-500',
            'Eventos': 'from-yellow-500 to-orange-500',
            'Empresa': 'from-indigo-500 to-purple-500'
        };
        return colors[category] || 'from-gray-500 to-gray-600';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getReadingTime = (content) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return minutes;
    };

    const showNewsDetail = (newsItem) => {
        setSelectedNews(newsItem);
        window.scrollTo(0, 0);
    };

    const closeNewsDetail = () => {
        setSelectedNews(null);
        window.scrollTo(0, 0);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
                        <FaNewspaper className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-blue-500 animate-pulse" />
                    </div>
                    <p className="mt-6 text-xl text-gray-300 font-semibold">Carregando notícias...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2s"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12" data-aos="fade-up">
                        <div className="inline-block px-6 py-3 bg-blue-500/20 rounded-full text-blue-300 font-semibold mb-6 border border-blue-500/30">
                            📰 Central de Notícias
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6 leading-tight">
                            Últimas Notícias
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Fique por dentro das novidades, inovações e atualizações do Laboratório de Transformação Digital
                        </p>
                    </div>

                    {/* Estatísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 text-center">
                            <FaNewspaper className="text-3xl text-blue-400 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">{news.length}</div>
                            <div className="text-blue-200 text-sm">Notícias</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30 text-center">
                            <FaStar className="text-3xl text-yellow-400 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">{news.filter(n => n.featured).length}</div>
                            <div className="text-purple-200 text-sm">Destaques</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 backdrop-blur-md p-6 rounded-2xl border border-green-500/30 text-center">
                            <FaTag className="text-3xl text-green-400 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">{categories.length - 1}</div>
                            <div className="text-green-200 text-sm">Categorias</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/40 backdrop-blur-md p-6 rounded-2xl border border-pink-500/30 text-center">
                            <FaClock className="text-3xl text-pink-400 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">Hoje</div>
                            <div className="text-pink-200 text-sm">Atualizado</div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Filtros Aprimorados */}
                <div className="mb-12 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-gray-700" data-aos="fade-up">
                    <div className="flex items-center gap-3 mb-6">
                        <FaFilter className="text-2xl text-blue-400" />
                        <h3 className="text-2xl font-bold text-white">Filtros</h3>
                    </div>
                    
                    <div className="space-y-6">
                        {/* Busca */}
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type="text"
                                placeholder="Buscar por título, conteúdo ou tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-900/50 text-white placeholder-gray-400 transition-all duration-300 text-lg"
                            />
                        </div>

                        {/* Categorias */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-400 mb-3">CATEGORIAS</label>
                            <div className="flex flex-wrap gap-3">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                                            selectedCategory === category
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notícia em Destaque Principal */}
                {featuredNews.length > 0 && searchTerm === '' && selectedCategory === 'Todas' && (
                    <section className="mb-16" data-aos="fade-up">
                        <div className="flex items-center gap-3 mb-8">
                            <FaStar className="text-3xl text-yellow-500" />
                            <h2 className="text-4xl font-bold text-white">Notícia em Destaque</h2>
                        </div>
                        
                        <article
                            className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-yellow-500/20"
                            onClick={() => showNewsDetail(featuredNews[0])}
                        >
                            <div className="grid md:grid-cols-2 gap-8">
                                {featuredNews[0].image_url && (
                                    <div className="relative h-full min-h-[400px]">
                                        <img
                                            src={featuredNews[0].image_url}
                                            alt={featuredNews[0].title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <div className="absolute top-6 left-6">
                                            <span className={`inline-block px-4 py-2 bg-gradient-to-r ${getCategoryColor(featuredNews[0].category)} rounded-full text-white font-semibold shadow-lg`}>
                                                {featuredNews[0].category}
                                            </span>
                                        </div>
                                        <div className="absolute top-6 right-6">
                                            <div className="bg-yellow-500/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                                <FaStar className="text-white" />
                                                <span className="text-white font-bold">Destaque</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-blue-300 transition-colors">
                                        {featuredNews[0].title}
                                    </h3>
                                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                        {featuredNews[0].excerpt || featuredNews[0].content.substring(0, 250) + '...'}
                                    </p>
                                    
                                    <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
                                        <div className="flex items-center gap-2">
                                            <FaUser className="text-blue-400" />
                                            <span className="font-medium">{featuredNews[0].author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCalendar className="text-green-400" />
                                            <span>{formatDate(featuredNews[0].created_at)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaClock className="text-purple-400" />
                                            <span>{getReadingTime(featuredNews[0].content)} min de leitura</span>
                                        </div>
                                    </div>

                                    {featuredNews[0].tags && featuredNews[0].tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {featuredNews[0].tags.slice(0, 4).map((tag, index) => (
                                                <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600">
                                                    <FaTag className="text-xs" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-lg self-start">
                                        Ler Notícia Completa
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    </section>
                )}

                {/* Lista de Notícias */}
                <section data-aos="fade-up">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-2">
                                {searchTerm ? `Resultados para "${searchTerm}"` : 
                                 selectedCategory !== 'Todas' ? `${selectedCategory}` : 
                                 'Todas as Notícias'}
                            </h2>
                            <p className="text-lg text-gray-400">
                                {filteredNews.length} {filteredNews.length === 1 ? 'notícia encontrada' : 'notícias encontradas'}
                            </p>
                        </div>
                    </div>
                    
                    {filteredNews.length === 0 ? (
                        <div className="text-center py-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-3xl border border-gray-700">
                            <FaSearch className="mx-auto h-20 w-20 text-gray-600 mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-3">Nenhuma notícia encontrada</h3>
                            <p className="text-lg text-gray-400 mb-6">
                                {searchTerm 
                                    ? 'Tente usar termos de busca diferentes ou ajustar os filtros.' 
                                    : 'Não há notícias nesta categoria no momento. Tente selecionar outra categoria.'
                                }
                            </p>
                            {(searchTerm || selectedCategory !== 'Todas') && (
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('Todas');
                                    }}
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                                >
                                    Limpar Filtros
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredNews.map((newsItem, index) => (
                                <article
                                    key={newsItem.id}
                                    className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                                    onClick={() => showNewsDetail(newsItem)}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 50}
                                >
                                    {newsItem.image_url && (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={newsItem.image_url}
                                                alt={newsItem.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <div className="absolute top-4 left-4">
                                                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getCategoryColor(newsItem.category)} rounded-full text-white text-xs font-semibold shadow-lg`}>
                                                    {newsItem.category}
                                                </span>
                                            </div>
                                            {newsItem.featured && (
                                                <div className="absolute top-4 right-4">
                                                    <FaStar className="text-yellow-500 text-xl drop-shadow-lg" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors leading-tight">
                                            {newsItem.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                                            {newsItem.excerpt || newsItem.content.substring(0, 150) + '...'}
                                        </p>
                                        
                                        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-4"></div>
                                        
                                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                            <div className="flex items-center gap-2">
                                                <FaUser className="text-blue-400" />
                                                <span className="truncate">{newsItem.author}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaClock className="text-purple-400" />
                                                <span>{getReadingTime(newsItem.content)} min</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <FaCalendar />
                                            <span>{formatDate(newsItem.created_at)}</span>
                                        </div>

                                        {newsItem.tags && newsItem.tags.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {newsItem.tags.slice(0, 2).map((tag, index) => (
                                                    <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600">
                                                        <FaTag className="text-xs" />
                                                        {tag}
                                                    </span>
                                                ))}
                                                {newsItem.tags.length > 2 && (
                                                    <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full border border-gray-600">
                                                        +{newsItem.tags.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Modal de Detalhes Aprimorado */}
            {selectedNews && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-5xl w-full my-8 border border-gray-700 shadow-2xl">
                        {/* Header Fixo */}
                        <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-md border-b border-gray-700 p-6 flex justify-between items-center rounded-t-3xl z-10">
                            <div className="flex items-center gap-4">
                                <FaNewspaper className="text-2xl text-blue-400" />
                                <div>
                                    <h2 className="text-xl font-bold text-white truncate pr-4 max-w-2xl">
                                        {selectedNews.title}
                                    </h2>
                                    <p className="text-sm text-gray-400">{formatDate(selectedNews.created_at)}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeNewsDetail}
                                className="text-gray-400 hover:text-white p-3 hover:bg-gray-700 rounded-full transition-all duration-300 hover:rotate-90"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>
                        
                        <div className="p-8 md:p-12">
                            {selectedNews.image_url && (
                                <div className="relative mb-8 rounded-2xl overflow-hidden">
                                    <img
                                        src={selectedNews.image_url}
                                        alt={selectedNews.title}
                                        className="w-full h-96 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                            )}
                            
                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(selectedNews.category)} rounded-full text-white font-semibold shadow-lg`}>
                                    {selectedNews.category}
                                </span>
                                {selectedNews.featured && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-500 border border-yellow-500/30">
                                        <FaStar />
                                        <span className="font-semibold">Em Destaque</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-gray-400">
                                    <FaEye />
                                    <span>{Math.floor(Math.random() * 1000) + 100} visualizações</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 pb-8 border-b border-gray-700">
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-blue-400" />
                                    <span className="font-medium">{selectedNews.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCalendar className="text-green-400" />
                                    <span>{formatDate(selectedNews.created_at)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-purple-400" />
                                    <span>{getReadingTime(selectedNews.content)} minutos de leitura</span>
                                </div>
                            </div>
                            
                            <div className="prose prose-invert max-w-none">
                                <div className="text-lg text-gray-300 leading-relaxed whitespace-pre-line space-y-4">
                                    {selectedNews.content.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="mb-4">{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                            
                            {selectedNews.tags && selectedNews.tags.length > 0 && (
                                <div className="mt-10 pt-8 border-t border-gray-700">
                                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <FaTag className="text-blue-400" />
                                        Tags Relacionadas
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedNews.tags.map((tag, index) => (
                                            <span key={index} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600 hover:border-blue-500 hover:bg-gray-700 transition-all duration-300 cursor-pointer">
                                                <FaTag className="text-xs text-blue-400" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA no final */}
                            <div className="mt-10 p-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-500/30 text-center">
                                <h4 className="text-2xl font-bold text-white mb-3">Gostou desta notícia?</h4>
                                <p className="text-gray-300 mb-6">Fique por dentro de todas as novidades do LTD!</p>
                                <button
                                    onClick={closeNewsDetail}
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Ver Mais Notícias
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default News;