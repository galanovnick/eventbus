var eventBusSrc = require('../eventBus');

var eb = new eventBusSrc.EventBus();

var firstSubscriber = function(data) {
	console.log("First subscriber: " + data);
	return "First subscriber!";
}

var secondSubscriber = function(data) {
	console.log("Second subscriber: " + data);
	return "Second subscriber!";
}

for (var i = 0; i < 10; i++) {
	eb.subscribe("first", firstSubscriber);
	if (i % 2 == 0) {
		eb.subscribe("second", secondSubscriber);
	}
}

//TESTS---------------------------------------------

describe("test-suit", function() {

	var test = require("unit.js");

	var firstSubscriberCallbackResult = firstSubscriber("data");
	var secondSubscriberCallbackResult = secondSubscriber("data");
	var eventBusResult = eb.post("data");
	var firstResults = eventBusResult.first;
	var secondResults = eventBusResult.second;

	it("Unexpected value of first subscriber callback function.", function() {
		test
			.string(firstSubscriberCallbackResult)
				.is("First subscriber!")
		;
	});

	it("Unexpected value of second subscriber callback function.", function() {
		test
			.string(secondSubscriberCallbackResult)
				.is("Second subscriber!")
		;
	});

	it("Failed event bus test.", function() {
		test
			.array(eventBusResult)
				.hasLength(2)
				.hasProperty("first")
				.hasProperty("second")
			.array(firstResults)
				.isNotEmpty()
				.hasLength(10)
			.array(secondResults)
				.isNotEmpty()
				.hasLength(5)
		;
	});
});