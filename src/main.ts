import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
