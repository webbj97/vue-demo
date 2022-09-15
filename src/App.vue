<template>
	<div id="app">
		<NavBar />
		<div class="main-container">
			<router-view v-slot="{ Component, route }">
				<transition name="fade">
					<component :is="Component" :key="route.path" />
				</transition>
			</router-view>
			<!-- <router-view /> -->
		</div>
	</div>
</template>

<script>
import NavBar from './components/nav.vue'

export default {
	name: 'App',
	components: {
		NavBar,
	}
}
</script>

<style lang="less">
@navWidth: 220px;

#app {
	max-height: 100vh;
	overflow: hidden;
	display: flex;

	.main-container {
		flex: 1;
		overflow-y: auto;
		background: #f4f7f6;
	}
}
</style>
