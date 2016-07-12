var eventBusSrc = require('../eventBus');

var eb = new eventBusSrc.EventBus();

var delivered = {};

var firstEventType = "firstType";
var secondEventType = "secondType";
var thirdEventType = "thirdType";

var firstSubscriber = function(name) {
	pushDelivered(firstEventType);

	console.log("First subscriber: " + name);
	return "First subscriber!";
}

var secondSubscriber = function(name) {
	pushDelivered(secondEventType);

	console.log("Second subscriber: " + name);
	return "Second subscriber!";
}

var pushDelivered = function(key) {
	if (typeof delivered[key] === 'undefined') {
		delivered[key] = [];
	}
	delivered[key].push(true);
}

eb.subscribe(firstEventType, firstSubscriber);
eb.subscribe(secondEventType, secondSubscriber);

for (var i = 0; i < 10; i++) {
	eb.post("Vasya", firstEventType);

	if (i % 2 == 0) {
		eb.post("Masha", secondEventType);
	}
	if (i % 5 == 0) {
		eb.post("Petya", thirdEventType);
	}
}

//TESTS---------------------------------------------

describe("test-suite", function() {

	var test = require("unit.js");

	it("Failed delivery of first event type data.", function() {
		test
			.object(delivered)
				.hasProperty(firstEventType)
			.array(delivered[firstEventType])
				.isNotEmpty()
				.hasLength(10)
		;
	});

	it("Failed delivery of second event type data.", function() {
		test
			.object(delivered)
				.hasProperty(secondEventType)
			.array(delivered[secondEventType])
				.isNotEmpty()
				.hasLength(5)
		;
	});

	it("Unexpected delivery of unknown event type data.", function() {
		test
			.object(delivered)
				.hasNotProperty(thirdEventType)
		;
	});
});