class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;
  R = false;
  P = false;
  dPressedLastInterval = false;

  constructor() {
    this.bindKeyPressEvents();
    this.bindBtsPressEvents();
  }

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

  bindBtsPressEvents() {
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const btnJump = document.getElementById('btnJump');
    const btnThrow = document.getElementById('btnThrow');

    if (btnLeft) {
      btnLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.LEFT = true;
      });

      btnLeft.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.LEFT = false;
      });
    }

    if (btnRight) {
      btnRight.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.RIGHT = true;
      });

      btnRight.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.RIGHT = false;
      });
    }

    if (btnJump) {
      btnJump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.SPACE = true;
      });

      btnJump.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.SPACE = false;
      });
    }

    if (btnThrow) {
      btnThrow.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.D = true;
      });

      btnThrow.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.D = false;
      });
    }
  }
}