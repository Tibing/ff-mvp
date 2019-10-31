import { APP_INITIALIZER, Injectable, Type } from '@angular/core';

import { activateFeatures } from './feature-flag';

export abstract class ActiveFeaturesLoader {
  abstract load(): Promise<string[]>;
}

export function activeFeaturesLoader(loader?: Type<ActiveFeaturesLoader>) {
  const l: Type<ActiveFeaturesLoader> = (loader || LocalStorageFeaturesLoader);
  return [
    { provide: ActiveFeaturesLoader, useClass: l },
    ACTIVE_FEATURES_LOADER,
  ];
}

@Injectable()
class LocalStorageFeaturesLoader extends ActiveFeaturesLoader {
  load(): Promise<string[]> {
    return Promise.resolve(JSON.parse(localStorage.getItem('active-features')));
  }
}

const ACTIVE_FEATURES_LOADER = {
  provide: APP_INITIALIZER,
  deps: [ActiveFeaturesLoader],
  useFactory: activeFeaturesLoaderFactory,
  multi: true,
};

function activeFeaturesLoaderFactory(loader: ActiveFeaturesLoader) {
  return () => loader.load().then((features: string[]) => {
    activateFeatures(features || []);
  });
}
