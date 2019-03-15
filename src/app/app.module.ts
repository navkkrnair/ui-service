import { BrowserModule } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppService } from './app.service';
import { SearchComponent } from './search/search.component';
import { CheckinComponent } from './checkin/checkin.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'search' },
    { path: 'checkin', component: CheckinComponent },
    { path: 'search', component: SearchComponent }
];

@Injectable()
export class XhrInterceptor implements HttpInterceptor
{

    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        const xhr = req.clone({
            headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
        });
        return next.handle(xhr);
    }
}

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        CheckinComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [AppService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }