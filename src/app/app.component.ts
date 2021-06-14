import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FASTSlider } from '@microsoft/fast-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit(): void {
  }
  title = 'fast-angular';
  _value = 0;
  _startAngle = 135;
  _endAngle = 405;
  _numTicks = 5;
  _label = '';

  @ViewChild('fastSlider', { static: true }) fastSlider: ElementRef<FASTSlider>;

  get value(): number {
    return this._value;
  }

  @Input() set value(value: number) {
      this._value = value;
      this.valueChange.emit(this._value);
  }
  
  @Output() valueChange = new EventEmitter<number>();

  get endAngle(): number {
    return this._endAngle;
  }

  @Input() set endAngle(value: number) {
      this._endAngle = value;
      this.endAngleChange.emit(this._endAngle);
  }
  
  @Output() endAngleChange = new EventEmitter<number>();

  get startAngle(): number {
    return this._startAngle;
  }

  @Input() set startAngle(value: number) {
    this._startAngle = value;
    this.startAngleChange.emit(this._startAngle);
  }

  @Output() startAngleChange = new EventEmitter<number>();

  get numTicks(): number {
    return this._numTicks;
  }

  @Input() set numTicks(value: number) {
      this._numTicks = value;
      this.numTicksChange.emit(this._numTicks);
  }
  
  @Output() numTicksChange = new EventEmitter<number>();

  get label(): string {
    return this._label;
  }

  @Input() set label(value: string) {
      this._label = value;
      this.labelChange.emit(this._label);
  }
  
  @Output() labelChange = new EventEmitter<string>();

  updateValue(value: string) {
    (this.value as any) = value;
  }

  updateStartAngle(value: string) {
    (this.startAngle as any) = value;
  }

  updateEndAngle(value: string) {
    (this.endAngle as any) = value;
  }

  updateNumTicks(value: string) {
    (this.numTicks as any) = value;
  }
}