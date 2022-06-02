import { Component, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Establecemos el idioma por defecto
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
  }

  // Método para cambiar el idioma
  public selectLanguage(event: any) {
    this.translate.use(event.target.value);
  }

}
