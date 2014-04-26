// Things to add:
// Set position at center of red marked char
// Add ability to load from PDF or ebook
// Add delay at each period so the sentences are broken up
// Create it so RapidPresentation happens in the center of the page but you can see the text lines before and after it. That way you don't get as lost if you stop paying attention
// Big pause / play buttons
// Add the ability to swipe up and down to load more lines up and down (like iphone alarm time selector ... click click click -- make it tactile!)

var rsvpInterval = 200;

var rsvpFunction = function() {

  content = $('#userInput').val();
  console.log(content);

  // Splits incoming content and removes extra spaces
  var contentArray = content.split(" ").filter(function(n) { return n != "" });
  console.log(contentArray);

  // Iterates through content and presents it serially
  var counter = 0; // You'll update the counter to jump back and forth (rewind/fast forward)
  var startRapidPresentation = setInterval(function() {
    if (counter >= contentArray.length - 1) {
      window.clearInterval(startRapidPresentation);
    };

    var avgNumber = Math.round((contentArray[counter].length - 1) * 0.29);
    var wordArray = contentArray[counter].split('');
    // wordArray.splice(avgNumber, 1, "<span class='red'>" + contentArray[counter][avgNumber] + "</span>")

    var firstPortion = [], redLetter, lastPortion = [];
    for (i = 0; i < wordArray.length; i++) {
      if (i < avgNumber) {
        firstPortion.push(wordArray[i]);
      } else if (i == avgNumber) {
        redLetter = wordArray[i];
      } else {
        lastPortion.push(wordArray[i]);
      };
    };
    firstPortion = firstPortion.join('');
    lastPortion = lastPortion.join('');

    $('#middle').css({left: ($('#middle').offset().left + $('#middle').outerWidth() / 3)});
    $('#left').html(firstPortion);
    $('#middle').html(redLetter);
    $('#right').html(lastPortion);

    $('#left').css({left: ($('#middle').offset().left  - ($('#left').outerWidth()) * 1.009) + "px"});
    $('#middle').css({left: ($('#middle').offset().left - $('#middle').outerWidth() / 3)});
    $('#right').css({left: ($('#middle').offset().left  + $('#middle').outerWidth()) + "px"});
    counter++;

  }, rsvpInterval);
};

$(document).ready( function() {

  $(".wpm").click(function(){
    switch (this.id) {
      case "200":
        rsvpInterval = (1/(200/60))*1000;
        console.log("200 wpm");
        break;
      case "300":
        rsvpInterval = (1/(300/60))*1000;
        console.log("300 wpm");
        break;
      case "400":
        rsvpInterval = (1/(400/60))*1000;
        console.log("400 wpm");
        break;
      case "500":
        rsvpInterval = (1/(500/60))*1000;
        console.log("500 wpm");
        break;
      default:
        console.log("Whoops, something went wrong with your wpm click function.");
    }
  })
  
});

/*
Spritz Speed Reader by Charlotte Dann
local storage implementation by Keith Wyland
*/


// var $wpm = $('#spritz_wpm');
// var interval = 60000/$wpm.val();  
// var paused = false;
// var $space = $('#spritz_word');
// var i = 0;
// var night = false;
// var zoom = 1;
// var autosave = false;
// var $words = $('#spritz_words');
// var local_spritz = {};

// function words_load() {
//   if (!localStorage.jqspritz) {
//     words_set();
//     word_show(0);
//     word_update();
//     spritz_pause(true);
//   } else {
//     local_spritz = JSON.parse(localStorage['jqspritz']);
//     $words.val(local_spritz.words);
//     i = local_spritz.word;
//     if (local_spritz.night) {
//       night = true
//       $('html').addClass('night');
//     };
//     if (local_spritz.autosave) {
//       autosave = true;
//       $('html').addClass('autosave');
//       $('#autosave_checkbox').prop('checked', true);
//     };
//     $wpm.val(local_spritz.wpm); 
//     interval = 60000/local_spritz.wpm;
//     spritz_zoom(0);
//     words_set();
//     word_show(i);
//     word_update();
//     spritz_pause(true);
//     spritz_alert('loaded');
//   }  
// }
// function words_save() {
//   local_spritz = {
//     word: i,
//     words: $words.val(),
//     wpm: $wpm.val(),
//     night: night,
//     autosave: autosave,
//     zoom: zoom
//   };
//   localStorage['jqspritz'] = JSON.stringify(local_spritz);
//   if (!autosave) {
//     spritz_alert('saved');
//   } else {
//     button_flash('save', 500);
//   }
// }

// //////////////////////////////////////////////////////// CAN USE REGEX FROM HERE
// /* TEXT PARSING */
// function words_set() {
//   words = $words.val().trim()
//   .replace(/([-—])(\w)/g, '$1 $2')
//   .replace(/[\r\n]/g, ' {linebreak} ')
//   .replace(/[ \t]{2,}/g, ' ')
//   .split(' ');
//   for (var j = 1; j < words.length; j++) {
//     words[j] = words[j].replace(/{linebreak}/g, '   ');
//   }
// }
// /* ON EACH WORD */
// function word_show(i) {
//   $('#spritz_progress').width(100*i/words.length+'%');
//   var word = words[i];
//   var stop = Math.round((word.length+1)*0.4)-1;
//   $space.html('<div>'+word.slice(0,stop)+'</div><div>'+word[stop]+'</div><div>'+word.slice(stop+1)+'</div>');
// }
// function word_next() {
//   i++;
//   word_show(i);
// }
// function word_prev() {
//   i--;
//   word_show(i);
// }

// /* ITERATION FUNCTION */
// function word_update() {
//   spritz = setInterval(function() {
//     word_next();
//     if (i+1 == words.length) {
//       setTimeout(function() {
//         $space.html('');
//         spritz_pause(true);
//         i = 0;
//         word_show(0);
//       }, interval);
//       clearInterval(spritz);
//     };
//   }, interval);
// } 

// /* PAUSING FUNCTIONS */
// /////////////////////////////////////////////////////////// HOW TO PAUSE
// function spritz_pause(ns) {
//     if (!paused) {
//     clearInterval(spritz);
//     paused = true;
//     $('html').addClass('paused');
//     if (autosave && !ns) {
//       words_save();
//     };
//   }
// }
// function spritz_play() {
//   word_update();
//   paused = false;
//   $('html').removeClass('paused');
// }
// function spritz_flip() {
//   if (paused) {
//     spritz_play();
//   } else {
//     spritz_pause();
//   };
// }

// /* SPEED FUNCTIONS */
// //////////////////////////////////////////////////////////// HOW TO SET SPEED
// function spritz_speed() {
//   interval = 60000/$('#spritz_wpm').val();
//   if (!paused) {
//     clearInterval(spritz);
//     word_update();
//   };
//   $('#spritz_save').removeClass('saved loaded');
// }
// ////////////////////////////////////////////////////// HOW TO CHANGE SPEED LIVE
// function spritz_faster() {
//   $('#spritz_wpm').val(parseInt($('#spritz_wpm').val())+50);
//   spritz_speed();
// }
// function spritz_slower() {
//   if ($('#spritz_wpm').val() >= 100) {
//     $('#spritz_wpm').val(parseInt($('#spritz_wpm').val())-50);
//   }
//   spritz_speed();
// }

// /* JOG FUNCTIONS */
// ///////////////////////////////////////////////////// HOW TO JUMP FORWARD & BACK
// function spritz_back() {
//   spritz_pause();
//   if (i >= 1) {
//     word_prev();
//   };
// }
// function spritz_forward() {
//   spritz_pause();
//   if (i < words.length) {
//     word_next();
//   };
// }

// /* WORDS FUNCTIONS */
// function spritz_zoom(c) {
//   zoom = zoom+c
//   $('#spritz').css('font-size', zoom+'em');
// }
// ////////////////////////////////////////////////////// RESET FUNCTION
// function spritz_refresh() {
//   clearInterval(spritz);
//   words_set(); 
//   i = 0;
//   spritz_pause();
//   word_show(0);
// };
// function spritz_select() {
//   $words.select();
// };
// function spritz_expand() {
//   $('html').toggleClass('fullscreen');
// }

// /* AUTOSAVE FUNCTION */
// function spritz_autosave() {
//   $('html').toggleClass('autosave');
//   autosave = !autosave;
//   if (autosave) {
//     $('#autosave_checkbox').prop('checked', true);
//   } else {
//     $('#autosave_checkbox').prop('checked', false);
//   }
// };

// /* ALERT FUNCTION */
// function spritz_alert(type) {
//   var msg = '';
//   switch (type) {
//     case 'loaded':
//       msg = 'Data loaded from local storage';
//       break;
//     case 'saved':
//       msg = 'Words, Position and Settings have been saved in local storage for the next time you visit';
//       break;
//   }
//   $('#alert').text(msg).fadeIn().delay(2000).fadeOut();
// }



// /* CONTROLS */
// $('#spritz_wpm').on('input', function() {
//   spritz_speed();
// });
// ////////////////////////////////////////////// Woah, genius way to assign click functions
// $('.controls').on('click', 'a, label', function() {
//   switch (this.id) {
//     case 'spritz_slower':
//       spritz_slower(); break;
//     case 'spritz_faster':
//       spritz_faster(); break;
//     case 'spritz_save':
//       words_save(); break;
//     case 'spritz_pause':
//       spritz_flip(); break;
//     case 'spritz_smaller':
//       spritz_zoom(-0.1); break;
//     case 'spritz_bigger':
//       spritz_zoom(0.1); break;
//     case 'spritz_autosave':
//       spritz_autosave(); break;
//     case 'spritz_refresh':
//       spritz_refresh(); break;
//     case 'spritz_select':
//       spritz_select(); break;
//     case 'spritz_expand':
//       spritz_expand(); break;
//   };
//   return false;
// });
// $('.controls').on('mousedown', 'a', function() {
//   switch (this.id) {
//     case 'spritz_back':
//       spritz_jog_back = setInterval(function() {
//         spritz_back();
//       }, 100);
//       break;
//     case 'spritz_forward':
//       spritz_jog_forward = setInterval(function() {
//         spritz_forward();
//       }, 100);
//       break;
//   };
// });
// $('.controls').on('mouseup', 'a', function() {
//   switch (this.id) {
//     case 'spritz_back':
//       clearInterval(spritz_jog_back); break;
//     case 'spritz_forward':
//       clearInterval(spritz_jog_forward); break;
//   };
// });

// /* KEY EVENTS */
// function button_flash(btn, time) {
//   var $btn = $('.controls a.'+btn);
//   $btn.addClass('active');
//   if (typeof(time) === 'undefined') time = 100;
//   setTimeout(function() {
//     $btn.removeClass('active');
//   }, time);
// }
// $(document).on('keyup', function(e) {
//   if (e.target.tagName.toLowerCase() != 'body') {
//     return;
//   };
//   switch (e.keyCode) {
//     case 32:
//       spritz_flip(); button_flash('pause'); break;
//     case 37:
//       spritz_back(); button_flash('back'); break;
//     case 38:
//       spritz_faster(); button_flash('faster'); break;
//     case 39:
//       spritz_forward(); button_flash('forward'); break;
//     case 40:
//       spritz_slower(); button_flash('slower'); break;
//   };
// });
// $(document).on('keydown', function(e) {
//   if (e.target.tagName.toLowerCase() != 'body') {
//     return;
//   };
//   switch (e.keyCode) {
//     case 37:
//       spritz_back(); button_flash('back'); break;
//     case 39:
//       spritz_forward(); button_flash('forward'); break;
//   };
// });



// /* INITIATE */
// words_load();

// /* LIGHT/DARK THEME */
// //////////////////////////////////////////////////// COOL IDEA >> GREAT FOR IPAD
// $('.light').on('click', function() {
//   $('html').toggleClass('night');
//   night = !night;
//   return false;
// });

// $('a.toggle').on('click', function() {
//   $(this).siblings('.togglable').slideToggle();
//   return false;
// });