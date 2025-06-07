import { supabase } from './supabase';

// Função para fazer login do admin
export const adminLogin = async (username, password) => {
  try {
    console.log('Tentando login com usuário:', username);
    
    // Buscar usuário por username
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .single();

    console.log('Resultado da busca:', { user, error });

    if (error) {
      console.error('Erro na consulta SQL:', error);
      
      // Se o erro for "No rows", tentar listar todos os usuários para debug
      if (error.code === 'PGRST116') {
        console.log('Usuário não encontrado, listando todos os usuários disponíveis:');
        const { data: allUsers, error: listError } = await supabase
          .from('admin_users')
          .select('username, email, full_name');
        
        if (listError) {
          console.error('Erro ao listar usuários:', listError);
        } else {
          console.log('Usuários disponíveis:', allUsers);
        }
      }
      
      throw new Error('Usuário não encontrado');
    }

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    console.log('Usuário encontrado:', user);

    // Verificação simples de senha
    const isValidPassword = password === user.password_hash;

    console.log('Senha fornecida:', password);
    console.log('Senha esperada:', user.password_hash);
    console.log('Senha válida:', isValidPassword);

    if (!isValidPassword) {
      throw new Error('Senha incorreta');
    }

    // Armazenar dados do usuário no localStorage
    const userData = {
      id: user.id,
      username: user.username,
      full_name: user.full_name || 'Administrador',
      email: user.email,
      role: user.role,
      loginTime: new Date().toISOString()
    };

    console.log('Login bem-sucedido, salvando dados:', userData);
    localStorage.setItem('adminUser', JSON.stringify(userData));
    return userData;

  } catch (error) {
    console.error('Erro detalhado no login:', error);
    throw error;
  }
};

// Função para verificar se está logado
export const isAdminLoggedIn = () => {
  const userData = localStorage.getItem('adminUser');
  if (!userData) return false;

  try {
    const user = JSON.parse(userData);
    const loginTime = new Date(user.loginTime);
    const now = new Date();
    const diffHours = (now - loginTime) / (1000 * 60 * 60);

    // Session expira em 8 horas
    if (diffHours > 8) {
      localStorage.removeItem('adminUser');
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem('adminUser');
    return false;
  }
};

// Função para obter dados do usuário logado
export const getAdminUser = () => {
  const userData = localStorage.getItem('adminUser');
  return userData ? JSON.parse(userData) : null;
};

// Função para fazer logout
export const adminLogout = () => {
  localStorage.removeItem('adminUser');
};

// Função de debug para testar conexão com o banco
export const testDatabaseConnection = async () => {
  try {
    console.log('Testando conexão com o banco...');
    const { data, error } = await supabase
      .from('admin_users')
      .select('count(*)')
      .single();
    
    if (error) {
      console.error('Erro na conexão:', error);
      return false;
    }
    
    console.log('Conexão OK, registros encontrados:', data);
    return true;
  } catch (error) {
    console.error('Erro na conexão:', error);
    return false;
  }
};