/*
	Главная страница
*/
//класс главной страницы
var Main = React.createClass({
	//переменные окружения
	contextTypes: {
		router: React.PropTypes.func //ссылка на роутер
	},
	//инициализация при подключении компонента к странице
	componentDidMount: function () {
	},
	//обновление свойств компонента
	componentWillReceiveProps: function (newProps) {
	},
	//генерация представления главной страницы
	render: function () {
		//генератор		
		return (
			<div name="landing">
				<div className="w-section">
					<center><h1>
						<br/>
						<br/>
						{Utils.getStrResource({lang: this.props.language, code: "UI_LBL_MAIN_MAKE_ACTION"})}
					</h1></center>
				</div>
			</div>
		);
	}
});