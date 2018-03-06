$(document).ready(function () {
  $('body').on('click', '.day-inner', function () {
    $('.day-inner').removeClass('day-selected')
    $(this).toggleClass('day-selected');
  });
  $('body').on('click', '.addtoEnvelope', function () {
    $(this).toggleClass('activeEnvelope');
  });
  $('body').on('click', '.allContacts', function (e) {
    $('.addtoEnvelope').toggleClass('activeEnvelope').trigger('click').toggleClass('activeEnvelope');
  });
});
