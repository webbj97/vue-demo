<template>
    <div class="main-nav">
        <router-link v-for="item in routers" :key="item.name" :to="item.path">
            {{item.title}}
        </router-link>
    </div>
</template>

<script>
import { demoChildren } from '@/router';

export default {
    data() {
        return {
            routers: demoChildren
        };
    },

    computed: {},
    mounted() { },
    methods: {}
}

</script>
<style lang='less'>
.main-nav {
    width: 220px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 12px 0;

    a {
        line-height: 36px;
        padding: 6px 12px;

        &:hover {
            opacity: 0.9;
        }
    }
}
</style>