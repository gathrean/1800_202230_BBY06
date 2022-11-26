// FOR CALENDAR MAKING EVENTS
// function addEventInfo() {
//   console.log("Add event info");

//   let eventName = document.getElementById('event-name').value;
//   let eventColour = document.getElementById('event-colour').value;
//   let eventStart = document.getElementById('event-start').value;
//   let eventEnd = document.getElementById('event-end').value;
//   console.log(eventName, eventColour, eventStart, eventEnd);

//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {

//       db.collection("users").doc(user.uid).collection("schoolCalendar").add({
//         event: eventName,
//         colour: eventColour,
//         start: eventStart,
//         end: eventEnd
//       }).then((doc) => {
//         console.log(doc.id);
//         window.location.href = "/pages/calendar.html";
//       })
//     } else {
//       console.log("No user signed in");
//     }
//   });
// }

// Global variables (instance data)
var eventName
var dateStart
var dateE
// Add event from the school calendar to user's subcollection
function addSchoolEvent() {
    console.log("Add event info");
    // Changes directory to user
    firebase.auth().onAuthStateChanged(user => {
      // If user is signed in, get schoolCalendar subcollection
      if (user) {
        // Add a new schoolCalendar doc
        db.collection("users").doc(user.uid).collection("schoolCalendar").add({
          event: eventName,
          start: dateStart,
          end: dateE
        }).then((doc) => {
          // Print doc id in browser console and ideally refresh page to update calendar
          console.log(doc.id);
        //   window.location.href = "/pages/calendar.html"; will uncomment this once info is read from database and displayed on calendar
        })
      } else {
        console.log("No user signed in");
      }
    });
  }
// Creates the school calendar
document.addEventListener('DOMContentLoaded', function () {
  // Gets id='schoolCalendar'
  var calendarEl = document.getElementById('schoolCalendar');
  // Calendar generation
  var schoolCalendar = new FullCalendar.Calendar(calendarEl, {
      // Adds buttons to the calendar header
      headerToolbar: {
          left: 'prevYear,prev,next,nextYear',
          center: 'title',
          right: 'today,dayGridMonth,dayGridWeek,dayGridDay'
      },
      // Adds buttons to the footer
      footerToolbar: {
        center: 'addEventButton' 
      },
      // Code needed to create the add event button
      customButtons: {
          addEventButton: {
              // Title of button
              text: 'Add Event',
              // Asks user for event name, start and end date
              click: function () {
                  var event = prompt('Enter the event Name');
                  eventName = event;
                  var dateStr = prompt('Enter the start date in YYYY-MM-DD format');
                  dateStart = new Date(dateStr + 'T00:00:00'); // will be in local time
                  var dateEnd = prompt('Enter the end date in YYYY-MM-DD format');
                  dateE = new Date(dateEnd + 'T00:00:00'); // will be in local time

                  if (!isNaN(dateStart.valueOf())) { // valid?
                    // Adds the event to the calendar
                      schoolCalendar.addEvent({
                          title: eventName,
                          start: dateStart,
                          end: dateE,
                          allDay: true
                      });
                      // Calls function above
                      addSchoolEvent();
                  }
              }
          }
      },
      // Sets the timezone to pst
      timeZone: 'PST',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      selectable: true, // select calendar cells

      // preset calendar events
      events: [
          {
              title: 'All Day Event',
              start: '2022-1-01'
          },
          {
              title: 'Long Event',
              start: '2022-11-07',
              end: '2020-09-10'
          },
          {
              groupId: 999,
              title: 'Repeating Event',
              start: '2022-11-09T16:00:00'
          },
          {
              groupId: 999,
              title: 'Repeating Event',
              start: '2022-11-16T16:00:00'
          },
          {
              title: 'Conference',
              start: '2020-09-11',
              end: '2020-09-13'
          },
          {
              title: 'Meeting',
              start: '2020-09-12T10:30:00',
              end: '2020-09-12T12:30:00'
          },
          {
              title: 'Lunch',
              start: '2020-09-12T12:00:00'
          },
          {
              title: 'Meeting',
              start: '2020-09-12T14:30:00'
          },
          {
              title: 'Happy Hour',
              start: '2020-09-12T17:30:00'
          },
          {
              title: 'Dinner',
              start: '2020-09-12T20:00:00'
          },
          {
              title: 'Birthday Party',
              start: '2020-09-13T07:00:00'
          },
          {
              title: 'Click for Google',
              url: 'http://google.com/',
              start: '2020-09-28'
          }
      ]
  });
  schoolCalendar.render();
});

