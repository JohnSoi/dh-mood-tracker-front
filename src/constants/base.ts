import {IMenuItem} from "@/interfaces/base";

const MENU_ITEMS: IMenuItem[] = [
    {
        key: "home",
        title: "Главная",
        icon: "home",
        href: "/",
        component: () => import("@/views/HomeView.vue")
    },
    {
        key: "wall",
        title: "Лента",
        icon: "clock",
        href: "/wall",
        component: () => import("@/views/WallView.vue")
    }
];

export {MENU_ITEMS};