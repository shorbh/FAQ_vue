<template>
  <main
    class="
      fixed
      flex
      justify-center
      items-center
      bg-gray-400
      top-0
      bottom-0
      right-0
      left-0
      bg-opacity-20
    "
  >
    <section class="p-4 bg-white rounded-md w-1/2">
      <main class="flex flex-col">
        <slot name="content" />
      </main>
      <footer class="flex justify-end mt-2">
        <slot name="footer" />
      </footer>
    </section>
  </main>
</template>
<script setup>
import { onUnmounted } from 'vue';
const body = document.querySelector('body');
if (body) {
  body.style.overflow = 'hidden';
}
onUnmounted(() => {
  body.style.overflow = 'auto';
});
</script>
<style></style>
