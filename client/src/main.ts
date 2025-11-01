// @ts-check
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  console.log = () => {};
  console.warn = () => {};
} else {
  console.log("🤔 It's looks like we are in a development mode!");
}

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(`❌ ${err}`));
