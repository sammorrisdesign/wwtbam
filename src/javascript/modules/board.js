export default {
  init() {
    this.bindings();
  },

  bindings() {
    document.querySelector('.js-toggle-board').addEventListener('click', () => {
      document.querySelector('body').classList.toggle('is-board');
    });
  }
}