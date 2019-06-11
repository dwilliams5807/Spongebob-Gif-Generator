// on document load

//    listen for clicks on keyword bottons

//    when clicked, search keyword on giffy
// //       when return run  function to append results to page
// //       place top 20 gifs for keyword on page

//       when click another keyword, elimenate original results and replace
$(document).ready(function () {
var keywords = ["Spongebob", "Patrick Star", "Squidward", "Sandy Cheeks", "Mr. Krabs", "Larry the Lobster", "Plankton"];
//http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=YOUR_API_KEY


function displayKeywordPhotos() {
$("#keywords-view").empty();

var keyword = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyword + "&apikey=l5ytNQUhUFH3nAI0te4n7318eThzoLzz";
$.ajax({
    url: queryURL,
    method: "GET",
  }).done(function(response) {
    // $("#keywords-view").text(JSON.stringify(response));
    // console.log("I got it");
    
    $("#keywords-view").empty();

          var results = response.data;

          // Retrieves the Rating Data
          console.log(response);

          // Loops for the gifs
          for(var i = 0; i < results.length; i++) {

            // Creates a div to hold the image
            var imageDiv = $("<div>");

            // Make the class for style.css
            imageDiv.addClass("photos");

            // Creates an element to have the rating displayed
            var rating = results[i].rating;
            var p = $("<h5>").text("Rating: " + rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("data-state", "animate");
            gifImage.addClass('gifImage');

            // Displays the rating
            imageDiv.prepend(p);

            // Displays the Image
            imageDiv.prepend(gifImage);
            $("#keywords-view").prepend(imageDiv);
  }
  $(".gifImage").on("click", function() {
    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

});
  if($(this).attr("data-state") === "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate"); }
}


renderButtons();

function renderButtons() {
 $("#buttons-view").empty();
 for (var i = 0; i < keywords.length; i++) {

    // Then dynamicaly generating buttons for each keyword in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");  
    // Adding a class
    a.addClass("keyword");
    // Adding a data-attribute with a value of the  at index i
    a.attr("data-name", keywords[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(keywords[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

      // This function handles events where one button is clicked
      $("#add-keyword").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var keyword = $("#keyword-input").val().trim();
        // The movie from the textbox is then added to our array
        keywords.push(keyword);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      $(document).on("click", ".keyword", displayKeywordPhotos);
      
    })