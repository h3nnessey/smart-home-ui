export const DEFAULT_DASHBOARD_CONTENT: DashboardContent = {
  tabs: [],
};

export enum Layout {
  SingleDevice = 'singleDevice',
  HorizontalLayout = 'horizontalLayout',
  VerticalLayout = 'verticalLayout',
}

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
  type: 'device';
  icon: string;
  label: string;
  state: boolean;
}

export interface SensorItem {
  type: 'sensor';
  icon: string;
  label: string;
  value: SensorItemValue;
}

export interface SensorItemValue {
  amount: number;
  unit: string;
}

export type SmartDevice = DeviceItem | SensorItem;
