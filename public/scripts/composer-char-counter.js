$(document).ready(function() {
  
/* WE BUILT THIS SCRIPT TO MANIPULATE COUNTER ELEMENT THAT COUNTS THE CHARACTERS ENTERED INTO THE TEXTAREA OF NEW TWEETS,
AND UPDATES IT DYNAMICALLY.
 
HERE IS HOW IT WORKS:

1. THE FUNCTION HAS AN EVENT LISTENER SELECTOR CALLED KEYUP THAT IDENTIFIES EACH KEY STROKE IN THE TEXTAREA WITH 
id = "tweet-text".

2. WE ASSIGN CHARACTERS ENTERED INTO THE FIELD TO var totalChar.

3. WE ASSIGN A JQUERY FUNCTION THAT TRAVERSES THE DOM TO THE PARENT ELEMENT OF IT'S TREE AND FINDS THE COUNTER CLASS
NODE WITHIN IT TO var counter.

4. WE ASSIGN A VALUE OF 140 - THE AMMOUNT OF CHARACTERS THAT HAVE BEEN INPUT INTO OUR TEXT FIELD, WHICH WE
ARE ABLE TO DETERMINE USING THE .length JS METHOD.

5. WE CREATE A CONDITION THAT STIPULATES THAT IF THE COUNTER IS GREATER OR EQUAL TO 14O WE WILL ADD A CSS CLASSED
CALLED negative AND WE WILL REMOVE IT IF THE COUNTER VALUE RETURNS TO UNDER 140, THIS CLASS TURNS THE COUNTER RED,
THIS CLASSES STYLING CAN BE FOUND ON new-tweet.css.

*/  
  $('#tweet-text').on('keyup', function(event) {
    const totalchar = $(this).val();

    let counter = $(this).parent().find('.counter');
    counter.val (140 - totalchar.length);
    totalchar.length >= 140 ? counter.addClass('negative') : counter.removeClass('negative');
  })
});

