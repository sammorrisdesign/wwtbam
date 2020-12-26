import data from '../data.json';

let game;
let currentQuestion = 0;

export default {
  init() {
    this.findGame();
    this.bindings();
  },

  bindings() {
    document.querySelectorAll('.js-choice').forEach(function(choice) {
      choice.addEventListener('click', function() {
        this.selectChoice(choice);
      }.bind(this));
    }.bind(this));

    document.querySelector('.js-win').addEventListener('click', function() {
      currentQuestion++;
      document.querySelector('body').classList.remove('is-win');
      this.populateQuestion();
    }.bind(this));
  },

  findGame() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const gameNumber = urlParams ? parseInt(urlParams.get('game')) - 1 : 0;

    game = data.games[gameNumber];

    console.log(game);

    console.log(data);

    this.startGame();
  },

  startGame() {
    document.querySelector('body').classList.add('is-board');

    this.populateQuestion();
  },

  populateQuestion() {
    const question = game[currentQuestion];

    console.log(question);

    document.querySelector('.js-question').textContent = question.Question;
    document.querySelector('.js-answer-a').textContent = question.A;
    document.querySelector('.js-answer-b').textContent = question.B;
    document.querySelector('.js-answer-c').textContent = question.C;
    document.querySelector('.js-answer-d').textContent = question.D;
  },

  selectChoice(choice) {
    if (document.querySelector('body').classList.contains('is-final')) {

      const correctChoice = game[currentQuestion].Answer.toLowerCase();
      const userChoice = choice.dataset.choice.toLowerCase();

      document.querySelector('.js-choice-' + correctChoice.toLowerCase()).classList.add('is-correct');

      if (userChoice === correctChoice) {
        setTimeout(function() {
          this.onCorrectAnswer()
        }.bind(this), 500);
        // this.onCorrectAnswer();
      } else {
        // What happens on fail?
      }

    } else {
      choice.classList.add('is-final');
      document.querySelector('body').classList.add('is-final');
    }
  },

  onCorrectAnswer() {
    this.resetQuestionState();

    document.querySelector('.js-win').textContent = game[currentQuestion].Amount.toLocaleString();
    document.querySelector('body').classList.add('is-win');
  },

  resetQuestionState() {
    document.querySelectorAll('.is-final').forEach(final => {
      final.classList.remove('is-final');
    });

    document.querySelector('.is-correct').classList.remove('is-correct');
  }
}