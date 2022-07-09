import {
  NumberOperation,
  InputNumber,
  CheckFormat,
  CheckFormatResult,
} from './typings/Number';

/**
 * @param price string | number 输入的价格
 * @param options
 * ```javascript
 * decimals?:  number 精确到小数点后面多少位，默认为没有
 * max?:number 最大值
 * min?:number 最小值
 * ```
 * @returns CheckFormatResult
 * ```javascript
 * Null = 'null',       未输入
 * Pass = 'pass',       通过
 * Illegal = 'illegal'  不合法
 * Beyond = 'beyond',   超出限定范围
 * ```
 */
export const checkFormat: CheckFormat = (price, options) => {
  const { decimals, max, min } = options;

  const priceNum = Number(price);
  const priceStr = String(price);

  if (price === undefined || price === '') return CheckFormatResult.Null;

  // 非数字类型
  if (isNaN(priceNum)) {
    return CheckFormatResult.Illegal;
  }

  // 小于零非法
  if (priceNum < 0) {
    return CheckFormatResult.Illegal;
  }

  // 价格精度不符合
  let moneyDecimalReg: RegExp;
  if (decimals) {
    moneyDecimalReg =
      decimals === 1
        ? /(^[1-9]([0-9]+)?(\.[0-9])?$)|(^(0){1}$)|(^[0-9]\.([0-9])$)/
        : /(^[1-9]([0-9]+)?(\.([0-9]){1,2})?$)|(^(0){1}$)|(^[0-9]\.([0-9]){1,2}$)/;

    if (!moneyDecimalReg.test(priceStr)) {
      return CheckFormatResult.Illegal;
    }
  } else {
    moneyDecimalReg = /\./g;
    if (moneyDecimalReg.test(priceStr)) {
      return CheckFormatResult.Illegal;
    }
  }

  // 价格未填写完整

  // 超出范围
  if (max && priceNum > max) {
    return CheckFormatResult.Beyond;
  } else if (min && priceNum < min) {
    return CheckFormatResult.Beyond;
  }

  return CheckFormatResult.Pass;
};

export function numberMul(a: InputNumber, b: InputNumber) {
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split('.')[1].length;
  } catch (f) {}
  try {
    c += e.split('.')[1].length;
  } catch (f) {}
  return (
    (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
  );
}

export function numberAdd(a: InputNumber, b: InputNumber) {
  var c, d, e;

  try {
    c = a.toString().split('.')[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split('.')[1].length;
  } catch (f) {
    d = 0;
  }
  e = Math.pow(10, Math.max(c, d));
  return (numberMul(a, e) + numberMul(b, e)) / e;
}

export function numberSub(a: InputNumber, b: InputNumber) {
  var c, d, e;

  try {
    c = a.toString().split('.')[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split('.')[1].length;
  } catch (f) {
    d = 0;
  }
  e = Math.pow(10, Math.max(c, d));
  return (numberMul(a, e) - numberMul(b, e)) / e;
}

export function numberDiv(a: InputNumber, b: InputNumber) {
  var c,
    d,
    e = 0,
    f = 0;
  try {
    e = a.toString().split('.')[1].length;
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length;
  } catch (g) {}
  return (
    (c = Number(a.toString().replace('.', ''))),
    (d = Number(b.toString().replace('.', ''))),
    numberMul(c / d, Math.pow(10, f - e))
  );
}

/**
 * 防精度丢失运算，如果输入为非数字则返回 `false`
 * 默认返回为数字类型 如果加了 `decimals` 选项则返回字符串类型
 * @param firstNumber `string` | `number` 第一个数字
 * @param secondNumer `string` | `number` 第二个数字
 * @param options
 * ```javascript
 * mode?:     'add' | 'sub' | 'mul' | 'div' 运算模式 加减乘除 默认为加
 * decimals?: number 精确到小数点后面多少位（填了此项返回为字符串）
 * ```
 * @returns `string` | `boolean` | `number`
 */
export const numberOperation: NumberOperation = (
  firstNumber,
  secondNumer,
  options = {},
) => {
  const { mode = 'add', decimals } = options;

  // 校验非法输入
  if (
    Object.prototype.toString.call(firstNumber) !== '[object Number]' &&
    Object.prototype.toString.call(firstNumber) !== '[object String]'
  )
    return false;

  if (
    Object.prototype.toString.call(secondNumer) !== '[object Number]' &&
    Object.prototype.toString.call(secondNumer) !== '[object String]'
  )
    return false;

  if (isNaN(Number(firstNumber)) || isNaN(Number(secondNumer))) return false;
  //  ----

  let res: number | string;
  switch (mode) {
    case 'add':
      res = numberAdd(firstNumber, secondNumer);
      break;

    case 'sub':
      res = numberSub(firstNumber, secondNumer);
      break;

    case 'mul':
      res = numberMul(firstNumber, secondNumer);
      break;

    case 'div':
      res = numberDiv(firstNumber, secondNumer);
      break;

    default:
      res = numberAdd(firstNumber, secondNumer);
      break;
  }

  if (decimals) res = res.toFixed(decimals);

  return res;
};

export default {
  checkFormat,
  numberOperation,
};
