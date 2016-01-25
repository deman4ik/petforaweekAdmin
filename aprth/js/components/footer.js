/*
	Подвал страниц
*/
var Footer = React.createClass({
	//оповещение родителя о нажатии на пункт меню
	notifyParentMenuItemClick: function (menuItem) {
		if((this.props.onMenuItemClick)&&(Utils.isFunction(this.props.onMenuItemClick))) {
			this.props.onMenuItemClick(menuItem);
		}
	},
	//обработка нажатия на пункт меню
	handleMenuItemClick: function (menuItem) {
		this.notifyParentMenuItemClick(menuItem);
	},
	//генерация представления подвала
	render: function () {
		//меню языков подвала
		var menuFooterLanguage;
		if(this.props.languageEnabled)
			menuFooterLanguage = <LangMenu language={this.props.language} onLangugeChange={this.props.onLangugeChange}/>;
		//генерация представления подвала
		return (
				<section className="w-section u-sect-page-footer">
					<footer className="w-row">
						<div className="w-col w-col-4 w-col-small-4 w-col-tiny-4 u-col-footer">
							<div className="u-block-footer-logo">
								<div className="u-t-comptitle">
									{Utils.getStrResource({lang: this.props.language, code: "UI_TITLE_APP"})}
								</div>
							</div>
							<div className="u-t-copyright">
								{Utils.getStrResource({lang: this.props.language, code: "UI_COPYRIGHT"})}
							</div>
						</div>
						<div className="w-col w-col-8 w-col-small-8 w-col-tiny-8 u-col-footer">
							{menuFooterLanguage}
						</div>
					</footer>
				</section>
		);
	}
});