/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  const renderedPosts = createTweetElement(tweets);
  $('.tweet-container').append(renderedPosts);

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
  return markupArray.join('') 
}




$(document).ready(function() {
  renderTweets(data);

  $('form').submit(function(event) { 
    event.preventDefault();
    
    const $tweetInput = $('form').serialize();
    $.ajax({
      url: '/tweets',
      type: "POST",
      dataType: 'string',
      data: $tweetInput
    })

    .then ((response) => {
      renderTweets()
    }) 
    .catch (() => {
      const error = "Error"
    })
  })
});






//   let $tweet = $('<article>');

// let $header = $('<header>');

// $('<span>').addclass('full-name')
//   .text(tweet.user.name)
//   .appendTo($header)

// $('<span>').addclass('username')
//   .text(tweet.user.handle)
//   .appendTo($header)

// $tweet.append($header);

// let $post = $('<p>');

// $('<span>')
//   .text(tweet.user.handle)
//   .appendTo($post)

// $tweet.append($post)

// let $footer = $('<footer>')

// $('<span>').addclass('days-elapsed')
//   .text(tweet.created_at)
//   .appendTo($footer)

// let iconsArray = ['fa-flag', 'fa-heart', 'fa-retweet']

// $('<div>').addclass('icons').each(function(i) {
//   $(this).append(`<i class="fa ${iconsArray[i]}><i>`)
// }).appendTo($footer)

// $tweet.append($footer)

// return $tweet;
// }

// renderTweets(data);
