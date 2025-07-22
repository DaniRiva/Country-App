import { Country } from '../interfaces/country.interface';

import { RESTCountry } from '../interfaces/rest-countries.interfaces';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      capital: restCountry.capital?.join(', ') ?? 'N/A',
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      population: restCountry.population,

      region: restCountry.region,
      subRegion: restCountry.subregion,
      languages: Object.values(restCountry.languages ?? {}).join(', ') || 'N/A',
      area: restCountry.area,
      continents: restCountry.continents[0] ?? 'N/A',
      maps: {
        googleMaps: restCountry.maps.googleMaps,
        openStreetMaps: restCountry.maps.openStreetMaps,
      },

      currency:
        Object.values(restCountry.currencies ?? {})
          .map((c) => `${c.name} (${c.symbol})`)
          .join(', ') || 'N/A',
    };
  }

  static mapRestCountryArrayToCountryArray(
    restCountry: RESTCountry[]
  ): Country[] {
    return restCountry.map(this.mapRestCountryToCountry);
  }
}
