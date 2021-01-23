
var checcc = true;

$(document).ready(function(){

  $(this).scrollTop(0);

  $("#topp").fadeOut();

});




//dsfsdfsdf


//sdfsfsdfsf


// ParticlesJS Config.
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 700 } },


    "color": {
      "value": "#ffffff" },

    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000" },

      "polygon": {
        "nb_sides": 5 } },


    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 0.1,
        "opacity_min": 0.1,
        "sync": false } },


    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 10,
        "size_min": 0.1,
        "sync": false } },


    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1 },

    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200 } } },



  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab" },

      "onclick": {
        "enable": true,
        "mode": "push" },

      "resize": true },

    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1 } },


      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3 },

      "repulse": {
        "distance": 200,
        "duration": 0.4 },

      "push": {
        "particles_nb": 4 },

      "remove": {
        "particles_nb": 2 } } },



  "retina_detect": true });






function fade($ele) {
  $ele.fadeIn(1000).delay(5000).fadeOut(1000, function() {
    var $next = $(this).next('.quote');
    fade($next.length > 0 ? $next : $(this).parent().children().first());
  });
}
fade($('.quoteLoop > .quote').first());



window.onscroll = function() {scrollFunction()};
function scrollFunction(){
  if (checcc){
    $("#topp").fadeIn();
   
    checcc = false;
  }

  if ((document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)){
     // document.getElementById("topp").style.display = "block";

     $("#topp").fadeIn();


      //document.getElementById("topp").classList.toggle('show');

    } else {
      //document.getElementById("topp").style.display = "none";
      $("#topp").fadeOut();
      //document.getElementById("topp").classList.toggle('hide');


    }

  }


$("#smooth a[href^='#']").on('click', function(e) {
   e.preventDefault();
   var hash = this.hash;
   $('html, body').animate({
       scrollTop: $(hash).offset().top
     }, 300, function(){
       window.location.hash = hash;
     });
});

  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      } 
    });
  }

  function gotop(scrollDuration) {
    var cosParameter = window.scrollY / 2,
    scrollCount = 0,
    oldTimestamp = performance.now();
    function step (newTimestamp) {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
      if (scrollCount >= Math.PI) window.scrollTo(0, 0);
      if (window.scrollY === 0) return;
      window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }


  $('.button2').on('click', function() {

           window.open("https://discord.com/api/oauth2/authorize?client_id=593901496492490768&permissions=2146959223&scope=bot");

 
    });

  $('.button1').on('click', function() {
              window.open("https://github.com/frychicken/UselessBot");


    });

   




 ChangeColorBlack.onclick = function() {

   //document.documentElement.style.setProperty('--swiper-theme-color', '#000');

};



ChangeColorWhite.onclick = function() {





  //document.documentElement.style.setProperty('--swiper-theme-color', '#FFF');
}


function changeTopBlack(){

 $("#topp").hover(function(){
 }, function(){
  $(this).css("color", "white");
});

 $('#topp').css({
  background: 'black'
});
 $('#topp').css({
  color: 'white'
});
}

function changeTopWhite(){

  $("#topp").hover(function(){
    $(this).css("color", "white");
  }, function(){
    $(this).css("color", "black");

  });
  $('#topp').css({
    background: 'white'
  });
  $('#topp').css({
    color: 'black'
  });

}



function toggle_visibility() {
 
 $("#aaaa").fadeOut();
}

setTimeout(function() {
  $("#aaaa").fadeOut().empty();
}, 10000);


function autochangeco(hoverrr, id1, id2, yesorno){
  if(!yesorno){
   $(hoverrr).css({
    color: 'red'
  });
 }


   $(id2).css({
    color: 'white'
  });
   if(yesorno){
     $(hoverrr).css({
      color: 'white'
    });
   }
 } 


function changeNavCCC(where){
 if($(where).css('background-color') == 'rgb(0, 0, 0)'){

  changeTopBlack();
} else if ($(where).css('background-color') == 'rgb(255, 255, 255)') {

 changeTopWhite();
}
}
