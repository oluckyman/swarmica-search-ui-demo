## Setup and Running

`pnpm i && pnpm dev`

# Test assignment for Swarmica

На React + Typescript + vite написать веб-приложение, которое будет выполнять поиск статей базы знаний с фильтрацией по разделу БЗ / локали, отображать результаты поиска и сохранять просмотренные результаты в localStorage.

Результат считается просмотренным, если пользователь кликнул на него.

В выдаче результатов подсвечивать ранее просмотренные статьи каким-то образом (иконка/другой стиль).

API для поиска:
https://support.swarmica.com/api/schema/doc/#get-/api/search/articles/

API для получения списка категорий:
https://support.swarmica.com/api/schema/doc/#get-/api/categories/

Доступные локали для поиска можно взять из вызова https://support.swarmica.com/api/schema/doc/#get-/api/instance/ параметр locales

Результатом выполнения должен быть код проекта, размещенный либо на github / gitlab / bitbucket доступный для скачивания через git clone по прямой ссылке + инструкции по запуску в README.md
