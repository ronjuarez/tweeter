
$(document).ready(function() {

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const renderedPost = createTweetElement(tweet);
    $('#tweet-container').prepend(renderedPost);
  }
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

const createTweetElement = function(tweet) {
  
    const { name, avatars, handle } = tweet.user;
    const { text } = tweet.content;
    const { created_at } = tweet;

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
      location.reload();
    }) 
    .catch((error) => {
      console.log('error: ', error);
    })
  })


  loadTweets();
});

