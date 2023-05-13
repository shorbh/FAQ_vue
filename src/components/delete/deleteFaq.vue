<template>
  <Modal>
    <template #content>
      <p>Are you sure you want to delete?</p>
    </template>
    <template #footer>
      <button
        class="border border-black px-2 rounded active:bg-gray-100"
        @click="closeModal"
      >
        Cancel
      </button>
      <button
        class="border border-black px-2 rounded ml-2 active:bg-red-100"
        @click="handleDeleteFaq"
      >
        Confirm
      </button>
    </template>
  </Modal>
</template>

<script setup>
import Modal from '../modal/modal.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
const { faqId, closeDelete } = defineProps(['faqId', 'closeDelete']);
const store = useStore();

function closeModal() {
  closeDelete();
}
function handleDeleteFaq() {
  store.dispatch('deleteFaq', {
    id: faqId,
  });
  closeModal();
}
</script>
