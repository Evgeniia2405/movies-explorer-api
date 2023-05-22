## movies-explorer-api - бэкенд для приложения "movies-explorer 

### Ссылка на фронтенд приложения "movies-explorer"
- [https://github.com/Evgeniia2405/movies-explorer-frontend/](https://github.com/Evgeniia2405/movies-explorer-frontend/)

### Основные директории:

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
### Роутеры

- POST `/signup` - запрос для регистрации;
- POST `/signin` - запрос для авторизации;
- POST `/signout` - если JWT сохраняется в куках, запрос к роуту удалит JWT из куков пользователя;
- GET `/users/me` - запрос для получения данных текущего пользователя;
- PATCH `/users/me` - запрос обновляет профиль;
- GET `/movies` - запрос для получения всех сохраненных пользователем фильмов;
- POST `/movies` - запрос для сохранения фильма;
- DELETE `/movies/:id` - запрос для удаления фильма по id

## Инструкция по запуску локального серера
- запустите сервер MongoDB (откройте терминал (macOS и Linux) или Git Bash (Windows) и введите команду: mongod)
- клонировать данный репозиторий
- выполнить команду `npm i` для установки зависимостей
- выполнить команду `npm run dev` — сервер запустится на порту 3001 ([фронтенд](https://github.com/Evgeniia2405/movies-explorer-frontend/) будет обращаться к серверу локально по адресу http://localhost:3001)


