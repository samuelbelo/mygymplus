import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "./stores/useAuthStore";

const router = createRouter({
    history: createWebHistory(), //createWebHistory(import.meta.env.BASE_URL)
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import("./views/Home.vue")
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import("./views/Login/Login.vue")
        }
    ]
})
router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();


    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return '/login';
    }
});


export default router