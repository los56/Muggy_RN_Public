export type GroupData = {
  id: number;
  title: string;
  description: undefined | string;
  menus: Array<MenuData>;
};

export type MenuData = {
  id: number;
  cafeId: number;
  title: string;
  description: undefined | string;
  price: number;
  image: undefined | any;
  beanId: number;
};

export type CafeData = {
  id: number;
  title: string;
  address: undefined | string;
  openTime: undefined | MgTime;
  closeTime: undefined | MgTime;
  phoneNumber: undefined | string;
  groups: undefined | Array<GroupData>;
  image: undefined | any;
  distance: undefined | number;
};

export type StackParamList = {
  Login: undefined;
  AppLogin: undefined;
  Main: undefined;
  Cafe: {cafeId: number};
  Menu: undefined | {data: MenuData};
  Cart: undefined;
  Bean: undefined;

};

export type MgTime = {
  hour: number;
  minute: number;
};

export type BeanData = {
  green: {
    origin: string;
    year: string;
    local: string;
    farm: string;
    variety: string;
    method: string;
    grade: string;
    altitude: string;
    water: string;
    density: string;
    certification: string;
  };
  roast: {
    roastery: string;
    date: string;
    point: string;
    time: string;
    temp: string;
    note: string;
    body: string;
  };
  receipt: {
    method: string;
    weight: string;
    temp: string;
    time: string;
    grinder: string;
    grinderStep: string;
  };
};
