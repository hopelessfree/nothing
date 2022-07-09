import { SetTimeProps, Precision } from './typings/Time';

/**
 * @param timestamp 毫秒
 */
export class Time {
  constructor(timestamp?: number | string) {
    if (typeof timestamp === 'string') {
      this.time = new Date(timestamp.replace(/-/g, '/'));
    } else if (typeof timestamp === 'number') {
      this.time = new Date(timestamp);
    } else {
      this.time = new Date();
    }

    this.timestamp = this.time.valueOf();
    const { time } = this;

    this.year = time.getFullYear();
    this.month = time.getMonth();
    this.day = time.getDate();
    this.hour = time.getHours();
    this.minute = time.getMinutes();
    this.seconds = time.getSeconds();

    this.daysTotal = new Date(this.year, this.month + 1, 0).getDate();
  }

  public timestamp: number;
  public time: Date;

  // 日期分段值
  public year: number;
  public month: number;
  public day: number;
  public hour: number;
  public minute: number;
  public seconds: number;

  // 日期统计
  public daysTotal: number;

  /**
   *
   * @param otherDay   比较的日期（timestamp 时间戳毫秒）
   * @param precision
   * ```javascript
   * 比较的精度，默认全比
   * precision =  year   是否同年
   * precision =  month  是否同年同月
   * precision =  day    ...
   * precision =  hour   ...
   * precision =  minute ...
   * ```
   * @returns 是否相等的布尔值
   */
  public isSame = (otherDay: number, precision?: Precision): boolean => {
    const compareDay = new Date(otherDay);

    switch (precision) {
      case 'year':
        return this.compareYear(compareDay);

      case 'month':
        return this.compareMonth(compareDay);

      case 'day':
        return this.compareDay(compareDay);

      case 'hour':
        return this.compareHour(compareDay);

      case 'minute':
        return this.compareMinute(compareDay);

      default:
        return this.timestamp === compareDay.valueOf();
    }
  };

  /**
   *
   * @param format 需要转化的时间格式
   * ```javascript
   * Y: 年
   * M: 月
   * D: 日
   * H: 小时
   * m: 分
   * s: 秒
   * 默认: YYYY-MM-DD HH:mm:ss  2021-01-01 00:00:00
   * ```
   * @returns string 转换后的时间格式
   */
  public format = (format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
    let ret;
    const options: { [x: string]: string } = {
      'Y+': String(this.year), // 年
      'M+': String(this.month + 1), // 月
      'D+': String(this.day), // 日
      'H+': String(this.hour), // 时
      'm+': String(this.minute), // 分
      's+': String(this.seconds), // 秒
    };
    for (let k in options) {
      ret = new RegExp('(' + k + ')').exec(format);
      if (ret) {
        format = format.replace(
          ret[1],
          ret[1].length == 1
            ? options[k]
            : options[k].padStart(ret[1].length, '0'),
        );
      }
    }

    return format;
  };

  /**
   *
   * @param time
   * ```javascript
   * 全部不输入则默认不更改
   * year?:number    更改之后的年
   * month?:number   更改之后的月
   * day?:number     更改之后的日
   * hour?:number    更改之后的小时
   * minute?:number  更改之后的分
   * seconds?:number 更改之后的秒
   * ```
   */
  public setTime = (times: SetTimeProps) => {
    const { year, month, day, hour, minute, seconds } = {
      year: this.year,
      month: this.month + 1,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      seconds: this.seconds,
      ...times,
    };

    this.time = new Date(
      `${year}/${month}/${day} ${hour}:${minute}:${seconds}`,
    );
    this.timestamp = this.time.valueOf();
    const { time } = this;
    this.year = time.getFullYear();
    this.month = time.getMonth();
    this.day = time.getDate();
    this.hour = time.getHours();
    this.minute = time.getMinutes();
    this.seconds = time.getSeconds();
    this.daysTotal = new Date(this.year, this.month + 1, 0).getDate();
  };

  /**
   * 比较年
   * @param compareDay 对比的日期
   * @returns boolean
   */
  public compareYear = (compareDay: Date): boolean => {
    return this.year === compareDay.getFullYear();
  };

  /**
   * 比较月
   * @param compareDay 对比的日期
   * @returns boolean
   */
  public compareMonth = (compareDay: Date): boolean => {
    if (!this.compareYear(compareDay)) return false;

    return this.month === compareDay.getMonth();
  };

  /**
   * 比较日
   * @param compareDay 对比的日期
   * @returns boolean
   */
  public compareDay = (compareDay: Date): boolean => {
    if (!this.compareMonth(compareDay)) return false;

    return this.day === compareDay.getDate();
  };

  /**
   * 比较小时
   * @param compareDay 对比的日期
   * @returns boolean
   */
  public compareHour = (compareDay: Date): boolean => {
    if (!this.compareDay(compareDay)) return false;

    return this.hour === compareDay.getHours();
  };

  /**
   * 比较分
   * @param compareDay 对比的日期
   * @returns boolean
   */
  public compareMinute = (compareDay: Date): boolean => {
    if (!this.compareHour(compareDay)) return false;

    return this.minute === compareDay.getMinutes();
  };
}

export default {
  Time,
};
