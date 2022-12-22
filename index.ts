import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import handler from './handler.tsx'

serve(handler)