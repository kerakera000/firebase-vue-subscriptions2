<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a href="#" class="navbar-brand">vue アプリケーション</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="#navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggle-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link  class="nav-link" active-class="active" to="/">
              HOME
            </router-link>
          </li>

          <li v-if="!currUser">
            <router-link class="nav-link"
                          active-class="active"
                          to="/signin">
              SIGN IN
            </router-link>
          </li>

          <li v-if="currUser">
            <router-link class="nav-link"
                          active-class="active"
                          to="/account">
              {{currUser.displayName}}
            </router-link>
          </li>

          <li v-if="currUser">
            <button class="btn btn-outline-secondary" @click="logout">
              LOG OUT
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '@/firebase';

export default {
  data() {
    return {
      currUser: firebaseAuth.currentUser,
    };
  },

  methods: {
    logout() {
      signOut(firebaseAuth).then(() =>
        this.$router.replace({ name: "signin" })
      );
    }
  }
}
</script>