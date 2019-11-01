import { Type } from '@angular/core';

const rawSubstitutions: Map<string, [Type<any>, Type<any>][]> = new Map();
const substitutions: Map<Type<any>, Type<any>> = new Map();
type NgDef = 'ngComponentDef' | 'ngInjectableDef' | 'ngDirectiveDef' | 'ngPipeDef';

export function activateFeatures(features: string[]) {
  recalculateSubstitutions(features);
}

export function flag(feature: string, sub: [any, any][]) {
  rawSubstitutions.set(feature, sub);
}

export const Substitutable = (cmpType) => {
  const ngDefs: NgDef[] = findNgDefs(cmpType);
  return makeSubstitutable(cmpType, ngDefs);
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

function findNgDefs(cmpType: any): NgDef[] {
  const defs: NgDef[] = [];

  if (cmpType.ngComponentDef) {
    defs.push('ngComponentDef');
  }

  if (cmpType.ngInjectableDef) {
    defs.push('ngInjectableDef');
  }

  if (cmpType.ngDirectiveDef) {
    defs.push('ngDirectiveDef');
  }

  if (cmpType.ngPipeDef) {
    defs.push('ngPipeDef');
  }

  if (!defs.length) {
    throw new Error(`No def in provided type: ${cmpType}`);
  }

  return defs;
}

// Might be slow because of proxies and searching for the substitution per each operation
function makeSubstitutable(cmpType: any, ngDefs: NgDef[]) {
  for (const ngDef of ngDefs) {
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
  }

  return cmpType;
}
