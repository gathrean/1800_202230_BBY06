$(document).ready(function () {

    "use strict";

    var todo = function () {
        $('.todo-list .todo-item input').click(function () {
            if ($(this).is(':checked')) {
                $(this).parent().parent().parent().toggleClass('complete');
            } else {
                $(this).parent().parent().parent().toggleClass('complete');
            }
        });

        $('.todo-nav .all-task').click(function () {
            $('.todo-list').removeClass('only-active');
            $('.todo-list').removeClass('only-complete');
            $('.todo-nav li.active').removeClass('active');
            $(this).addClass('active');
        });

        $('.todo-nav .active-task').click(function () {
            $('.todo-list').removeClass('only-complete');
            $('.todo-list').addClass('only-active');
            $('.todo-nav li.active').removeClass('active');
            $(this).addClass('active');
        });

        $('.todo-nav .completed-task').click(function () {
            $('.todo-list').removeClass('only-active');
            $('.todo-list').addClass('only-complete');
            $('.todo-nav li.active').removeClass('active');
            $(this).addClass('active');
        });

        $('#uniform-all-complete input').click(function () {
            if ($(this).is(':checked')) {
                $('.todo-item .checker span:not(.checked) input').click();
            } else {
                $('.todo-item .checker span.checked input').click();
            }
        });

        $('.remove-todo-item').click(function () {
            $(this).parent().remove();
        });
    };

    todo();

    $(".add-task").keypress(function (e) {
        if ((e.which == 13) && (!$(this).val().length == 0)) {
            $('<div class="todo-item list-group-item"><div class="checker"><span class=""><input type="checkbox"></span></div> <span>' + $(this).val() + '</span> <a href="javascript:void(0);" class="float-right remove-todo-item"><i class="icon-close"></i></a></div>').insertAfter('.todo-list .todo-item:last-child');
            $(this).val('');
        } else if (e.which == 13) {
            alert('Please enter new task');
        }
        $(document).on('.todo-list .todo-item.added input').click(function () {
            if ($(this).is(':checked')) {
                $(this).parent().parent().parent().toggleClass('complete');
            } else {
                $(this).parent().parent().parent().toggleClass('complete');
            }
        });
        $('.todo-list .todo-item.added .remove-todo-item').click(function () {
            $(this).parent().remove();
        });
    });
});



// FOR TO-DO LIST
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
                window.location.href = "/pages/tasks.html";
            })
        } else {
            console.log("No user signed in");
        }
    });
}

////////////////////
// REFERENCE, A CODE COPY FROM THE PROFILE.HTML
/////////////////////
var currentUser;

function populateEventInfo() {
    firebase.auth().onAuthStateChanged((user) => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid).collection("schoolCalendar").doc(schoolCalendar.uid);
            //get the document for current user.
            currentUser.get().then((userDoc) => {
                //get the data fields of the user
                var eventColour = userDoc.data().colour;
                var eventName = userDoc.data().event;
                var eventStart = userDoc.data().start;
                var eventEnd = userDoc.data().event;

                //if the data fields are not empty, then write them in to the form.
                if (eventName != null) {
                    document.getElementById("event-name").value = eventName;
                }
                if (eventColour != null) {
                    document.getElementById("event-colour").value = eventColour;
                }
                if (eventStart != null) {
                    document.getElementById("event-start").value = eventStart;
                }
                if (eventEnd != null) {
                    document.getElementById("event-end").value = eventEnd;
                }
            });
        } else {
            // No user is signed in.
            console.log("No events");
        }
    });
}

//call the function to run it
populateInfo();

// function editUserInfo() {
//     //Enable the form fields
//     document.getElementById("personalInfoFields").disabled = false;
// }

// function saveUserInfo() {
//     userName = document.getElementById("nameInput").value; //get the value of the field with id="nameInput"
//     userSchool = document.getElementById("schoolInput").value; //get the value of the field with id="schoolInput"
//     userWork = document.getElementById("workInput").value; //get the value of the field with id="workInput"
//     userDescription = document.getElementById("description").value; //get the value of the field with the id="description"

//     currentUser
//         .update({
//             name: userName,
//             school: userSchool,
//             work: userWork,
//             description: userDescription,
//         })
//         .then(() => {
//             console.log("Document successfully updated!");
//         });
//     document.getElementById("personalInfoFields").disabled = true;
// }
