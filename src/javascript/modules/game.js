import data from '../data.json';
import confetti from './confetti';
import audio from './audio';

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

    document.querySelector('.js-50-50').addEventListener('click', function() {
      this.on5050();
    }.bind(this));

    document.querySelector('.js-phone').addEventListener('click', function() {
      this.onPhone();
    }.bind(this));

    document.querySelector('.js-ask').addEventListener('click', function() {
      this.onAsk();
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
    this.populateQuestion();
    audio.play('lets-play');
  },

  populateQuestion() {
    const question = game[currentQuestion];

    document.querySelector('body').classList.add('is-start');

    document.querySelector('.js-question').textContent = question.Question;
    document.querySelector('.js-answer-a').textContent = question.A;
    document.querySelector('.js-answer-b').textContent = question.B;
    document.querySelector('.js-answer-c').textContent = question.C;
    document.querySelector('.js-answer-d').textContent = question.D;

    if (currentQuestion >= 10) {
      audio.play('music-late');
    } else if (currentQuestion >= 5) {
      audio.play('music-middle');
    } else {
      audio.play('music-early');
    }
  },

  selectChoice(choice) {
    if (document.querySelector('body').classList.contains('is-final')) {
      const correctChoice = game[currentQuestion].Answer.toLowerCase();
      const userChoice = choice.dataset.choice.toLowerCase();

      document.querySelector('.js-choice-' + correctChoice.toLowerCase()).classList.add('is-correct');

      if (userChoice === correctChoice) {
        audio.play('correct');
        setTimeout(function() {
          this.onCorrectAnswer()
        }.bind(this), 5000);
      } else {
        audio.play('wrong');
        this.onEnd(false);
      }
    } else {
      if (currentQuestion >= 5) { 
        audio.play('final');
      }
      choice.classList.add('is-final');
      document.querySelector('body').classList.add('is-final');
    }
  },

  onCorrectAnswer() {
    if (currentQuestion == 14) {
      confetti.init();

      document.querySelector('.js-win').textContent = "Millionaire!";
      document.querySelector('body').classList.add('is-win', 'is-done', 'is-millionaire');
      document.querySelector('body').classList.remove('is-start');

      this.updateBoard();
      audio.play('main-theme');
    } else {
      this.resetQuestionState();

      document.querySelector('.js-win').textContent = game[currentQuestion].Amount.toLocaleString();
      document.querySelector('body').classList.add('is-win');
      document.querySelector('body').classList.remove('is-start');

      this.updateBoard();
    }
  },

  onEnd(hasWalked) {
    let winnings;

    if (hasWalked) {
      document.querySelector('body').classList.remove('is-board');
      winnings = game[currentQuestion - 1].Amount.toLocaleString();
      document.querySelector('.js-win').textContent = winnings;
      document.querySelector('body').classList.add('is-win', 'is-done');
      audio.play('game-over');
    } else {
      if (currentQuestion >= 10) {
        winnings = '$32,000';
      } else if (currentQuestion >= 5) {
        winnings = '$1,000';
      } else {
        winnings = '$0'
      }

      setTimeout(function() {
        audio.stopAll();
        document.querySelector('.js-win').textContent = winnings;
        document.querySelector('body').classList.add('is-win', 'is-done');
        if (currentQuestion >= 5) {
          audio.play('game-over');
        }
      }, 5000);
    }
  },

  on5050() {
    document.querySelector('body').classList.remove('is-board');

    setTimeout(() => {
      let options = ['A', 'B', 'C', 'D'];
      options = options.filter(e => {
        return e !== game[currentQuestion].Answer;
      });

      options.splice(Math.floor(Math.random() * 3), 1);

      options.forEach(option => {
        document.querySelector('.js-choice-' + option.toLowerCase()).classList.add('is-hidden');
      })

      audio.play('50-50');
    }, 2000);

    this.killLifeLine('50-50');
  },

  onPhone() {
    document.querySelector('body').classList.remove('is-board');
    document.querySelector('body').classList.add('is-asking');
    console.log("on phone");

    document.querySelector('.js-start-timer').addEventListener('click', function() {
      audio.play('phone-a-friend');
      document.querySelector('body').classList.add('is-timing');

      let timeLeft = 30;

      const timer = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(timer);
          document.querySelector('body').classList.add('has-timed');
          document.querySelector('body').classList.remove('is-timing', 'is-asking');

          if (currentQuestion >= 10) {
            audio.play('music-late');
          } else if (currentQuestion >= 5) {
            audio.play('music-middle');
          } else {
            audio.play('music-early');
          }
        }

        document.querySelector('.js-timer-number').textContent = timeLeft;

        timeLeft -= 1;
      }, 1000);
    });

    this.killLifeLine('phone');
  },

  onAsk() {
    document.querySelector('body').classList.remove('is-board');
    document.querySelector('body').classList.add('is-polling');
    audio.play('ask-the-audience');

    document.querySelector('.js-hide-ask').addEventListener('click', function() {
      document.querySelector('body').classList.remove('is-polling');

      if (currentQuestion >= 10) {
        audio.play('music-late');
      } else if (currentQuestion >= 5) {
        audio.play('music-middle');
      } else {
        audio.play('music-early');
      }
    })

    this.killLifeLine('ask');
  },

  killLifeLine(lifeline) {
    document.querySelector('.js-' + lifeline).classList.add('is-used');
  },

  resetQuestionState() {
    document.querySelectorAll('.is-final').forEach(final => {
      final.classList.remove('is-final');
    });

    document.querySelectorAll('.is-hidden').forEach(final => {
      final.classList.remove('is-hidden');
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