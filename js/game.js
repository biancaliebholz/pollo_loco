/** @type {HTMLCanvasElement} */
let canvas;
/** @type {World} */
let world;
/** @type {Keyboard} */
let keyboard = new Keyboard();
/** @type {number[]} */
let intervalIds = [];
/** @type {HTMLAudioElement} */
let backgroundMusic = new Audio('assets/audio/game.mp3');
/** @type {HTMLAudioElement} */
let gameOverSound = new Audio('assets/audio/losing.mp3');
/** @type {HTMLAudioElement} */
let winSound = new Audio('assets/audio/won.mp3');
backgroundMusic.volume = 0.2;
backgroundMusic.loop = true;
/** @type {boolean} */
let backgroundSound = true;
/** @type {boolean} */
let mainSound = false;
/** @type {boolean} */
let isLoading = false;
/** @type {boolean} */
let gamePaused = false;
/** @type {boolean} */
let gameStarted = false;

window.addEventListener('DOMContentLoaded', initGameUi);
window.addEventListener('keydown', preventBrowserKeys);

/**
 * Initializes the UI after the DOM is ready: sets up the mute toggle, updates the pause button, and enables the start button.
 */
function initGameUi() {
  const toggle = document.getElementById('muteToggle');
  if (toggle) setupMuteToggle(toggle);
  updatePauseButtonIcon();
  const btnStart = document.getElementById('btnStart');
  if (btnStart) btnStart.disabled = false;
}

/**
 * Reads the persisted mute state from localStorage and wires up the toggle element.
 *
 * @param {HTMLInputElement} toggle - The checkbox element used as a mute toggle.
 */
function setupMuteToggle(toggle) {
  const isMuted = localStorage.getItem('isMuted') === 'true';
  toggle.checked = isMuted;
  toggleMute(isMuted);
  toggle.addEventListener('change', () => {
    toggleMute(toggle.checked);
    toggle.blur();
  });
  toggle.addEventListener('click', () => {
    toggle.blur();
  });
}

/**
 * Prevents default browser scrolling behavior for arrow keys and the space bar.
 *
 * @param {KeyboardEvent} e - The keyboard event.
 */
function preventBrowserKeys(e) {
  if ([32, 37, 38, 39, 40].includes(e.keyCode)) {
    e.preventDefault();
  }
}

/**
 * Preloads all assets, initializes the level, and starts the game world.
 * Guards against concurrent calls while loading is in progress.
 *
 * @returns {Promise<void>}
 */
async function startGame() {
  if (isLoading) return;
  isLoading = true;
  blurActiveElement();
  showLoadingScreen();
  
  // 1. Assets laden (Preload Phase)
  DrawableObject.assetsToLoad = [];

  const audioToPreload = [
    'assets/audio/game.mp3',
    'assets/audio/characterRun.mp3',
    'assets/audio/collectSound.wav',
    'assets/audio/bottleCollectSound.wav',
    'assets/audio/characterJump.wav',
    'assets/audio/bottleBreak.mp3',
    'assets/audio/losing.mp3',
    'assets/audio/won.mp3'
  ];
  audioToPreload.forEach(addAudioToLoad);

  initLevel();
  // Dummy-Instanzen erzeugen, um Caching für Character/UI zu triggern
  new Character();
  new StatusBar();
  new StatusBarBottle();
  new StatusBarCoin();
  new StatusBarEndboss();
  new ThrowableObject();
  
  // 2. Warten bis alles da ist
  await Promise.all(DrawableObject.assetsToLoad);
  stopGame(); // Stoppt die Intervalle der Dummy-Objekte

  // 3. Spiel wirklich starten
  resetGameState();
  startScreenClose();
  document.getElementById('loadingScreen').classList.add('hide');
  
  initLevel(); // Level sauber neu initialisieren

  canvas = document.getElementById('canvas');
  playBackgroundMusic();
  world = new World(canvas, keyboard);
  isLoading = false;
}

/**
 * Removes focus from the currently active element to prevent unintended keyboard interactions.
 */
function blurActiveElement() {
  if (document.activeElement) {
    document.activeElement.blur();
  }
}


/**
 * Marks the game as started, clears the paused state, and updates the UI accordingly.
 */
function resetGameState() {
  gameStarted = true;
  gamePaused = false;
  updatePauseButtonIcon();
  hidePauseOverlay();
}

