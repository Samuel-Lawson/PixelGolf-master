'use strict';

import { Controls } from './Controls';
import { Ball } from './Ball';
import { Bounds } from './Bounds';

class PixelGolfApp {

  constructor(){
    console.log('Pixel Golf Started');

    this.controls = new Controls();
    this.ball = new Ball(document.querySelector('.ball'));
    this.hole = new Bounds(document.querySelector('.hole'));
    this.moves = 0;

    document.addEventListener('swing', evt => this.swing());
    document.addEventListener('ball_moved', evt => this.onBallMoved());
  }

  swing(){
    let direction = this.controls.getDirection(),
        distance = this.controls.getDistance();

    this.ball.move(direction, distance);
    this.moves++;
  }

  onBallMoved(){
    let ballIsInHole = this.hole.contains(new Bounds(this.ball.element));

    if(ballIsInHole) {
      alert("Wahoo! You got it in " + this.moves + " shots.");
      this.reset();
    }
  }

  reset(){
    this.moves = 0;
    this.ball.element.style = '';
  }

}

export const App = {

  instance: null,
  canvas: document.querySelector('.js-canvas'),

  init(){

    if(App.canvas){

      App.instance = new PixelGolfApp();

    }

  }
};
