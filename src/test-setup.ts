import 'zone.js';
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());

import { ɵresolveComponentResources } from '@angular/core';

(
    async () => {
        await ɵresolveComponentResources(async (url) => {
           const response = fetch(url);
           return {
            text: async () => (await response).text(),
            status: (await response).status,
           }
        })
    }
)