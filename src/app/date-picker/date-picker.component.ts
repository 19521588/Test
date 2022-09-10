import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class DatePickerComponent implements OnInit {
  @Input() day!: any;
  @Input() month!: any;
  @Input() year!: any;

  constructor(private _eref: ElementRef) {}

  onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.selectDay = false;
      this.selectMonth = false;
      this.selectYear = false;
    }
  }

  days: any[] = [];
  months: any[] = [];
  years: any[] = [];
  currentYear = 0;
  currentMonth = 0;
  currentDay = 0;

  fromYear = 1900;

  selectDay = false;
  selectMonth = false;
  selectYear = false;

  ngOnInit(): void {
    const date = new Date();

    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth() + 1;
    this.currentDay = date.getDate();

    for (let index = 0; index <= this.currentYear - this.fromYear; index++) {
      this.years.push(this.fromYear + index);
      if (index < 12) this.months.push(index + 1);
      if (index < 31) this.days.push(index + 1);
    }
    this.year = this.years.reverse();
    this.LoadData();
  }
  LoadData() {
    if (!this.day || !this.month || !this.year) {
      this.day = 'dd';
      this.month = 'mm';
      this.year = 'yyyy';
    }
  }
  select(type: any) {
    switch (type) {
      case 0:
        this.selectDay = !this.selectDay;
        this.selectMonth = false;
        this.selectYear = false;
        break;
      case 1:
        this.selectMonth = !this.selectMonth;
        this.selectDay = false;
        this.selectYear = false;
        break;
      case 2:
        this.selectYear = !this.selectYear;
        this.selectMonth = false;
        this.selectDay = false;
        break;
      default:
        break;
    }
  }
  changeValue(type: any, value: any) {
    switch (type) {
      case 0:
        this.day = value;
        this.selectDay = !this.selectDay;
        break;
      case 1:
        this.month = value;
        this.selectMonth = !this.selectMonth;
        break;
      case 2:
        this.year = value;
        this.selectYear = !this.selectYear;
        break;

      default:
        break;
    }
  }
  dateConvert() {
    return (
      (this.day < 10 ? '0' + this.day : this.day) +
      '/' +
      (this.month < 10 ? '0' + this.month : this.month) +
      '/' +
      this.year
    );
  }
  validateDate(date: string) {
    const regex = new RegExp(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g
    );

    if (!regex.test(date)) {
      return false;
    } else {
      var today = new Date();
      var inputDay = new Date(this.month + '/' + this.day + '/' + this.year);
      var datePipe = new DatePipe('en-US');

      if (inputDay.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0))
        return false;
      else return true;
      // if (this.currentYear == this.year) {
      //   if (this.currentMonth == this.month)
      //     if (this.currentDay < this.day) return false;
      //     else return true;
      //   else {
      //     if (this.currentMonth < this.month) return false;
      //     else return true;
      //   }
      // } else {
      //   if (this.currentYear < this.year) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // }
    }
  }

  check() {
    if (!this.isEmpty()) return true;
    return this.validateDate(this.dateConvert());
  }
  isEmpty() {
    if (
      (this.day == 'dd' && this.month == 'mm' && this.year == 'yyyy') ||
      (!this.day && !this.month && this.year)
    ) {
      return false;
    }
    return true;
  }
}
