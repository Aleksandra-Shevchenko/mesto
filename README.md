# Проектные работы №4-9: Место

## Описание проекта:
данный проект представляет собой интерактивную страницу. В этот сервис можно добавлять фотографии интересных мест, удалять их и ставить лайки.
Это моя первая проектная работа, где впервые самостоятельно написан скрипт на JS по результатам нового обучающего блока в Яндекс.Практикум.

### Использованные инструменты:
* написан и подключен скрипт JS,
* создано всплывающее окно, открытие/закрытие реализовано по нажатию на кнопки,
* при открытии окна, информация из профиля пользователя загружается в соответствующие поля,
* при нажатии кнопки окна «Сохранить» - изменяется информация о пользователе на странице,
* сайт адаптирован,
* использованы media queries для задания правил для разных размеров экранов,
* флексбокс,
* сетка с фото построена при помощи Grid Layout,
* относительные размеры блоков/элементов,
* продвинутая семантика языка HTML,
* позиционирование,
* методология БЭМ в наименовании классов и в организации файловой структуры Nested,
* подключены шрифты и их сглаживание,
* изображения оптимизированы,
* сайт сверстан по макету из Figma.

### Проект доработан по итогам пятого спринта:
* при загрузке страницы JavaScript  добавляет 6 карточек,
* реализована форма для создания и добавления карточек от пользователя,
* карточкам можно ставить/убирать лайки,
* пользователь может удалять карточки,
* реализован режим просмотра фото в отдельном всплывающем окне,
* все попапы плавно открываются и закрываются.

### Проект доработан по итогам шестого спринта:
* добавлен скрипт для валидации всех форм,
* реализовано закрытие попапа кликом на оверлей и нажатием на Esc,
* выполнен рефакторинг функции создания карточки - вынесены все слушатели.

### Рефакторинг по итогам седьмого спринта:
* созданы классы Card и FormValidator.

### Рефакторинг по итогам восьмого спринта:
* созданы классы Section, Popup, PopupWithForm, PopupWithImage и UserInfo,
* создана новая структура файлов в проекте,
* настроен Вебпак и проект собран им.

### Проект доработан по итогам девятого спринта:
* проект подключен к серверу - создан новый класс Api,
* с сервера подгружается информация: о пользователе и массив карточек с фото,
* доработан функционал редактирвоания профиля, загрузки/удаления карточки с привязкой к серверу,
* добавлено отображение количества лайков карточки,
* постановка и снятие лайка, также происходит через запросы к серверу,
* скрыта возможность удаления чужих карточек,
* добавлена возможность смены аватара пользователя,
* улучшен UX всех форм - имеется уведомление пользователя о процессе сохранения.

**Figma:** [Ссылка на макет в Figma](https://www.figma.com/file/StZjf8HnoeLdiXS7dYrLAh/JavaScript.-Sprint-4)

**Итоговый вид страницы:** [Ссылка на страницу проекта](https://aleksandra-shevchenko.github.io/mesto/index.html)
