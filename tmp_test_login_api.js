import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !anon) {
  console.error('Missing env');
  process.exit(1);
}

const supabase = createClient(url, anon);

async function testLogin(){
  const { data, error } = await supabase.auth.signInWithPassword({email: 'contact@tsgabrielle.us', password: 'Password123!'});
  console.log('login result:', {user: data?.user?.email, error});
  if (error) return;
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  console.log('getUser result:', {user: userData?.user?.email, role: userData?.user?.app_metadata?.role, error: userErr});
}

testLogin().catch(console.error);
