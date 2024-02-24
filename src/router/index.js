import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import SigninView from '../views/SigninView.vue'
import { getCurrentUser } from '../firebase'

const routes = [
    {
    path: '/',
    name: 'home',
    component: HomeView
    },
    {
    path: '/account',
    name: 'account',
    component: AccountView,
    meta: {
        requiresAuth: true,
    }
    },
    {
    path: '/signin',
    name: 'signin',
    component: SigninView,
    meta: {
        guestOnly:true,
    }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) =>{
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isGuestOnly = to.matched.some(record => record.meta.guestOnly);

    const currentUser = await getCurrentUser()

    if (requiresAuth && !currentUser){
        next('/signin')
    } else if(isGuestOnly && currentUser){
        next('/account')
    }else{
        next()
    }
})

export default router