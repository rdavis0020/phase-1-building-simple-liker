const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

document.addEventListener('DOMContentLoaded', function () {
  const likeGlyphs = document.querySelectorAll('.like-glyph');

  likeGlyphs.forEach(glyph => {
    glyph.addEventListener('click', function () {
      const isFullHeart = glyph.textContent === FULL_HEART;
      
      mimicServerCall()
        .then(() => {
          if (isFullHeart) {
            glyph.textContent = EMPTY_HEART;
            glyph.classList.remove('activated-heart');
          } else {
            glyph.textContent = FULL_HEART;
            glyph.classList.add('activated-heart');
          }
        })
        .catch((error) => {
          const modal = document.getElementById('modal');
          modal.classList.remove('hidden');
          const modalMessage = document.getElementById('modal-message');
          modalMessage.textContent = 'Server error: ' + error;

          setTimeout(() => {
            modal.classList.add('hidden');
          }, 3000);
        });
    });
  });
});

// Simulated server call function
function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      const isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
