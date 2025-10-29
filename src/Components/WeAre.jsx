import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaUsers, FaTrophy, FaRocket, FaHeart, FaLightbulb, FaHandshake, FaChartLine, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function WeAre() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
        fetchTeamMembers();
        window.scrollTo(0, 0);
    }, []);

    const fetchTeamMembers = async () => {
        try {
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .order('order_position', { ascending: true });

            if (error) throw error;
            setTeamMembers(data);
        } catch (error) {
            console.error('Erro ao buscar membros da equipe:', error);
        } finally {
            setLoading(false);
        }
    };

    const valores = [
        {
            icon: FaLightbulb,
            titulo: 'Inovação',
            descricao: 'Buscamos constantemente novas soluções tecnológicas para desafios complexos',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: FaHandshake,
            titulo: 'Colaboração',
            descricao: 'Trabalhamos juntos, compartilhando conhecimento e experiências',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: FaHeart,
            titulo: 'Compromisso',
            descricao: 'Dedicados a fazer a diferença na vida dos cidadãos através da tecnologia',
            color: 'from-red-500 to-pink-500'
        },
        {
            icon: FaChartLine,
            titulo: 'Excelência',
            descricao: 'Priorizamos qualidade e boas práticas em todos os nossos projetos',
            color: 'from-green-500 to-emerald-500'
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-6 py-3 bg-blue-500/20 rounded-full text-blue-300 font-semibold mb-6 animate-pulse">
                            👥 Nossa Equipe
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
                            Quem Somos
                        </h1>
                        <p className="text-xl text-gray-300">
                            Carregando informações da equipe...
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-400"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <FaUsers className="text-4xl text-blue-400 animate-pulse" />
                            </div>
                        </div>
                    </div>
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
                    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4s"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16" data-aos="fade-up">
                        <div className="inline-block px-6 py-3 bg-blue-500/20 rounded-full text-blue-300 font-semibold mb-6 border border-blue-500/30">
                            👥 Nossa Equipe
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6">
                            Quem Somos
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Uma equipe multidisciplinar de especialistas apaixonados por tecnologia, 
                            trabalhando juntos para transformar o setor público através da inovação digital
                        </p>
                    </div>

                    {/* Estatísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20" data-aos="fade-up" data-aos-delay="100">
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-md p-8 rounded-2xl border border-blue-500/30 text-center transform hover:scale-105 transition-all duration-300">
                            <FaUsers className="text-4xl text-blue-400 mx-auto mb-4" />
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{teamMembers.length}+</div>
                            <div className="text-blue-200 font-medium">Especialistas</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 backdrop-blur-md p-8 rounded-2xl border border-green-500/30 text-center transform hover:scale-105 transition-all duration-300">
                            <FaTrophy className="text-4xl text-green-400 mx-auto mb-4" />
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
                            <div className="text-green-200 font-medium">Projetos</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-md p-8 rounded-2xl border border-purple-500/30 text-center transform hover:scale-105 transition-all duration-300">
                            <FaGlobe className="text-4xl text-purple-400 mx-auto mb-4" />
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">2</div>
                            <div className="text-purple-200 font-medium">Prefeituras</div>
                        </div>
                        <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/40 backdrop-blur-md p-8 rounded-2xl border border-pink-500/30 text-center transform hover:scale-105 transition-all duration-300">
                            <FaRocket className="text-4xl text-pink-400 mx-auto mb-4" />
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
                            <div className="text-pink-200 font-medium">Dedicação</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Nossos Valores */}
            <section className="py-20 px-6 bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent mb-4">
                            Nossos Valores
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Princípios que guiam nosso trabalho e definem quem somos
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {valores.map((valor, index) => (
                            <div
                                key={index}
                                className="group bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${valor.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300`}>
                                    <valor.icon className="text-3xl text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                                    {valor.titulo}
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {valor.descricao}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipe */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent mb-4">
                            Conheça Nossa Equipe
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Profissionais talentosos e dedicados que fazem a diferença todos os dias
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div 
                                key={member.id} 
                                className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-3xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                            >
                                {/* Foto do Membro */}
                                <div className="relative mb-6">
                                    <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-blue-500 group-hover:border-purple-500 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/50">
                                        <img 
                                            src={member.photo_url} 
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4158d0&color=fff&size=128&bold=true`;
                                            }}
                                        />
                                    </div>
                                    {/* Status Online */}
                                    <div className="absolute bottom-2 right-1/2 transform translate-x-14 translate-y-1">
                                        <div className="relative">
                                            <div className="w-5 h-5 bg-green-400 rounded-full border-4 border-gray-800 animate-pulse"></div>
                                            <div className="absolute inset-0 w-5 h-5 bg-green-400 rounded-full animate-ping"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Informações */}
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                        {member.name}
                                    </h3>
                                    <div className="inline-block px-4 py-1 bg-blue-500/20 rounded-full border border-blue-500/30 mb-3">
                                        <p className="text-blue-300 font-semibold text-sm">
                                            {member.role}
                                        </p>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                                        {member.description}
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6"></div>

                                {/* Redes Sociais */}
                                <div className="flex justify-center gap-4">
                                    {member.linkedin_url && (
                                        <a 
                                            href={member.linkedin_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700/50 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                            title="LinkedIn"
                                        >
                                            <FaLinkedin className="text-lg" />
                                        </a>
                                    )}
                                    {member.github_url && (
                                        <a 
                                            href={member.github_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700/50 text-gray-400 hover:bg-gray-900 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                            title="GitHub"
                                        >
                                            <FaGithub className="text-lg" />
                                        </a>
                                    )}
                                    {member.instagram_url && (
                                        <a 
                                            href={member.instagram_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700/50 text-gray-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                            title="Instagram"
                                        >
                                            <FaInstagram className="text-lg" />
                                        </a>
                                    )}
                                    <a 
                                        href={`mailto:${member.name.toLowerCase().replace(/\s+/g, '.')}@ltd.gov.br`}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700/50 text-gray-400 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                        title="Email"
                                    >
                                        <FaEnvelope className="text-lg" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-6 bg-gray-900/50">
                <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-md p-12 md:p-16 rounded-3xl border border-blue-500/30 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
                        <div className="relative z-10 text-center">
                            <div className="inline-block p-4 bg-blue-500/20 rounded-2xl mb-6">
                                <FaRocket className="text-5xl text-blue-300" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                                Quer Fazer Parte da Nossa Equipe?
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Estamos sempre em busca de talentos apaixonados por tecnologia e transformação digital. 
                                Se você tem interesse em contribuir com projetos que impactam positivamente a vida dos cidadãos, 
                                venha fazer parte do time LTD!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/ltd/contato"
                                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                                >
                                    <FaEnvelope className="text-xl" />
                                    Entre em Contato
                                </Link>
                                <Link
                                    to="/ltd/eventos"
                                    className="inline-flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                                >
                                    <FaUsers className="text-xl" />
                                    Veja Nossos Eventos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default WeAre;