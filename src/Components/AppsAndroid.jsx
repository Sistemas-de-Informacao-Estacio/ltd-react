import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FaAndroid, FaDownload, FaStar, FaUsers, FaBox, FaRocket, FaShieldAlt } from 'react-icons/fa';

const AppsAndroid = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Buscando apps Android no Supabase...');
      
      const { data, error: supabaseError } = await supabase
        .from('ltd_android_apps')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      console.log('📦 Resposta do Supabase:', { 
        data, 
        error: supabaseError,
        count: data?.length || 0 
      });

      if (supabaseError) {
        console.error('❌ Erro do Supabase:', supabaseError);
        throw supabaseError;
      }

      if (!data || data.length === 0) {
        console.warn('⚠️ Nenhum app encontrado na tabela ltd_android_apps');
        setApps([]);
      } else {
        console.log('✅ Apps carregados com sucesso:', data.length);
        setApps(data);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar apps:', error);
      setError(error.message || 'Erro ao carregar aplicativos');
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(apps.map(app => app.category))];
  
  const filteredApps = selectedCategory === 'all' 
    ? apps 
    : apps.filter(app => app.category === selectedCategory);

  const getCategoryIcon = (category) => {
    const icons = {
      'Educação': '📚',
      'Produtividade': '⚡',
      'Social': '👥',
      'Negócios': '💼',
      'Utilidades': '🛠️'
    };
    return icons[category] || '📱';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-3xl flex items-center justify-center shadow-2xl">
              <FaAndroid className="text-5xl text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent">
            Apps Android LTD
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Aplicativos móveis desenvolvidos para transformar a forma como você trabalha e se conecta. 
            Tecnologia de ponta na palma da sua mão.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">{apps.length}+</div>
              <div className="text-gray-400 text-sm mt-1">Aplicativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">50K+</div>
              <div className="text-gray-400 text-sm mt-1">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">4.8★</div>
              <div className="text-gray-400 text-sm mt-1">Avaliação</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">100%</div>
              <div className="text-gray-400 text-sm mt-1">Gratuito</div>
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
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            Todos os Apps
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              <span>{getCategoryIcon(category)}</span>
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Lista de Apps */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-2xl mx-auto">
              <FaAndroid className="mx-auto text-6xl text-red-500 mb-4" />
              <h3 className="text-2xl font-semibold text-red-400 mb-2">Erro ao carregar apps</h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <button 
                onClick={fetchApps}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-20">
            <FaAndroid className="mx-auto text-6xl text-gray-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">Nenhum app encontrado</h3>
            <p className="text-gray-500">
              {apps.length === 0 
                ? 'Os apps ainda não foram cadastrados no sistema.' 
                : 'Tente selecionar outra categoria'
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApps.map((app) => (
              <article
                key={app.id}
                className="group bg-gradient-to-br from-gray-800/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                {/* Header do Card */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${app.color_gradient || 'from-green-500 to-green-700'} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                      {app.icon || '📱'}
                    </div>
                    <span className={`px-3 py-1 ${app.category_color || 'bg-green-500/20 text-green-300'} rounded-full text-xs font-semibold`}>
                      {app.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {app.name}
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm mb-4 line-clamp-3">
                    {app.description}
                  </p>

                  {/* Features */}
                  {app.features && app.features.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {app.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                          <div className={`w-2 h-2 ${app.feature_color || 'bg-green-400'} rounded-full`}></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Badges */}
                  <div className="flex gap-3 mb-4">
                    {app.rating && (
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        <FaStar />
                        <span className="font-semibold">{app.rating}</span>
                      </div>
                    )}
                    {app.downloads && (
                      <div className="flex items-center gap-1 text-blue-400 text-sm">
                        <FaUsers />
                        <span className="font-semibold">{app.downloads}</span>
                      </div>
                    )}
                    {app.version && (
                      <div className="flex items-center gap-1 text-purple-400 text-sm">
                        <FaBox />
                        <span className="font-semibold">v{app.version}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer do Card - Download Button */}
                <div className="p-6 pt-0">
                  <a
                    href={app.download_url}
                    download
                    className="group/btn w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg font-semibold"
                  >
                    <FaAndroid className="text-xl group-hover/btn:animate-pulse" />
                    Baixar APK
                    <FaDownload className="text-sm group-hover/btn:animate-bounce" />
                  </a>
                </div>

                {/* Tags */}
                {app.tags && app.tags.length > 0 && (
                  <div className="px-6 pb-6">
                    <div className="flex flex-wrap gap-2">
                      {app.tags.map((tag, index) => (
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
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-r from-green-900/40 via-blue-900/40 to-purple-900/40 p-12 rounded-3xl border border-green-500/30 text-center backdrop-blur-sm">
          <FaRocket className="mx-auto text-5xl text-green-400 mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Tem uma ideia de aplicativo?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            O LTD está sempre desenvolvendo novas soluções. Entre em contato e vamos 
            transformar sua ideia em realidade!
          </p>
          <a
            href="/ltd/contato"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            Entre em Contato
            <FaRocket />
          </a>
        </div>
      </section>
    </div>
  );
};

export default AppsAndroid;
