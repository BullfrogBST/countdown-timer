// Create Event class
class Event {
    constructor(name, date, time, timeLeft = '') {
        this.name = name;
        this.date = date;
        this.time = time;
        this.timeLeft = timeLeft
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
    e.preventDefault();

    eventData.append('eventName', eventNameInput.value);
    eventNameInput.value = '';

    eventData.append('eventDate', eventDateInput.value);
    eventDateInput.value = '';

    eventData.append('eventTime', eventTimeInput.value);
    eventTimeInput.value = '';

    makeEvent ( eventData.get('eventName'), eventData.get('eventDate'), eventData.get('eventTime') )
});

// Declare makeEvent ()

function makeEvent (eventName, eventDate, eventTime) {
    // Check if there are less than 12 cards

    if ( allEvents.length < 12 ){
        // Make a new card element with the data stored in the correct places

        allEvents.push ( new Event(eventName, eventDate, eventTime) );

        console.log(allEvents[allEvents.length-1])
    }

    // Delete all elements from eventData

    eventData.delete('eventName');
    eventData.delete('eventDate');
    eventData.delete('eventTime');

    // Call loadCards()
    loadCards();
}

//Declare getCardFormat()

function getCardFormat(eventName, eventDate, eventTime, eventTimeLeft) {
    return `<div class="event-card">` +
    `    <div class="event-card-top">` +
    `        <div class="event-card-title">` +
    `            <h3>${eventName}</h3>` +
    `        </div>` +
    `        <div class="event-card-delete">` +
    `            <i class="fa-solid fa-x" id="card-delete-btn"></i>` +
    `        </div>` +
    `    </div>` +
    `    <div class="event-date-time">` +
    `        <p>${eventDate}, ${eventTime}</p>` +
    `    </div>` +
    `    <div class="event-card-timer">` +
    `        <h3 id="event-timer">00:00:00</h3>` +
    `    </div>` +
    `</div>`;
}

// Declare loadCards()

async function loadCards(){
    //Load all event cards

    let cardsToLoad = []
    eventGrid.innerHTML = ''

    for (let i = 0; i < allEvents.length; i++) {
        const cardFormat = getCardFormat(allEvents[i].name, allEvents[i].date, allEvents[i].timeLeft)

        cardsToLoad.push(cardFormat);
    }

    cardsToLoad.forEach( card => eventGrid.innerHTML += card );
}

// Every second, call the countDown() function

// Declare countDown()

// For every event, calculate how much time is left until the event happens, and set the value of the timer to that.

// When a delete button is clicked, find the parent event, and pass it in to the deleteCard() function

// Declare deleteCard()

// Delete the card with the ID that was passed in
