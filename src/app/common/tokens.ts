import { ErrorHandler, InjectionToken } from "@angular/core";

export const TOKENS = {
    SENTRY_ERROR_HANDLER: new InjectionToken<ErrorHandler>('SENTRY_ERROR_HANDLER')
}