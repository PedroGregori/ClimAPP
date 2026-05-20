import * as React from 'react';
import renderer from 'react-test-renderer';

import { WeatherCard } from '../../src/components/WeatherCard';

const mockWeatherData = {
  city: 'São Paulo',
  country: 'BR',
  temp: '23°C',
  description: 'Ensolarado',
  feelsLike: '24°C',
};

test('exibe temperatura numérica', () => {
  const tree = renderer.create(<WeatherCard data={mockWeatherData} />).toJSON();

  expect(tree).not.toBeNull();

  const tempText = tree.children[1].children[0];
  const numericPart = tempText.match(/-?\d+/)?.[0];

  expect(tempText).toBe(mockWeatherData.temp);
  expect(numericPart).toBeDefined();
  expect(Number(numericPart)).not.toBeNaN();
});
