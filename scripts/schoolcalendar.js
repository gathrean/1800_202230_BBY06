// Global variables (instance data)
var eventName
var dateStart
var dateE
var schoolEvents;
var userCalendarCollection
// Create a school event
function addSchoolEvent() {
  console.log("Add event info");
  // Gets the value from each input from add event button
  let eventName = document.getElementById('event-name').value;
  let eventStart = document.getElementById('event-start').value;
  let eventEnd = document.getElementById('event-end').value;
  console.log(eventName, eventStart, eventEnd);

  // Checks for current user
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Directs to school calendar subcollection
    userCalendarCollection = db.collection("users").doc(user.uid).collection("schoolCalendar")
    // Adds each input to a new doc
    userCalendarCollection.add({
        title: eventName,
        start: eventStart,
        end: eventEnd,
      }).then((doc) => {
        console.log(doc.id);
      })
      // Adds each input to the calendar
      schoolCalendar.addEvent({
        title: eventName,
        start: eventStart,
        end: eventEnd,
        allDay: true
      })
    } else {
      console.log("No user signed in");
    }
  });
}
// Add event from the school calendar to user's subcollection
// function addSchoolEvent() {
//     console.log("Add event info");
//     // Changes directory to user
//     firebase.auth().onAuthStateChanged(user => {
//       // If user is signed in, get schoolCalendar subcollection
//       if (user) {
//         // Add a new schoolCalendar doc
//         db.collection("users").doc(user.uid).collection("schoolCalendar").add({
//           event: eventName,
//           start: dateStart,
//           end: dateE
//         }).then((doc) => {
//           // Print doc id in browser console and ideally refresh page to update calendar
//           console.log(doc.id);
//         //   window.location.href = "/pages/calendar.html"; will uncomment this once info is read from database and displayed on calendar
//         })
//       } else {
//         console.log("No user signed in");
//       }
//     });
// }

// Reads docs from subcollection
firebase.auth().onAuthStateChanged(user => {
    if (user) {
         db.collection("users").doc(user.uid).collection("schoolCalendar")
            .get().then(querySnapshot => {
              // For each doc in school calendar subcollection, add to a js array
                querySnapshot.forEach(doc => {
                    let check = doc.data().title;
                    let check2 = doc.data().start;
                    let check3 = doc.data().end;
                    schoolEvents = [] + schoolEvents.push({title: check, start: check2, end: check3});
                })
                
            })
    }
})

console.log(schoolEvents);
// Test array, this reads correctly in events: below, but schoolEvents doesnt
var y = [{title: 'workout', start: '2022-11-16', end: '2022-11-18'},
{title: 'test', start: '2022-11-19', end: '2022-11-22'}]
console.log(y);



var schoolCalendar
var newEventName
var newEventStart
var newEventEnd


function createSchoolCalendar(schoolEvents) {
     // Gets id='schoolCalendar'
  var calendarEl = document.getElementById('schoolCalendar');
  // Calendar generation
  schoolCalendar = new FullCalendar.Calendar(calendarEl, {
      // Adds buttons to the calendar header
      headerToolbar: {
          left: 'prevYear,prev,next,nextYear',
          center: 'title',
          right: 'today,dayGridMonth,dayGridWeek,dayGridDay'
      },
      // Adds buttons to the footer
      footerToolbar: {
      },

      // Sets the timezone to pst
      timeZone: 'PST',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      selectable: true, // select calendar cells
      events: schoolEvents,


      eventClick: function editEvent(event) {
        var startDate = prompt('Enter starting date in YYYY-MM-DD form');
        newEventStart = (startDate + 'T00-00-00');
        var endDate = prompt('Enter an end date in YYYY-MM-DD form');
        newEventEnd = endDate;
        console.log(newEventStart, newEventEnd);
        event.setStart(newEventStart, false),
        event.setEnd(newEventEnd)
    },
      
  });
  schoolCalendar.render();
}
createSchoolCalendar();


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