document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
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
        SVGFEDropShadowElement.fire(info.event.title, 'Start: ' + info.event.start, 'question');
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
        title: 'Conference',
        start: '2020-02-11',
        end: '2020-02-13'
      },
      {
        title: 'Meeting',
        start: '2020-02-12T10:30:00',
        end: '2020-02-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2020-02-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2020-02-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: '2020-02-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: '2020-02-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: '2020-02-13T07:00:00'
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