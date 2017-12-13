'use strict';

export class Water {

  constructor(element){
    this.element = element;
  }

  get(){
    return {
      left: this.element.offsetLeft,
      top: this.element.offsetTop,
      right: this.element.offsetLeft + this.element.offsetWidth,
      bottom: this.element.offsetTop + this.element.offsetHeight
    };
  }

  contains(water){

    if(!water) return false;

    let waterOfThis = this.get(),
        waterOfThat = water.get();

    return waterOfThat.left >= waterOfThis.left
      && waterOfThat.right <= waterOfThis.right
      && waterOfThat.top >= waterOfThis.top
      && waterOfThat.bottom <= waterOfThis.bottom;
  }
}
