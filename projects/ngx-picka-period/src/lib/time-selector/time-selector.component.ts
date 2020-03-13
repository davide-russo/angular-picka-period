import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Moment} from 'moment';

@Component({
  selector: 'ngx-picka-period-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss']
})
export class TimeSelectorComponent implements AfterViewInit {
  @ViewChild('hours', {static: false}) hours: ElementRef;
  @ViewChild('minutes', {static: false}) minutes: ElementRef;

  @Output() selectTime: EventEmitter<Moment> = new EventEmitter<Moment>();

  @Input() disabled: boolean;
  @Input() set time(time: Moment) {
    if (time) {
      this._time = time.clone();
      this._updateViewTime();
    }
  }
  get time(): Moment { return this._time; }
  private _time: Moment;


  constructor() { }

  ngAfterViewInit() {
    this._updateViewTime();
  }

  public onMinutesChange(minutes: number) {
    this.time.minutes(this._checkTimeComponent(minutes, 'minutes'));
    this._updateViewTime();
    this.selectTime.emit(this.time);
  }

  public onHoursChange(hours: number) {
    this.time.hours(this._checkTimeComponent(hours, 'hours'));
    this._updateViewTime();
    this.selectTime.emit(this.time);
  }

  private _updateViewTime() {
    if (this.hours && this.minutes && this.time) {
      this.hours.nativeElement.value = this.time.format('HH');
      this.minutes.nativeElement.value = this.time.format('mm');
    }
  }

  private _checkTimeComponent(component: any, type: 'hours' | 'minutes'): number {
    if (+component < 0) {
      return 0;
    }
    if (type === 'hours' && +component > 23) {
      return 23;
    } else if (type === 'minutes' && +component > 59) {
      return 59;
    }
    return +component;
  }
}