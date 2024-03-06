import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { time } from './time-engine';

const logs = (date: string | Date) => {
  console.log('getAsDate', time(date).getAsDate());
  console.log('getAsArrayDDMMYYYY', time(date).getAsArrayDDMMYYYY());
  console.log('getAsArrayYYYYMMDD', time(date).getAsArrayYYYYMMDD());
  console.log("toDDMMYYYY('-')", time(date).toDDMMYYYY('-'));
  console.log("toDDMMYYYY('/')", time(date).toDDMMYYYY('/'));
  console.log("toYYYYMMDD('-')", time(date).toYYYYMMDD('-'));
  console.log("toYYYYMMDD('/')", time(date).toYYYYMMDD('/'));
  console.log("toYYYYMMDD('/')", time(date).getDayMonthYear());
  console.log('-------------------------------');
  console.log('');
};
// console.log('07/09/2029', ' - ', time('07/09/2029').toYYYYMMDD('-'));
console.log(time(new Date()).addDay(3).addMonth(3).addYear(30).toYYYYMMDD('-'));

// logs(undefined as any);
// logs(new Date());
// logs('2029/09/07');
// logs('2025-10-06');
// logs('25/07/2020');
// logs('02-12-1990');
// logs('07/09/2029');

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: ``,
})
export class App {}

bootstrapApplication(App);
