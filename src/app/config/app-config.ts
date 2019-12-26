import { InjectionToken } from '@angular/core';
export let APP_CONFIG = new InjectionToken<AppConfig>('appconfig');
export interface AppConfig {
    application: string;
    applicationrole: string;
}
export const AppConfig: AppConfig = {
  application: '/application/',
  applicationrole: '/application/role/'
};
