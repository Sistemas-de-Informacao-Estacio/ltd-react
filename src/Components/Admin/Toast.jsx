import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const icons = {
        success: <FaCheckCircle className="text-green-500 text-2xl" />,
        error: <FaExclamationCircle className="text-red-500 text-2xl" />,
        warning: <FaExclamationCircle className="text-yellow-500 text-2xl" />,
        info: <FaInfoCircle className="text-blue-500 text-2xl" />
    };

    const colors = {
        success: 'border-l-4 border-green-500',
        error: 'border-l-4 border-red-500',
        warning: 'border-l-4 border-yellow-500',
        info: 'border-l-4 border-blue-500'
    };

    return (
        <div className={`admin-toast flex items-center gap-3 ${colors[type]}`}>
            {icons[type]}
            <p className="flex-1 text-gray-800 font-medium">{message}</p>
            <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <FaTimes className="text-gray-400" />
            </button>
        </div>
    );
}

export default Toast;
