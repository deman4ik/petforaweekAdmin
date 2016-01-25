/*
	Клиентская библиотека для работы с Azure-сервером
*/
var Client = function (clientConfig) {
	//флаг отладки: true - в консоль пишется всё что проходит через log, false - в консоль не пишется ничего, из того, что проходит через log
	var debug = true;
	//поддерживаемые серверные методы
	var serverMethods = {
		get: "GET",
		ins: "POST",
		upd: "PUT",
		del: "DELETE"
	}
	//поддерживаемые серверные действия
	var serverActions = {
		login: "StandartLogin", //аутентификация
		getUserInfo: "User", //получение сведений о пользователе
		article: "Article" //статьи
	}
	//коды стандартных ответов сервера
	var serverStdErrCodes = {
		unAuth: 401 //пользователь неавторизован
	}
	//объект клиента Azure-сервера
	var clnt = new WindowsAzure.MobileServiceClient(clientConfig.serverAppUrl, clientConfig.serverAppKey);
	//типы ответа сервера
	var	respTypes = {
		STD: 0, //стандартное сообщение сервера об успехе или ошибке операции
		DATA: 1 //данные, специфичные для операции
	}
	//состояния ответа сервера
	var	respStates = {
		ERR: 0, //код для ошибки
		OK: 1 //код для успеха
	}
	//протоколирование всего в консоли, с учетом состояния флага отладки
	var log = function (message) {
		if(debug) message.forEach(function (messageItem) {console.log(messageItem)});
	}
	//инициализация типового запроса
	var initSrvStdReqData = function () {
		return {
			API_NAME: "",			
			API_METHOD: "",
			API_DATA: ""
		}
	}
	//инициализация типового ответа
	var initSrvStdRespData = function () {
		return {
			TYPE: -1,
			STATE: -1,
			MESSAGE: ""
		}
	}
	//формирование типового запроса
	var fillSrvStdReqData = function (apiName, apiMethod, apiData) {
		var res = initSrvStdReqData();
		res.API_NAME = apiName;		
		res.API_METHOD = apiMethod;
		res.API_DATA = apiData;
		return res;
	}
	//формирование типового ответа
	var fillSrvStdRespData = function (type, state, message) {
		var res = initSrvStdRespData();
		res.TYPE = type;
		res.STATE = state;
		res.MESSAGE = message;
		return res;
	}
	//проверка - является ли сообщение об ошибке сервера стандартным сообщением Azure или это наш объект ошибки
	var isServerRespNotAzureStd = function (resp) {
		if("code" in resp) {
			return true;
		} else {
			return false;
		}
	}
	//проверка корректность объекта сессии
	var checkSession = function (session) {
		var res = false;
		if((session)&&("user" in session)&&("userId" in session.user)&&("authenticationToken" in session)) res = true;
		return res;
	}
	//формирование типового запроса к серверу, в зависимости от серверного действия
	var buildServerRequest = function (prms) {
		if(!prms) throw new Error(Utils.getStrResource({code: "CLNT_NO_OBJECT"}));
		if(!prms.language) throw new Error(Utils.getStrResource({code: "CLNT_NO_LANGUAGE"}));
		if(!prms.action) 
			throw new Error(Utils.getStrResource({
				lang: prms.language,
				code: "CLNT_NO_ELEM",
				values: ["ServerRequest", "action"]
			}));		
		try {
			//работаем от действия
			switch (prms.action) {
				//вход в систему
				case (serverActions.login): {					
					return fillSrvStdReqData(
						serverActions.login, 
						serverMethods.ins, 
						authFactory.buildLogIn(_.extend(prms.data, {language: prms.language}))
					);
					break;
				}
				//считывание информации о пользователе
				case (serverActions.getUserInfo): {
					return fillSrvStdReqData(serverActions.getUserInfo, serverMethods.get, "");
					break;
				}
				//работа со статьями
				case(serverActions.article): {
					if(!prms.method) 
						throw new Error(Utils.getStrResource({
							lang: prms.language,
							code: "CLNT_NO_ELEM",
							values: ["ServerRequest", "method"]
						}));
					if(!prms.data) 
						throw new Error(Utils.getStrResource({
							lang: prms.language,
							code: "CLNT_NO_ELEM",
							values: ["ServerRequest", "data"]
						}));					
					//работаем от метода
					switch (prms.method) {
						//считывание статьи
						case(serverMethods.get): {
							if(!prms.data.filter) 
								throw new Error(Utils.getStrResource({
									lang: prms.language,
									code: "CLNT_NO_ELEM",
									values: ["ServerRequest", "filer"]
								}));							
							return fillSrvStdReqData(serverActions.article + "s?filter=" + Utils.serialize(prms.data.filter), serverMethods.get, "");
							break;
						}
						//добавление статьи
						case(serverMethods.ins): {
							if(!prms.data) 
								throw new Error(Utils.getStrResource({
									lang: prms.language,
									code: "CLNT_NO_ELEM",
									values: ["ServerRequest", "data"]
								}));							
							return fillSrvStdReqData(serverActions.article, serverMethods.ins, prms.data);
							break;
						}
						//исправление статьи
						case(serverMethods.upd): {
							if(!prms.data.articleId) 
								throw new Error(Utils.getStrResource({
									lang: prms.language,
									code: "CLNT_NO_ELEM",
									values: ["ServerRequest", "articleId"]
								}));							
							return fillSrvStdReqData(serverActions.article + "/" + prms.data.articleId, serverMethods.upd, prms.data);
							break;
						}
						//удаление статьи
						case(serverMethods.del): {
							if(!prms.data.articleId) 
								throw new Error(Utils.getStrResource({
									lang: prms.language,
									code: "CLNT_NO_ELEM",
									values: ["ServerRequest", "articleId"]
								}));							
							return fillSrvStdReqData(serverActions.article + "/" + prms.data.articleId, serverMethods.del, "");
							break;
						}
						//неизвестный метод
						default: {
							throw new Error("Метод '" + prms.method + "' для действия '" + prms.action + "' не поддерживается сервером!");
						}
					}					
					break;
				}								
				//неизвестное действие
				default: {
					throw new Error("Действие '" + prms.action + "' не поддерживается сервером!");
				}
			}
		} catch (error) {
			log(["SERVER REQUEST BUILD ERROR:", error.message]);
			throw new Error("Ошибка сборки запроса для действия '" + prms.action + "': " + error.message);
		}
	}
	//универсальный метод обращения к серверу
	var	execServerApi = function (prms) {			
		log(["EXECUTE SERVER API WITH:", prms]);
		if(!prms)
			throw new Error(Utils.getStrResource({code: "CLNT_NO_OBJECT"}));
		if(!prms.language)
			throw new Error(Utils.getStrResource({code: "CLNT_NO_LANGUAGE"}));
		if((!prms.callBack)||(!Utils.isFunction(prms.callBack)))
			throw new Error(Utils.getStrResource({lang: prms.language, code: "CLNT_WS_NO_CALL_BACK"}));
		if((prms.session)&&(checkSession(prms.session))) {
			clnt.currentUser = {
				"userId": prms.session.user.userId,
				"mobileServiceAuthenticationToken": prms.session.authenticationToken
			};
		} else {
			clnt.currentUser = {};
		}
		if(prms.req) {
			clnt.invokeApi(prms.req.API_NAME, {
				body: prms.req.API_DATA,
				method: prms.req.API_METHOD,
				headers: {Accept: "application/json"}
			}).done(
				function (result) {					
					log(["EXECUTE SERVER API RESULT:", result]);					
					prms.callBack(fillSrvStdRespData(respTypes.DATA, respStates.OK, result.response));
				},
				function (error) {
					log(["EXECUTE SERVER API ERROR:", error]);
					var srvErr = Utils.deSerialize(error.request.response);
					var errMessage = "";
					if(!srvErr) {
						errMessage = Utils.getStrResource({lang: prms.language, code: "SRV_COMMON_ERROR"});
					} else {
						if(isServerRespNotAzureStd(srvErr)) {
							var values = [];
							if((srvErr.data)&&(Array.isArray(srvErr.data))) {
								srvErr.data.forEach(function (item, i) {
									var tmp = Utils.getStrResource({lang: prms.language, code: item, searchUndefined: false});
									if(!tmp) values.push(item); else values.push(tmp);
								});
							}
							errMessage = Utils.getStrResource({lang: prms.language, code: srvErr.code, values: values});
						} else {
							switch (error.request.status) {
								case (serverStdErrCodes.unAuth): {								
									errMessage = Utils.getStrResource({lang: prms.language, code: "SRV_UNAUTH"});
									break;
								}
								default: {			
									errMessage = Utils.getStrResource({lang: prms.language, code: "SRV_COMMON_ERROR"});
								}
							}
						}
					}
					prms.callBack(fillSrvStdRespData(respTypes.STD, respStates.ERR, errMessage));					
				}
			);
		} else {
			throw new Error(Utils.getStrResource({lang: prms.language, code: "CLNT_WS_NO_QUERY"}));
		}
	}
	//публичные члены класса (интерфейс)
	return {
		//методы сервера
		serverMethods: serverMethods,		
		//типы ответа сервера
		respTypes: respTypes,
		//состояния ответа сервера
		respStates: respStates,
		//выдача объекта клиента в консоль
		printClnt: function () {
			log([clnt]);
		},
		//аутентификация на сервере
		login: function (prms, callBack) {
			try {
				log(["LOGING IN WITH CREDENTAILS:", prms]);
				execServerApi({
					language: prms.language,
					req: buildServerRequest({
						language: prms.language,
						action: serverActions.login,
						method: serverMethods.ins,
						data: prms.data
					}),
					callBack: function (stdResp) {								
						if(stdResp.STATE == respStates.ERR) {
							callBack(stdResp);
						} else {
							var connectionData = Utils.deSerialize(stdResp.MESSAGE);							
							execServerApi({
								language: prms.language,
								session: {
									user: {
										userId: connectionData.user.userId
									},
									authenticationToken: connectionData.authenticationToken
								},
								req: buildServerRequest({
									language: prms.language,
									action: serverActions.getUserInfo,
									method: serverMethods.get,
									data: null
								}),
								callBack: function (stdResp) {
									if(stdResp.STATE == respStates.ERR) {
										callBack(stdResp);
									} else {
										var profTmp =  Utils.deSerialize(stdResp.MESSAGE)[0];
										if(!profTmp) {
											callBack(fillSrvStdRespData(respTypes.STD, respStates.ERR, Utils.getStrResource({lang: prms.language, code: "SRV_USER_NOTFOUND"})));
										} else {
											if((!("emailConfirmed" in profTmp))||(!profTmp.emailConfirmed)) {
												callBack(fillSrvStdRespData(respTypes.STD, respStates.ERR, Utils.getStrResource({lang: prms.language, code: "SRV_USER_NOT_CONFIRMED"})));
											} else {											
												connectionData.user.profile = profTmp;											
												callBack(fillSrvStdRespData(respTypes.DATA, respStates.OK, connectionData));
											}
										}
									}
								}
							});
						}
					}
				});				
			} catch (error) {
				log(["LOGIN ERROR:", error]);
				if(Utils.isFunction(callBack))
					callBack(fillSrvStdRespData(respTypes.STD, respStates.ERR, error.message));
			}
		},
		//считывание статей
		getArticles: function (prms, callBack) {
			try {
				var filter = {};
				if(prms.filter) _.extend(filter, prms.filter);
				if(prms.addLanguage != false) filter.lang = prms.language;				
				execServerApi({
					language: prms.language,
					req: buildServerRequest({
						language: prms.language,
						action: serverActions.article,
						method: serverMethods.get,
						data: {filter: filter}
					}),
					callBack: function (resp) {
						if(resp.STATE == respStates.ERR)
							callBack(resp);
						else {
							resp.MESSAGE = Utils.deSerialize(resp.MESSAGE);
							callBack(resp);
						}
					}
				});
			} catch (error) {
				log(["GET ARTICLES ERROR", error]);
				if(Utils.isFunction(callBack))
					callBack(fillSrvStdRespData(respTypes.STD, respStates.ERR, error.message));
			}
		},
		//добавление статьи
		addArticle: function (prms, callBack) {
			try {
				execServerApi({
					language: prms.language,
					req: buildServerRequest({
						language: prms.language,
						action: serverActions.article,
						method: serverMethods.ins,
						data: prms.data
					}),
					callBack: function (resp) {
						if(resp.STATE == respStates.ERR)
							callBack(resp);
						else {
							resp.MESSAGE = Utils.deSerialize(resp.MESSAGE);
							callBack(resp);
						}
					}
				});
			} catch (error) {
				log(["ADD ARTICLES ERROR", error]);
				if(Utils.isFunction(callBack))
					callBack(fillSrvStdRespData(respTypes.STD, respStates.ERR, error.message));
			}
		},
		//исправление статьи
		updateArticle: function (prms, callBack) {
			try {
				execServerApi({
					language: prms.language,
					req: buildServerRequest({
						language: prms.language,
						action: serverActions.article,
						method: serverMethods.upd,
						data: prms.data
					}),
					callBack: function (resp) {
						if(resp.STATE == respStates.ERR)
							callBack(resp);
						else {
							resp.MESSAGE = Utils.deSerialize(resp.MESSAGE);
							callBack(resp);
						}
					}
				});
			} catch (error) {
				log(["UPDATE ARTICLES ERROR", error]);
				if(Utils.isFunction(callBack))
					callBack(fillSrvStdRespData(respTypes.STD, respStates.ERR, error.message));
			}
		},
		//удаление статьи
		removeArticle: function (prms, callBack) {
			try {
				execServerApi({
					language: prms.language,
					req: buildServerRequest({
						language: prms.language,
						action: serverActions.article,
						method: serverMethods.del,
						data: {articleId: prms.articleId}
					}),
					callBack: function (resp) {
						if(resp.STATE == respStates.ERR)
							callBack(resp);
						else {
							resp.MESSAGE = Utils.deSerialize(resp.MESSAGE);
							callBack(resp);
						}
					}
				});
			} catch (error) {
				log(["REMOVE ARTICLES ERROR", error]);
				if(Utils.isFunction(callBack))
					callBack(fillSrvStdRespData(respTypes.STD, respStates.ERR, error.message));
			}
		}		
	}
}

var clnt = new Client({serverAppUrl: config.serverAppUrl, serverAppKey: config.serverAppKey});