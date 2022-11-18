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
        title: 'Dinner with JAY-Z',
        start: '2022-11-16'
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

var events = document.getElementById('events');
var checkbox = document.getElementById('move-event');
var input = document.getElementById('input-event');
var button = document.getElementById('add-event');

new FullCalendarInteraction.Draggable(events, {
  itemSelector: 'fc-event',
  eventData: function (e) {
    return {
      title: e.innerText
    };
  }
})

button.addEventListener('click', function () {
  var div = document.createElement('div');
  var inval = document.createTextNode(input.value);
  div.className = 'fc-event';
  div.appendChild(inval);
  events.appendChild(div);
});