export default {
  init() {
    this.startFeed();
  },

  startFeed() {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }})
      .then(stream => {
        const player = document.querySelector('.video__feed');
        player.srcObject = stream;
        player.onloadedmetadata = e => player.play();
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}