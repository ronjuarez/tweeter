$(document).ready(function() {
  $('#tweet-text').on('keydown', function(event) {
    const totalchar = $(this).val();
    let counter = $(this).parent().find('.counter');
    counter.val (140 - totalchar.length);
    if (totalchar.length >= 140) { 
      counter.addClass('negative')
    } else {
      counter.removeClass('negative')
    }
  })
});

