import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';

function WeAre() {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
        fetchTeamMembers();
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-4">
                            Quem Somos
                        </h1>
                        <p className="text-xl text-gray-300">
                            Carregando informações da equipe...
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white py-16 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent mb-4">
                        Quem Somos
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Conheça a equipe de talentos que está transformando o setor público através da tecnologia
                    </p>
                </div>

                {/* Estatísticas da Equipe */}
                <div className="grid md:grid-cols-3 gap-8 mb-16" data-aos="fade-up" data-aos-delay="100">
                    <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-2xl text-center">
                        <div className="text-4xl font-bold text-white mb-2">{teamMembers.length}+</div>
                        <div className="text-blue-100">Especialistas</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-800 to-green-600 p-6 rounded-2xl text-center">
                        <div className="text-4xl font-bold text-white mb-2">15+</div>
                        <div className="text-green-100">Projetos Entregues</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-800 to-purple-600 p-6 rounded-2xl text-center">
                        <div className="text-4xl font-bold text-white mb-2">2</div>
                        <div className="text-purple-100">Prefeituras Atendidas</div>
                    </div>
                </div>

                {/* Grid de Membros */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={member.id} 
                            className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Foto do Membro */}
                            <div className="relative mb-6">
                                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-400 group-hover:border-blue-300 transition-colors">
                                    <img 
                                        src={member.photo_url} 
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4158d0&color=fff&size=96`;
                                        }}
                                    />
                                </div>
                                {/* Status Online Indicator */}
                                <div className="absolute bottom-2 right-1/2 transform translate-x-1/2 translate-y-1/2 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
                            </div>

                            {/* Informações do Membro */}
                            <div className="text-center mb-4">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-blue-400 font-medium text-sm mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {member.description}
                                </p>
                            </div>

                            {/* Redes Sociais */}
                            <div className="flex justify-center space-x-4">
                                {member.linkedin_url && (
                                    <a 
                                        href={member.linkedin_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
                                        title="LinkedIn"
                                    >
                                        <FaLinkedin className="text-xl" />
                                    </a>
                                )}
                                {member.github_url && (
                                    <a 
                                        href={member.github_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
                                        title="GitHub"
                                    >
                                        <FaGithub className="text-xl" />
                                    </a>
                                )}
                                {member.instagram_url && (
                                    <a 
                                        href={member.instagram_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-pink-400 transition-colors transform hover:scale-110"
                                        title="Instagram"
                                    >
                                        <FaInstagram className="text-xl" />
                                    </a>
                                )}
                                <a 
                                    href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@ltd.gov.br`}
                                    className="text-gray-400 hover:text-green-400 transition-colors transform hover:scale-110"
                                    title="Email"
                                >
                                    <FaEnvelope className="text-xl" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="500">
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl border border-gray-600">
                        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                            Faça Parte da Nossa Equipe
                        </h2>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            Estamos sempre em busca de talentos apaixonados por tecnologia e transformação digital. 
                            Se você tem interesse em contribuir com projetos que impactam a vida dos cidadãos, entre em contato!
                        </p>
                        <a 
                            href="/contato"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors transform hover:scale-105"
                        >
                            <FaEnvelope />
                            Entre em Contato
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeAre;