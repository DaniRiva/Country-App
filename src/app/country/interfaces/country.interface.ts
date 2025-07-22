
export interface Country{

  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  capital: string;
  population: number;

  region: string;
  subRegion: string;
  languages: string;
  area: number;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  currency: string;
  continents: string;
}

