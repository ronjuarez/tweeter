/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const renderTweets = function(tweets) {
  const renderedPosts = createTweetElement(tweets);

  $('#tweet-container').prepend(renderedPosts);
}

const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    type: "GET",
    dataType: "JSON"
  }).then(response => {
    renderTweets(response);
  })
}

const createTweetElement = function(tweets) {

  let markupArray = []
  
  for(tweet of tweets) {
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
    const { created_at } = tweet;

    markupArray.push(`
    <article class ="tweet-display">
      <header>
        <i class="${avatars}"></i>
        <span class="full-name">${name}</span>
        <span class="username">${handle}</span>
      </header>
      <p class="tweet">
      <span>${text}</span> 
      </p>
    <footer> 
      <span class="days-elapsed">${created_at}</span> 
      <div class="icons">
        <i class="fa fa-flag"></i>
        <i class="fa fa-heart"></i>
        <i class="fa fa-retweet"></i>
    </footer>
    </article>
    `)
  }

  return markupArray.reverse().join('');
}


  $('form').submit(function(event) { 
    event.preventDefault();

    let totalChar = $('#tweet-text').val(); 
    
    const renderError = (message) =>{
      console.log(`rendering error`)
      $('#validation-error').slideDown("slow", function() {
        
        $(this).css("visibility", "visible");
        $(this).html('')
        $(this).append(`<span>${message}</span>`)
      });
    }    

    if (totalChar === '' || totalChar === null) {
      renderError('Invalid Tweet: Add a tweet');
      return false;
    }

    if (totalChar.length > 140){
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
      renderTweets([response]);
    }) 
    .catch((error) => {
      console.log('error: ', error);
    })
  })

  loadTweets();
});

