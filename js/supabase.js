import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://axmrzpqflxgxtcbsdzqs.supabase.co";
const supabaseKey = "sb_publishable_Mci8aT5cuFUKOjoqXBZRAQ_4SvfUgCh";

export const supabase = createClient(supabaseUrl, supabaseKey);
