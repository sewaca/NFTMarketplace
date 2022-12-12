# FRONTEND PART

## КАК ЗАПУСТИТЬ ПРОЕКТ:

```
  npm install
  npm start

  (in other tab)
  npm run server
```

### О ПАПКАХ В ПРОЕКТЕ:

- server: тестовый dev server с фейковыми данными
- public: содержит все, что связано с первоначальным html-шаблоном
- src: Папка с исходным кодом приложения
  - API: здесь описаны запросы к бекенду
  - assets: содержит статичные css/js файлы
  - components: здесь содержатся переиспользуемые компоненты
  - contexts: все react context'ы, которые описаны в проекте
  - data: содержит статичные .json файлы (configs, etc)
  - hooks: кастомные рандомные хуки
  - pages: здесь описаны отображаемые страницы

### ЧТО НОВОГО?

- Починил coinGecko (до этого появлялась ошибка 403)
- ID на странице nft и на тестовом сервере исправлены на десятичное число
- Удалил компонент ./src/components/Paper из-за ненадобности
- Исправил отображение заголовка на странице "Мои коллекции". Теперь он как в market
- Вернул реакт 18 :)
- Создал единую точку входа в папке ./src/hooks
- Обновил .gitignore
- Поправил баги в API.ts (+ некоторые PUT на POST)
- Добавлена отправка запроса на бэк когда юзер ставит лайк
- Добавил snackbar для пользователя, если сервер отказывается ставить лайк на nft
- Теперь useApiMutation требует функцию ( ()=>Promise ), а не просто промис
- Начал связывать фронт с контрактами. (см. заметки о папке /src/hooks/smartcontractFunctions)

### ЗАМЕТКИ: (сначала новые)

- Что за папка с функциями смартов в папке hooks?

* Когда мы начали связывать фронт и смарты мы столкнулись с проблемой в useDApp.
  Скорее всего мы что-то делали не так, но до сих пор этого не понимаем.
  В общем, сейчас эта папка появилась, чтобы описывать в ней все функции смартов. Это чем-то похоже на useApiRequest и useApiMutation, только взаимодействуют они не с беком, а с фронтендом.
  Мы написали свои хуки чтобы не тратить много времени на "правильную" реализацию.
  В обозримом будущем мы постараемся избавиться от них и вернуться к функционалу, который предоставляет useDApp.
  Мы не хотим напрямую работать с ethers, поэтому скорее всего, мы перепишем эти хуки и в них будут вызываться хуки из useDApp, а не функции от контракта

- Почему мы переехали с create-react-app на vite?

* Скорость запуска dev-сервера
  Скорость запуска dev-сервера в create-react-app просто ужасна.
  Более-менее серьезный проект он запускает дольше 5 секунд. Наш вообще запускался около 10 секунд.
  Для сравнения, vite запускает его меньше чем за секунду
* Более легкое конфигурирование приложения.
  Больше не надо перекапывать 500 строк webpack конфига только для того, чтобы добавить 1 плагин для css
* Лучшие практики
  create-react-app использует нелучшие практики.
  К примеру, vite использует hmr, а create-create-app рестартит приложение))
  Более подробно читайте в инете
