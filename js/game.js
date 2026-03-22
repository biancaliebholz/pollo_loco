let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let backgroundMusic = new Audio('assets/audio/game.mp3');
let gameOverSound = new Audio('assets/audio/losing.mp3');
let winSound = new Audio('assets/audio/won.mp3');
backgroundMusic.volume = 0.2;
backgroundMusic.loop = true;
let backgroundSound = true;
let mainSound = false;
let isLoading = false;
let gamePaused = false;
let gameStarted = false;

window.addEventListener('DOMContentLoaded', initGameUi);
window.addEventListener('keydown', preventBrowserKeys);

function initGameUi() {
  const toggle = document.getElementById('muteToggle');
  if (toggle) setupMuteToggle(toggle);
  updatePauseButtonIcon();
}

function setupMuteToggle(toggle) {
  toggle.checked = false;
  backgroundMusic.muted = false;
  backgroundSound = true;
  mainSound = false;
  toggle.addEventListener('change', () => {
    toggleMute(toggle.checked);
    toggle.blur();
  });
  toggle.addEventListener('click', () => {
    toggle.blur();
  });
}

function preventBrowserKeys(e) {
  if ([32, 37, 38, 39, 40].includes(e.keyCode)) {
    e.preventDefault();
  }
}

async function startGame() {
  blurActiveElement();
  resetGameState();
  startScreenClose();
  showLoadingScreen();
  initLevel();

  canvas = document.getElementById('canvas');
  playBackgroundMusic();
  world = new World(canvas, keyboard);
}

function blurActiveElement() {
  if (document.activeElement) {
    document.activeElement.blur();
  }
}


function resetGameState() {
  gameStarted = true;
  gamePaused = false;
  updatePauseButtonIcon();
  hidePauseOverlay();
}

async function showLoadingScreen() {
  const el = document.getElementById('loadingScreen');
  if (!el) return;

  el.classList.remove('hide');
  setTimeout(() => el.classList.add('hide'), 800);
}

function startScreenClose() {
  toggleElement('startScreen', true);
  toggleElement('gameOverScreen', true);
  toggleElement('winGameScreen', true);
  toggleElement('btnMobileWrapper', false);
  toggleElement('canvas', false);
  toggleElement('pauseBtn', false);
}

function backToMenu() {
  toggleElement('startScreen', false);
  toggleElement('gameOverScreen', true);
  toggleElement('winGameScreen', true);
  toggleElement('btnMobileWrapper', true);
  toggleElement('pauseBtn', true);

  gameStarted = false;
  gamePaused = false;
  updatePauseButtonIcon();
  hidePauseOverlay();
  backgroundMusic.pause();
}

function gameOver() {
  toggleElement('gameOverScreen', false);
  toggleElement('btnMobileWrapper', true);
  toggleElement('pauseBtn', true);

  gameStarted = false;
  gamePaused = false;
  updatePauseButtonIcon();
  hidePauseOverlay();

  stopGame();

  if (world && world.character) {
    world.character.walking_sound.pause();
    world.character.walking_sound.currentTime = 0;
  }

  backgroundMusic.pause();

  if (!mainSound) {
    gameOverSound.currentTime = 0;
    gameOverSound.play().catch(() => {});
  }
}

function winGame() {
  toggleElement('winGameScreen', false);
  toggleElement('btnMobileWrapper', true);
  toggleElement('pauseBtn', true);

  gameStarted = false;
  gamePaused = false;
  updatePauseButtonIcon();
  hidePauseOverlay();

  stopGame();

  if (world && world.character) {
    world.character.walking_sound.pause();
    world.character.walking_sound.currentTime = 0;
  }

  backgroundMusic.pause();

  if (!mainSound) {
    winSound.currentTime = 0;
    winSound.play().catch(() => {});
  }
}

function restartGame() {
  toggleElement('gameOverScreen', true);
  toggleElement('winGameScreen', true);
  toggleElement('canvas', false);
  toggleElement('pauseBtn', false);
  gameStarted = false;
  gamePaused = false;
  updatePauseButtonIcon();
  hidePauseOverlay();
  startGame();
}

