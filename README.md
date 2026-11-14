# psyteeth.ru — статическая версия сайта (перенос с Тильды)

Чистый HTML/CSS/JS, без сборки. Хостинг — GitHub Pages.

## Структура

```
index.html                 главная
io/index.html              лендинг «Исцеление отношений» (psyteeth.ru/io)
tpost/<slug>/index.html    11 статей блога — URL те же, что были на Тильде
assets/css/style.css       все стили
assets/js/main.js          меню, слайдер блога, увеличение фото в статьях
assets/img/                все картинки (скачаны с tildacdn, больше от Тильды не зависят)
404.html                   + редирект старых ссылок /tpost/<uid>… на статью
CNAME, robots.txt, sitemap.xml, .nojekyll
```

## Как добавить статью

1. Скопировать любую папку из `tpost/` под новым именем, поправить `<title>`, мета-теги, заголовок, дату и текст в `.post__body`.
2. Фото положить в `assets/img/`, вставлять так: `<figure><img src="/assets/img/имя.jpg" alt="..." loading="lazy"></figure>`.
3. Добавить карточку `<a class="card">…</a>` в блок `#blog` на `index.html` и строку в `sitemap.xml`.

## Деплой на GitHub Pages

1. Создать репозиторий (например `psyteeth/psyteeth.github.io` — тогда существующий `psyteeth.github.io/schedule` автоматически станет `psyteeth.ru/schedule`).
2. Залить содержимое этой папки в корень репозитория, ветка `main`.
3. Settings → Pages → Source: *Deploy from a branch*, `main` / `root`.
4. Settings → Pages → Custom domain: `psyteeth.ru` (файл `CNAME` уже есть).
5. DNS у регистратора домена:
   - `A` для `psyteeth.ru` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` для `www` → `psyteeth.github.io`
   - удалить старые записи, указывающие на Тильду.
6. После того как домен проверится — включить *Enforce HTTPS*.
7. Только после этого отключать сайт на Тильде.

Локальный просмотр: `python3 -m http.server 8935` в этой папке → http://localhost:8935
