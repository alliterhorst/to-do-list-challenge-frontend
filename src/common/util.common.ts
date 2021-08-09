import { AxiosError } from 'axios';
import moment from 'moment';

export function convertToPersistStorage<T>(value: T): string {
  let stringValue = '';
  switch (typeof value) {
    case 'object':
      stringValue = JSON.stringify(value);
      break;
    case 'boolean':
    case 'number':
    case 'string':
    default:
      stringValue = `${value}`;
  }
  return stringValue;
}

export function throwContextError(businessContext: string): void {
  throw new Error(
    `use${businessContext}Context deve ser utilizando dentro do ${businessContext}Provider`,
  );
}

// eslint-disable-next-line
export const getStringify = (value: any): string =>
  typeof value === 'string' ? value : JSON.stringify(value);

export const handleError = (error: AxiosError): string =>
  getStringify(
    error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      error,
  );

export const sleep = async (interval: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, interval));

export const dateFormat = (date: Date): string =>
  moment(date).format('DD/MM/YYYY - HH:mm');
