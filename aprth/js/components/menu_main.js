/*
	Главное меню приложения
*/
var MainMenu = React.createClass({
	//переменные окружения
	contextTypes: {
		router: React.PropTypes.func //ссылка на роутер
	},
	//состояние меню
	getInitialState: function () {
		return {			
			menu: {}, //пункты меню			
			menuReady: false //готовность меню к отображению
		}
	},
	//обработка нажатия пункта меню
	handleMenuItemClick: function (itemIndex) {
		this.props.onMenuItemSelected(this.state.menu.items[itemIndex]);		
	},	
	//инициализация компонента при подключении к страничке
	componentDidMount: function () {
		var menuTmp = Utils.getMenuObject("MAIN_MENU");
		if(menuTmp) {
			this.setState({menu: menuTmp, menuReady: true}, function () {
				Webflow.require("navbar").destroy();
				Webflow.require("navbar").ready();
			});
		}
	},	
	//генерация представления главного меню
	render: function () {
		//дополнительные стили для пункта меню
		var cNav = React.addons.classSet;
		var classesNav = cNav({
			"w-nav-menu": true,
			"u-nav-menu": true,
			"w--nav-menu-open": this.props.menuOpen
		});
		//меню управления сессией
		var authMenu;
		authMenu =	<AuthMenu session={this.props.session}
						onLogIn={this.props.onLogIn}
						onLogOut={this.props.onLogOut}
						onMenuItemSelected={this.props.onMenuItemSelected}
						language={this.props.language}/>;
		//пункты главного меню
		var items;
		if(this.state.menuReady) {
			items = this.state.menu.items.map(function (menuItem, i) {
				if((!menuItem.authAccess)||(this.props.session.loggedIn == menuItem.authAccess)) {
					var build = true;
					if((menuItem.excludePaths)&&(Array.isArray(menuItem.excludePaths))) {
						if(_.indexOf(menuItem.excludePaths, this.context.router.getCurrentPathname()) != -1) {
							build = false;
						}
					}
					if(build) {
						var cItem = React.addons.classSet;
						var classesItem = cItem({
							"w-nav-link": true,
							"u-nav-link": true,
							"w--current": (this.context.router.getCurrentPathname() == menuItem.path)
						});
						return (
							<a className={classesItem} 
								key={i}
								href={"#/" + menuItem.link}
								onClick={this.handleMenuItemClick.bind(this, i)}>
									{Utils.getStrResource({lang: this.props.language, code: menuItem.title})}
							</a>
						);
					}
				}
			}, this);
		}
		//генерация представления меню
		return (
			<nav className={classesNav} role="navigation">
				{items}
				{authMenu}
			</nav>
		);
	}
});