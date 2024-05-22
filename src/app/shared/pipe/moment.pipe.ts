import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'moment/locale/es';
type typeTransform = 'default' | 'agoHours';

@Pipe({
  name: 'moment',
  standalone: true,
})
export class MomentPipe implements PipeTransform {
  constructor() {}

  transform(value: any, type: typeTransform = 'default'): string {
    return this.transformMoment(new Date(value) , type);
  }

  transformMoment(date: Date, type: typeTransform): string {
    const transform: { [key: string]: string } = {
      default: moment(date).calendar(),
      agoHours : moment(date).startOf('hour').fromNow()
    };

    return transform[type];
  }
}
