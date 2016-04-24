/*
	Список рассылки
*/
//список рассылки
var MailList = React.createClass({	
	//состояние редактора
	getInitialState: function () {
		return {
			listLoaded: false, //признак загруженности списка адресов
			list: { //список адресов
				allUsersList: [], //все пользователи
				newsletterList: [] //подписанные на новости			
			} 
		}
	},
	//обработка результатов получения списка адресов рассылки
	handleGetListResult: function (resp) {
		this.props.onHideProgress();
		if(resp.STATE == clnt.respStates.ERR) {
			this.setState({articles: [], articlesLoaded: false});
			this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), resp.MESSAGE);
		} else {			
			if(resp.MESSAGE) {
				this.setState({list: resp.MESSAGE, listLoaded: true});
			} else {
				this.setState({list: [], listLoaded: false});
			}
		}
	},
	//загрузка данных списка рассылки
	getList: function () {
		if(this.props.session.loggedIn) {
			this.setState({listLoaded: false});
			this.props.onDisplayProgress(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_PROGRESS"}));
			var getPrms = {
				language: this.props.language,
				session: this.props.session.sessionInfo				
			}
			clnt.getMailList(getPrms, this.handleGetListResult);
		} else {
			this.setState({listLoaded: true});
		}
	},
	//инициализация при подключении компонента к странице
	componentDidMount: function () {		
		this.getList();
	},
	//обновление свойств компонента
	componentWillReceiveProps: function (newProps) {		
	},
	//генерация представления главной страницы
	render: function () {
		//стиль контейнера
		var divStyle = {
			padding: "5px"
		};
		//стиль ячейки
		var cellStyle = {
			border: "1px black solid",
			padding: "5px"
		};
		//статьи
		var list;
		if(this.state.listLoaded) {
			var listItemsAll = this.state.list.allUsersList.map(function (item, i) {
				return (<span key={i}>{item + "; "}</span>);
			}, this);
			var listItemsNews = this.state.list.newsletterList.map(function (item, i) {
				return (<span key={i}>{item + "; "}</span>);
			}, this);			
			list =	<div>
						<table>
							<tr>
								<td style={cellStyle}>
									{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_MAIL_LIST_ALL_USERS"})}
								</td>
								<td style={cellStyle}>
									{listItemsAll}
								</td>
							</tr>
							<tr>
								<td style={cellStyle}>
									{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_MAIL_LIST_NEWS_USERS"})}
								</td>
								<td style={cellStyle}>
									{listItemsNews}
								</td>
							</tr>
						</table>
					</div>
		}
		//соберем представление
		var content;
		if(this.state.listLoaded) {
			if(this.props.session.loggedIn) {
				content =	<div style={divStyle}>
								{list}
							</div>
			} else {
				content =	<InLineMessage type={Utils.getMessageTypeErr()}
								message={Utils.getStrResource({lang: this.props.language, code: "SRV_UNAUTH"})}/>
			}
		}
		//генератор		
		return (
			<div>
				{content}
			</div>
		);
	}
});