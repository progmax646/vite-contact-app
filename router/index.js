import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/', component: () => import('../src/components/HelloWorld.vue') },
    { path: '/contacts', component: () => import('../src/components/Contact.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

