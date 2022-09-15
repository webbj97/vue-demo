<template>
    <div class="main-title">
        {{ name }}
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        };
    },
}

</script>
<style lang='less'>
.main-title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 69px;
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 18px;
    border-bottom: 1px solid #e6eaea;
}
</style>