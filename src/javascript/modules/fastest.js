import data from '../data.json';
import board from './board';
import audio from './audio';

let question;

export default {
  init() {
    this.bindings();
  },

  bindings() {
    document.querySelector('.js-start-fastest').addEventListener('click', function() {
      if (document.querySelector('.js-spacer').classList.contains('js-start-fastest')) {
        document.querySelector('.js-spacer').classList.remove('js-start-fastest', 'is-active');

        document.querySelector('body').classList.add('is-fingers');
        audio.play('fastest');
        this.findGame();
      }
    }.bind(this));

    document.querySelector('.js-finger-skip').addEventListener('click', function() {
      if (document.querySelector('body').classList.contains('is-fingers')) {
        this.showAnswers();
      }
    }.bind(this));

    document.querySelector('.js-start-game').addEventListener('click', function() {
      if (document.querySelector('body').classList.contains('is-fingers')) {
        document.querySelector('body').classList.remove('is-fingers', 'is-fastest-answers');
        audio.stopAll();

        document.querySelector('.js-spacer').classList.add('is-active', 'js-real-start');

        document.querySelector('.js-real-start').addEventListener('click', function() {
          if (document.querySelector('.js-spacer').classList.contains('js-real-start')) {
            document.querySelector('.js-real-start').classList.remove('js-real-start', 'is-active');
            board.init();
          }
        }.bind(this));
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
