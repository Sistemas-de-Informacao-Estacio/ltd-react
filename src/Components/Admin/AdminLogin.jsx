import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, testDatabaseConnection } from '../../lib/auth';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaDatabase } from 'react-icons/fa';

function AdminLogin() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [dbConnected, setDbConnected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkDatabaseConnection();
    }, []);

    const checkDatabaseConnection = async () => {
        const connected = await testDatabaseConnection();
        setDbConnected(connected);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('Iniciando login...');
            await adminLogin(credentials.username, credentials.password);
            console.log('Login realizado com sucesso!');
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Erro no login:', error);
            setError(error.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4 border-4 border-blue-200">
                        <img 
                            src="/estacio.jpeg" 
                            alt="Estácio Logo" 
                            className="w-16 h-16 rounded-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center text-white text-2xl font-bold hidden">
                            <FaUser />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                    <p className="text-gray-600 mt-2">Laboratório de Transformação Digital</p>
                    <p className="text-blue-600 text-sm font-medium mt-1">Estácio Florianópolis</p>
                    
                    {/* Status da conexão */}
                    <div className={`mt-3 text-sm flex items-center justify-center gap-2 ${dbConnected ? 'text-green-600' : 'text-red-600'}`}>
                        <FaDatabase className="text-lg" />
                        <span className="font-medium">
                            {dbConnected ? 'Sistema Conectado' : 'Erro na Conexão'}
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
                        <div className="font-medium">Erro de Autenticação</div>
                        <div className="text-sm mt-1">{error}</div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Usuário
                        </label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                required
                                value={credentials.username}
                                onChange={(e) => setCredentials({
                                    ...credentials,
                                    username: e.target.value
                                })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Digite seu usuário"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Senha
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={credentials.password}
                                onChange={(e) => setCredentials({
                                    ...credentials,
                                    password: e.target.value
                                })}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Digite sua senha"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !dbConnected}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Entrando...' : 'Entrar no Sistema'}
                    </button>
                </form>

                {!dbConnected && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h3 className="font-semibold text-yellow-800 mb-2">Sistema Indisponível</h3>
                        <p className="text-sm text-yellow-700">
                            Não foi possível conectar ao banco de dados. Verifique sua conexão com a internet ou tente novamente mais tarde.
                        </p>
                        <button
                            onClick={checkDatabaseConnection}
                            className="mt-2 text-sm bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-3 py-1 rounded transition-colors"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        © 2025 Laboratório de Transformação Digital<br />
                        Estácio Florianópolis - Todos os direitos reservados
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;