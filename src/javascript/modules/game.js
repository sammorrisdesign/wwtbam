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
      document.querySelector('body').classList.remove('is-win');
      currentQuestion++;
      this.populateQuestion();
    }.bind(this));

    document.querySelector('.js-walk').addEventListener('click', function() {
      this.onEnd(true);
    }.bind(this));
  },

  findGame() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const gameNumber = urlParams ? parseInt(urlParams.get('game')) - 1 : 0;

    game = data.games[gameNumber];

    this.startGame();
  },

  startGame() {
    // document.querySelector('body').classList.add('is-board');

    this.populateQuestion();
  },

  populateQuestion() {
    const question = game[currentQuestion];

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
        }.bind(this), 2000);
      } else {
        this.onEnd(false);
        // Show final amount
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

    this.updateBoard();
  },

  onEnd(hasWalked) {
    let winnings;

    if (hasWalked) {
      document.querySelector('body').classList.remove('is-board');
      winnings = game[currentQuestion - 1].Amount.toLocaleString();
    } else {
      if (currentQuestion >= 10) {
        winnings = '$32,000';
      } else if (currentQuestion >= 5) {
        winnings = '$1,000';
      } else {
        winnings = '$0'
      }
    }

    document.querySelector('.js-win').textContent = winnings;
    document.querySelector('body').classList.add('is-win', 'is-done');
  },

  resetQuestionState() {
    document.querySelectorAll('.is-final').forEach(final => {
      final.classList.remove('is-final');
    });

    document.querySelector('.is-correct').classList.remove('is-correct');
  },

  updateBoard() {
    document.querySelectorAll('.js-board-entry').forEach(entry => {
      const entryNumber = parseInt(entry.dataset.index);

      entry.classList.remove('is-current', 'is-past');

      if (entryNumber == currentQuestion + 1) {
        entry.classList.add('is-current');
      } else if (currentQuestion + 1 > entryNumber) {
        entry.classList.add('is-past');
      }
    })
  }
}