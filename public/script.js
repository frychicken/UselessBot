
var checcc = true;

$(document).ready(function(){

  $(this).scrollTop(0);


  $("#topp").fadeOut();
  $("#navbar").fadeOut();

});


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
    $("#navbar").fadeIn();
    checcc = false;
  }

  if ((document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)){
     // document.getElementById("topp").style.display = "block";

     $("#topp").fadeIn();


      //document.getElementById("topp").classList.toggle('show');
      document.getElementById("navbar").style.top = "0";

    } else {
      //document.getElementById("topp").style.display = "none";
      $("#topp").fadeOut();
      //document.getElementById("topp").classList.toggle('hide');
      document.getElementById("navbar").style.top = "-300px";


    }

  }

  $("#navbar a[href^='#']").on('click', function(e) {
   e.preventDefault();
   var hash = this.hash;
   $('html, body').animate({
     scrollTop: $(hash).offset().top +10
   }, 300, function(){
     window.location.hash = hash;
   });
 });

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

           //window.open("https://uselessbotpickle.glitch.me/#faq");

 
    });

  $('.button1').on('click', function() {
              window.open("https://github.com/frychicken/DummyDiscordBot");


    });

   
  function changeAnnouncementWhite(){
    $('.announcement').css({
      color: 'black'
    });
    $('.announcement').css({
      background: 'white'
    });
    $('.announcement a').css({
      color: 'black'
    });

  }

  function changeAnnouncementBlack(){
    $('.announcement').css({
      color: 'white'
    });
    $('.announcement').css({
      background: 'black'
    });
    $('.announcement a').css({
      color: 'white'
    });



  }



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

 if($('#navbar').css('background-color') == 'rgb(0, 0, 0)'){
   $(id1).css({
    color: 'white'
  });
   $(id2).css({
    color: 'white'
  });
   if(yesorno){
     $(hoverrr).css({
      color: 'white'
    });
   }
 } else if ($('#navbar').css('background-color') == 'rgb(255, 255, 255)') {
   $(id1).css({
    color: 'black'
  });
   $(id2).css({
    color: 'black'
  });
   if(yesorno){
     $(hoverrr).css({
      color: 'black'
    });
   }
 }
}

function changeNavCCC(where){
 if($(where).css('background-color') == 'rgb(0, 0, 0)'){

  changeNavToWhite();
  changeAnnouncementBlack();
  changeTopBlack();
} else if ($(where).css('background-color') == 'rgb(255, 255, 255)') {
 changeNavToBlack();
 changeAnnouncementWhite();
 changeTopWhite();
}
}

$(function () {
  $(window).scroll(function(){
    if($(window).scrollTop() > $('#buy').offset().top 
     && $(window).scrollTop() < $('#buy').offset().top + $('#buy').outerHeight(true)
     ){
     $('#sticky').text('Merch');   
   changeNavCCC('#buy');
   autochangeco('#bbb', '#cc', '#ff', false);

 }else if($(window).scrollTop() > $('#contact').offset().top 
   && $(window).scrollTop() < $('#contact').offset().top + $('#contact').outerHeight(true)
   ){
   $('#sticky').text('Contact');
   changeNavCCC('#contact');
   autochangeco('#cc', '#bbb', '#ff',false);

 }else if($(window).scrollTop() > $('#faq').offset().top 
   && $(window).scrollTop() < $('#faq').offset().top + $('#faq').outerHeight(true)
   ){
   $('#sticky').text('F.A.Q');
   changeNavCCC('#faq');
   autochangeco('#ff', '#cc', '#bbb', false);

 }
 else{
  $('#sticky').text('Home');
  changeNavCCC('#opening');
  autochangeco('#ff', '#cc', '#bbb', true);

}
});
});