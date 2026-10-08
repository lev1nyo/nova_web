import { uk, type Dict } from './uk';
import { en } from './en';
import { SITE_URL } from '../data/site';

export type Lang = 'uk' | 'en';
export const LANGS: Lang[] = ['uk', 'en'];

const dicts: Record<Lang, Dict> = { uk, en };
export const getDict = (lang: Lang): Dict => dicts[lang];

/** Абсолютний URL сторінки для мови: укр — корінь сайту, англ — /en/ */
export function pageUrl(lang: Lang, page: string): string {
  const base = lang === 'en' ? `${SITE_URL}/en` : SITE_URL;
  return page === 'index.html' ? `${base}/` : `${base}/${page}`;
}

/** Відносне посилання на ту саму сторінку іншою мовою (працює з відносними href сайту).
 *  Для головної англійської веде на en/index.html, бо dev-сервер Astro не віддає /en/ (лише у збірці). */
export function switchHref(from: Lang, to: Lang, page: string): string {
  if (from === to) return page;
  if (from === 'uk') return `en/${page}`;
  return page === 'index.html' ? '../' : `../${page}`;
}