// Second calendar for when carousel works
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl2 = document.getElementById('calendar3');
  
    var calendar3 = new FullCalendar.Calendar(calendarEl2, {
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today addEventButton',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        customButtons: {
            addEventButton: {
                text: 'Add Event',
                click: function () {
                    var dateStr = prompt('Enter a date in YYYY-MM-DD format');
                    var date = new Date(dateStr + 'T00:00:00'); // will be in local time
  
                    if (!isNaN(date.valueOf())) { // valid?
                        calendar.addEvent({
                            title: 'dynamic event',
                            start: date,
                            allDay: true
                        });
                    }
                }
            }
        },
        timeZone: 'PST',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
  
        events: [
            {
                title: 'All Day Event',
                start: '2022-1-01'
            },
            {
                title: 'Long Event',
                start: '2022-11-07',
                end: '2020-09-10'
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2022-11-09T16:00:00'
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2022-11-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2020-09-11',
                end: '2020-09-13'
            },
            {
                title: 'Meeting',
                start: '2020-09-12T10:30:00',
                end: '2020-09-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2020-09-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2020-09-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2020-09-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2020-09-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2020-09-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2020-09-28'
            }
        ]
    });
  
    calendar3.render();
  });

// Second calendar for when the carousel works properly
// document.addEventListener('DOMContentLoaded', function () {
//   var calendarObj2 = document.getElementById('calendar2');

//   var schoolCalendar = new FullCalendar.Calendar(calendarObj2, {

//     plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'bootstrap',],
//     weekNumbers: true,
//     timeZone: 'PST',
//     editable: true,
//     eventLimit: true,
//     selectable: true,
//     eventClick: function (info) {
//       info.jsEvent.preventDefault();

//       if (info.event.url) {
//         window.open(info.event.url);
//       } else {
//         Swal.fire(info.event.title, 'Start: ' + info.event.start, 'question');
//       }
//     },
//     droppable: true,
//     drop: function (info) {
//       if (checkbox.checked) {
//         info.draggedEl.parentNode.removeChild(info.draggedEl);
//       }
//     },

//     header: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth, timeGridWeek, timeGridDay',
//     },

//     footer: {
//       center: 'addEventButton'
//     },

//     events: getEventInfo({
//       title: nameEvent,
//       start: startEvent,
//       end: endEvent
//     })
//   });
  
//   schoolCalendar.render();
// });
// Calendar for when carousel works correctly
// document.addEventListener('DOMContentLoaded', function () {
//   var calendarObj3 = document.getElementById('calendar3');

//   var workCalendar = new FullCalendar.Calendar(calendarObj3, {

//     plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'bootstrap',],
//     weekNumbers: true,
//     timeZone: 'PST',
//     editable: true,
//     eventLimit: true,
//     selectable: true,
//     eventClick: function (info) {
//       info.jsEvent.preventDefault();

//       if (info.event.url) {
//         window.open(info.event.url);
//       } else {
//         Swal.fire(info.event.title, 'Start: ' + info.event.start, 'question');
//       }
//     },
//     droppable: true,
//     drop: function (info) {
//       if (checkbox.checked) {
//         info.draggedEl.parentNode.removeChild(info.draggedEl);
//       }
//     },

//     header: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth, timeGridWeek, timeGridDay',
//     },

//     footer: {

//     },

//     events: [
//       {
//         title: eventName,
//         start: eventStart,
//         end: eventEnd
//       },
//       {
//         title: 'Long Event',
//         start: '2020-02-07',
//         end: '2020-02-10',
//       },
//       {
//         groupId: 999,
//         title: 'Repeating Event',
//         start: '2022-02-09T16:00:00'
//       },
//       {
//         groupId: 999,
//         title: 'Repeating Event',
//         start: '2020-02-16T16:00:00'
//       },
//       {
//         title: 'Click for Google',
//         url: 'http://google.com/',
//         start: '2022-11-29'
//       }
//     ]
//   });
  
//   workCalendar.render();
// });

// // First calendar made
// document.addEventListener('DOMContentLoaded', function () {
//   var calendarObj = document.getElementById('calendar');

//   var calendar = new FullCalendar.Calendar(calendarObj, {

//     plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'bootstrap',],
//     weekNumbers: true,
//     timeZone: 'PST',
//     editable: true,
//     eventLimit: true,
//     selectable: true,
//     eventClick: function (info) {
//       info.jsEvent.preventDefault();

//       if (info.event.url) {
//         window.open(info.event.url);
//       } else {
//         Swal.fire(info.event.title, 'Start: ' + info.event.start, 'question');
//       }
//     },
//     droppable: true,
//     drop: function (info) {
//       if (checkbox.checked) {
//         info.draggedEl.parentNode.removeChild(info.draggedEl);
//       }
//     },

//     header: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth, timeGridWeek, timeGridDay',
//     },

//     footer: {

//     },

//     events: [
//       {
//         title: 'TEST',
//         start: '2022-11-28',
//         end: '2022-11-30'
//       },
//       {
//         title: 'Long Event',
//         start: '2020-02-07',
//         end: '2020-02-10',
//       },
//       {
//         groupId: 999,
//         title: 'Repeating Event',
//         start: '2022-02-09T16:00:00'
//       },
//       {
//         groupId: 999,
//         title: 'Repeating Event',
//         start: '2020-02-16T16:00:00'
//       },
//       {
//         title: 'Click for Google',
//         url: 'http://google.com/',
//         start: '2022-11-29'
//       }
//     ]
//   });

//   calendar.render();
// });