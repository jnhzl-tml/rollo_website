// ============================================
// ROLLO WEBSITE - script.js
// This one file is used by all 5 pages.
// ============================================


// ---------- 1. HAMBURGER MENU ----------
// (the button only shows on tablet and mobile)

var menuButton = document.getElementById("menuButton");
var menu = document.getElementById("menu");

// when the hamburger button is clicked, open or close the menu
menuButton.onclick = function () {
  menu.classList.toggle("open");        // show / hide the menu
  menuButton.classList.toggle("open");  // turn the 3 lines into an X
};

// when a link inside the menu is clicked, close the menu
var menuLinks = menu.getElementsByTagName("a");

for (var i = 0; i < menuLinks.length; i++) {
  menuLinks[i].onclick = function () {
    menu.classList.remove("open");
    menuButton.classList.remove("open");
  };
}


// ---------- 2. VIDEO PLAY BUTTON (home page only) ----------

var video = document.getElementById("video");
var playButton = document.getElementById("playButton");

if (video) {
  // click the big play button -> play the video
  playButton.onclick = function () {
    video.play();
  };

  // hide the big button while the video is playing
  video.onplay = function () {
    playButton.style.display = "none";
  };

  // show it again when the video is paused or finished
  video.onpause = function () {
    playButton.style.display = "block";
  };
}


// ---------- 3. ORDER FORM (order form page only) ----------

var orderForm = document.getElementById("orderForm");

if (orderForm) {

  orderForm.onsubmit = function (event) {

    var message = document.getElementById("message");

    // the ids of all the boxes we need to check
    var boxes = ["name", "email", "contact", "roll", "quantity", "payment", "delivery"];
    var allFilled = true;

    // go through each box, red border if it is empty
    for (var i = 0; i < boxes.length; i++) {
      var box = document.getElementById(boxes[i]);

      if (box.value == "") {
        box.classList.add("wrong");
        allFilled = false;
      } else {
        box.classList.remove("wrong");
      }
    }

    // stop the form from sending if something is missing
    if (allFilled == false) {
      message.innerHTML = "Please fill in all the boxes.";
      event.preventDefault();
      return;
    }

    // simple email check
    var email = document.getElementById("email").value;
    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
      message.innerHTML = "Please enter a valid e-mail address.";
      document.getElementById("email").classList.add("wrong");
      event.preventDefault();
      return;
    }

    // contact number should have at least 10 digits
    var contact = document.getElementById("contact").value;
    if (contact.length < 10) {
      message.innerHTML = "Please enter a valid contact number.";
      document.getElementById("contact").classList.add("wrong");
      event.preventDefault();
      return;
    }

    // quantity must be 1 or more
    var quantity = document.getElementById("quantity").value;
    if (quantity < 1) {
      message.innerHTML = "Quantity must be 1 or more.";
      document.getElementById("quantity").classList.add("wrong");
      event.preventDefault();
      return;
    }

    // everything is OK - the form now sends to rollocoph@gmail.com
    message.style.color = "green";
    message.innerHTML = "Sending your order...";
  };
}


// ---------- 4. FOOTER YEAR ----------

document.getElementById("year").innerHTML = new Date().getFullYear();
