import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchCapital(query: string):Observable<Country[]> {
    query = query.toLocaleLowerCase();
    return this.http
    .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error (`No se pudo obtener paises con ese query: ${query}`))
      })
    );
  }
  searchByCountry(query: string):Observable<Country[]> {
    query = query.toLocaleLowerCase();

    return this.http
    .get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map((resp) =>
        CountryMapper.mapRestCountryArrayToCountryArray(resp)),

      catchError((error) => {
        console.log('Error fetching', error);

        return throwError(
          () => new Error (`No se pudo obtener paises con ese query: ${query}`)
        );
      })
    );
  }
  searchCountryByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
    .pipe(
      map((resp) =>
        CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map(countries => countries.at(0)),


      catchError((error) => {
        console.log('Error fetching', error);

        return throwError(
          () => new Error (`No se pudo obtener paises con ese código: ${code}`)
        );
      })
    );
  }
}
