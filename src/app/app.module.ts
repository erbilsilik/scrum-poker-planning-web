import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddStoryListComponent } from './add-story-list/add-story-list.component';
import { ViewStoryComponent } from './view-story/view-story.component';
import { SessionResolver } from './resolvers/session.resolver';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionInterceptor } from './services/session.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddStoryListComponent,
    ViewStoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptor,
      multi: true
    },
    SessionResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
