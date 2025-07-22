import {  Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { ListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import{rxResource} from '@angular/core/rxjs-interop';
import { of } from 'rxjs';



@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',

})

export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

 

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchCapital(params.query)

    },

  });
}

//Asi funciona con promesas
// export class ByCapitalPageComponent {
//   countryService = inject(CountryService);
//   query = signal('');

//   countryResource = resource({
//     params: () => ({ query: this.query() }),
//     loader: async({ params }) => {
//       if (!params.query) return[];

//       return await firstValueFrom(
//         this.countryService.searchCapital(params.query)
//       )
//     }

//   })

//   // isLoading = signal(false)
//   // isError = signal<string|null>(null)
//   // countries = signal<Country[]>([])

//   // onSearch(query: string){
//   //   if(!query.trim() || this.isLoading()) return;

//   //   this.isLoading.set(true)
//   //   this.isError.set(null);


//   //   this.countryService.searchCapital(query)
//   //   .subscribe({ next: (countries) => {
//   //     this.isLoading.set(false);
//   //     this.countries.set(countries);
//   //   },
//   //   error: (err) => {
//   //     this.isLoading.set(false);
//   //     this.countries.set([]);
//   //     this.isError.set(err);

//   //   }

//   //   });

//   // }
// }

