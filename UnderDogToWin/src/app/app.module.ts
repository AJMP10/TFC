import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SesionesComponent } from './Sesiones/Sesiones.component';
import { HomeComponent } from './Home/Home.component';
import { TutorialsComponent } from './Tutorials/Tutorials.component';
import { ContactComponent } from './Contact/Contact.component';
import { AboutMeComponent } from './AboutMe/AboutMe.component';
import { FooterComponent } from './Footer/Footer.component';
import { LegalNoticesComponent } from './legalNotices/legalNotices.component';
import { PrivacyPolicityComponent } from './privacyPolicity/privacyPolicity.component';
import { ErrorComponent } from './Error/Error.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PitchComponent } from './Sesiones/Pitch/Pitch.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {PaginatorModule} from 'primeng/paginator';

// Function to load the JSON files of languages
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sessions', component: SesionesComponent },
  { path: 'tutorials', component: TutorialsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'aboutMe', component: AboutMeComponent },
  { path: 'legalNotices', component: LegalNoticesComponent },
  { path: 'privacyPolicity', component: PrivacyPolicityComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SesionesComponent,
    HomeComponent,
    TutorialsComponent,
    ContactComponent,
    AboutMeComponent,
    FooterComponent,
    LegalNoticesComponent,
    PrivacyPolicityComponent,
    ErrorComponent,
    PitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
    RouterModule.forRoot(appRoutes),
    ScrollPanelModule,
    AccordionModule,
    ColorPickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    DropdownModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    PaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
