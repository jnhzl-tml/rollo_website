// ============================================
// ROLLO WEBSITE - script.js
// ============================================

// ---------- HAMBURGER MENU ----------
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

// ---------- VIDEO PLAY BUTTON (home page only) ----------

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


// ---------- ORDER FORM (order form page only) ----------

var orderForm = document.getElementById("orderForm");

if (orderForm) {

  var message = document.getElementById("message");
  var submitButton = document.getElementById("submitButton");
  var thanks = document.getElementById("thanks");

  // the ids of all the boxes we need to check
  var boxes = ["name", "email", "contact", "roll", "quantity", "payment", "delivery"];

  // this function looks at ONE box and gives back an error text
  // (if the box is OK it gives back an empty text "")
  function getError(id) {
    var value = document.getElementById(id).value.trim();

    if (id == "name") {
      if (value == "") { return "Please enter your name."; }
      if (value.length < 2) { return "Your name is too short."; }
    }

    if (id == "email") {
      if (value == "") { return "Please enter your e-mail address."; }
      var at = value.indexOf("@");
      var dot = value.lastIndexOf(".");
      if (at < 1 || dot < at + 2 || dot == value.length - 1 || value.indexOf(" ") != -1) {
        return "Please enter a valid e-mail, like juan@gmail.com.";
      }
    }

    if (id == "contact") {
      if (value == "") { return "Please enter your contact number."; }
      
      var number = value.split(" ").join("").split("-").join("");
      if (number.indexOf("+63") == 0) {
        number = "0" + number.substring(3);
      }
      if (isNaN(number) || number.length != 11 || number.indexOf("09") != 0) {
        return "Please enter an 11-digit number that starts with 09.";
      }
    }

    if (id == "roll") {
      if (value == "") { return "Please choose a cinnamon roll flavor."; }
    }

    if (id == "quantity") {
      if (value == "") { return "Please enter how many rolls you want."; }
      if (isNaN(value) || value < 1 || value > 100 || value.indexOf(".") != -1) {
        return "Quantity must be a whole number from 1 to 100.";
      }
    }

    if (id == "payment") {
      if (value == "") { return "Please choose a mode of payment."; }
    }

    if (id == "delivery") {
      if (value == "") { return "Please choose a mode of delivery."; }
    }

    return "";
  }

  // this function checks a box and shows the red / green result under it
  function checkBox(id) {
    var box = document.getElementById(id);
    var errorText = getError(id);
    var errorSpan = document.getElementById(id + "-error");

    if (errorText != "") {
      box.classList.add("wrong");
      box.classList.remove("right");
      errorSpan.innerHTML = errorText;
      return false;
    } else {
      box.classList.remove("wrong");
      box.classList.add("right");
      errorSpan.innerHTML = "";
      return true;
    }
  }

  // check each box when the user leaves it (blur), types in it (input)
  // or picks something (change)
  function watchBox(id) {
    var box = document.getElementById(id);
    box.onblur = function () { checkBox(id); };
    box.oninput = function () { checkBox(id); };
    box.onchange = function () { checkBox(id); };
  }

  for (var i = 0; i < boxes.length; i++) {
    watchBox(boxes[i]);
  }

  // when the Submit button is clicked
  orderForm.onsubmit = function (event) {
    // we send the order ourselves (below), so stop the normal sending
    event.preventDefault();

    var allGood = true;
    var firstWrong = "";

    for (var j = 0; j < boxes.length; j++) {
      if (checkBox(boxes[j]) == false) {
        allGood = false;
        if (firstWrong == "") {
          firstWrong = boxes[j];
        }
      }
    }

    if (allGood == false) {
      message.className = "";
      message.innerHTML = "Please fix the boxes marked in red.";
      document.getElementById(firstWrong).focus();
      return;
    }

    // everything is OK, send the order to rollocoph@gmail.com
    message.className = "good";
    message.innerHTML = "Sending your order...";
    submitButton.disabled = true;

    fetch("https://formsubmit.co/ajax/rollocoph@gmail.com", {
      method: "POST",
      body: new FormData(orderForm),
      headers: { "Accept": "application/json" }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        submitButton.disabled = false;
        if (result.success == "true" || result.success == true) {
          // hide the form, show the thank you message with the buttons
          orderForm.hidden = true;
          thanks.hidden = false;
          message.innerHTML = "";
          thanks.scrollIntoView();
        } else {
          message.className = "";
          message.innerHTML = "Sorry, the order was not sent. Please try again or message us on Instagram.";
        }
      })
      .catch(function () {
        submitButton.disabled = false;
        message.className = "";
        message.innerHTML = "Sorry, the order was not sent. Please check your internet and try again.";
      });
  };

  // "Order Again" button: empty the form and show it again
  document.getElementById("orderAgain").onclick = function () {
    orderForm.reset();
    for (var k = 0; k < boxes.length; k++) {
      document.getElementById(boxes[k]).classList.remove("right");
      document.getElementById(boxes[k]).classList.remove("wrong");
    }
    thanks.hidden = true;
    orderForm.hidden = false;
  };
}


// ---------- FOOTER YEAR ----------

document.getElementById("year").innerHTML = new Date().getFullYear();
