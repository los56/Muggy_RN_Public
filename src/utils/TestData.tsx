import {BeanData, CafeData, GroupData, MenuData} from '../types';

export const testMenuData: MenuData = {
  id: 1,
  cafeId: 1,
  title: '아메리카노',
  description: '아메리카노입니다.',
  price: 4500,
  image: require('../../assets/drawable/img.png'),
  beanId: -1,
};

export const testMenuData2: MenuData = {
  id: 2,
  cafeId: 1,
  title: '카푸치노',
  description: '카푸치노입니다.',
  price: 4500,
  image: require('../../assets/drawable/img.png'),
  beanId: -1,
};

export const testGroupData: GroupData = {
  id: 1,
  title: '에스프레소 바리에이션',
  description: '모든 원두는 직접 로스팅합니다.',
  menus: [
    testMenuData,
    testMenuData2,
    testMenuData,
    testMenuData,
    testMenuData,
    testMenuData,
  ],
};

export const testCafeData: CafeData = {
  id: 1,
  title: '경상대 카페',
  address: '경상남도 진주시 진주대로 501',
  phoneNumber: '0551234567',
  openTime: {hour: 9, minute: 0},
  closeTime: {hour: 18, minute: 0},
  groups: [testGroupData, testGroupData],
  image: require('../../assets/drawable/cafe.jpg'),
  distance: 500,
};

export const testCafeData2: CafeData = {
  id: 2,
  title: '하상대 카페',
  address: '경상남도 진주시 진주대로 501',
  phoneNumber: '0551234567',
  openTime: {hour: 9, minute: 0},
  closeTime: {hour: 18, minute: 0},
  groups: [testGroupData, testGroupData],
  image: require('../../assets/drawable/cafe.jpg'),
  distance: 750,
};

export const testCafeData3: CafeData = {
  id: 3,
  title: '박상대 카페',
  address: '경상남도 진주시 진주대로 501',
  phoneNumber: '0551234567',
  openTime: {hour: 9, minute: 0},
  closeTime: {hour: 18, minute: 0},
  groups: [testGroupData, testGroupData],
  image: require('../../assets/drawable/cafe.jpg'),
  distance: 1250,
};

export const testBeanData: BeanData = {
  green: {
    origin: 'Brazil',
    year: '2023',
    local: 'Cerrado, Minas Gerais',
    farm: '-',
    variety: 'Catuai, Acaia, Mundo Novo',
    method: 'Natural',
    grade: 'NY2 FC',
    altitude: '900m ~ 1000m',
    water: '11.5%',
    density: '714g/L',
    certification: '-',
  },
  roast: {
    roastery: '경상대 로스터리',
    date: '2023.12.03',
    point: 'City',
    time: '12m 10s',
    temp: '220ºC',
    note: 'Peanut, Cereal, Grain',
    body: 'Medium',
  },
  receipt: {
    method: 'Espresso',
    weight: '12g',
    temp: '92ºC',
    time: '25s',
    grinder: 'EK43',
    grinderStep: '8',
  },
};

export const testCafeListData = [
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData2,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData3,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData,
  testCafeData,
];
