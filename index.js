// Create Event class
class Event {
    constructor(name, date, time) {
        this.name = name;

        this.date = date.replace(/-/g, ' ');

        this.time = time;

        this.dateAndTime = `${this.date} ${this.time} GMT`

        this.secondsLeft = '00';
        this.minutesLeft = '00';
        this.hoursLeft = '00';
        this.daysLeft = '00';

        this.timeLeft = `${this.daysLeft}:${this.hoursLeft}:${this.minutesLeft}:${this.secondsLeft}`;
    }

    delete() {
        this.name = null;
        this.date = null;
        this.time = null;
    }

    parseDateAndTime(){
        return Date.parse(this.dateAndTime);
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

    if(eventTimeInput.value != ''){
        eventData.append('eventTime', eventTimeInput.value);
        eventTimeInput.value = '';
    } else{
        eventData.append('eventTime', '00:00:00')
    }

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
    // Make and return format for the HTML event cards

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
    `        <h3 id="event-timer">${eventTimeLeft}</h3>` +
    `    </div>` +
    `</div>`;
}

// Declare loadCards()

async function loadCards(){
    //Load all event cards

    // Declare the cardsToLoad array, which will be looped through to display all of the cards
    let cardsToLoad = []

    // Reset the innerHTML of the grid area, so the cards can be reloaded
    eventGrid.innerHTML = ''

    for (let i = 0; i < allEvents.length; i++) {
        const cardFormat = getCardFormat(allEvents[i].name, allEvents[i].date, allEvents[i].time, allEvents[i].timeLeft)

        cardsToLoad.push(cardFormat);
    }

    cardsToLoad.forEach( card => eventGrid.innerHTML += card );
}

// Every second, call the countDown() function

setInterval( () => {
    countDown();
}, 1000)

// Declare the msToTime() function

function msToTime(milliseconds, currentCard) {
    // Convert the number of milliseconds passed in to a DD:HH:MM:SS format

    let seconds = milliseconds / 1000;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    // Pass the created format into the currentCard's object

    currentCard.secondsLeft = Math.floor(seconds % 60);
    currentCard.minutesLeft = Math.floor(minutes % 60);
    currentCard.hoursLeft = Math.floor(hours / 24);
    currentCard.daysLeft = Math.floor(days);
}

// Declare countDown()

function countDown() {
    /*
      For every event, calculate how much time is left until the event happens, and set the value of the timer to that.
    */

    // Declare 'now' as the current time

    let now = new Date().getTime();

    // Loop through all events and calculate timeLeft

    allEvents.forEach( card => {
        // Calculate the time until the card's date

        msToTime((card.parseDateAndTime() - now), card);

        // Reload the timeLeft value

        card.timeLeft = `${card.daysLeft}:${card.hoursLeft}:${card.minutesLeft}:${card.secondsLeft}`

        console.log(card.secondsLeft);
    })

    // Load the cards again with the updated values

    loadCards();
}


// When a delete button is clicked, find the parent event, and pass it in to the deleteCard() function

// Declare deleteCard()

// Delete the card with the ID that was passed in
