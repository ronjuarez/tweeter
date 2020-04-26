
$(document).ready(function() {


/* THIS FUNCTION TAKES AN ARRAY OF TWEET OBJECTS THAT WE GET USING AN AJAX GET REQUEST. HERE IS WHAT IT DOES:

1. IT LOOPS TROUGH EACH TWEET.
2. PASSES EACH TWEET THROUGH THE createTweetElement FUNCTION, AND ASSIGNS ITS VALUE TO var renderedPost.
3. WE PREPEND renderedPost TO OUR tweet-container ELEMENT USING JQUERY.
4. WE EXIT THE LOOP. 

*/
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const renderedPost = createTweetElement(tweet);
    $('#tweet-container').prepend(renderedPost);
  }
}


// AJAX GET REQUEST THAT RECIEVES OUR DB INFORMATION AND PASSES IT TO RENDER POSTS.
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    type: "GET",
    dataType: "JSON"
  }).then(response => {
    renderTweets(response);
  })
}


/* THIS FUNCTION CREATES VARIABLES USING OBJECT DECONSTRUCTION THAT REPRESENT DIFFERENT PROPERTIES OF OUR TWEET OBJECT
AND ASSIGNS THEM TO DIFFERENT ELEMENTS IN OUR TWEET DISPLAY ARTICLE SECTION. THE MARKUP THAT LAYS OUT EACH NEW ELEMENT
IS ASSIGNED TO MARKUP AND IS RETURNED AS THE FUNCTION'S VALUE*/
const createTweetElement = function(tweet) {
  
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
    const { created_at } = tweet;


// IMPLEMENTED ESCAPE FUNCTION TO PREVENT XSS ATTACKS.    
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }


    let markup = `
    <article class ="tweet-display">
      <header>
        <img src=${avatars} alt=${name}>
        <span class="full-name">${name}</span>
        <span class="username">${handle}</span>
      </header>
      <p class="tweet">
      <span>${escape(text)}</span> 
      </p>
    <footer> 
      <span class="days-elapsed">${timeago.format(created_at)}</span> 
      <div class="icons">
        <i class="fa fa-flag"></i>
        <i class="fa fa-heart"></i>
        <i class="fa fa-retweet"></i>
    </footer>
    </article>
    `;
  return markup

  
}

/* THIS JQUERY EVENT LISTENER IS USED TO LISTEN TO A SUBMISSION OF THE new-tweet FORM, AND DOES THE FOLLOWING:

1. IT PREVENTS THE FORM FROM EXECUTING IT'S DEFAULT BEHAVIOUR.

2. IT ASSIGNS THE INPUT VALUE OF THE TEXT AREa TO var newTweet.

3. WE DECLARE A renderError FUNCTION THAT DISPLAYS A SLIDE DOWN DIALOGUE BOX WITH AN ERROR MESSAGE THAT DISPLAYS
WHAT CONDITION THE CURRENT TWEET IS NOT SATISFYING. IT IS HIDDEN UNTIL ERROR IS TRIGGERED BY USER INPUT. IT WILL
ALSO CLEAR THE ERROR AND REPLACE IT WITH ANOTHER ERROR IF THE SAME USER TRIGGERS IT

4. THERE ARE TWO CONDITIONS THAT CALL THE renderError FUNCTION, 
    A) IF THE TWEET-TEXT AREA IS EMPTY.
    B) IF THE TWEET-TEXT AREA HAS OVER 140 CHARACTERS.
    
IF EITHER OF THESE CONDITIONS IS VIOLATED THE renderError FUNCTION IS CALLED WITH A MESSAGE EXPLAINING WHY THE TWEET IS
INVALID AND IT IS PREVENTED FROM CONTINUING TO EXECUTE OUR CODE.

5. WE SERIALIZE THE FORM VALUE AND ASSIGN IT TO A JQUERY VARIABLE NAMED $tweetInput BY TURNING INTO A STRING.

6. WE PASS ALONG $tweetInput TO AN AJAX POST REQUEST THAT POSTS THIS TO OUR DATABASE.

7. AFTER A SUCCESSFUL POST THE PAGE RELOADS TO INCLUDE THE NEW POST IN THE TWEET CONTAINER. IF THERE IS AN ERROR
IT LOGGED TO THE CONSOLE.

8. AFTER ALL ACTIVITY IS COMPLETED WE COMPLETE AN AJAX REQUEST TO GET OUR TWEETS FROM THE DB.
*/

  $('form').submit(function(event) { 
    event.preventDefault();
    let newTweet = $('#tweet-text').val(); 
    
    const renderError = (message) =>{
   
      $('#validation-error').slideDown("slow", function() {
        
        $(this).css("visibility", "visible");
        $(this).html('')
        $(this).append(`<span>${message}</span>`)
      });
    }    

    if (newTweet === '' || newTweet === null) {
      renderError('Invalid Tweet: Add a tweet');
      return false;
    }

    if (newTweet.length > 140){
      renderError('Invalid Tweet: Your Tweet is too Long!');
      return false;
    }


  
    const $tweetInput = $('form').serialize();
    console.log('tweetInput: ', $tweetInput);
  
    $.ajax({
      url: '/tweets',
      type: "POST",
      data: $tweetInput
    })
    .then((response) => {
      location.reload();
    }) 
    .catch((error) => {
      console.log('error: ', error);
    })
  })


  loadTweets();
});

