/*
	Линейки меню
*/
var menus = [
	//основное меню приложения
	{
		menuName: "MAIN_MENU",
		items: [
			{
				code: "ArticlesEditor", 
				title: "UI_MAIN_MENU_ARTS_EDITOR", 
				link: "articles_editor",
				path: "/articles_editor",
				authAccess: true,
				excludePaths: []
			},
			{
				code: "MailList", 
				title: "UI_MAIN_MENU_MAIL_LIST", 
				link: "mail_list",
				path: "/mail_list",
				authAccess: true,
				excludePaths: []
			}
		]
	}
]