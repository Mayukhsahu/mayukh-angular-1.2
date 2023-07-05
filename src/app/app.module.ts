import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BenefitsListsComponent } from './benefits-lists/benefits-lists.component';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuoteFormGroupComponent } from './quote-form-group/quote-form-group.component';

@NgModule({
  declarations: [
    AppComponent,
    BenefitsListsComponent,
    LoaderComponent,
    QuoteFormGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
