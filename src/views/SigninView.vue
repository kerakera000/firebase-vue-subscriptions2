<template>
    <default-layout>
        サインインページ <br>
        <button @click="signIn">Googleアカウントでサインイン</button>
    </default-layout>
</template>
  
<script>
    import DefaultLayout from "@/layouts/DefaultLayout.vue"
    import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
    import { firebaseAuth } from '../firebase';
    
    export default {
        components: {DefaultLayout},
        methods: {
        signIn() {
            const provider = new GoogleAuthProvider();
    
            return signInWithPopup(firebaseAuth, provider)
            .then(() => {
                // 'account' が移動したいページの名前であると仮定します
                this.$router.push({ name: 'account' });
            });
        }
        }
    }
</script>