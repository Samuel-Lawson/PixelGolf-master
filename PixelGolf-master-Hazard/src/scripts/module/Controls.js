'use strict';

export class Controls {

  constructor(){

    //  Add keyboard listener to change direction on arrow
    document.addEventListener('keydown', evt => this.onKeyPress(evt));

    let swingButton = document.querySelector('button');
    if(swingButton) swingButton.addEventListener('click', evt => this.triggerSwing());
  }

  onKeyPress(evt){

    //  Prevent the browser from scrolling up / down on key press
    let directionButton = null;

    switch(evt.keyCode){

      //  Left
      case 37:
        evt.preventDefault();
        directionButton = document.querySelector('[value="left"]');
        break;

      //  Up
      case 38:
        evt.preventDefault();
        directionButton = document.querySelector('[value="up"]');
        break;

      //  Right
      case 39:
        evt.preventDefault();
        directionButton = document.querySelector('[value="right"]');
        break;

      //  Down
      case 40:
        evt.preventDefault();
        directionButton = document.querySelector('[value="down"]');
        break;

      //  Enter
      case 13:
        evt.preventDefault();
        this.triggerSwing();
        break;
    }

    if(directionButton) {
      directionButton.checked = true;
    }
  }

  getDirection() {
    let selectedButton = document.querySelector('.controls input:checked');
    if(selectedButton) return selectedButton.value;

    throw 'Direction not set';
  }

  getDistance(){
    let distanceField = document.querySelector('[name="distance"]');
    if(distanceField) return distanceField.value;

    throw 'Distance not set';
  }

  triggerSwing(){
    document.dispatchEvent(new Event('swing'));
  }
}
