import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vohakndhicppbrmoajtw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvaGFrbmRoaWNwcGJybW9hanR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MjMxNzAsImV4cCI6MjAxMTI5OTE3MH0.K3WyJVh3BQQm4_dHhrQj-JZJQHahiKqRpyJPpoTU48E"
);
