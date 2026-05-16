# Games Cards — Test Task

Адаптивна сторінка з картками ігор за макетом Figma.
Реалізовано на нативному JavaScript + SCSS, збірка через **Webpack 5**.

## Стек

- **Webpack 5** — бандлер та dev-сервер
- **SCSS** (sass-loader + css-loader + style-loader / MiniCssExtractPlugin)
- **CSS Custom Properties** — для кольорів, розмірів, радіусів
- **Vanilla JavaScript** — без фреймворків та сторонніх UI-бібліотек
- **CopyWebpackPlugin** — копіювання статичних файлів з `public/` (зображень)
- **Rubik** (Google Fonts) — основний шрифт

## Структура

```
src/
  index.html                # HTML-шаблон для HtmlWebpackPlugin
  data/
    games.json              # дані карток (games, sections, modal, winners)
  scripts/
    main.js                 # точка входу (імпортує SCSS та JSON)
    components/
      header.js             # шапка з кнопкою пошуку
      hero.js               # hero-банер (адаптивний <picture>)
      winners.js            # marquee переможців
      section.js            # секція з табами, стрілками, "Show all"
      card.js               # картка гри з hover (Play / Demo)
      modal.js              # модалка пошуку з фільтрацією
  styles/
    main.scss
    abstracts/
      _variables.scss       # CSS Custom Properties + SCSS-брейкпоінти
      _mixins.scss          # mobile / tablet / laptop / desktop, focus-ring
    base/
      _reset.scss
      _layout.scss
    components/
      _header.scss
      _hero.scss
      _winners.scss
      _section.scss
      _card.scss
      _modal.scss
public/
  images/                   # зображення карток, hero, іконки
webpack.config.js
```

## Запуск

```bash
# 1. Встановити залежності
npm install

# 2. Dev-сервер з hot reload
npm run dev

# 3. Прод-збірка → ./dist
npm run build
```

## Реалізовані функції

- Адаптивна верстка: mobile / tablet / laptop / desktop
- Картки з **фіксованим розміром**, що не змінюється залежно від екрана
- На мобільному всі ряди карток — горизонтальний скрол зі scroll-snap
- Hover на картку → кнопки **Play** та **Demo** з затемненням знизу
- Глобальні таби **Recent / Favourite** — клік перемикає одразу всі секції
- Стрілки прокрутки з **disabled-станом** на краях списку
- **"Show all"** — розгортає секцію в адаптивну сітку
- Модалка пошуку з фільтрацією карток по назві в реальному часі
- Закриття модалки по `Esc`, кліку на бекдроп або хрестик
- Marquee для переможців (плавна біжуча стрічка з паузою на hover)
- CSS Custom Properties для всіх повторюваних значень
- Модульна архітектура (окремі JS- та SCSS-компоненти)
- `prefers-reduced-motion` для користувачів зі зниженою анімацією

## Брейкпоінти

| Назва        | Діапазон        |
|--------------|-----------------|
| `mobile`     | `< 768px`       |
| `tablet`     | `768–1023px`    |
| `laptop-sm`  | `1024–1279px`   |
| `laptop`     | `1280–1439px`   |
| `desktop`    | `≥ 1440px`      |
