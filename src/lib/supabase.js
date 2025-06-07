import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ezsjmevzlvhofdtbbwdn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6c2ptZXZ6bHZob2ZkdGJid2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNTQyMjgsImV4cCI6MjA2NDgzMDIyOH0.skr1ygMTLv0niDS3ID64E0b3V9rx4l5EkUK2LTICMrc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)