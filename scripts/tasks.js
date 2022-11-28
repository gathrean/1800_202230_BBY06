function addTask() {
    console.log("Add task");
    // Gets the value from the task text
    let taskname = document.getElementById('taskInput').value;
    console.log(taskname);

    // Checks for current user
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Directs to school calendar subcollection
            db.collection("users").doc(user.uid).collection("tasks")
                // Adds each input to a new doc
                .add({
                    task: taskname,
                    time: firebase.firestore.FieldValue.serverTimestamp()
                }).then((doc) => {
                    console.log(doc.id);
                    window.location.href = "/pages/tasks.html"
                })
        } else {
            console.log("No user signed in");
        }
    });
}

function populateTasks() {
    // Checks for current user
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let taskCardTemplate = document.getElementById("taskCardTemplate");
            let taskCardGroup = document.getElementById("taskCardGroup");

            db.collection("users").doc(user.uid).collection("tasks").get()
                .then(allTasks => {
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
