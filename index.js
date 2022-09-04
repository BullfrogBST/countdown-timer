// Create Event class
class Event {
    constructor(name, date, time) {
        this.name = name;
        this.date = date;
        this.time = time;
    }

    delete() {
        this.name = null;
        this.date = null;
        this.time = null;
    }
}

// Access all necessary elements

const eventForm = document.querySelector ('.event-form');
let eventData = new FormData(eventForm);

const eventNameInput = document.querySelector ('.event-name-input');
const eventDateInput = document.querySelector ('.event-date-input');
const eventTimeInput = document.querySelector ('.event-time-input');

const eventGrid = document.querySelector('.event-grid');

const allEvents = [];

// Detect when the event form is submitted, collect the data, and call the makeEvent() function with the data passed in

eventForm.addEventListener('submit', e => {
    eventData.append('eventName', eventNameInput.value);
    eventData.append('eventDate', eventDateInput.value);
    eventData.append('eventTime', eventTimeInput.value);

    makeEvent ( eventData.get('eventName'), eventData.get('eventDate'), eventData.get('eventTime') )
});

// Declare makeEvent ()

function makeEvent (eventName, eventDate, eventTime) {
    // Check if there are less than 12 cards

    if ( allEvents.length < 12 ){
        // Make a new card element with the data stored in the correct places

        allEvents.push ( new Event(eventName, eventDate, eventTime) );
    }
}

// Every second, call the countDown() function

// Declare countDown()

// For every event, calculate how much time is left until the event happens, and set the value of the timer to that.

// When a delete button is clicked, find the parent event, and pass it in to the deleteCard() function

// Declare deleteCard()

// Delete the card with the ID that was passed in
