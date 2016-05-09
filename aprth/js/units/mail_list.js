/*
	Список рассылки
*/
//список адресов
var AddressList = React.createClass({
	//выгрузка в CSV
	exportCSV: function () {
		var csvContent = "data:text/csv;charset=utf-8,Email,FirstName\n";
		this.props.list.map(function(item, i) {
			var dataString = item.email + "," + item.firstName;
			csvContent += ((i < (this.props.list.length - 1))?(dataString + "\n"):(dataString));
		}, this);
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("target", "_blank");
		link.setAttribute("download", "mail_list.csv");
		link.click();
	},
	//обработка нажатия на заголовок списка адресов
	handleTitleClick: function () {
		this.exportCSV();
	},
	//генерация представления списка
	render: function () {
		//строим список
		var listItems = this.props.list.map(function (item, i) {
			var titleColumn;
			var formattedAddress;
			if(i == 0) {
				var tmpStyle = {verticalAlign: "top"};
				_.extend(tmpStyle, this.props.cellStyle);
				titleColumn = 	<td rowSpan={this.props.list.length} style={tmpStyle}>
									<a href="javascript:void(0);" onClick={this.handleTitleClick}>{this.props.title}</a>
								</td>
				var formatedList = this.props.list.map(function (listItem, j) {
					var tmp = (listItem.firstName + ((listItem.lastName == null)?"":(" " + listItem.lastName))) + " <" + listItem.email + ">";
					return ((j < (this.props.list.length - 1))?(tmp + ", "):(tmp));
				}, this);
				formattedAddress =	<td rowSpan={this.props.list.length} style={tmpStyle}>
										{formatedList}
									</td>				
			}
			return (
				<tr key={i}>
					{titleColumn}
					<td style={this.props.cellStyle}>{item.email}</td>
					<td style={this.props.cellStyle}>{item.firstName + ((item.lastName == null)?"":(" " + item.lastName))}</td>
					{formattedAddress}
				</tr>
			);
		}, this);
		//возвращаем его
		return (
			<span>
				{listItems}
			</span>
		);
	}
});
//список рассылки
var MailList = React.createClass({	
	//состояние редактора
	getInitialState: function () {
		return {
			listLoaded: false, //признак загруженности списка адресов
			list: { //список адресов
				allUsersList: [], //все пользователи
				newsletterList: [], //подписанные на новости
				norificationsList: [] //подписанные на оповещения
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
				var tmpList = {};
				_.extend(tmpList, resp.MESSAGE);
				this.setState({list: tmpList, listLoaded: true});
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
	//генерация представления раздела
	render: function () {
		//стиль контейнера
		var divStyle = {
			padding: "5px"
		};
		//стиль таблицы
		var tableStyle = {
			width: "100%"
		};
		//стиль ячейки
		var cellStyle = {
			border: "1px black solid",
			padding: "5px"
		};
		//статьи
		var list;
		if(this.state.listLoaded) {
			list =	<div style={divStyle}>
						<table style={tableStyle}>
							<tr>
								<td style={cellStyle}>
									{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_LIST"})}
								</td>
								<td style={cellStyle}>
									{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_E_MAIL"})}									
								</td>
								<td style={cellStyle}>
									{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_NAME"})}									
								</td>
								<td style={cellStyle}>
									{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_FORMATED_ADDRESS"})}									
								</td>								
							</tr>
							<AddressList list={this.state.list.allUsersList}
								cellStyle={cellStyle} 
								title={Utils.getStrResource({lang: this.props.language, code: "UI_FLD_MAIL_LIST_ALL_USERS"})}/>
							<AddressList list={this.state.list.newsletterList}
								cellStyle={cellStyle} 
								title={Utils.getStrResource({lang: this.props.language, code: "UI_FLD_MAIL_LIST_NEWS_USERS"})}/>
							<AddressList list={this.state.list.norificationsList}
								cellStyle={cellStyle} 
								title={Utils.getStrResource({lang: this.props.language, code: "UI_FLD_MAIL_LIST_NOTIFY_USERS"})}/>
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