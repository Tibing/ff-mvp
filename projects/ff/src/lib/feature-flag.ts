const substitutions: Map<string, Map<any, any>> = new Map();
const activeFeatures = [];
type NgDef = 'ngComponentDef' | 'ngInjectableDef';

export function activateFeature(feature: string) {
  activeFeatures.push(feature);
}

export function activateFeatures(features: string[]) {
  activeFeatures.push(...features);
}

export function flag(feature: string, sub: [any, any][]) {
  substitutions.set(feature, new Map(sub));
}

export const Substitutable = (cmpType) => {
  const ngDef: NgDef = findNgDef(cmpType);
  return makeSubstitutable(cmpType, ngDef);
};

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
  cmpType[ngDef] = new Proxy(def, {
    get(target: any, prop: string | number | symbol): any {
      const substitution = findSubstitution(cmpType);

      if (substitution) {
        return substitution[ngDef][prop];
      } else {
        return target[prop];
      }
    },
  });

  return cmpType;
}

function findSubstitution(x: any): any {
  for (const [feature, sub] of substitutions.entries()) {
    if (activeFeatures.includes(feature) && sub.has(x)) {
      return sub.get(x);
    }
  }
}
