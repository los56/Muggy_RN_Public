import {CafeData, MgTime} from '../types';
import {Text} from 'react-native';

export const overwriteStyle = (original: object, over: object) => {
  const res: any = {...original};
  let key: any;
  for (key of Object.keys(over)) {
    // @ts-ignore
    res[key] = over[key];
  }
  return res;
};

export const MgTimeToString = (time: MgTime): string => {
  let ampmText = '오전';

  if (time.minute === 0) {
    if (time.hour === 0) {
      return '자정';
    }
    if (time.hour === 12) {
      return '정오';
    }
  }

  if (time.hour > 12) {
    ampmText = '오후';
    time.hour -= 12;
  }

  return `${ampmText} ${time.hour < 10 ? '0' : ''}${time.hour}:${
    time.minute < 10 ? '0' : ''
  }${time.minute}`;
};

export const meterToUsingKilo = (meter: number) => {
  if (meter < 1000) {
    return `${meter}m`;
  }
  return `${(meter / 1000).toFixed(1)}km`;
}


export const phoneNumberAddHyphen = (phone: string) => {
  let res = '';

  if (phone.slice(0, 2) === '02') {
    res += '02-';
    phone = phone.slice(2);
  } else {
    res += `${phone.slice(0, 3)}-`;
    phone = phone.slice(3);
  }

  let front, back;
  if (phone.length == 8) {
    front = phone.slice(0, 4);
    back = phone.slice(4);
  } else {
    front = phone.slice(0, 3);
    back = phone.slice(3);
  }

  res += `${front}-${back}`;

  return res;
};

export const ScrollTest = (count: number) => {
  const res = [];

  for (let i = 0; i < count; i++) {
    res.push(<Text key={`test${i}`}>Hello</Text>);
  }

  return res;
};
export const min = (target: number, minValue: number) => {
  if (target < minValue) {
    return minValue;
  }
  return target;
};
export const max = (target: number, maxValue: number) => {
  return target > maxValue ? maxValue : target;
};

export const getPointFromLength = (length: number, angle: number) => {
  let x = Math.cos(angle) * length;
  let y = Math.sin(angle) * length;

  return {x, y};
};

export const sortToString = (a: CafeData, b: CafeData) => {
  if (a.title <= b.title) {
    return -1;
  }
  return 1;
};

export const sortToDistance = (a: CafeData, b: CafeData) => {
  if (!a.distance) {
    return 1;
  }
  if (!b.distance) {
    return -1;
  }

  if (a.distance <= b.distance) {
    return -1;
  }
  return 1;
};
