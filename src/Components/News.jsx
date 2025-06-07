import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FaCalendar, FaUser, FaTag, FaStar, FaSearch } from 'react-icons/fa';

function News() {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchNews();
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
    
    const featuredNews = news.filter(item => item.featured).slice(0, 3);
    // eslint-disable-next-line no-unused-vars
    const recentNews = filteredNews.slice(0, 6);

    const getCategoryColor = (category) => {
        const colors = {
            'Geral': 'bg-gray-100 text-gray-800',
            'Tecnologia': 'bg-blue-100 text-blue-800',
            'Cibersegurança': 'bg-red-100 text-red-800',
            'Inteligência Artificial': 'bg-purple-100 text-purple-800',
            'Desenvolvimento': 'bg-green-100 text-green-800',
            'Eventos': 'bg-yellow-100 text-yellow-800',
            'Empresa': 'bg-indigo-100 text-indigo-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const showNewsDetail = (newsItem) => {
        setSelectedNews(newsItem);
        document.body.style.overflow = 'hidden';
    };

    const closeNewsDetail = () => {
        setSelectedNews(null);
        document.body.style.overflow = 'auto';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Últimas Notícias
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                        Fique por dentro das novidades, inovações e atualizações do nosso universo tecnológico
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                {/* Filtros */}
                <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="flex-1">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar notícias..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notícias em Destaque */}
                {featuredNews.length > 0 && searchTerm === '' && selectedCategory === 'Todas' && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <FaStar className="text-yellow-500" />
                            Notícias em Destaque
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {featuredNews.map((newsItem) => (
                                <article
                                    key={newsItem.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                    onClick={() => showNewsDetail(newsItem)}
                                >
                                    {newsItem.image_url && (
                                        <img
                                            src={newsItem.image_url}
                                            alt={newsItem.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(newsItem.category)}`}>
                                                {newsItem.category}
                                            </span>
                                            <FaStar className="text-yellow-500 text-sm" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                            {newsItem.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {newsItem.excerpt || newsItem.content.substring(0, 150) + '...'}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <FaUser />
                                                <span>{newsItem.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaCalendar />
                                                <span>{formatDate(newsItem.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* Lista de Notícias */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        {searchTerm ? `Resultados para "${searchTerm}"` : 
                         selectedCategory !== 'Todas' ? `Categoria: ${selectedCategory}` : 
                         'Todas as Notícias'}
                        <span className="text-lg font-normal text-gray-600 ml-2">
                            ({filteredNews.length} {filteredNews.length === 1 ? 'notícia' : 'notícias'})
                        </span>
                    </h2>
                    
                    {filteredNews.length === 0 ? (
                        <div className="text-center py-12">
                            <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma notícia encontrada</h3>
                            <p className="text-gray-600">
                                {searchTerm 
                                    ? 'Tente usar termos de busca diferentes.' 
                                    : 'Não há notícias nesta categoria no momento.'
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredNews.map((newsItem) => (
                                <article
                                    key={newsItem.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                    onClick={() => showNewsDetail(newsItem)}
                                >
                                    {newsItem.image_url && (
                                        <img
                                            src={newsItem.image_url}
                                            alt={newsItem.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(newsItem.category)}`}>
                                                {newsItem.category}
                                            </span>
                                            {newsItem.featured && (
                                                <FaStar className="text-yellow-500 text-sm" />
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                            {newsItem.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {newsItem.excerpt || newsItem.content.substring(0, 150) + '...'}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <FaUser />
                                                <span>{newsItem.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaCalendar />
                                                <span>{formatDate(newsItem.created_at)}</span>
                                            </div>
                                        </div>
                                        {newsItem.tags && newsItem.tags.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-1">
                                                {newsItem.tags.slice(0, 3).map((tag, index) => (
                                                    <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                        <FaTag className="text-xs" />
                                                        {tag}
                                                    </span>
                                                ))}
                                                {newsItem.tags.length > 3 && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                        +{newsItem.tags.length - 3}
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

            {/* Modal de Detalhes */}
            {selectedNews && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 truncate pr-4">
                                {selectedNews.title}
                            </h2>
                            <button
                                onClick={closeNewsDetail}
                                className="text-gray-500 hover:text-gray-700 p-2"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            {selectedNews.image_url && (
                                <img
                                    src={selectedNews.image_url}
                                    alt={selectedNews.title}
                                    className="w-full h-64 object-cover rounded-lg mb-6"
                                />
                            )}
                            
                            <div className="flex items-center gap-4 mb-6">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(selectedNews.category)}`}>
                                    {selectedNews.category}
                                </span>
                                {selectedNews.featured && (
                                    <div className="flex items-center gap-1 text-yellow-600">
                                        <FaStar />
                                        <span className="text-sm font-medium">Destaque</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                                <div className="flex items-center gap-1">
                                    <FaUser />
                                    <span>{selectedNews.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaCalendar />
                                    <span>{formatDate(selectedNews.created_at)}</span>
                                </div>
                            </div>
                            
                            <div className="prose max-w-none">
                                <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                                    {selectedNews.content}
                                </div>
                            </div>
                            
                            {selectedNews.tags && selectedNews.tags.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Tags:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedNews.tags.map((tag, index) => (
                                            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                                <FaTag className="text-xs" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default News;