<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import HomePage from './pages/HomePage.vue';

const store = useStore();
store.dispatch('fetchFaqList');
</script>
