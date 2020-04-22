$(document).ready(function() {
  
  $('#tweet-text').on('keyup', function(event) {
    const totalchar = $(this).val();

    let counter = $(this).parent().find('.counter');
    counter.val (140 - totalchar.length);
    totalchar.length >= 140 ? counter.addClass('negative') : counter.removeClass('negative');
  })
});