/**
 * Makes the loading screen element visible.
 *
 * @returns {Promise<void>}
 */
async function showLoadingScreen() {
  const el = document.getElementById('loadingScreen');
  if (!el) return;

  el.classList.remove('hide');
}

/**
 * Hides the start/game-over/win screens and shows the canvas and game controls.
 */
function startScreenClose() {
  toggleElement('startScreen', true);
  toggleElement('gameOverScreen', true);
  toggleElement('winGameScreen', true);
  toggleElement('btnMobileWrapper', false);
  toggleElement('canvas', false);
  toggleElement('pauseBtn', false);
}

/**
 * Returns to the start screen, hides the canvas and controls, and stops the background music.
 */
function backToMenu() {
  toggleElement('startScreen', false);
  toggleElement('gameOverScreen', true);
  toggleElement('winGameScreen', true);
  toggleElement('btnMobileWrapper', true);
  toggleElement('pauseBtn', true);
  toggleElement('canvas', true);

  resetGameFlags();
  backgroundMusic.pause();
}

/**
 * Shows the game-over screen and plays the losing sound.
 */
function gameOver() {
  finishGame('gameOverScreen', gameOverSound);
}

/**
 * Shows the win screen and plays the victory sound.
 */
function winGame() {
  finishGame('winGameScreen', winSound);
}

/**
 * Shared end-of-game handler: shows the result screen, stops all game loops and music, and plays a sound.
 *
 * @param {string} screenId - The id of the result screen element to show.
 * @param {HTMLAudioElement} soundEffect - The audio to play when the game ends.
 */
function finishGame(screenId, soundEffect) {
  toggleElement(screenId, false);
  toggleElement('btnMobileWrapper', true);
  toggleElement('pauseBtn', true);

  resetGameFlags();
  stopGame();

  if (world && world.character) {
    world.character.walking_sound.pause();
    world.character.walking_sound.currentTime = 0;
  }

  backgroundMusic.pause();

  playAudio(soundEffect);
}

/**
 * Resets gameStarted and gamePaused to false and updates the pause button icon.
 */
function resetGameFlags() {
  gameStarted = false;
  gamePaused = false;
  updatePauseButtonIcon();
  hidePauseOverlay();
}

/**
 * Hides the end screens and restarts the game from the beginning.
 */
function restartGame() {
  toggleElement('gameOverScreen', true);
  toggleElement('winGameScreen', true);
  toggleElement('canvas', false);
  toggleElement('pauseBtn', false);
  resetGameFlags();
  startGame();
}

/**
 * Adds or removes the `d-none` class on a DOM element to show or hide it.
 *
 * @param {string} id - The id of the element to toggle.
 * @param {boolean} hide - True to hide the element, false to show it.
 */
function toggleElement(id, hide) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('d-none', hide);
}

/**
 * Clears all active browser intervals to halt all game loops.
 */
function stopGame() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

/**
 * Starts an interval and stores its id so it can be cleared later.
 *
 * @param {Function} fn - The callback to execute on each interval tick.
 * @param {number} time - Interval duration in milliseconds.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/**
 * Starts the background music if sound is enabled, or pauses it if muted.
 */
function playBackgroundMusic() {
  if (backgroundSound && !mainSound) {
    backgroundMusic.muted = false;
    backgroundMusic.play().catch(() => {});
    return;
  }

  backgroundMusic.pause();
}

/**
 * Zentrale Audio-Funktion
 * Spielt Sound ab, wenn nicht gemuted. Klont Audio für Überlappungen (SFX).
 *
 * @param {HTMLAudioElement} audio - The audio element to play.
 */
function playAudio(audio) {
  if (audio && !mainSound) {
    audio.cloneNode(true).play().catch(() => {});
  }
}

/**
 * Fügt Audio-Dateien zur Preload-Queue hinzu.
 * Wartet auf 'canplaythrough', damit Sounds sofort verfügbar sind.
 *
 * @param {string} path - Path to the audio file to preload.
 */
function addAudioToLoad(path) {
  const audio = new Audio(path);
  audio.preload = 'auto';
  const promise = new Promise((resolve) => {
    audio.oncanplaythrough = resolve;
    audio.onerror = resolve;
    // Safari: canplaythrough fires unreliably; resolve after 3 s as fallback
    setTimeout(resolve, 3000);
  });
  DrawableObject.assetsToLoad.push(promise);
}

