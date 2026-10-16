// ROLLO WEBSITE - script.js

// HAMBURGER MENU (tablet and mobile)

var menuButton = document.getElementById("menuButton");
var menu = document.getElementById("menu");

menuButton.onclick = function () {
  menu.classList.toggle("open");        
  menuButton.classList.toggle("open");  
};

var menuLinks = menu.getElementsByTagName("a");

for (var i = 0; i < menuLinks.length; i++) {
  menuLinks[i].onclick = function () {
    menu.classList.remove("open");
    menuButton.classList.remove("open");
  };
}


// VIDEO PLAY BUTTON (home page only) 

var video = document.getElementById("video");
var playButton = document.getElementById("playButton");

if (video) {
  playButton.onclick = function () {
    video.play();
  };

  video.onplay = function () {
    playButton.style.display = "none";
  };

  video.onpause = function () {
    playButton.style.display = "block";
  };
}


// ORDER FORM (order form page only) 

var orderForm = document.getElementById("orderForm");

if (orderForm) {

  orderForm.onsubmit = function (event) {

    var message = document.getElementById("message");

    var boxes = ["name", "email", "contact", "roll", "quantity", "payment", "delivery"];
    var allFilled = true;

    for (var i = 0; i < boxes.length; i++) {
      var box = document.getElementById(boxes[i]);

      if (box.value == "") {
        box.classList.add("wrong");
        allFilled = false;
      } else {
        box.classList.remove("wrong");
      }
    }

    if (allFilled == false) {
      message.innerHTML = "Please fill in all the boxes.";
      event.preventDefault();
      return;
    }

    var email = document.getElementById("email").value;
    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
      message.innerHTML = "Please enter a valid e-mail address.";
      document.getElementById("email").classList.add("wrong");
      event.preventDefault();
      return;
    }

    var contact = document.getElementById("contact").value;
    if (contact.length < 10) {
      message.innerHTML = "Please enter a valid contact number.";
      document.getElementById("contact").classList.add("wrong");
      event.preventDefault();
      return;
    }

    var quantity = document.getElementById("quantity").value;
    if (quantity < 1) {
      message.innerHTML = "Quantity must be 1 or more.";
      document.getElementById("quantity").classList.add("wrong");
      event.preventDefault();
      return;
    }

    message.style.color = "green";
    message.innerHTML = "Sending your order...";
  };
}

// FOOTER YEAR 
document.getElementById("year").innerHTML = new Date().getFullYear();
