import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Notifier, Observable, Subscriber } from '@microsoft/fast-element';
import { FASTKnob } from './fast-knob';

@Component({
    selector: 'ng-fast-knob',
    templateUrl: './fast-knob.component.html'
})
export class FastKnobComponent implements AfterViewInit {
    notifier: Notifier;
    valueChangeHandler: Subscriber;
    startAngleChangeHandler: Subscriber;
    endAngleChangeHandler: Subscriber;
    numTicksChangeHandler: Subscriber;

    @ViewChild('fastKnob', { static: true }) fastKnob: ElementRef<FASTKnob>;

    ngAfterViewInit(): void {
        const self = this;
        this.notifier = Observable.getNotifier(this.fastKnob.nativeElement);
        this.valueChangeHandler = { handleChange: function(source: any, args: any): void {
            const fastKnob = source as FASTKnob;
            self.valueChange.emit(fastKnob.value);
            console.log("value = " + fastKnob.value);
        }};
        this.notifier.subscribe(this.valueChangeHandler, 'value');
    
        this.startAngleChangeHandler = { handleChange: function(source: any, args: any): void {
            const fastKnob = source as FASTKnob;
            self.startAngleChange.emit(fastKnob.start);
            console.log("startAngle subscriber working");
        }};
        this.notifier.subscribe(this.startAngleChangeHandler, 'start');
    
        this.endAngleChangeHandler = { handleChange: function(source: any, args: any): void {
            const fastKnob = source as FASTKnob;
            self.endAngleChange.emit(fastKnob.end);
            console.log("endAngle subscriber working");
        }};
        this.notifier.subscribe(this.endAngleChangeHandler, 'end');
    
        this.numTicksChangeHandler = { handleChange: function(source: any, args: any): void {
            const fastKnob = source as FASTKnob;
            self.numTicksChange.emit(fastKnob.numTicks);
            console.log("numTicks subscriber working");
        }};
        this.notifier.subscribe(this.numTicksChangeHandler, 'numTicks');
    }
 
    get value(): number {
        return this.fastKnob.nativeElement.value;
    }

    @Input() set value(value: number) {
        this.fastKnob.nativeElement.value = value;
    }
    
    @Output() valueChange = new EventEmitter<number>();

    get startAngle(): number {
        return this.fastKnob.nativeElement.start;
    }

    @Input() set startAngle(value: number) {
        this.fastKnob.nativeElement.start = value;
    }
    
    @Output() startAngleChange = new EventEmitter<number>();

    get endAngle(): number {
        return this.fastKnob.nativeElement.end;
    }

    @Input() set endAngle(value: number) {
        this.fastKnob.nativeElement.end = value;
    }
    
    @Output() endAngleChange = new EventEmitter<number>();

    get numTicks(): number {
        return this.fastKnob.nativeElement.numTicks;
    }

    @Input() set numTicks(value: number) {
        this.fastKnob.nativeElement.numTicks = value;
    }
    
    @Output() numTicksChange = new EventEmitter<number>();

    get label(): string {
        return this.fastKnob.nativeElement.label;
    }

    @Input() set label(value: string) {
        this.fastKnob.nativeElement.label = value;
    }
    
    @Output() labelChange = new EventEmitter<string>();
}