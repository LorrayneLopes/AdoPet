import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  private readonly loaderService: LoaderService = inject(LoaderService);

  public isLoading = this.loaderService.isLoading$;
}
