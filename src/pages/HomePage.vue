<template>
  <button
    @click="handleModal"
    class="
      fixed
      right-4
      top-2
      border border-black
      px-2
      py-1
      rounded-md
      ml-2
      active:bg-gray-100
    "
  >
    Create FAQ
  </button>
  <section class="px-4 md:w-4/5 md:my-0 md:mx-auto">
    <header class="sm:text-center text-2xl mb-4">FAQ</header>
    <SearchFaq />
    <TransitionGroup name="list">
      <div v-for="(faq, index) in faqData" :key="faq.key">
        <Accordian>
          <template #header>
            <div class="flex items-center w-full">
              <p class="flex-grow mr-1 break-all">Q. {{ faq.question }}</p>
              <img
                width="16"
                height="16"
                src="https://img.icons8.com/ios-filled/50/pencil-tip.png"
                alt="pencil-tip"
                @click="openEditModal(faq.key)"
                class="mr-1 cursor-pointer"
              />
              <img
                width="16"
                height="16"
                src="https://img.icons8.com/ios-filled/50/000000/trash.png"
                alt="trash"
                @click="openDeleteModal(faq.key)"
                class="mr-1 cursor-pointer"
              />
            </div>
          </template>
          <template #footer>
            <p>{{ faq.answer }}</p>
          </template>
        </Accordian>
      </div>
    </TransitionGroup>
  </section>
  <CreateFaq v-if="showCreateModal" :close-create="closeCreateModal" />
  <EditFaq v-if="showEditModal" :faq="editFaq" :close-edit="closeEditModal" />
  <DeleteFaq
    v-if="showDeleteModal"
    :faqId="delFaqId"
    :close-delete="closeDeleteModal"
  />
</template>

<script setup>
import Modal from '../components/modal/modal.vue';
import CreateFaq from '../components/create/createFaq.vue';
import EditFaq from '../components/edit/editFaq.vue';
import DeleteFaq from '../components/delete/deleteFaq.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Accordian from '../components/accordian/accordian.vue';
import SearchFaq from '../components/search/searchFaq.vue';

const store = useStore();

const showCreateModal = ref(false);
function handleModal() {
  showCreateModal.value = true;
}
function closeCreateModal() {
  showCreateModal.value = false;
}

const faqData = computed(() => store.state.searchResults);

const showEditModal = ref(false);
const editFaq = ref({});
function openEditModal(editPosition) {
  let curFaq = faqData.value.find((faq) => faq.key == editPosition);
  editFaq.value = curFaq;
  showEditModal.value = true;
}
function closeEditModal() {
  showEditModal.value = false;
}

const showDeleteModal = ref(false);
const delFaqId = ref({});
function openDeleteModal(editPosition) {
  delFaqId.value = editPosition;
  showDeleteModal.value = true;
}
function closeDeleteModal() {
  showDeleteModal.value = false;
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
