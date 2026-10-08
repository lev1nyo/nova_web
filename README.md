# NovaClean — сайт (Astro)

Статичний двомовний сайт на [Astro](https://astro.build): українська (корінь сайту) та англійська (`/en/`). Перемикач мови — у шапці біля номера телефону.

```bash
npm install
npm run dev       # локальна розробка: http://localhost:4321
npm run build     # production-збірка у dist/
npm run preview   # перегляд збірки
npm run check     # astro check (типи)
```

## Структура
- `src/pages/` — маршрути української версії: `index`, `about`, `products`, `services`, `contact` (URL `/about.html` тощо через `build.format: 'file'`); `src/pages/en/[page].astro` — ті самі сторінки англійською: `/en/`, `/en/about.html` тощо
- `src/views/` — спільна розмітка сторінок (приймає `lang`), `src/i18n/` — тексти: `uk.ts`, `en.ts` (однакова структура, тип `Dict`), `index.ts` — хелпери URL
- `src/layouts/BaseLayout.astro` — `<head>`, SEO (title, description, canonical, Open Graph, JSON-LD), шапка, підвал
- `src/components/` — Header, Footer, Logo, Icon, PageHeader, CtaBand, ProductCard, ProductLine, Steps, Molecule
- `src/data/` — контакти, іконки, імпорти зображень
- `src/styles/global.css` — дизайн-система (див. `DESIGN.novaclean.md`)
- `src/scripts/main.js` — меню, анімація появи, форма контактів
- `src/assets/img/` — зображення (оптимізуються `astro:assets`)
- `public/` — `robots.txt`, `sitemap.xml`, `favicon.svg`

## Примітки
- Форма контактів, як і в оригіналі, імітує відправку на клієнті. Для реальної відправки підключіть обробник (місце позначено в `src/scripts/main.js`).
- Посилання на соцмережі в оригіналі були порожніми (`#`), тому показані як мітки без URL.

## Мови
- Усі тексти (включно з alt, aria-label, SEO-метаданими, вступною заставкою та повідомленнями форми) лежать у `src/i18n/uk.ts` та `src/i18n/en.ts`. Щоб змінити текст — правте обидва файли; TypeScript не дасть розійтися структурі.
- Для SEO на кожній сторінці є `canonical`, `hreflang` (uk/en/x-default); `public/sitemap.xml` містить обидві версії.
- Перемикач (`LangSwitch.astro`) веде на ту саму сторінку іншою мовою; автоперенаправлення за мовою браузера немає.
