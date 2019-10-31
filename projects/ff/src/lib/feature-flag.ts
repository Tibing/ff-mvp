import { Type } from '@angular/core';

const rawSubstitutions: Map<string, [Type<any>, Type<any>][]> = new Map();
const substitutions: Map<Type<any>, Type<any>> = new Map();
type NgDef = 'ngComponentDef' | 'ngInjectableDef';

export function activateFeatures(features: string[]) {
  recalculateSubstitutions(features);
}

export function flag(feature: string, sub: [any, any][]) {
  rawSubstitutions.set(feature, sub);
}

export const Substitutable = (cmpType) => {
  const ngDef: NgDef = findNgDef(cmpType);
  return makeSubstitutable(cmpType, ngDef);
};

function recalculateSubstitutions(features: string[]) {
  for (const [feature, substitution] of rawSubstitutions.entries()) {
    if (features.includes(feature)) {
      for (const [a, b] of substitution) {
        substitutions.set(a, b);
      }
    }
  }
}

function findNgDef(cmpType: any): NgDef {
  if (cmpType.ngComponentDef) {
    return 'ngComponentDef';
  } else if (cmpType.ngInjectableDef) {
    return 'ngInjectableDef';
  }

  throw new Error('ERROR');
}

// Might be slow because of proxies and searching for the substitution per each operation
function makeSubstitutable(cmpType: any, ngDef: NgDef) {
  const def = cmpType[ngDef];

  Object.defineProperty(cmpType, ngDef, {
    get(): any {
      const substitution = substitutions.get(cmpType);

      if (substitution) {
        return substitution[ngDef];
      } else {
        return def;
      }
    },
  });

  return cmpType;
}
