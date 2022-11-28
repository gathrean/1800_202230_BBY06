var userCalendarCollection

function addWorkEvent() {
    console.log("Add event info");
  
    let eventName = document.getElementById('event-name').value;
    let eventStart = document.getElementById('event-start').value;
    let eventEnd = document.getElementById('event-end').value;
    console.log(eventName, eventStart, eventEnd);
  
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
  
      userCalendarCollection = db.collection("users").doc(user.uid).collection("workCalendar")
      userCalendarCollection.add({
          title: eventName,
          start: eventStart,
          end: eventEnd,
        }).then((doc) => {
          console.log(doc.id);
        })
  
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
     events: [],


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
 workCalendar.render();
}
createworkCalendar();