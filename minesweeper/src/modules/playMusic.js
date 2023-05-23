import '../assets/win.wav';
import '../assets/lose.wav';
import '../assets/open-box.wav';
import '../assets/set-flag.wav';

function playMusic(event) {
  let src;
  if (event === 'win') src = './assets/win.wav';
  if (event === 'lose') src = './assets/lose.wav';
  if (event === 'openBox') src = './assets/open-box.wav';
  if (event === 'setFlag') src = './assets/set-flag.wav';
  const audio = new Audio(src);
  audio.play();
}

export default playMusic;
