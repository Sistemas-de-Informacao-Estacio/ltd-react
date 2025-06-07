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

    if (error || !user) {
      console.error('Usuário não encontrado:', error);
      throw new Error('Usuário não encontrado');
    }

    // Verificação simples de senha (em produção, use hash adequado)
    const isValidPassword = password === user.password_hash;

    if (!isValidPassword) {
      throw new Error('Senha incorreta');
    }

    // Atualizar último login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    // Armazenar dados do usuário no localStorage
    const userData = {
      id: user.id,
      username: user.username,
      full_name: user.full_name || 'Administrador',
      email: user.email,
      role: user.role || 'admin',
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('adminUser', JSON.stringify(userData));
    
    // Definir sessão no Supabase para RLS
    await supabase.auth.signInAnonymously();
    
    return userData;

  } catch (error) {
    console.error('Erro no login:', error);
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
export const adminLogout = async () => {
  localStorage.removeItem('adminUser');
  await supabase.auth.signOut();
};

// Função de debug para testar conexão com o banco
export const testDatabaseConnection = async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase
      .from('admin_users')
      .select('count(*)')
      .single();
    
    if (error) {
      console.error('Erro na conexão:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erro na conexão:', error);
    return false;
  }
};