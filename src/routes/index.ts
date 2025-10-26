import {MENU_ITEMS} from "@/constants/base";
import {IMenuItem} from "@/interfaces/base";
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import {useAuthStore} from "@/stores/authStore";

const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: "Аутентфификация",
        component: () => import("@/views/LoginView.vue"),
        meta: {requiresGuest: true},
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

MENU_ITEMS.forEach((item :IMenuItem) => {
    routes.push({
        path: item.href,
        name: item.title,
        component: item.component,
        meta: {requiresAuth: !item.public}
    });
});

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (authStore.token && !authStore.user) {
        await authStore.setUserData();
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Если маршрут требует авторизации, а пользователь не авторизован
        next('/login');
    } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
        // Если маршрут для гостей, а пользователь авторизован
        next('/');
    } else {
        // В остальных случаях разрешаем переход
        next();
    }
});


export {router};