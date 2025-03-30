<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
// import { client } from './service/rpc';
import { actions } from 'vite:actions';

// await actions.user.list({ id: '1' });
const data = ref();

actions.createMshu();
// getData();

async function getData() {
	const result = await actions.user.doSomething();
	console.log(result);
	data.value = result;
}

// client.user.list().then(d => {
// 	console.log(d);
// });
// client.user.create({ createdAt: new Date(), name: 'moshe' }).then(d => {
// 	console.log(d);
// });
</script>

<template>
	<div>
		<a href="https://vite.dev" target="_blank">
			<img src="/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
	</div>
	<pre>{{ data }}</pre>
	<HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
