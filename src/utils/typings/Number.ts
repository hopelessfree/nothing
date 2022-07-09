export type decimals = number;
export type InputNumber = string | number;
export type OperationMode = 'add' | 'sub' | 'mul' | 'div';

export enum CheckFormatResult {
  Pass = 'pass',
  Null = 'null',
  Beyond = 'beyond',
  Illegal = 'illegal',
}

export interface CheckFormatOptions {
  decimals?: decimals;
  max?: number;
  min?: number;
}

export interface NumberOperationOptions {
  mode?: OperationMode;
  decimals?: decimals;
}

export type CheckFormat = (
  number: InputNumber,
  options: CheckFormatOptions,
) => CheckFormatResult;

export type NumberOperation = (
  firstNumber: number | string,
  secondNumer: number | string,
  options?: NumberOperationOptions,
) => string | boolean | number;
