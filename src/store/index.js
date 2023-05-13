import { createStore } from 'vuex';

const state = () => {
  return {
    searchResults: [],
    faqList: [],
    searchQuery: '',
    counter: 0,
  };
};

const actions = {
  search({ commit, state }, query) {
    commit('updateSearchQuery', query);
    const results = state.faqList.filter(
      (item) =>
        item.question.toLowerCase().includes(query.toLowerCase()) ||
        item.answer.toLowerCase().includes(query.toLowerCase())
    );

    commit('updateSearchResults', results);
  },
  fetchFaqList(context) {
    const faqList = JSON.parse(localStorage.getItem('faq')) || [];
    context.commit('addFaq', faqList);
    context.dispatch('search', context.state.searchQuery);
  },
  createFaq(context, payload) {
    context.commit('createFaq', payload);
    context.dispatch('search', context.state.searchQuery);
  },
  editFaq(context, payload) {
    context.commit('editFaq', payload);
    context.dispatch('search', context.state.searchQuery);
  },
  deleteFaq(context, payload) {
    context.commit('deleteFaq', payload);
    context.dispatch('search', context.state.searchQuery);
  },
};
const mutations = {
  updateSearchQuery(state, query) {
    state.searchQuery = query;
  },
  updateSearchResults(state, results) {
    state.searchResults = results;
  },
  addFaq(state, data) {
    state.faqList = data;
  },
  createFaq(state, data) {
    data.key = state.counter;
    state.counter++;
    state.faqList.push(data);
    localStorage.setItem('faq', JSON.stringify(state.faqList));
  },
  editFaq(state, data) {
    const editIndex = state.faqList.findIndex(
      (faq) => faq.key === data.faq.key
    );
    state.faqList[editIndex] = data.faq;
    localStorage.setItem('faq', JSON.stringify(state.faqList));
  },
  deleteFaq(state, data) {
    state.faqList = state.faqList.filter((faq) => faq.key !== data.id);
    localStorage.setItem('faq', JSON.stringify(state.faqList));
  },
};

const store = createStore({
  state,
  actions,
  mutations,
});

export default store;
