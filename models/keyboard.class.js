/**
 * Tracks keyboard and touch-button input state for controlling the character.
 */
class Keyboard {
  /** @type {boolean} */
  LEFT = false;
  /** @type {boolean} */
  RIGHT = false;
  /** @type {boolean} */
  UP = false;
  /** @type {boolean} */
  DOWN = false;
  /** @type {boolean} */
  SPACE = false;
  /** @type {boolean} */
  D = false;
  /** @type {boolean} */
  R = false;
  /** @type {boolean} */
  P = false;
  /** @type {boolean} */
  dPressedLastInterval = false;

  /**
   * Binds keyboard and touch button event listeners.
   */
  constructor() {
    this.bindKeyPressEvents();
    this.bindBtsPressEvents();
  }

  /**
   * Registers keydown and keyup listeners to update the key state flags.
   */
  bindKeyPressEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode == 39) this.RIGHT = true;
      if (e.keyCode == 37) this.LEFT = true;
      if (e.keyCode == 38) this.UP = true;
      if (e.keyCode == 40) this.DOWN = true;
      if (e.keyCode == 32) this.SPACE = true;
      if (e.keyCode == 68) this.D = true;
      if (e.keyCode == 82) this.R = true;

      if (e.keyCode == 80) {
        this.P = true;
        if (!e.repeat && typeof togglePause === 'function') {
          togglePause();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.keyCode == 39) this.RIGHT = false;
      if (e.keyCode == 37) this.LEFT = false;
      if (e.keyCode == 38) this.UP = false;
      if (e.keyCode == 40) this.DOWN = false;
      if (e.keyCode == 32) this.SPACE = false;
      if (e.keyCode == 68) this.D = false;
      if (e.keyCode == 80) this.P = false;
    });
  }

  /**
   * Binds touch events to the on-screen mobile control buttons.
   */
  bindBtsPressEvents() {
    this.bindTouch('btnLeft', 'LEFT');
    this.bindTouch('btnRight', 'RIGHT');
    this.bindTouch('btnJump', 'SPACE');
    this.bindTouch('btnThrow', 'D');
  }

  /**
   * Attaches touchstart and touchend listeners to an on-screen button.
   *
   * @param {string} elementId - The id of the button element.
   * @param {string} key - The property name on this Keyboard instance to toggle.
   */
  bindTouch(elementId, key) {
    const btn = document.getElementById(elementId);
    if (btn) {
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this[key] = true;
      });
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this[key] = false;
      });
    }
  }
}
