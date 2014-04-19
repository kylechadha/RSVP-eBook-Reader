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
  var counter = 0;
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

