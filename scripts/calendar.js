// FOR CALENDAR MAKING EVENTS
function addEventInfo() {
  console.log("Add event info");

  let eventName = document.getElementById('event-name').value;
  let eventColour = document.getElementById('event-colour').value;
  let eventStart = document.getElementById('event-start').value;
  let eventEnd = document.getElementById('event-end').value;
  console.log(eventName, eventColour, eventStart, eventEnd);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {

      db.collection("users").doc(user.uid).collection("schoolCalendar").add({
        event: eventName,
        colour: eventColour,
        start: eventStart,
        end: eventEnd
      }).then((doc) => {
        console.log(doc.id);
        window.location.href = "/pages/calendar.html";
      })
    } else {
      console.log("No user signed in");
    }
  });
}
var nameEvent
var startEvent
var endEvent
// Gets the event info and throws it onto the calendar somehow
function getEventInfo() {

  db.collection("schoolCalendar").get()
    .then(allEvents => {
      allEvents.forEach(doc => {
        nameEvent = doc.data().event;
        startEvent = doc.data().start;
        endEvent = doc.data().end;

        calendar.addEvent({
          title: nameEvent,
          start: startEvent,
          end: endEvent
        })
      })
    })
}

getEventInfo()

// Second calendar for when the carousel works properly
document.addEventListener('DOMContentLoaded', function () {
  var calendarObj2 = document.getElementById('calendar2');

  var schoolCalendar = new FullCalendar.Calendar(calendarObj2, {

    plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'bootstrap',],
    weekNumbers: true,
    timeZone: 'PST',
    editable: true,
    eventLimit: true,
    selectable: true,
    eventClick: function (info) {
      info.jsEvent.preventDefault();

      if (info.event.url) {
        window.open(info.event.url);
      } else {
        Swal.fire(info.event.title, 'Start: ' + info.event.start, 'question');
      }
    },
    droppable: true,
    drop: function (info) {
      if (checkbox.checked) {
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    },

    customButtons: {
      addEventButton: {
        text: 'Add Event',
        click: function() {
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

    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth, timeGridWeek, timeGridDay',
    },

    footer: {
      center: 'addEventButton'
    },

    events: [
      {
        title: 'TEST',
        start: '2022-11-11',
        end: '2022-11-12'
      },
      {
        title: 'Long Event',
        start: '2020-02-07',
        end: '2020-02-10',
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: '2022-02-09T16:00:00'
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: '2020-02-16T16:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2022-11-29'
      }
    ]
  });
  
  schoolCalendar.render();
});
// Calendar for when carousel works correctly
document.addEventListener('DOMContentLoaded', function () {
  var calendarObj3 = document.getElementById('calendar3');

  var workCalendar = new FullCalendar.Calendar(calendarObj3, {

    plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'bootstrap',],
    weekNumbers: true,
    timeZone: 'PST',
    editable: true,
    eventLimit: true,
    selectable: true,
    eventClick: function (info) {
      info.jsEvent.preventDefault();

      if (info.event.url) {
        window.open(info.event.url);
      } else {
        Swal.fire(info.event.title, 'Start: ' + info.event.start, 'question');
      }
    },
    droppable: true,
    drop: function (info) {
      if (checkbox.checked) {
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    },

    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth, timeGridWeek, timeGridDay',
    },

    footer: {

    },

    events: [
      {
        title: eventName,
        start: eventStart,
        end: eventEnd
      },
      {
        title: 'Long Event',
        start: '2020-02-07',
        end: '2020-02-10',
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: '2022-02-09T16:00:00'
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: '2020-02-16T16:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2022-11-29'
      }
    ]
  });
  
  workCalendar.render();
});

// First calendar made
document.addEventListener('DOMContentLoaded', function () {
  var calendarObj = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarObj, {

    plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'bootstrap',],
    weekNumbers: true,
    timeZone: 'PST',
    editable: true,
    eventLimit: true,
    selectable: true,
    eventClick: function (info) {
      info.jsEvent.preventDefault();

      if (info.event.url) {
        window.open(info.event.url);
      } else {
        Swal.fire(info.event.title, 'Start: ' + info.event.start, 'question');
      }
    },
    droppable: true,
    drop: function (info) {
      if (checkbox.checked) {
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    },

    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth, timeGridWeek, timeGridDay',
    },

    footer: {

    },

    events: [
      {
        title: 'TEST',
        start: '2022-11-28',
        end: '2022-11-30'
      },
      {
        title: 'Long Event',
        start: '2020-02-07',
        end: '2020-02-10',
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: '2022-02-09T16:00:00'
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: '2020-02-16T16:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: '2022-11-29'
      }
    ]
  });

  calendar.render();
});