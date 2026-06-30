import { createClient } from '@supabase/supabase-js'
import { env } from './env'

export const supabaseProject1 = createClient(env.supabaseUrl1, env.supabaseKey1)
export const supabaseProject2 = createClient(env.supabaseUrl2, env.supabaseKey2)
