import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaInstagram, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import '../Contato.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({
        type: '', // 'success', 'error', 'loading'
        message: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Assunto é obrigatório';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Mensagem é obrigatória';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendEmail = async (templateParams) => {
        // eslint-disable-next-line no-useless-catch
        try {
            // Configuração do EmailJS via fetch
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: 'service_u8y7czl',
                    template_id: 'template_942xvdb',
                    user_id: 'yE_GwqxPGBVpjO6FI',
                    accessToken: '-S1nzYymLZP4cQU-I29D1',
                    template_params: templateParams
                })
            });

            if (!response.ok) {
                throw new Error('Falha no envio do e-mail');
            }

            return await response.text();
        } catch (error) {
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setStatus({ type: 'loading', message: 'Enviando mensagem...' });

        try {
            // Preparar dados para o template
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'contato@ltd.gov.br',
                reply_to: formData.email
            };

            // Enviar e-mail
            await sendEmail(templateParams);

            setStatus({
                type: 'success',
                message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
            });

            // Limpar formulário
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setErrors({});

            // Limpar status após 5 segundos
            setTimeout(() => {
                setStatus({ type: '', message: '' });
            }, 5000);

        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            setStatus({
                type: 'error',
                message: 'Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente pelos nossos canais.'
            });

            // Limpar status de erro após 10 segundos
            setTimeout(() => {
                setStatus({ type: '', message: '' });
            }, 10000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Limpar erro específico quando o usuário começar a digitar
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt />,
            title: 'Endereço',
            content: 'Rua Coronel Pedro Demoro, 2447\nEstreito, Florianópolis - SC\nCEP: 88070-200',
            color: 'contact-info-blue'
        },
        {
            icon: <FaPhone />,
            title: 'Telefone',
            content: '(48) 3271-3900\nHorário: 08:00 - 18:00',
            color: 'contact-info-green'
        },
        {
            icon: <FaEnvelope />,
            title: 'E-mail',
            content: 'contato@ltd.gov.br\nsuporte@ltd.gov.br',
            color: 'contact-info-purple'
        }
    ];

    // eslint-disable-next-line no-unused-vars
    const socialLinks = [
        {
            icon: <FaGithub />,
            name: 'GitHub',
            url: 'https://github.com/LTD-2025-1-Cyber-Security-Project',
            description: 'Veja nossos projetos open source',
            color: 'social-github'
        },
        {
            icon: <FaInstagram />,
            name: 'Instagram',
            url: 'https://www.instagram.com/estacio.florianopolis/',
            description: 'Acompanhe nosso dia a dia',
            color: 'social-instagram'
        },
        {
            icon: <FaLinkedin />,
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/school/estacio/',
            description: 'Conecte-se profissionalmente',
            color: 'social-linkedin'
        }
    ];

    const workingHours = [
        { day: 'Segunda - Sexta', hours: '08:00 - 18:00', available: true },
        { day: 'Sábado', hours: '08:00 - 12:00', available: true },
        { day: 'Domingo', hours: 'Fechado', available: false }
    ];

    return (
        <div className="contact-page">
            {/* Header Section */}
            <section className="contact-hero">
                <div className="hero-background"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Entre em Contato</h1>
                    <p className="hero-subtitle">
                        Estamos prontos para ajudar você a transformar suas ideias em soluções digitais inovadoras
                    </p>
                    <div className="hero-decoration">
                        <div className="decoration-line"></div>
                        <div className="decoration-circle"></div>
                        <div className="decoration-line"></div>
                    </div>
                </div>
            </section>

            <div className="contact-container">
                <div className="contact-grid">
                    
                    {/* Formulário */}
                    <div className="contact-form-section">
                        <div className="form-header">
                            <h2 className="form-title">Envie sua Mensagem</h2>
                            <p className="form-subtitle">Preencha o formulário abaixo e entraremos em contato o mais breve possível</p>
                        </div>

                        {/* Status Message */}
                        {status.message && (
                            <div className={`status-message status-${status.type}`}>
                                <div className="status-content">
                                    <div className="status-icon">
                                        {status.type === 'success' && <FaCheckCircle />}
                                        {status.type === 'error' && <FaExclamationCircle />}
                                        {status.type === 'loading' && <FaSpinner className="status-spinner" />}
                                    </div>
                                    <span className="status-text">{status.message}</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Nome Completo *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`form-input ${errors.name ? 'error' : ''}`}
                                        placeholder="Seu nome completo"
                                    />
                                    {errors.name && <span className="form-error">{errors.name}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">E-mail *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-input ${errors.email ? 'error' : ''}`}
                                        placeholder="seu@email.com"
                                    />
                                    {errors.email && <span className="form-error">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Assunto *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`form-input ${errors.subject ? 'error' : ''}`}
                                    placeholder="Como podemos ajudar?"
                                />
                                {errors.subject && <span className="form-error">{errors.subject}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Mensagem *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                                    placeholder="Descreva seu projeto, dúvida ou como podemos colaborar..."
                                />
                                {errors.message && <span className="form-error">{errors.message}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={status.type === 'loading'}
                                className="submit-button"
                            >
                                <span className="button-content">
                                    <span className="button-icon">
                                        {status.type === 'loading' ? <FaSpinner className="button-spinner" /> : <FaPaperPlane />}
                                    </span>
                                    <span className="button-text">
                                        {status.type === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
                                    </span>
                                </span>
                            </button>
                        </form>
                    </div>

                    {/* Informações de Contato */}
                    <div className="contact-info-section">
                        
                        {/* Informações de Contato */}
                        <div className="info-card">
                            <h3 className="info-title">Informações de Contato</h3>
                            <div className="info-list">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className={`info-item ${info.color}`}>
                                        <div className="info-icon">{info.icon}</div>
                                        <div className="info-content">
                                            <h4 className="info-label">{info.title}</h4>
                                            <p className="info-text">{info.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Horários */}
                        <div className="info-card">
                            <h3 className="info-title">Horários de Atendimento</h3>
                            <div className="hours-list">
                                {workingHours.map((schedule, index) => (
                                    <div key={index} className={`hours-item ${schedule.available ? 'available' : 'unavailable'}`}>
                                        <span className="hours-day">{schedule.day}</span>
                                        <span className="hours-time">{schedule.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mapa */}
                <div className="map-section">
                    <h3 className="map-title">Nossa Localização</h3>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.4089712097085!2d-48.54444268502152!3d-27.58992198287584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9527395c00e80d9b%3A0x2d02fe16e6c63dc8!2sR.%20Cel.%20Pedro%20Demoro%2C%202447%20-%20Estreito%2C%20Florian%C3%B3polis%20-%20SC!5e0!3m2!1spt-BR!2sbr!4v1678895234567!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização LTD - Estácio Florianópolis"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;