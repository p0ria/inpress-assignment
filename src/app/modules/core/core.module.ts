import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpClientModule,
} from '@angular/common/http';
import {
    APP_INITIALIZER,
    ErrorHandler,
    NgModule,
    isDevMode,
} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
    TranslateModule,
    TranslateLoader,
    TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppErrorHandler } from './services/app-error-handler';
import { HttpErrorInterceptor } from './services/http-error-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { TOKENS } from 'src/app/common/tokens';
import * as Sentry from '@sentry/angular-ivy';
import { Router } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
        HttpClientModule,
        StoreModule.forRoot(),
        isDevMode ? StoreDevtoolsModule : [],
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        ToastrModule.forRoot(),
    ],
    providers: [
        {
            provide: TOKENS.SENTRY_ERROR_HANDLER,
            useValue: Sentry.createErrorHandler({
                showDialog: false
            }),
        },
        { provide: ErrorHandler, useClass: AppErrorHandler },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
        {
            provide: Sentry.TraceService,
            deps: [Router],
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => { },
            deps: [Sentry.TraceService],
            multi: true,
        },
    ],
})
export class CoreModule {
    constructor(translate: TranslateService) {
        translate.addLangs(['en', 'de']);
        translate.use('en');
    }
}
