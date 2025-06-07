import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, testDatabaseConnection } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaDatabase } from 'react-icons/fa';

function AdminLogin() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [dbConnected, setDbConnected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkDatabaseConnection();
        loadAvailableUsers();
    }, []);

    const checkDatabaseConnection = async () => {
        const connected = await testDatabaseConnection();
        setDbConnected(connected);
    };

    const loadAvailableUsers = async () => {
        try {
            const { data, error } = await supabase
                .from('admin_users')
                .select('username, email, full_name');
            
            if (!error && data) {
                setAvailableUsers(data);
                console.log('Usuários disponíveis carregados:', data);
            } else {
                console.error('Erro ao carregar usuários:', error);
            }
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
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

    const fillCredentials = (username, password) => {
        setCredentials({ username, password });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <FaUser className="text-blue-600 text-2xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                    <p className="text-gray-600 mt-2">Acesse o painel administrativo</p>
                    
                    {/* Status da conexão */}
                    <div className={`mt-2 text-sm ${dbConnected ? 'text-green-600' : 'text-red-600'}`}>
                        <FaDatabase className="inline mr-1" />
                        {dbConnected ? 'Conectado ao banco' : 'Erro na conexão'}
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
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
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                {/* Debug: Usuários disponíveis */}
                {availableUsers.length > 0 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-700 mb-2">Usuários disponíveis:</h3>
                        <div className="space-y-2">
                            {availableUsers.map((user, index) => (
                                <div key={index} className="text-sm">
                                    <button
                                        type="button"
                                        onClick={() => fillCredentials(user.username, user.username === 'admin' ? 'admin123' : 'Vagnercordeiro@2022')}
                                        className="text-left w-full p-2 hover:bg-blue-50 rounded border text-blue-600 hover:text-blue-800"
                                    >
                                        <strong>Usuário:</strong> {user.username}<br />
                                        <strong>Nome:</strong> {user.full_name}<br />
                                        <strong>Email:</strong> {user.email}
                                        <div className="text-xs text-gray-500 mt-1">Clique para preencher automaticamente</div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {availableUsers.length === 0 && dbConnected && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                        <h3 className="font-semibold text-yellow-700 mb-2">Nenhum usuário encontrado!</h3>
                        <p className="text-sm text-yellow-600">
                            Execute o script SQL fornecido para criar os usuários admin.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminLogin;