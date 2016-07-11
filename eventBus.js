var EventBus = function() {

	var _subscribers = new Array();

	var _post = function(eventData, eventType) {
		var results = new Array();

		if (eventType != undefined) {	
			var subscriberAction = _createActionByEventType(eventType);

			for (var i = 0; i < _subscribers[eventType].length; i++) {

				var currentSubscriber = _subscribers[eventType][i];

				var resultValue = subscriberAction(currentSubscriber, eventData);
				
				if (results[eventType] === undefined) {
					results[eventType] = new Array();
				}

				results[eventType].push(resultValue);

			}
		} else {
			Object.keys(_subscribers).forEach(function(eventTypeKey, index) {

				var subscriberAction = _createActionByEventType(eventTypeKey);

				for (var i = 0; i < _subscribers[eventTypeKey].length; i++) {

					var currentSubscriber = _subscribers[eventTypeKey][i];
					
					var resultValue = subscriberAction(currentSubscriber, eventData);

					if (results[eventTypeKey] === undefined) {
						results[eventTypeKey] = new Array();
					}

					results[eventTypeKey].push(resultValue);

				}
			});
		}

		return results;
	};

	var _subscribe = function(eventType, callback) {
		if (_subscribers[eventType] == undefined) {
			_subscribers[eventType] = new Array();
		}
		_subscribers[eventType].push(callback);
	};


	var _createActionByEventType = function(eventType) {
		if (eventType === "slow") {
			return function(currentSubscriber, evt) {
				var result;
				setTimeout(function() {
					result = currentSubscriber(evt);
				}, 0);
				return result;
			};
		} else {
			return function(currentSubscriber, evt) {
				return currentSubscriber(evt);
			};
		}
	};

	return {
		"post": _post,
		"subscribe": _subscribe
	}
};