function toggleElement(id, hide) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('d-none', hide);
}

function stopGame() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

function playBackgroundMusic() {
  if (backgroundSound && !mainSound) {
    backgroundMusic.muted = false;
    backgroundMusic.play().catch(() => {});
    return;
  }

  backgroundMusic.pause();
}

function toggleMute(isMuted) {
  mainSound = isMuted;
  backgroundSound = !isMuted;
  backgroundMusic.muted = isMuted;
  if (isMuted) {
    backgroundMusic.pause();
    return;
  }
  if (gameStarted) {
    backgroundMusic.play().catch(() => {});
  }
}

function togglePause() {
  if (!gameStarted) return;
  gamePaused = !gamePaused;
  updatePauseButtonIcon();
  if (gamePaused) {
    showPauseOverlay();
  } else {
    hidePauseOverlay();
  }
}

function showPauseOverlay() {
  const overlay = document.getElementById('pauseOverlay');
  if (overlay) overlay.classList.remove('d-none');
}

function hidePauseOverlay() {
  const overlay = document.getElementById('pauseOverlay');
  if (overlay) overlay.classList.add('d-none');
}

function updatePauseButtonIcon() {
  const pauseBtn = document.getElementById('pauseBtn');
  if (!pauseBtn) return;
  pauseBtn.innerHTML = gamePaused ? getPlayIcon() : getPauseIcon();
}

function getPlayIcon() {
  return `
    <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M8 5v14l11-7L8 5Z"/>
    </svg>
  `;
}

function getPauseIcon() {
  return `
    <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z"/>
    </svg>
  `;
}

function openHowTo() {
  const overlay = document.getElementById('howToOverlay');
  if (!overlay) return;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
}

function closeHowTo() {
  const overlay = document.getElementById('howToOverlay');
  if (!overlay) return;
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
}

function toggleFullscreen() {
  const el = document.querySelector('.game-container');
  if (!el) return;
  if (!document.fullscreenElement) {
    el.requestFullscreen?.();
    return;
  }

  document.exitFullscreen?.();
}

function popupToggleFirst() {
  const popupFirst = document.getElementById('popupIntroTextFirst');
  const popupContentFirst = document.getElementById('popupContentFirst');
  if (!popupFirst || !popupContentFirst) return;

  popupFirst.classList.toggle('popupHideWrapperFirst');
  popupContentFirst.classList.toggle('popupHideInnerContentFirst');
  changeImage(popupFirst, 'imageChangeFirst', 'book');
}

function popupToggleSecond() {
  const popupSecond = document.getElementById('popupIntroTextSecond');
  const popupContentSecond = document.getElementById('popupContentSecond');
  if (!popupSecond || !popupContentSecond) return;

  popupSecond.classList.toggle('popupHideWrapperSecond');
  popupContentSecond.classList.toggle('popupHideInnerContentSecond');
  changeImage(popupSecond, 'imageChangeSecond', 'info');
}

function changeImage(popup, imageId, iconType) {
  const imageElement = document.getElementById(imageId);
  if (!imageElement) return;

  const isHidden =
    popup.classList.contains('popupHideWrapperFirst') ||
    popup.classList.contains('popupHideWrapperSecond');

  if (isHidden) {
    imageElement.src = './img/12_icons/close.svg';
    return;
  }

  if (iconType === 'info') imageElement.src = './img/12_icons/book.svg';
  if (iconType === 'book') imageElement.src = './img/12_icons/info.svg';
}

function popupToggle() {
  const popup = document.getElementById('popupIntroText');
  const popupContent = document.getElementById('popupContent');
  const imageChange = document.getElementById('imageChange');
  if (!popup || !popupContent || !imageChange) return;

  popup.classList.toggle('popupHideWrapper');
  popupContent.classList.toggle('popupHideInnerContent');
  imageChange.src = popup.classList.contains('popupHideWrapper')
    ? './img/12_icons/close.svg'
    : './img/12_icons/info.svg';
}