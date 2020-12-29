import data from '../data.json';
import board from './board';
import game from './game';

let question;

export default {
  init() {
    document.querySelector('body').classList.add('is-fingers');

    this.findGame();
    this.bindings();
  },

  bindings() {
    document.querySelector('.js-finger-skip').addEventListener('click', function() {
      if (document.querySelector('body').classList.contains('is-fingers')) {
        this.showAnswers();
      }
    }.bind(this));

    document.querySelector('.js-start-game').addEventListener('click', function() {
      if (document.querySelector('body').classList.contains('is-fingers')) {
        document.querySelector('body').classList.remove('is-fingers', 'is-fastest-answers');
        board.init();
        game.init();
      }
    }.bind(this));
  },

  findGame() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const gameNumber = urlParams ? parseInt(urlParams.get('game')) - 1 : 0;


    question = data.ff[gameNumber];

    this.showQuestion();
  },

  showQuestion() {
    document.querySelector('body').classList.add('is-start');

    document.querySelector('.js-question').textContent = question.Question;
    document.querySelector('.js-answer-a').textContent = question.A;
    document.querySelector('.js-answer-b').textContent = question.B;
    document.querySelector('.js-answer-c').textContent = question.C;
    document.querySelector('.js-answer-d').textContent = question.D;

    // populate results

    document.querySelector('.js-fastest-question').textContent = question.Question;

    let order = question.Answer.split(', ');

    order.forEach((answer, i) => {
      document.querySelector(`.js-fastest-letter-${i + 1}`).textContent = answer + ":";
      document.querySelector(`.js-fastest-answer-${i + 1}`).textContent = question[answer];
    });
  },

  showAnswers() {
    document.querySelector('body').classList.add('is-fastest-answers');
    document.querySelector('body').classList.remove('is-start');
  }
}
