import type {Asset} from './types.ts';
import {
  scriptAssetPreloadAttributes,
  styleAssetPreloadAttributes,
} from './attributes.ts';

export function preloadScriptAssetHeader(asset: Asset) {
  return preloadHeader(scriptAssetPreloadAttributes(asset));
}

export function preloadStyleAssetHeader(asset: Asset) {
  return preloadHeader(styleAssetPreloadAttributes(asset));
}

export function preloadHeader(attributes: Partial<HTMLLinkElement>) {
  const {
    as,
    rel = 'preload',
    href,
    crossOrigin,
    crossorigin,
  } = attributes as any;

  // Support both property and attribute versions of the casing
  const finalCrossOrigin = crossOrigin ?? crossorigin;

  let header = `<${href}>; rel="${rel}"; as="${as}"`;

  if (finalCrossOrigin === '' || finalCrossOrigin === true) {
    header += `; crossorigin`;
  } else if (typeof finalCrossOrigin === 'string') {
    header += `; crossorigin="${finalCrossOrigin}"`;
  }

  return header;
}
