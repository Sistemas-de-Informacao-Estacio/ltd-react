import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, testDatabaseConnection, checkTablesExist } from '../../lib/auth';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaDatabase, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

function AdminLogin() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [dbStatus, setDbStatus] = useState({
        connected: false,
        checking: true,
        tables: {}
    });
    const navigate = useNavigate();

    useEffect(() => {
        checkDatabaseConnection();
    }, []);

    const checkDatabaseConnection = async () => {
        setDbStatus(prev => ({ ...prev, checking: true }));
        
        try {
            console.log('Verificando conexão com o banco...');
            const connected = await testDatabaseConnection();
            
            let tables = {};
            if (connected) {
                console.log('Verificando tabelas...');
                tables = await checkTablesExist();
            }
            
            setDbStatus({
                connected,
                checking: false,
                tables
            });
            
            if (connected) {
                console.log('Banco conectado com sucesso');
            } else {
                console.log('Falha na conexão com o banco');
            }
        } catch (error) {
            console.error('Erro ao verificar conexão:', error);
            setDbStatus({
                connected: false,
                checking: false,
                tables: {}
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!dbStatus.connected) {
            setError('Sistema indisponível. Verifique a conexão com o banco de dados.');
            return;
        }
        
        setLoading(true);
        setError('');

        try {
            console.log('Iniciando processo de login...');
            const user = await adminLogin(credentials.username, credentials.password);
            console.log('Login realizado com sucesso:', user);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Erro no login:', error);
            
            // Tratar diferentes tipos de erro
            if (error.message.includes('Usuário não encontrado')) {
                setError('Usuário não encontrado. Verifique o nome de usuário.');
            } else if (error.message.includes('Senha incorreta')) {
                setError('Senha incorreta. Verifique sua senha.');
            } else if (error.message.includes('conexão')) {
                setError('Erro de conexão com o banco de dados. Tente novamente.');
            } else {
                setError(error.message || 'Erro inesperado. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    const getConnectionStatusColor = () => {
        if (dbStatus.checking) return 'text-yellow-600';
        return dbStatus.connected ? 'text-green-600' : 'text-red-600';
    };

    const getConnectionStatusText = () => {
        if (dbStatus.checking) return 'Verificando Conexão...';
        return dbStatus.connected ? 'Sistema Conectado' : 'Erro na Conexão';
    };

    const getConnectionIcon = () => {
        if (dbStatus.checking) return <FaDatabase className="text-lg animate-pulse" />;
        return dbStatus.connected ? 
            <FaCheckCircle className="text-lg" /> : 
            <FaExclamationTriangle className="text-lg" />;
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
                    <div className={`mt-3 text-sm flex items-center justify-center gap-2 ${getConnectionStatusColor()}`}>
                        {getConnectionIcon()}
                        <span className="font-medium">
                            {getConnectionStatusText()}
                        </span>
                    </div>
                </div>

                {/* Diagnóstico detalhado */}
                {!dbStatus.checking && !dbStatus.connected && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="font-semibold text-red-800 mb-2">Diagnóstico do Sistema</h3>
                        <div className="text-sm text-red-700 space-y-1">
                            <div>• Conexão com Supabase: ❌ Falhou</div>
                            <div>• URL: ezsjmevzlvhofdtbbwdn.supabase.co</div>
                            <div>• Status: Erro 400 (Bad Request)</div>
                        </div>
                        <button
                            onClick={checkDatabaseConnection}
                            className="mt-2 text-sm bg-red-200 hover:bg-red-300 text-red-800 px-3 py-1 rounded transition-colors"
                            disabled={dbStatus.checking}
                        >
                            {dbStatus.checking ? 'Verificando...' : 'Tentar Novamente'}
                        </button>
                    </div>
                )}

                {/* Status das tabelas quando conectado */}
                {dbStatus.connected && Object.keys(dbStatus.tables).length > 0 && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-semibold text-green-800 mb-2">Status das Tabelas</h3>
                        <div className="text-sm text-green-700 grid grid-cols-2 gap-1">
                            {Object.entries(dbStatus.tables).map(([table, exists]) => (
                                <div key={table} className="flex items-center gap-1">
                                    <span>{exists ? '✅' : '❌'}</span>
                                    <span>{table}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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
                                disabled={!dbStatus.connected}
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
                                disabled={!dbStatus.connected}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                disabled={!dbStatus.connected}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !dbStatus.connected}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Entrando...' : 'Entrar no Sistema'}
                    </button>
                </form>

                {/* Informações de login para desenvolvimento */}
                {/* {dbStatus.connected && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-800 mb-2">Usuários de Teste</h3>
                        <div className="text-sm text-blue-700 space-y-1">
                            <div>👤 <strong>admin</strong> / admin123</div>
                            <div>👤 <strong>editor</strong> / editor123</div>
                        </div>
                    </div>
                )} */}

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