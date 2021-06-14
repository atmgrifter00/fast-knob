import { FASTElement, customElement, html, observable, volatile, css, attr, Observable, repeat } from '@microsoft/fast-element'

const template = html<FASTKnob>`
<div class="fixed-aspect-ratio-container">
    <span class="fast-knob"></span>
    <span class="fast-knob-pointer" style="--fast-knob-value-angle: ${x => x.valueAngle(x.value)}deg"></span>
    ${repeat(x => x.tickArray, html<number>`
        <svg class="fast-knob-tick" style="--fast-knob-tick-angle: ${(x,c) => x}deg">
            <line x1="0" y1="0" x2="10" y2="0" style="stroke:rgb(255,0,0); stroke-width: 2"/>
        </svg>
    `)}
</div>
`;

const styles = css`

:host {
    display: inline-block;
    contain: content;
    min-width: 100px;
  }
  .fixed-aspect-ratio-container {
      width: 100%;
      padding-top: 100%;
      position: relative;
  }
  .fast-knob {
      background-color: blue;
      border-radius: 50%;
      display: inline-block;
      margin: 10px;
      height: calc(100% - 20px);
      width: calc(100% - 20px);
      position: absolute;
      top: 0;
  }
  .fast-knob-pointer {
    margin: 45px;
    background-color: white;
    border-radius: 50%;
    display: inline-block;
    height: 10%;
    width: 10%;
    position: absolute;
    top: 0;
    z-index: 10;
    transform: rotate(var(--fast-knob-value-angle)) translate(30px);
}
.fast-knob-tick {
    margin-top: 50px;
    height: 2px;
    width: 10px;
    top: 45px;
    left: 45px;
    display: inline-block;
    position: absolute;
    top: 0;
    z-index: 10;
    transform: rotate(var(--fast-knob-tick-angle)) translate(45px);
}
`;

@customElement({
    name: 'fast-knob',
    template,
    styles
})
export class FASTKnob extends FASTElement {
    @observable numTicks: number = 5;
    @observable start: number = 135;
    @observable end: number = 405;
    @observable min: number = 0;
    @observable max: number = 100;
    @observable value: number = 0;
    @observable label: string = "Foo";

    _isMouseDown = false;
    _mouseDownX: number;
    _mouseDownY: number;

    constructor() {
        super();
        this.addEventListener('mousedown', (evt) => {
            this._isMouseDown = true;
            this._mouseDownX = evt.clientX;
            this._mouseDownY = evt.clientY;
            evt.stopPropagation();
            evt.preventDefault();
        })

        document.addEventListener('mousemove', (evt) => {
            if (!this._isMouseDown) {
                return;
            }

            const mouseMoveAngle: number = this.angleBetweenVectors(this._mouseDownX, this._mouseDownY, evt.clientX, evt.clientY);
            this.value = this.angleValue(mouseMoveAngle);

            evt.stopPropagation();
            evt.preventDefault();
        })

        document.addEventListener('mouseup', (evt) => {
            if (this._isMouseDown) {
                this._isMouseDown = false;
            }
        })
    }

    angleBetweenVectors(x1: number, y1: number, x2: number, y2: number): number {
        let angle = (Math.atan2((y2 - y1), (x2 - x1)) * 180 / Math.PI + 360) % 360;
        return angle;
    }

    valueAngle(value: number) {
        const angle = ((value - this.min) / (this.max - this.min)) * (this.end - this.start) + this.start;
        return angle;
    }

    angleValue(angle: number) {
        const minAngle = this.start;
        let maxAngle = this.end;
        if (maxAngle > 360) {
            maxAngle = 360 - (maxAngle % 360);
        }

        if (angle < minAngle || angle > maxAngle) {
            if (Math.abs(angle - minAngle) < Math.abs(angle - maxAngle)) {
                return this.min;
            } else {
                return this.max;
            }
        }

        const relativeAngle = (angle - minAngle) / (maxAngle - minAngle);
        const value = this.min + (relativeAngle * (this.max - this.min))
        return value;
    }

    get tickArray(): number[] {
        const tickArray = [];
        for(let i = 0; i < this.numTicks; i++) {
            const tickValue = this.start + ((i / (this.numTicks - 1)) * (this.end - this.start));
            tickArray.push(tickValue);
        }
        return tickArray;
    }
}