export interface GetTabItemsResponse {
  tabs: TabItem[];
}

export interface TabItem extends TabBase {
  cards: CardItem[];
}

export interface TabBase {
  id: string;
  title: string;
}

export interface CardItem {
  id: string;
  title: string;
  layout: Layout;
  items: SmartDevice[];
}

export enum Layout {
  SingleDevice = 'singleDevice',
  HorizontalLayout = 'horizontalLayout',
  VerticalLayout = 'verticalLayout',
}

export type SmartDevice = DeviceItem | SensorItem;

export interface DeviceItem {
  type: SmartDeviceType.Device;
  icon: string;
  label: string;
  state: boolean;
}

export interface SensorItem {
  type: SmartDeviceType.Sensor;
  icon: string;
  label: string;
  value: SensorItemValue;
}

export enum SmartDeviceType {
  Device = 'device',
  Sensor = 'sensor',
}

export interface SensorItemValue {
  amount: number;
  unit: string;
}
