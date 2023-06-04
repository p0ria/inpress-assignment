import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TOKENS } from 'src/app/common/tokens';
import { hasTranslation } from 'src/app/common/utils/app-utils';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
    get translate(): TranslateService {
        return this.injector.get(TranslateService);
    }

    get toastr(): ToastrService {
        return this.injector.get(ToastrService);
    }

    get sentry(): ErrorHandler {
        return this.injector.get(TOKENS.SENTRY_ERROR_HANDLER);
    }

    constructor(private injector: Injector) {
        super();
    }

    override handleError(error: HttpErrorResponse): void {
        const message = this.getMessage(error);
        this.toastr.error(message);
        this.sentry.handleError(error);
        super.handleError(error);
    }

    getMessage(error: HttpErrorResponse): string {
        const errorKey = `errors.${error.status}`;
        if (hasTranslation(this.translate, errorKey))
            return this.translate.instant(errorKey);
        const message = error.message;
        if (error.message) return message;
        return this.translate.instant('errors.unknown');
    }
}
