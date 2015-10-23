$(function(){

   $('#trips-1').click(function (e){
     e.preventDefault();
    if ($("#trips-details-1").is(":hidden")){
      $("#trips-details-1").slideDown("slow");
    } else{
     $("#trips-details-1").hide('slow');
    }
  });

   $('#trips-2').click(function (e){
     e.preventDefault();
    if ($("#trips-details-2").is(":hidden")){
      $("#trips-details-2").slideDown("slow");
    } else{
     $("#trips-details-2").hide('slow');
    }
  });
});

// Modal Form Controls
$("#login_button").leanModal({ overlay : 0.6, closeButton: "#signup-form-close" });
$("#login_button_2").leanModal({ overlay : 0.6, closeButton: "#signup-form-close" });
$("#sign_up").leanModal({ overlay : 0.6, closeButton: "#signup-form-close" });

// Display Hidden Search Form
$("#find-trip-expand").on('click', function() {

  $("#find-trip-form").toggleClass('hidden');
});

$("#create-trip-expand").on('click', function() {

  $("#create-trip-form").toggleClass('hidden');
});

$('.delete').on('click', function() {

  $(this).parent().remove();

});
