import game from './game';
import audio from './audio';

let isFirst = true;

export default {
  init() {
    this.bindings();
    this.start();
  },

  bindings() {
    document.querySelector('.js-toggle-board').addEventListener('click', () => {
      document.querySelector('body').classList.toggle('is-board');

      if (isFirst) {
        game.init();
        isFirst = false;
      }
    });
  },

  start() {
    audio.play('lets-play');
    audio.play('explain');
    document.querySelector('body').classList.add('is-board');
  }
}