import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

// Função para fazer login do admin
export const adminLogin = async (username, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      throw new Error('Usuário não encontrado');
    }

    // Para o ambiente de desenvolvimento, vamos usar uma verificação simples
    // Em produção, você deve usar bcrypt adequadamente
    const isValidPassword = password === 'admin123' || 
                           await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      throw new Error('Senha incorreta');
    }

    // Armazenar dados do usuário no localStorage
    const userData = {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('adminUser', JSON.stringify(userData));
    return userData;

  } catch (error) {
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