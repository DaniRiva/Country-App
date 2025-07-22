import { Component, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/country-list/country-list.component";
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-country-pages',
  imports: [ListComponent, SearchInputComponent],
  templateUrl: './by-country-page.component.html',

})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByCountry(params.query)

    },

  });
}
