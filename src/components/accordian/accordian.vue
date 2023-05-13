<template>
  <main>
    <section
      class="shadow-md w-full p-4 border rounded-md border-black mb-2"
      :class="showAnswer && 'border-none'"
    >
      <div class="flex justify-between items-center">
        <slot name="header" />
        <span>
          <img
            :src="
              showAnswer
                ? `https://img.icons8.com/ios-filled/50/chevron-up.png`
                : `https://img.icons8.com/ios-filled/50/expand-arrow--v1.png`
            "
            alt="to hide or display answer"
            width="16"
            @click="changeAccState"
            class="cursor-pointer"
          />
        </span>
      </div>
      <TransitionGroup name="fade">
        <hr v-if="showAnswer" class="border border-gray-300 mt-2 mb-3" />
        <div v-if="showAnswer" class="w-full break-words">
          <slot name="footer" />
        </div>
      </TransitionGroup>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const showAnswer = ref(true);
function changeAccState() {
  showAnswer.value = !showAnswer.value;
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
