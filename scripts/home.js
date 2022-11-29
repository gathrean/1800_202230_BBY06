function populateTasks() {
    // Checks for current user
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let taskCardTemplate = document.getElementById("taskCardTemplate");
            let taskCardGroup = document.getElementById("taskCardGroup");

            db.collection("users").doc(user.uid).collection("tasks")
                .orderBy("time").limit(3).get().then(allTasks => {
                    allTasks.forEach(doc => {
                        let taskName = doc.data().task; // Gets task field
                        let testTaskCard = taskCardTemplate.content.cloneNode(true);
                        testTaskCard.querySelector('.task-title').innerHTML = taskName;
                        taskCardGroup.appendChild(testTaskCard);
                    })
                })
        } else {
            console.log("No user signed in");
            window.location.href = "start.html"
        }
    });
}
populateTasks();

function populateSchoolEvents() {
    // Checks for current user
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let schoolEventsCardTemplate = document.getElementById("schoolEventsTemplate");
            let schoolEventsCardGroup = document.getElementById("schoolEventsCardGroup");

            db.collection("users").doc(user.uid).collection("schoolCalendar")
                .orderBy("end").limit(3).get().then(allTasks => {
                    allTasks.forEach(doc => {
                        let eventName = doc.data().title; // Gets title field
                        let schoolEventsCard = schoolEventsCardTemplate.content.cloneNode(true);
                        schoolEventsCard.querySelector('.schoolEvent-title').innerHTML = eventName;
                        schoolEventsCardGroup.appendChild(schoolEventsCard);
                    })
                })
        } else {
            console.log("No user signed in");
            window.location.href = "start.html"
        }
    });
}
populateSchoolEvents();

function populateWorkEvents() {
    // Checks for current user
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let workEventsCardTemplate = document.getElementById("workEventsTemplate");
            let workEventsCardGroup = document.getElementById("workEventsCardGroup");

            db.collection("users").doc(user.uid).collection("workCalendar")
                .orderBy("end").limit(3).get().then(allTasks => {
                    allTasks.forEach(doc => {
                        let eventName = doc.data().title; // Gets title field
                        let workEventsCard = workEventsCardTemplate.content.cloneNode(true);
                        workEventsCard.querySelector('.workEvent-title').innerHTML = eventName;
                        workEventsCardGroup.appendChild(workEventsCard);
                    })
                })
        } else {
            console.log("No user signed in");
            window.location.href = "start.html"
        }
    });
}
populateWorkEvents();
