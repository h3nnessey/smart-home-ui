export interface GetTabItemsResponse {
  tabs: TabItem[];
}

export interface TabItem {
  id: string;
  title: string;
  cards: CardItem[];
}

export interface CardItem {
  id: string;
  title: string;
  layout: Layout;
  items: SmartDevice[];
}

export type Layout = 'singleDevice' | 'horizontalLayout' | 'verticalLayout';

export type SmartDevice = DeviceItem | SensorItem;

export interface DeviceItem {
  type: 'device';
  icon: string;
  label: string;
  state: boolean;
}

export interface SensorItemValue {
  amount: number;
  unit: string;
}

export interface SensorItem {
  type: 'sensor';
  icon: string;
  label: string;
  value: SensorItemValue;
}
