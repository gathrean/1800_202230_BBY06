var userCalendarCollection
var workCalendar
function addWorkEvent() {
    console.log("Add event info");
  
    let eventName = document.getElementById('event-name').value;
    let eventStart = document.getElementById('event-start').value;
    let eventEnd = document.getElementById('event-end').value;
    console.log(eventName, eventStart, eventEnd);
  
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Adds the event to firebase
      userCalendarCollection = db.collection("users").doc(user.uid).collection("workCalendar")
      userCalendarCollection.add({
          title: eventName,
          start: eventStart,
          end: eventEnd,
        }).then((doc) => {
          console.log(doc.id);
        })
        // Adds the event to the calendar
        workCalendar.addEvent({
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

  var workEvents = []
  // Reads docs from subcollection
  firebase.auth().onAuthStateChanged(user => {
      if (user) {
           db.collection("users").doc(user.uid).collection("workCalendar")
              .get().then(querySnapshot => {
                // For each doc in work calendar subcollection, add to a js array
                  querySnapshot.forEach(doc => {
                      let eventTitle = doc.data().title;
                      let eventStart = doc.data().start;
                      let eventEnd = doc.data().end;
                      workEvents = workEvents.push({title: eventTitle, start: eventStart, end: eventEnd});
                  })
              })
      }
  })
  
  /* So the calendar API accepts an array of events to post onto the calendar, which the function above does,
   but for some reason it won't read into the events section below. So the calendar doesn't save the events on refresh (James) */
  console.log(workEvents);
  // Test array, this reads correctly in events: below, but workEvents doesnt
  var y = [{title: 'workout', start: '2022-11-16', end: '2022-11-18'},
  {title: 'test', start: '2022-11-19', end: '2022-11-22'}]
  console.log(y);



// Creates the work Calendar
function createworkCalendar() {
    // Gets id='workCalendar'
 var calendarEl = document.getElementById('workCalendar');
 // Calendar generation
 workCalendar = new FullCalendar.Calendar(calendarEl, {
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
     events: workEvents,
     
 });
 workCalendar.render();
}
createworkCalendar();