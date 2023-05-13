<template>
  <input
    type="text"
    v-model="searchQuery"
    placeholder="Search"
    class="
      w-full
      py-2
      px-4
      rounded-md
      border border-gray-300
      focus:outline-none
    "
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const searchQuery = ref('');
const debouncedSearchQuery = ref('');
const debounceTimeout = 300; // milliseconds

let debounceTimer;
function debounceSearch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debouncedSearchQuery.value = searchQuery.value;
  }, debounceTimeout);
}

watch(searchQuery, debounceSearch);

watch(debouncedSearchQuery, () => {
  store.dispatch('search', debouncedSearchQuery.value);
});
</script>
