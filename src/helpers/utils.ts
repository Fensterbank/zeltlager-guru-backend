import * as config from 'config';
import * as opencage from 'opencage-api-client';

export interface Coordinates {
  lat: number;
  lng: number;
}

export const getCoordinatesByAddress = (address: string, zip: string, city: string): Promise<Coordinates> => {
  const secretsConfig = config.get('secrets');
  return opencage.geocode({
    q: `${address}, ${zip} ${city}`,
    key: secretsConfig.opencage_key,
  })
  .then((response: any) => {
    if (response.results.length > 0) {
      return response.results[0].geometry;
    } else {
      return null;
    }
  });
};
