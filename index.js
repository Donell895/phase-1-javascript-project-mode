


function fetchData(callback) {
  fetch('db.json')
    .then(response => response.json())
    .then(data => callback(data.calendar.events))
    .catch(error => console.error('Error:', error));
}


function updateCalendar(events) {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.toLocaleString('en-us', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const currentDayName = currentDate.toLocaleString('en-us', { weekday: 'long' });

  const monthNameElement = document.getElementById('month-name');
  const dayNameElement = document.getElementById('day-name');
  const dayNumberElement = document.getElementById('day-number');
  const yearElement = document.getElementById('year');

  monthNameElement.textContent = currentMonth;
  dayNameElement.textContent = currentDayName;
  dayNumberElement.textContent = currentDay;
  yearElement.textContent = currentYear;

  const eventList = document.createElement('ul');

  events.forEach(event => {
    const listItem = document.createElement('li');
    listItem.textContent = event.title;
    eventList.appendChild(listItem);
    listItem.addEventListener("click" ,function() {
      displayCalendarDetails(event)
    })
  });

  const calendarContainer = document.querySelector('.calendar-container');
  calendarContainer.appendChild(eventList);
}

function displayCalendarDetails(day){
  fetch( `http://localhost:3000/calendar/${day.id}`)
  .then(res=>res.json())
  .then(data=>{
    calendarDetails(day)
    
  })
}


// Fetch data and update the mini calendar
fetchData(updateCalendar);
function calendarDetails(day){
  let other=document.querySelector("#water")
  other.innerHTML=`
  <p>${day.program}</p>
  <p>${day.description}</p>
  <p>${day.participants}</p>
  <p>${day.location}</p>
  <p>${day.start_time}</p>
  <p>${day.end_time}</p>
  
  `

}