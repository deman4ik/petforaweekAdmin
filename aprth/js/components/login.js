/*
	Диалог входа в систему
*/
var LogInForm = React.createClass({
	//переменные окружения
	contextTypes: {
		router: React.PropTypes.func //ссылка на роутер
	},
	//состояние
	getInitialState: function () {
		return {
			sessionInfo: {}, //информация о сесси и пользователе
		};
	},
	//обработка результата входа
	handleLogIn: function (result) {
		this.props.onHideProgress();
		if(result.TYPE == clnt.respTypes.STD) {
			this.props.onShowError(Utils.getStrResource({
					lang: this.props.language, 
					code: "CLNT_LOGIN_ERR"}), 
				result.MESSAGE
			);
		} else {
			this.setState({sessionInfo: result.MESSAGE}, Utils.bind(function () {
				this.props.onLogInOk(this.state.sessionInfo);				
			}, this));			
		}		
	},
	//вход в систему
	logIn: function (auth) {
		this.props.onDisplayProgress(Utils.getStrResource({
			lang: this.props.language, 
			code: "CLNT_LOGIN_PROCESS"
		}));
		clnt.login({language: this.props.language, data: auth}, this.handleLogIn);
	},
	//сборка нового клиента для выбранного сервера
	buildNewClnt: function (serverCode) {
		Utils.buildClnt(serverCode);
	},
	//обработка кнопки "Войти"
	handleLogInClick: function () {
		try {
			var auth = authFactory.build({
				language: this.props.language,
				userName: React.findDOMNode(this.refs.login).value,
				userPass: React.findDOMNode(this.refs.password).value
			});
			this.logIn(auth);			
		} catch (e) {
			this.props.onShowError(Utils.getStrResource({
					lang: this.props.language, 
					code: "CLNT_LOGIN_ERR"}),
				e.message
			);
		}		
	},
	//обработка кнопки "Отмена"
	handleCloseClick: function () {
		this.props.onLogInCancel();
	},	
	//обработка события клавиатуры
	handleKeyDown: function (event) {
		if(event.keyCode == 27) {
			this.handleCloseClick();
		}
		if(event.keyCode == 13) {
			this.handleLogInClick();
		}
	},
	bindKeyDown: function () {
		$(document.body).on("keydown", this.handleKeyDown);
	},
	unBindKeyDown: function () {
		$(document.body).off("keydown", this.handleKeyDown);
	},
	//инициализация при старте приложения
	componentDidMount: function () {
		this.bindKeyDown();		
	},
	//отключение компонента от страницы
	componentWillUnmount: function() {
		this.unBindKeyDown();
	},
	//генерация диалога
	render: function () {
		//генерация представления
		return (
			<div>
				<div className="modal show messagebox-wraper" id="loginBox">					
					<div className="modal-dialog login-form">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" onClick={this.handleCloseClick}>×</button>	
								<h4 className="modal-title">
									{Utils.getStrResource({lang: this.props.language, code: "UI_TITLE_LOGIN"})}
								</h4>
							</div>
							<div className="u-form-body">
								<form className="w-clearfix" role="form" id="loginForm">					
									<div className="form-group">
										<OptionsSelector classes={"w-select u-form-field"}
											view={OptionsSelectorView.SELECT}
											options={optionsFactory.buildOptions({
														language: this.props.language, 
														id: "server",
														labels: _.pluck(serverList, "code"),
														options: _.pluck(serverList, "code")})}
											language={this.props.language}
											defaultOptionsState={this.props.defaultServer}
											appendEmptyOption={false}
											onOptionChanged={Utils.bind(function (value) {this.buildNewClnt(value);}, this)}/>
									</div>
									<div className="form-group">
											<input type="text" 
												className="form-control"
												placeholder={Utils.getStrResource({lang: this.props.language, code: "UI_PLH_USER"})}
												ref="login"
												defaultValue={this.props.defaultUser}/>
									</div>
									<div className="form-group">
											<input type="password"
												className="form-control"
												placeholder={Utils.getStrResource({lang: this.props.language, code: "UI_PLH_PASS"})}
												ref="password"
												defaultValue={this.props.defaultPassword}/>
									</div>
									<div className="u-block-spacer2"></div>
									<div className="form-group">
										<button type="button" className="w-button block u-btn-primary" onClick={this.handleLogInClick}>
											{Utils.getStrResource({lang: this.props.language, code: "UI_BTN_LOGIN"})}
										</button>
								  </div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="modal-backdrop fade in"></div>
			</div>
		);
	}
});