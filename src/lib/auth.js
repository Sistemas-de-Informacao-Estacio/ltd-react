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

    if (error) {
      console.error('Erro ao buscar usuário:', error);
      if (error.code === 'PGRST116') {
        throw new Error('Usuário não encontrado');
      }
      throw new Error('Erro de conexão com o banco de dados');
    }

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificação simples de senha (em produção, use hash adequado)
    const isValidPassword = password === user.password_hash;

    if (!isValidPassword) {
      throw new Error('Senha incorreta');
    }

    // Atualizar último login
    try {
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', user.id);
    } catch (updateError) {
      console.warn('Não foi possível atualizar último login:', updateError);
      // Não falhar o login por causa disso
    }

    // Armazenar dados do usuário no localStorage
    const userData = {
      id: user.id,
      username: user.username,
      full_name: user.full_name || 'Administrador',
      email: user.email,
      role: user.role || 'vagnercordeiro2025',
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('adminUser', JSON.stringify(userData));
    
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
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.warn('Erro ao fazer logout do Supabase:', error);
  }
};

// Função de debug para testar conexão com o banco - CORRIGIDA
export const testDatabaseConnection = async () => {
  try {
    console.log('Testando conexão com o banco de dados...');
    
    // Tentar fazer uma consulta simples para testar a conectividade
    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Erro na conexão:', error);
      console.error('Detalhes do erro:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return false;
    }
    
    console.log('Conexão com banco estabelecida com sucesso');
    return true;
  } catch (error) {
    console.error('Erro na conexão:', error);
    return false;
  }
};

// Função para verificar se as tabelas existem
export const checkTablesExist = async () => {
  const tables = ['admin_users', 'team_members', 'documents', 'applications', 'news'];
  const results = {};
  
  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('id')
        .limit(1);
      
      results[table] = !error;
      if (error) {
        console.error(`Erro na tabela ${table}:`, error);
      }
    } catch (err) {
      results[table] = false;
      console.error(`Erro ao verificar tabela ${table}:`, err);
    }
  }
  
  return results;
};