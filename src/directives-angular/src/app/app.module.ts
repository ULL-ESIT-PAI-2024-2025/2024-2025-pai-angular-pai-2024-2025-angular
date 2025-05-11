import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DirectivesDemoComponent } from '../components/directives-demo/directives-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectivesDemoComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }