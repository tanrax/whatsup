import supabase from "@/mixins/supabase.js"

export default {
    mixins: [supabase],
    mounted() {
        this.checkLogin()
    },
    methods: {
        checkLogin: async function () {
            if (await this.supabase.auth.user()?.aud !== 'authenticated') {
                this.$router.push({name: 'login'});
            }
        }
    }
}