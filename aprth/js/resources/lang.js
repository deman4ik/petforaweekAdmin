/*
	Ресурсы для локализации приложения (в литералах поддерживаются макроподстановки %1$s - первая, %2$s - вторая и т.д.)
*/
var langs = [
	//язык по умолчанию
	{
		//код языка
		lang: "DEFAULT",
		display: false,
		//формат даты по умолчанию
		DATE_FORMAT: "dd.mm.yyyy",
		//общая ошибка
		UNDEFINED_RESOURCE: "Undefined message!",
		//ресурсы для клиентских сообщений об ошибках и информации
		CLNT_NO_LANGUAGE: "No language selected!",
		CLNT_NO_OBJECT: "No object passed!"
	},
	//русский
	{
		//код языка
		lang: "RU",
		display: true,
		//общая ошибка
		UNDEFINED_RESOURCE: "Неопределенное сообщение!",
		//ресурсы для пользовательского интерфейса
		UI_COPYRIGHT: "Copyright © 2015",
		UI_UNIT_UNDER_CONSTRUCTION: "Раздел в разработке",
		UI_UNIT_NOT_FOUND: "Раздел не найден",
		UI_NO_DATA: "Нет данных для отображения",
		UI_MENU_AUTH_LOGIN: "Войти",
		UI_MENU_AUTH_LOGOUT: "Выйти",
		UI_MAIN_MENU_ARTS_EDITOR: "Редактор статей",
		UI_MAIN_MENU_MAIL_LIST: "Список рассылки",
		UI_BTN_OK: "ОК",
		UI_BTN_CHANCEL: "Отмена",
		UI_BTN_LOGIN: "Войти",
		UI_BTN_INSERT: "Добавить",
		UI_BTN_UPDATE: "Исправить",
		UI_BTN_DELETE: "Удалить",
		UI_TITLE_APP: "Petforaweek",
		UI_TITLE_LOGIN: "Вход",
		UI_TITLE_INSERT: "Добавить статью",
		UI_TITLE_UPDATE: "Исправить статью",
		UI_FLD_USER: "Пользователь",		
		UI_FLD_PASS: "Пароль",
		UI_FLD_LANG: "Язык",
		UI_FLD_TYPE: "Тип",
		UI_FLD_CODE: "Код",
		UI_FLD_TITLE: "Заголовок",
		UI_FLD_TEXT: "Текст",
		UI_FLD_MAIL_LIST_ALL_USERS: "Все пользователи",
		UI_FLD_MAIL_LIST_NEWS_USERS: "Подписанты новостей",
		UI_FLD_MAIL_LIST_NOTIFY_USERS: "Подписанты оповещений",
		UI_FLD_LIST: "Список (нажмите на имя списка для экспорта в CSV)",
		UI_FLD_E_MAIL: "E-Mail",
		UI_FLD_NAME: "Имя",
		UI_FLD_FORMATED_ADDRESS: "Отформатированный адрес",
		UI_PLH_USER: "Имя пользователя (e-mail)",
		UI_PLH_PASS: "Пароль пользователя",
		UI_LBL_MAIN_MAKE_ACTION: "Интерфейс администрирования",
		//ресурсы для серверных сообщений об ошибках и информации
		SRV_EXCEPTION: "Ошибка сервера!",
		SRV_COMMON_ERROR: "Ошибка сервера!",
		SRV_UNAUTH: "Требуется аутентификация!",
		SRV_LOGIN_INVALID_EMAIL: "Некорректно указано имя пользователя!",
		SRV_LOGIN_INVALID_PASS: "Некорректно указан пароль!",
		SRV_APARTMENT_REQUIRED: "Незаполнено обязательное поле \"%1$s\"!",
		SRV_APARTMENT_DEPENDENCY: "У данного объекта есть зависимости!",
		SRV_APARTMENT_WRONG_GEO: "Для указанного адреса не определены координаты! Попробуйте выбрать точку на карте!",
		SRV_CARD_EXISTS: "У Вас уже есть объявление!",
		SRV_RESERVATION_EXISTS: "Вы уже отправили запрос на указанные даты!",
		SRV_RESERVATION_SELF: "Вы не можете бронировать свое объявление!",
		SRV_CARD_WRONG_DATE: "Некорректно указаны даты! Проверьте границы диапазона!",
		SRV_RESERVATION_UNAVAILABLE_DATE: "Некорректно указаны даты! Объект недоступен в указанное время!",
		SRV_CARD_INVALID_FILTER: "Не заданы параметры отбора карточек объявлений!",
		SRV_REG_INVALID_EMAIL: "Некорретный e-mail!",
		SRV_REG_INVALID_PASSWORD: "Некорректный пароль (должен быть 8 и более символов)!",
		SRV_REG_EXISTS_EMAIL: "Такой e-mail уже зарегистрирован!",
		SRV_USER_BLOCKED: "Пользователь заблокирован!",
		SRV_USER_NOTFOUND: "Пользователь не найден!",
		SRV_USER_CONFIRMED: "Ваш e-mail уже подтвержден!",
		SRV_USER_WRONG_CODE: "Некорректный код подтверждения!",
		SRV_USER_REQUIRED: "Незаполнено обязательное поле \"%1$s\"",
		SRV_USER_NO_NAME: "Не задано имя пользователя! Установите имя и фамилию пользователя в профиле!",
		SRV_USER_NOT_CONFIRMED: "Учетная запись не подтверждена!",
		SRV_REVIEW_WRONG_DATE: "Пока нельзя добавить отзыв...",
		SRV_CARD_REQUIRED: "Не заполнено обязательное поле карточки \"%1$s\"",
		SRV_FAVORITE_WRONG_USER: "Вы не можете добавить свое объявление в избранное!",
		SRV_PROFILE_WRONG_PHONE: "Телефон указан не корректно!",
		SRV_PROFILE_ERR_UPDATE_PHONE: "У вас уже есть объявление - изменение подтвержденного телефона невозможно (сначала удалите объявление)!",
		SRV_CARD_PHONE_UNCONF: "Вы не можете добавить объявление пока не подтвердили свой телефон!",
		SRV_USER_PHONE_CONFIRM_REQUESTED: "Вы уже запрашивали подтверждение - ожидайте SMS!",
		FirstName: "Имя",
		LastName: "Фамилия",
		Gender: "Пол",
		Phone: "Телефон",		
		code: "Код",
		password: "Пароль",
		//ресурсы для клиентских сообщений об ошибках и информации
		CLNT_COMMON_ERROR: "Ошибка",
		CLNT_COMMON_SUCCESS: "Успех",
		CLNT_COMMON_DONE: "Операция успешно выполнена",
		CLNT_COMMON_PROGRESS: "Загрузка данных...",
		CLNT_COMMON_CONFIRM: "Подтвердите действие",
		CLNT_COMMON_CONFIRM_REMOVE: "Действительно хотите удалить это?",
		CLNT_NO_LANGUAGE: "Не указан язык!",
		CLNT_NO_OBJECT: "Не указан объект!",
		CLNT_NO_ID: "Не указан идентификатор",
		CLNT_BAD_OBJECT: "Объект \"%1$s\" имеет некорректную структуру!",
		CLNT_NO_ELEM: "Не указан структурный элемент \"%2$s\" объекта \"%1$s\"!",
		CLNT_BAD_ELEM: "Структурный элемент \"%2$s\" объекта \"%1$s\" указан некорректно!",
		CLNT_FORM_BAD_META: "Метаданные формы не прошли валидацию!",
		CLNT_FORM_ITEM_BAD_META: "Метаданные элемента формы не прошли валидацию!",
		CLNT_AUTH_NO_USER_NAME: "Не указано имя пользователя (e-mail)!",
		CLNT_AUTH_NO_PASSWORD: "Не указан пароль!",
		CLNT_META_NO_OBJ_TYPE: "Не указан тип объекта!",
		CLNT_WS_NO_CALL_BACK: "Ошибка исполнения запроса к серверу: не указана CallBack функция!",
		CLNT_WS_NO_QUERY: "Ошибка исполнения запроса к серверу: не указан запрос!",
		CLNT_LOGIN_ERR: "Ошибка входа в систему",
		CLNT_LOGIN_PROCESS: "Вход в систему...",
		CLNT_NO_MODE: "Не указан режим работы компонента!"		
	},
	//английский
	{
		//код языка
		lang: "EN",
		display: true,
		//общая ошибка
		UNDEFINED_RESOURCE: "Undefined message!",
		//ресурсы для пользовательского интерфейса
		UI_COPYRIGHT: "Copyright © 2015",
		UI_UNIT_UNDER_CONSTRUCTION: "Unit is under construction",
		UI_UNIT_NOT_FOUND: "Unit not found",
		UI_NO_DATA: "No data to display",
		UI_MENU_AUTH_LOGIN: "Login",
		UI_MENU_AUTH_LOGOUT: "Logout",
		UI_MAIN_MENU_ARTS_EDITOR: "Articles editor",
		UI_MAIN_MENU_MAIL_LIST: "Mail list",
		UI_BTN_OK: "OK",
		UI_BTN_CHANCEL: "Cancel",
		UI_BTN_LOGIN: "Login",
		UI_BTN_INSERT: "Insert",
		UI_BTN_UPDATE: "Update",
		UI_BTN_DELETE: "Delete",
		UI_TITLE_APP: "Petforaweek",
		UI_TITLE_LOGIN: "Login",
		UI_TITLE_INSERT: "Insert article",
		UI_TITLE_UPDATE: "Update article",
		UI_FLD_USER: "User",
		UI_FLD_PASS: "Password",
		UI_FLD_LANG: "Language",
		UI_FLD_TYPE: "Type",
		UI_FLD_CODE: "Code",
		UI_FLD_TITLE: "Title",
		UI_FLD_TEXT: "Text",
		UI_FLD_MAIL_LIST_ALL_USERS: "All users",
		UI_FLD_MAIL_LIST_NEWS_USERS: "News subscribers",
		UI_FLD_MAIL_LIST_NOTIFY_USERS: "Notify subscribers",
		UI_FLD_LIST: "List (click list name for CSV export)",
		UI_FLD_E_MAIL: "E-Mail",
		UI_FLD_NAME: "Name",
		UI_FLD_FORMATED_ADDRESS: "Formated address",
		UI_PLH_USER: "User name",		
		UI_PLH_PASS: "User password",
		UI_LBL_MAIN_MAKE_ACTION: "Administration console",
		//ресурсы для серверных сообщений об ошибках и информации
		SRV_EXCEPTION: "Server error!",
		SRV_COMMON_ERROR: "Server error!",
		SRV_UNAUTH: "Authorization has been denied for this request!",
		SRV_LOGIN_INVALID_EMAIL: "Invalid user name!",
		SRV_LOGIN_INVALID_PASS: "Invalid password!",
		SRV_APARTMENT_REQUIRED: "Field \"%1$s\" required!",
		SRV_APARTMENT_DEPENDENCY: "Object have dependencies!",
		SRV_APARTMENT_WRONG_GEO: "No coordinates for address! Try pick it on map!",
		SRV_CARD_EXISTS: "Your advert card already exists!",
		SRV_RESERVATION_EXISTS: "Reservation already exists!",
		SRV_RESERVATION_SELF: "You can't reserve your own ad!",
		SRV_CARD_WRONG_DATE: "Bad dates! Check interval limits!",
		SRV_RESERVATION_UNAVAILABLE_DATE: "Bad dates! Apartment not available!",
		SRV_CARD_INVALID_FILTER: "No cards filter specified!",
		SRV_REG_INVALID_EMAIL: "Bad e-mail!",
		SRV_REG_INVALID_PASSWORD: "Bad password (should be more then 8 chars)!",
		SRV_REG_EXISTS_EMAIL: "This e-mail already registered!",
		SRV_USER_BLOCKED: "User blocked!",
		SRV_USER_NOTFOUND: "User not found!",
		SRV_USER_CONFIRMED: "This e-mail already confirmed!",
		SRV_USER_WRONG_CODE: "Bad confirm code!",
		SRV_USER_REQUIRED: "Field \"%1$s\" required!",
		SRV_USER_NO_NAME: "User have no name! Set user's first and last name in profile",
		SRV_USER_NOT_CONFIRMED: "Account is not confirmed!",
		SRV_REVIEW_WRONG_DATE: "Can not make review yet...",
		SRV_CARD_REQUIRED: "Card field \"%1$s\" required!",
		SRV_FAVORITE_WRONG_USER: "You can't favorite your own ad!",
		SRV_PROFILE_WRONG_PHONE: "Phone number is incorrect!",
		SRV_PROFILE_ERR_UPDATE_PHONE: "Can't update confirmed phone - you have advert card (remove it first)!",
		SRV_CARD_PHONE_UNCONF: "You can't add card - confirm your phone first!",
		SRV_USER_PHONE_CONFIRM_REQUESTED: "You are already send confirmation request. Wait for SMS please!",
		FirstName: "First name",
		LastName: "Last name",
		Gender: "Gender",
		Phone: "Phone",
		code: "Code",
		password: "Password",
		//ресурсы для клиентских сообщений об ошибках и информации
		CLNT_COMMON_ERROR: "Error",
		CLNT_COMMON_SUCCESS: "Success",
		CLNT_COMMON_DONE: "Operation completed successfully",
		CLNT_COMMON_PROGRESS: "Loading...",
		CLNT_COMMON_CONFIRM: "Confirm action",
		CLNT_COMMON_CONFIRM_REMOVE: "Realy want to delete this?",
		CLNT_NO_LANGUAGE: "No language selected!",
		CLNT_NO_OBJECT: "No object passed!",
		CLNT_NO_ID: "No ID passed!",
		CLNT_BAD_OBJECT: "Object \"%1$s\" have no valid structure!",
		CLNT_NO_ELEM: "Element \"%2$s\" of object \"%1$s\" do not exists!",
		CLNT_BAD_ELEM: "Element \"%2$s\" of object \"%1$s\" is invalid!",
		CLNT_FORM_BAD_META: "Bad form defenition!",
		CLNT_FORM_ITEM_BAD_META: "Bad form item defenition!",
		CLNT_AUTH_NO_USER_NAME: "No username (e-mail)!",
		CLNT_AUTH_NO_PASSWORD: "No password!",
		CLNT_META_NO_OBJ_TYPE: "No object type!",
		CLNT_WS_NO_CALL_BACK: "Server access error: no CallBack function!",
		CLNT_WS_NO_QUERY: "Server access error: no query!",
		CLNT_LOGIN_ERR: "Login error",
		CLNT_LOGIN_PROCESS: "Logging in...",
		CLNT_NO_MODE: "No component mode specified!"
	}
]
