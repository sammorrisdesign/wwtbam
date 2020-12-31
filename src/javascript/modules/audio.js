export default {
  play(sound) {
    // stop final answer on answer
    if (sound == 'correct' || sound == 'wrong') {
      document.querySelector('.js-audio-final').pause();
    }

    // stop previous music on music switch
    if (sound == 'final' || sound == 'game-over' || sound == 'explain' || sound == 'ask-the-audience' || sound == 'timer' || sound == 'fastest' || sound == 'music-early' || sound == 'music-middle' || sound == 'music-late' || sound == 'main-theme' || sound == 'phone-a-friend') {
      document.querySelectorAll('.js-audio-music').forEach(audioEl => {
        audioEl.pause();
        audioEl.currentTime = 0;
      })
    }

    // console.log('trying to play', sound);

    const soundEl = document.querySelector(`.js-audio-${sound}`);

    if (soundEl) {
      // console.log(soundEl);
      soundEl.play();
    }
  },

  stopAll () {
    document.querySelectorAll('.js-audio').forEach(audioEl => {
      audioEl.pause();
    });
  }
}