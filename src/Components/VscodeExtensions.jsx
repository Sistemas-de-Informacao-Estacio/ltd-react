import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FaStar, FaDownload, FaCode, FaRocket, FaBox, FaUsers } from 'react-icons/fa';

const VscodeExtensions = () => {
  const [extensions, setExtensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchExtensions();
  }, []);

  const fetchExtensions = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Buscando extensões VS Code no Supabase...');
      console.log('📍 Tabela: produtos_vscode_extensions');
      
      const { data, error: supabaseError, count } = await supabase
        .from('produtos_vscode_extensions')
        .select('*', { count: 'exact' })
        .eq('published', true)
        .order('created_at', { ascending: false });

      console.log('📦 Resposta do Supabase:', { 
        data, 
        error: supabaseError,
        count: count || data?.length || 0 
      });

      if (supabaseError) {
        console.error('❌ Erro do Supabase:', supabaseError);
        throw supabaseError;
      }

      if (!data || data.length === 0) {
        console.warn('⚠️ Nenhuma extensão encontrada na tabela produtos_vscode_extensions');
        setExtensions([]);
      } else {
        console.log('✅ Extensões carregadas com sucesso:', data.length);
        setExtensions(data);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar extensões:', error);
      setError(error.message || 'Erro ao carregar extensões');
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(extensions.map(ext => ext.category))];
  
  const filteredExtensions = selectedCategory === 'all' 
    ? extensions 
    : extensions.filter(ext => ext.category === selectedCategory);

  const getCategoryIcon = (category) => {
    const icons = {
      'Produtividade': '⚡',
      'Análise': '📊',
      'Debugging': '🐛',
      'Formatação': '✨',
      'Temas': '🎨'
    };
    return icons[category] || '🔧';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Extensões VS Code LTD
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Extensões profissionais para VS Code que aumentam sua produtividade e tornam o desenvolvimento 
            mais eficiente e prazeroso.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">{extensions.length}+</div>
              <div className="text-gray-400 text-sm mt-1">Extensões</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">100K+</div>
              <div className="text-gray-400 text-sm mt-1">Instalações</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">4.9★</div>
              <div className="text-gray-400 text-sm mt-1">Avaliação</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">Open</div>
              <div className="text-gray-400 text-sm mt-1">Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            Todas as Extensões
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              <span>{getCategoryIcon(category)}</span>
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Lista de Extensões */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-2xl mx-auto">
              <FaCode className="mx-auto text-6xl text-red-500 mb-4" />
              <h3 className="text-2xl font-semibold text-red-400 mb-2">Erro ao carregar extensões</h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <button 
                onClick={fetchExtensions}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        ) : filteredExtensions.length === 0 ? (
          <div className="text-center py-20">
            <FaCode className="mx-auto text-6xl text-gray-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">Nenhuma extensão encontrada</h3>
            <p className="text-gray-500">
              {extensions.length === 0 
                ? 'As extensões ainda não foram cadastradas no sistema.' 
                : 'Tente selecionar outra categoria'
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExtensions.map((extension) => (
              <article
                key={extension.id}
                className="group bg-gradient-to-br from-gray-800/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                {/* Header do Card */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
                      </svg>
                    </div>
                    <span className={`px-3 py-1 ${extension.category_color || 'bg-blue-500/20 text-blue-300'} rounded-full text-xs font-semibold`}>
                      {extension.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {extension.name}
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm mb-4 line-clamp-3">
                    {extension.description}
                  </p>

                  {/* Features */}
                  {extension.features && extension.features.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {extension.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Badges */}
                  <div className="flex gap-3 mb-4">
                    {extension.rating && (
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        <FaStar />
                        <span className="font-semibold">{extension.rating}</span>
                      </div>
                    )}
                    {extension.installs && (
                      <div className="flex items-center gap-1 text-green-400 text-sm">
                        <FaDownload />
                        <span className="font-semibold">{extension.installs}</span>
                      </div>
                    )}
                    {extension.version && (
                      <div className="flex items-center gap-1 text-purple-400 text-sm">
                        <FaBox />
                        <span className="font-semibold">v{extension.version}</span>
                      </div>
                    )}
                  </div>

                  {/* Author */}
                  {extension.author && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <FaUsers />
                      <span>Por {extension.author}</span>
                    </div>
                  )}

                  {/* Install Button */}
                  <a
                    href={extension.marketplace_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg font-semibold"
                  >
                    <svg className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
                    </svg>
                    Instalar no VS Code
                  </a>

                  {/* Tags */}
                  {extension.tags && extension.tags.length > 0 && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {extension.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-700/50 text-gray-400 rounded-lg text-xs hover:bg-gray-700 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-pink-900/40 p-12 rounded-3xl border border-blue-500/30 text-center backdrop-blur-sm">
          <FaRocket className="mx-auto text-5xl text-blue-400 mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Quer contribuir?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Nossas extensões são open source! Contribua com melhorias, reporte bugs ou 
            sugira novas funcionalidades no GitHub.
          </p>
          <a
            href="https://github.com/LTD-2025-1-Cyber-Security-Project"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            Ver no GitHub
            <FaCode />
          </a>
        </div>
      </section>
    </div>
  );
};

export default VscodeExtensions;
