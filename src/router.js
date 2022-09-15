import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const demoChildren = [
    {
        title: "table1",
        path: "/one",
        name: "demo-one",
        component: () => import("@/views/one.vue"),
    },
    {
        title: "table2",
        path: "/two",
        name: "demo-two",
        component: () => import("@/views/two.vue"),
    },
    {
        title: "table3",
        path: "/three",
        name: "demo-three",
        component: () => import("@/views/three.vue"),
    },
];

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/home.vue"),
    },
    ...demoChildren
];

export const router = new VueRouter({
    routes,
});
