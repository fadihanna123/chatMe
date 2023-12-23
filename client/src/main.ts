// @ts-check
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  console.log = () => {};
  console.warn = () => {};
} else {
  console.log("🤔 It's looks like we are in a development mode!");
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(`❌ ${err}`));
