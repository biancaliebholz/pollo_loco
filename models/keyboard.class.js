class Keyboard {
  LEFT = false;
  RIGHT = false;

  constructor() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.LEFT = true;
      if (e.key === 'ArrowRight') this.RIGHT = true;
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') this.LEFT = false;
      if (e.key === 'ArrowRight') this.RIGHT = false;
    });
  }
}