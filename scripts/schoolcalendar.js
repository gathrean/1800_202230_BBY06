var schoolCalendar
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
    var userCalendarCollection = db.collection("users").doc(user.uid).collection("schoolCalendar")
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

var schoolEvents = []
// Reads docs from subcollection
firebase.auth().onAuthStateChanged(user => {
    if (user) {
         db.collection("users").doc(user.uid).collection("schoolCalendar")
            .get().then(querySnapshot => {
              // For each doc in school calendar subcollection, add to a js array
                querySnapshot.forEach(doc => {
                    let eventTitle = doc.data().title;
                    let eventStart = doc.data().start;
                    let eventEnd = doc.data().end;
                    schoolEvents = schoolEvents.push({title: eventTitle, start: eventStart, end: eventEnd});
                })
            })
    }
})

/* So the calendar API accepts an array of events to post onto the calendar, which the function above does,
 but for some reason it won't read into the events section below. So the calendar doesn't save the events on refresh (James) */
console.log(schoolEvents);
// Test array, this reads correctly in events: below, but schoolEvents doesnt
var y = [{title: 'workout', start: '2022-11-16', end: '2022-11-18'},
{title: 'test', start: '2022-11-19', end: '2022-11-22'}]
console.log(y);


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
      events: [],
  });
  schoolCalendar.render();
}
createSchoolCalendar();