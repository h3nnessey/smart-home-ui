import { Layout, SmartDeviceType, type GetTabItemsResponse } from '@/types';

export const MOCK_DATA: GetTabItemsResponse = {
  tabs: [
    {
      id: 'overview',
      title: 'Overview',
      cards: [
        {
          id: 'balcony-weather',
          title: 'Balcony',
          layout: Layout.HorizontalLayout,
          items: [
            {
              type: SmartDeviceType.Sensor,
              icon: 'thermostat',
              label: 'Temperature',
              value: {
                amount: 18.5,
                unit: '\u00B0C',
              },
            },
            {
              type: SmartDeviceType.Sensor,
              icon: 'water_drop',
              label: 'Humidity',
              value: {
                amount: 72,
                unit: '%',
              },
            },
            {
              type: SmartDeviceType.Sensor,
              icon: 'cloud',
              label: 'Weather',
              value: {
                amount: 1,
                unit: 'clear',
              },
            },
          ],
        },
        {
          id: 'indoor-rooms',
          title: 'Rooms',
          layout: Layout.VerticalLayout,
          items: [
            {
              type: SmartDeviceType.Sensor,
              icon: 'co2',
              label: 'CO2 Sensor',
              value: {
                amount: 520,
                unit: 'ppm',
              },
            },
            {
              type: SmartDeviceType.Sensor,
              icon: 'water_drop',
              label: 'Humidity',
              value: {
                amount: 45,
                unit: '%',
              },
            },
          ],
        },
        {
          id: 'bathroom-motion',
          title: 'Bathroom',
          layout: Layout.SingleDevice,
          items: [
            {
              type: SmartDeviceType.Sensor,
              icon: 'motion_photos_on',
              label: 'Motion Sensor',
              value: {
                amount: 1,
                unit: 'detected',
              },
            },
          ],
        },
        {
          id: 'living-room-mixed',
          title: 'Living Room',
          layout: Layout.VerticalLayout,
          items: [
            {
              type: SmartDeviceType.Device,
              icon: 'lightbulb',
              label: 'Floor Lamp',
              state: true,
            },
            {
              type: SmartDeviceType.Device,
              icon: 'power',
              label: 'TV Socket',
              state: false,
            },
            {
              type: SmartDeviceType.Sensor,
              icon: 'thermostat',
              label: 'Temperature',
              value: {
                amount: 23.5,
                unit: '\u00B0C',
              },
            },
            {
              type: SmartDeviceType.Sensor,
              icon: 'co2',
              label: 'CO2 Sensor',
              value: {
                amount: 610,
                unit: 'ppm',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'lights',
      title: 'Lights',
      cards: [
        {
          id: 'kitchen-light',
          title: 'Kitchen',
          layout: Layout.SingleDevice,
          items: [
            {
              type: SmartDeviceType.Device,
              icon: 'lightbulb',
              label: 'Ceiling Light',
              state: true,
            },
          ],
        },
        {
          id: 'corridor-light',
          title: 'Corridor',
          layout: Layout.SingleDevice,
          items: [
            {
              type: SmartDeviceType.Device,
              icon: 'lightbulb',
              label: 'Ceiling Light',
              state: false,
            },
          ],
        },
        {
          id: 'living-room-light',
          title: 'Living Room',
          layout: Layout.SingleDevice,
          items: [
            {
              type: SmartDeviceType.Device,
              icon: 'lightbulb',
              label: 'Chandelier',
              state: true,
            },
          ],
        },
        {
          id: 'bedroom-light',
          title: 'Bedroom',
          layout: Layout.SingleDevice,
          items: [
            {
              type: SmartDeviceType.Device,
              icon: 'lightbulb',
              label: 'Main Light',
              state: true,
            },
          ],
        },
        {
          id: 'bathroom-light',
          title: 'Bathroom',
          layout: Layout.SingleDevice,
          items: [
            {
              type: SmartDeviceType.Device,
              icon: 'lightbulb',
              label: 'Ceiling Light',
              state: false,
            },
          ],
        },
      ],
    },
  ],
};
