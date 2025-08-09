import type { Layout, SmartDeviceType } from './enums';
import type { SmartDevice } from './types';

export interface DashboardContent {
  tabs: TabItem[];
}

export interface DashboardItem {
  id: string;
  title: string;
  icon: string;
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

export interface SensorItemValue {
  amount: number;
  unit: string;
}
