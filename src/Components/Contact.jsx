import React, { useState } from 'react';
import '../Contato.css';
import CookieManager from './CookieManager';

function Contato() {
  // Estados para gerenciar formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manipuladores de formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };

  // Validação do formulário
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.nome.trim()) {
      errors.nome = 'Por favor, informe seu nome';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Por favor, informe seu e-mail';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Por favor, informe um e-mail válido';
    }
    
    if (!formData.assunto.trim()) {
      errors.assunto = 'Por favor, informe o assunto';
    }
    
    if (!formData.mensagem.trim()) {
      errors.mensagem = 'Por favor, digite sua mensagem';
    } else if (formData.mensagem.trim().length < 10) {
      errors.mensagem = 'Sua mensagem deve ter pelo menos 10 caracteres';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulação de envio - em produção, substitua por chamada real à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      
      // Limpar formulário após envio bem-sucedido
      setFormData({
        nome: '',
        email: '',
        assunto: '',
        mensagem: ''
      });
      
      // Limpar mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Links de redes sociais
  const socialLinks = [
    {
      id: 'discord',
      name: 'Discord',
      icon: '🎮',
      url: 'https://discord.gg/estacio-florianopolis',
      description: 'Entre no nosso servidor Discord para suporte e discussões em tempo real'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '💻',
      url: 'https://github.com/LTD-2025-1-Cyber-Security-Project/ciber-seguranca/issues',
      description: 'Abra uma issue no GitHub para reportar bugs ou sugerir melhorias'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📸',
      url: 'https://www.instagram.com/estacio.florianopolis/',
      description: 'Siga a Estácio Florianópolis no Instagram para ficar por dentro das novidades'
    }
  ];

  // Informações de contato adicionais
  const contactInfo = [
    {
      id: 'address',
      icon: '🏢',
      title: 'Endereço',
      content: 'Rua Coronel Pedro Demoro, 2447 - Estreito, Florianópolis - SC, 88075-300'
    },
    {
      id: 'phone',
      icon: '📞',
      title: 'Telefone',
      content: '(48) 3271-3900'
    },
    {
      id: 'email',
      icon: '📧',
      title: 'E-mail',
      content: 'atendimento.florianopolis@estacio.br'
    },
    {
      id: 'hours',
      icon: '🕒',
      title: 'Horário de Atendimento',
      content: 'Segunda a Sexta: 8h às 21h • Sábado: 8h às 12h'
    }
  ];

  return (
    <div className="contato-container">
      <div className="contato-header">
        <h1>Entre em Contato</h1>
        <p>Estamos aqui para ajudar com qualquer dúvida sobre nossos aplicativos ou serviços</p>
      </div>
      
      <div className="contato-content">
        <div className="contato-form-section">
          <div className="contato-form-container">
            <h2>Envie uma mensagem</h2>
            
            {submitStatus === 'success' && (
              <div className="submit-message success">
                <div className="submit-icon">✓</div>
                <div className="submit-text">
                  <h3>Mensagem enviada com sucesso!</h3>
                  <p>Agradecemos seu contato. Retornaremos em breve.</p>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="submit-message error">
                <div className="submit-icon">⚠</div>
                <div className="submit-text">
                  <h3>Erro ao enviar mensagem</h3>
                  <p>Por favor, tente novamente ou use um dos outros canais de contato.</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contato-form">
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className={formErrors.nome ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {formErrors.nome && <div className="error-message">{formErrors.nome}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu.email@exemplo.com"
                  className={formErrors.email ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {formErrors.email && <div className="error-message">{formErrors.email}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="assunto">Assunto</label>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  placeholder="Assunto da sua mensagem"
                  className={formErrors.assunto ? 'error' : ''}
                  disabled={isSubmitting}
                />
                {formErrors.assunto && <div className="error-message">{formErrors.assunto}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="mensagem">Mensagem</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Digite sua mensagem aqui..."
                  rows="6"
                  className={formErrors.mensagem ? 'error' : ''}
                  disabled={isSubmitting}
                ></textarea>
                {formErrors.mensagem && <div className="error-message">{formErrors.mensagem}</div>}
              </div>
              
              <button 
                type="submit" 
                className="submit-button" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="contato-info-section">
          <div className="social-links-container">
            <h2>Conecte-se conosco</h2>
            <div className="social-links">
              {socialLinks.map(link => (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link-card"
                >
                  <div className="social-icon">{link.icon}</div>
                  <div className="social-content">
                    <h3>{link.name}</h3>
                    <p>{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="contact-info-container">
            <h2>Informações de contato</h2>
            <div className="contact-info-list">
              {contactInfo.map(info => (
                <div key={info.id} className="contact-info-item">
                  <div className="contact-info-icon">{info.icon}</div>
                  <div className="contact-info-content">
                    <h3>{info.title}</h3>
                    <p>{info.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="faq-section">
            <h2>Perguntas frequentes</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>Como faço para atualizar os aplicativos?</summary>
                <div className="faq-answer">
                  Para atualizar nossos aplicativos, basta baixar a versão mais recente do nosso site e instalar. A nova versão substituirá automaticamente a anterior, mantendo seus dados.
                </div>
              </details>
              
              <details className="faq-item">
                <summary>Os aplicativos são compatíveis com Mac ou Linux?</summary>
                <div className="faq-answer">
                  No momento, nossos aplicativos estão disponíveis apenas para Windows. Estamos trabalhando para oferecer versões para Mac e Linux em breve.
                </div>
              </details>
              
              <details className="faq-item">
                <summary>Posso usar os aplicativos em uma rede corporativa?</summary>
                <div className="faq-answer">
                  Sim! Nossos aplicativos são projetados para funcionar em redes corporativas. Para instalações em larga escala, entre em contato com nossa equipe para obter assistência na implementação.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Gerenciamento de Cookies */}
      <div className="contato-content mt-16">
        <CookieManager />
      </div>
      
      <div className="contato-map-section">
        <h2>Visite-nos</h2>
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.9773112766723!2d-48.59340962482!3d-27.588753727352325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9527473221ae41fd%3A0x1bbd3e8d9a1b6f9c!2sEst%C3%A1cio%20Florian%C3%B3polis!5e0!3m2!1spt-BR!2sbr!4v1684341851445!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Estácio Florianópolis"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contato;