var EventBus = function() {

	var _subscribers = new Array();

	var _post = function(eventData, eventType) {
		if (eventType != undefined && !(eventType in _subscribers)) {
			return;
		}

		if (eventType != undefined) {
			var subscriberAction = _createActionByEventType(eventType);

			for (var i = 0; i < _subscribers[eventType].length; i++) {

				var currentSubscriber = _subscribers[eventType][i];

				subscriberAction(currentSubscriber, eventData);

			}
		} else {
			Object.keys(_subscribers).forEach(function(eventTypeKey, index) {

				var subscriberAction = _createActionByEventType(eventTypeKey);

				for (var i = 0; i < _subscribers[eventTypeKey].length; i++) {

					var currentSubscriber = _subscribers[eventTypeKey][i];
					
					subscriberAction(currentSubscriber, eventData);

				}
			});
		}
	};

	var _subscribe = function(eventType, callback) {
		if (typeof _subscribers[eventType] === 'undefined') {
			_subscribers[eventType] = new Array();
		}
		_subscribers[eventType].push(callback);
	};


	var _createActionByEventType = function(eventType) {
		return function(currentSubscriber, evt) {
			return currentSubscriber(evt);
		};
	};

	return {
		"post": _post,
		"subscribe": _subscribe
	}
};

module.exports.EventBus = EventBus;