/**
 * Applies the mute state globally: persists it to localStorage, mutes/unmutes all audio, and resumes music if the game is running.
 *
 * @param {boolean} isMuted - True to mute all audio, false to unmute.
 */
function toggleMute(isMuted) {
  localStorage.setItem('isMuted', isMuted);
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

/**
 * Toggles the game's paused state and shows or hides the pause overlay accordingly.
 */
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

/**
 * Removes the `d-none` class from the pause overlay to make it visible.
 */
function showPauseOverlay() {
  const overlay = document.getElementById('pauseOverlay');
  if (overlay) overlay.classList.remove('d-none');
}

/**
 * Adds the `d-none` class to the pause overlay to hide it.
 */
function hidePauseOverlay() {
  const overlay = document.getElementById('pauseOverlay');
  if (overlay) overlay.classList.add('d-none');
}

/**
 * Updates the pause button's inner HTML to display either a play or pause icon.
 */
function updatePauseButtonIcon() {
  const pauseBtn = document.getElementById('pauseBtn');
  if (!pauseBtn) return;
  pauseBtn.innerHTML = gamePaused ? getPlayIcon() : getPauseIcon();
}

/**
 * Returns the SVG markup for the play icon.
 *
 * @returns {string} SVG HTML string.
 */
function getPlayIcon() {
  return `
    <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M8 5v14l11-7L8 5Z"/>
    </svg>
  `;
}

/**
 * Returns the SVG markup for the pause icon.
 *
 * @returns {string} SVG HTML string.
 */
function getPauseIcon() {
  return `
    <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z"/>
    </svg>
  `;
}

/**
 * Opens the how-to overlay by adding the `is-open` class and setting `aria-hidden` to false.
 */
function openHowTo() {
  const overlay = document.getElementById('howToOverlay');
  if (!overlay) return;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
}

/**
 * Closes the how-to overlay by removing the `is-open` class and setting `aria-hidden` to true.
 */
function closeHowTo() {
  const overlay = document.getElementById('howToOverlay');
  if (!overlay) return;
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
}

/**
 * Toggles fullscreen mode for the game container element.
 */
function toggleFullscreen() {
  const el = document.querySelector('.game-container');
  if (!el) return;
  if (!document.fullscreenElement) {
    el.requestFullscreen?.();
    return;
  }

  document.exitFullscreen?.();
}

/**
 * Toggles the visibility of the first intro popup.
 */
function popupToggleFirst() {
  togglePopup('popupIntroTextFirst', 'popupContentFirst', 'popupHideWrapperFirst', 'popupHideInnerContentFirst', 'imageChangeFirst', 'book');
}

/**
 * Toggles the visibility of the second intro popup.
 */
function popupToggleSecond() {
  togglePopup('popupIntroTextSecond', 'popupContentSecond', 'popupHideWrapperSecond', 'popupHideInnerContentSecond', 'imageChangeSecond', 'info');
}

/**
 * Toggles the CSS classes on a popup and its content element, then updates the toggle icon.
 *
 * @param {string} popupId - The id of the popup wrapper element.
 * @param {string} contentId - The id of the popup content element.
 * @param {string} hideClass - The CSS class toggled on the popup wrapper to hide/show it.
 * @param {string} contentClass - The CSS class toggled on the content element.
 * @param {string} imgId - The id of the image element whose src changes.
 * @param {string} iconType - Either 'book' or 'info', determines which icon to show when open.
 */
function togglePopup(popupId, contentId, hideClass, contentClass, imgId, iconType) {
  const popup = document.getElementById(popupId);
  const content = document.getElementById(contentId);
  if (!popup || !content) return;

  popup.classList.toggle(hideClass);
  content.classList.toggle(contentClass);
  
  // changeImage logic needs to know which class to check. 
  // Since changeImage checks both hardcoded classes, we can reuse it or inline it. 
  // For minimal changes, we reuse existing changeImage.
  changeImage(popup, imgId, iconType);
}

/**
 * Updates the src of a popup icon image based on whether the popup is currently hidden.
 *
 * @param {HTMLElement} popup - The popup wrapper element whose class list is inspected.
 * @param {string} imageId - The id of the image element to update.
 * @param {string} iconType - Either 'book' or 'info', used to determine the open-state icon.
 */
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

/**
 * Toggles the legacy single popup's visibility and updates its icon image.
 */
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