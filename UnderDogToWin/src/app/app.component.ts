import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(private translate:TranslateService){
   this.translate.setDefaultLang('es');
  }

  public selectLanguage(event:any){
    this.translate.use(event.target.value);
  }

}
