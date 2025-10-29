-- =============================================
-- RECARREGAR SCHEMA CACHE DO SUPABASE
-- =============================================
-- Execute este comando para forçar o Supabase a reconhecer as novas tabelas
-- =============================================

NOTIFY pgrst, 'reload schema';

-- Aguarde 5 segundos e teste novamente no navegador
