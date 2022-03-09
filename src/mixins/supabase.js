import { createClient } from '@supabase/supabase-js'

export default {
  mounted() {
    this.supabase = createClient(process.env.VUE_APP_URL_API, process.env.VUE_APP_KEY_PUBLIC);
  },
  data() {
    return {
      supabase: undefined
    }
  }
}