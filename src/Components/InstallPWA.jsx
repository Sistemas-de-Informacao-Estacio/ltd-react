import { useState, useEffect } from 'react';
import { FaDownload, FaTimes, FaMobile } from 'react-icons/fa';

function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            
            // Mostrar o prompt após 30 segundos se não foi instalado
            setTimeout(() => {
                if (!window.matchMedia('(display-mode: standalone)').matches) {
                    setShowInstallPrompt(true);
                }
            }, 30000);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                setShowInstallPrompt(false);
            }
        }
    };

    const handleDismiss = () => {
        setShowInstallPrompt(false);
        localStorage.setItem('pwa-install-dismissed', 'true');
    };

    // Não mostrar se já foi dispensado
    if (localStorage.getItem('pwa-install-dismissed') === 'true') {
        return null;
    }

    // Não mostrar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
        return null;
    }

    if (!showInstallPrompt || !deferredPrompt) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm z-50 animate-slide-up">
            <button
                onClick={handleDismiss}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
                <FaTimes />
            </button>
            
            <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <FaMobile className="text-blue-600 text-xl" />
                </div>
                
                <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">
                        Instalar App LTD
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                        Adicione nosso app à sua tela inicial para acesso rápido e experiência otimizada!
                    </p>
                    
                    <div className="flex gap-2">
                        <button
                            onClick={handleInstall}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                        >
                            <FaDownload />
                            Instalar
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Agora não
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstallPWA;