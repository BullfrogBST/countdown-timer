// Create Event class
class Event {
    constructor(name, date, time) {
        this.name = name;

        this.date = date.replace(/-/g, ' ');

        this.time = time;

        this.dateAndTime = Date.parse(`${this.date} ${this.time} GMT`);

        this.secondsLeft = '00';
        this.minutesLeft = '00';
        this.hoursLeft = '00';
        this.daysLeft = '00';

        this.timeLeft = `${this.daysLeft}:${this.hoursLeft}:${this.minutesLeft}:${this.secondsLeft}`;
    }
}

// Access all necessary elements

const eventForm = document.querySelector ('.event-form');
let eventData = new FormData(eventForm);

const eventNameInput = document.querySelector ('.event-name-input');
const eventDateInput = document.querySelector ('.event-date-input');
const eventTimeInput = document.querySelector ('.event-time-input');

const eventGrid = document.querySelector('.event-grid');

let allEvents;

// Check if the user's events are saved in the localStorage

if(localStorage.getItem('allEvents') != null) {
    // Get allEvents from localStorage

    allEvents = JSON.parse(localStorage.getItem('allEvents'));
    loadCards();
} else {
    // Set allEvents as an empty array

    allEvents = [];
}

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
    // Make and return format for the HTML event cards with unique id's

    return `<div class="event-card">` +
    `    <div class="event-card-top">` +
    `        <div class="event-card-title">` +
    `            <h3>${eventName}</h3>` +
    `        </div>` +
    `        <div class="event-card-delete">` +
    `            <i class="fa-solid fa-x event-card-delete ${allEvents.length-1}" id="card-delete-btn"></i>` +
    `        </div>` +
    `    </div>` +
    `    <div class="event-date-time">` +
    `        <p>${eventDate}, ${eventTime}</p>` +
    `    </div>` +
    `    <div class="event-card-timer">` +
    `        <h2 id="event-timer">${eventTimeLeft}</h2>` +
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

    // Save all loaded cards to localStorage

    localStorage.setItem('allEvents', JSON.stringify(allEvents));
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
    currentCard.hoursLeft = Math.floor(hours % 24);
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

        msToTime((card.dateAndTime - now), card);

        // Reload the timeLeft value

        card.timeLeft = `${card.daysLeft}:${card.hoursLeft}:${card.minutesLeft}:${card.secondsLeft}`;
    })

    // Load the timer again with the updated values, passing in card
    reloadTimers();
}

// Declare the reloadTimer() function

function reloadTimers() {
    // Access all timers from the Dom

    let timers = document.querySelectorAll('.event-card-timer');

    // Loop through the timers and update their data

    for(let i = 0; i < timers.length; i++) {
        timers[i].innerHTML = `<h2 id="event-timer">${allEvents[i].timeLeft}</h2>`
    }
}

// When a delete button is clicked, find the parent event, and pass it in to the deleteCard() function

// Check if the eventGrid has been clicked

eventGrid.addEventListener( 'click', e => {
    // Check if what has been clicked was a delete button

    if ( e.target.classList.contains('event-card-delete') ) {
        // Extract ID from the selected button's classList

        buttonID = e.target.classList[e.target.classList.length - 1];

        // Delete the event with the index of the button's ID

        allEvents.splice(buttonID, 1);

        // Reload all cards

        loadCards();
    }
})
