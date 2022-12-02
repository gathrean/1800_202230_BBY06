var currentUser;

function populateInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var userName = userDoc.data().name;
        var userSchool = userDoc.data().school;
        var userCity = userDoc.data().city;
        var userWork = userDoc.data().work;
        var userDescription = userDoc.data().description;
        var subsectionSchool = userDoc.data().subSchool;
        var subsectionProgram = userDoc.data().subProgram
        var subsectionWork = userDoc.data().subWork;
        var colour = userDoc.data().colourchoice;

        //if the data fields are not empty, then write them in to the form.
        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (userSchool != null) {
          document.getElementById("schoolInput").value = userSchool;
        }
        if (userCity != null) {
          document.getElementById("cityInput").value = userCity;
        }
        if (userWork != null) {
          document.getElementById("workInput").value = userWork;
        }
        if (userDescription != null) {
          document.getElementById("description").value = userDescription;
        }
        if (subsectionSchool != null) {
          document.getElementById("typetextfield").value = subsectionSchool;
        }
        if (subsectionProgram != null) {
          document.getElementById("typetextfieldProgram").value = subsectionProgram;
        }
        if (subsectionWork != null) {
          document.getElementById("typetextfieldWork").value = subsectionWork;
        }
        if (colour != null) {
          document.getElementById("colourTheme").value = colour;
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it
populateInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = false;
}

function saveUserInfo() {
  userName = document.getElementById("nameInput").value; //get the value of the field with id="nameInput"
  userSchool = document.getElementById("schoolInput").value; //get the value of the field with id="schoolInput"
  userWork = document.getElementById("workInput").value; //get the value of the field with id="workInput"
  userDescription = document.getElementById("description").value; //get the value of the field with the id="description"
  subsectionSchool = document.getElementById("typetextfield").value; //get the value of the field with the id="textfieldSchool"
  subsectionProgram = document.getElementById("typetextfieldProgram").value; //get the value of the field with the id="typetextfieldProgram"
  subsectionWork = document.getElementById("typetextfieldWork").value; //get the value of the field with the id="textfieldWork"
  colour = document.getElementById("colourTheme").value; //get the value of the field with the id="colourTheme"

  // Updates the firestore database with the following fields.
  currentUser
    .update({
      name: userName,
      school: userSchool,
      work: userWork,
      description: userDescription,
      subSchool: subsectionSchool,
      subProgram: subsectionProgram,
      subWork: subsectionWork,
      colourchoice: colour
    })
    .then(() => {
      console.log("Document successfully updated!");
    });
  document.getElementById("personalInfoFields").disabled = true;
}

// If the user selects N/A for being in school, then the sub-categories will dissapear.
$("#schoolInput").change(function() {
  if ($(this).val() == "Full-Time") {
    $('#textfieldSchool').show();
    $('#typetextfield').attr('required', '');
    $('#typetextfield').attr('data-error', 'This field is required.');
  } else if ($(this).val() == "Part-Time") {
    $('#textfieldSchool').show();
    $('#typetextfield').attr('required', '');
    $('#typetextfield').attr('data-error', 'This field is required.');
  } else {
    $('#textfieldSchool').hide();
    $('#typetextfield').removeAttr('required');
    $('#typetextfield').removeAttr('data-error');
  }
});

// If the user selects N/A for currently working, then the sub-categories will dissapear.
$("#workInput").change(function() {
  if ($(this).val() == "Full-Time") {
    $('#textfieldWork').show();
    $('#typetextfieldWork').attr('required', '');
    $('#typetextfieldWork').attr('data-error', 'This field is required.');
  } else if ($(this).val() == "Part-Time") {
    $('#textfieldWork').show();
    $('#typetextfieldWork').attr('required', '');
    $('#typetextfieldWork').attr('data-error', 'This field is required.');
  } else {
    $('#textfieldWork').hide();
    $('#typetextfieldWork').removeAttr('required');
    $('#typetextfieldWork').removeAttr('data-error');
  }
});

// This allows the user to change the background colour on the user profile.
// Function is incomplete as it doesn't save the user's choice.
function changeColour(event) {
  var colour = event.value;
  document.getElementsByTagName('body')[0].style.backgroundColor = colour;
    }