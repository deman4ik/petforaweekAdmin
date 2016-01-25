/*
	Генератор элмента формы типа "Текст"
*/
var FormItemText = React.createClass({
	//состояние элемента формы
	getInitialState: function () {
		return {
			item: {},
			itemMetaIsValid: false
		};
	},
	//установка состояния элемента формы по переданным параметрам элемента
	setFormItemState: function (itemData) {
		if((itemData)&&(formFactory.validateFormItem(itemData))) {
			this.state.item = _.extend(this.state.item, itemData);
			this.setState({itemMetaIsValid: true});
		} else {
			this.setState({item: {}, itemMetaIsValid: false});
			this.props.onInvalidItem();		
		}
	},
	//инициализация элемента формы
	componentDidMount: function () {		
		this.setFormItemState(this.props.item);
	},
	//обновление параметров элемента формы
	componentWillReceiveProps: function (newProps) {
		this.setFormItemState(newProps.item);
	},
	//обработка смены значения
	handleChange: function (event) {
		var tmpItem = {};
		_.extend(tmpItem, this.state.item);
		tmpItem.value = event.target.value;
		this.setState({item: tmpItem});
		this.props.onItemValueChange(event.target.value);
	},
	//генерация поля ввода текста
	render: function () {
		//сам элемент
		var item;
		if(this.state.itemMetaIsValid) {
			//обязательность
			var req;
			if(this.state.item.required) {
				req = "*";
			}
			//классы элемента
			var cItem = React.addons.classSet;
			var classesItem = cItem({
				"form-group": true,
				"has-error": (("valid" in this.state.item)&&(!this.state.item.valid))
			});
			//собираем элемент
			item =	<div className={classesItem}>
						<label for={this.state.item.name} className="control-label hidden-xs hidden-sm col-md-4 col-lg-4">{req}{this.state.item.label}</label>
						<div className="col-xs-offset-0 col-xs-12 col-sm-offset-0 col-sm-12 col-md-8 col-lg-8">
							<textarea value={this.state.item.value}
								className="w-input u-form-field u-form-area-v"
								id={this.state.item.name}
								placeholder={this.state.item.label}
								ref={this.state.item.name}
								onChange={this.handleChange}/>
						</div>
					</div>
		} else {
			item = <InLineMessage type={Utils.getMessageTypeErr()} message={Utils.getStrResource({lang: this.props.language, code: "CLNT_FORM_ITEM_BAD_META"})}/>
		}
		//представление поля ввода текста
		return (
			<div>
				{item}
			</div>
		);		
	}
});