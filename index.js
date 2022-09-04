// Access all necessary elements
const eventForm = document.querySelector('.event-form');
let eventData = new FormData(eventForm);

const eventNameInput = document.querySelector('.event-name-input');
const eventDateInput = document.querySelector('.event-date-input');
const eventTimeInput = document.querySelector('.event-time-input');

const eventGrid = document.querySelector('.event-grid');

// Detect when the event form is submitted, collect the data, and call the makeEvent() function with the data passed in.
eventForm.addEventListener('submit', e => {
    eventData.append('eventName', eventNameInput.value);
    eventData.append('eventDate', eventDateInput.value);
    eventData.append('eventTime', eventTimeInput.value);

    makeEvent(eventData.get('eventName'), eventData.get('eventDate'), eventData.get('eventTime'))
});
// Declare makeEvent()
function makeEvent(eventName, eventDate, eventTime) {
    console.log(eventName);
    console.log(eventDate);
    console.log(eventTime);
}
// Check if there are less than 12 cards

// Make a new card element with a unique ID and the data stored in the correct places

// Set the eventCards variable to be all of the event cards

// Every second, call the countDown() function

// Declare countDown()

// For every event, calculate how much time is left until the event happens, and set the value of the timer to that.

// When a delete button is clicked, find the parent event, and pass it in to the deleteCard() function

// Declare deleteCard()

// Delete the card with the ID that was passed in
