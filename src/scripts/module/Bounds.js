'use strict';

export class Bounds {

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

  contains(bounds){

    if(!bounds) return false;

    let boundsOfThis = this.get(),
        boundsOfThat = bounds.get();

    return boundsOfThat.left >= boundsOfThis.left
      && boundsOfThat.right <= boundsOfThis.right
      && boundsOfThat.top >= boundsOfThis.top
      && boundsOfThat.bottom <= boundsOfThis.bottom;
  }
}
