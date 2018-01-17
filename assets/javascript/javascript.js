var reactions = ["shocked", "excited clap", "LOL", "eye roll", "facepalm", "hair flip", "fist bump", "yawn", "thumbs up", "yass", "huh", "The Carlton", "wink"];

function displayGifs() {

    var reactionSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reactionSearch + "&api_key=R8AY7mEPQ7sRyYivjsCPzkPTN9bsazii&limit=10";

    $("#gifs").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {

            console.log(response);

            var gifDiv = $("<div class='gif-info'>");

            var rating = response.data[i].rating;
            var pRating = $("<p class='rating'>").text("Rating: " + rating);

            var stillURL = response.data[i].images.fixed_height_still.url;

            var image = $("<img>").attr("src", stillURL);

            image.addClass("reactionGifs");
            image.attr("data-state", "still");
            image.attr("animate-url", response.data[i].images.fixed_height.url);
            image.attr("still-url", response.data[i].images.fixed_height_still.url);

            gifDiv.append(pRating, image);
            $("#gifs").append(gifDiv);

        }

        $(".reactionGifs").on("click", function() {
            var state = $(this).attr("data-state");
            for (var i = 0; i < response.data.length; i++) {
                if (state === "still") {
                    $(this).attr("src", $(this).attr("animate-url"));
                    $(this).attr("data-state", "animate");
                 } else {
                     $(this).attr("src", $(this).attr("still-url"));
                     $(this).attr("data-state", "still");
                 };
            }
        })

        renderButtons();
    })

}

function renderButtons() {
    $("#btns").empty();

    for (var i = 0; i < reactions.length; i++) {
        var newBtns = $("<button>");
        newBtns.addClass("reaction");
        newBtns.attr("data-name", reactions[i]);
        newBtns.text(reactions[i]);
        $("#btns").append(newBtns);
    }
}

$("#select-reaction").on("click", function (event) {
    event.preventDefault();
    var reaction = $("#reaction-input").val().trim();
    reactions.push(reaction);
    $("#reaction-input").val("");
    renderButtons();
})


$(document).on("click", ".reaction", displayGifs);

renderButtons();

