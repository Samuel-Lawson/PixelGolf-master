'use strict';

import { Bounds } from './Bounds';
import { getBrowserTransitionEvent } from '../polyfills.js';

export class Ball {

  constructor(element){

    this.element = element;
    this.movementLocked = false;

    //  Fire an application level event each time the ball has finished moving
    let transitionEvent = getBrowserTransitionEvent();
    transitionEvent && element.addEventListener(transitionEvent, function() {
    	document.dispatchEvent(new Event('ball_moved'));
      this.movementLocked = false;
    });

    //  Listen for ball movement end event
    document.addEventListener('ball_moved', evt => this.onBallMoved(evt));
  }

  move(direction, distance){
    
    if(!direction || !distance || this.movementLocked) return;

    let bounds = new Bounds(this.element).get(),
        intDistance = parseInt(distance);

    switch(direction){
      case 'left':
        this.element.style.left = bounds.left - intDistance + 'px';
        break;

      case 'right':
        this.element.style.left = bounds.left + intDistance + 'px';
        break;

      case 'up':
        this.element.style.top = bounds.top - intDistance + 'px';
        break;

      case 'down':
        this.element.style.top = bounds.top + intDistance + 'px';
        break;
    }

    this.movementLocked = true;
  }

  onBallMoved(evt){
    this.movementLocked = false;
  }

}
