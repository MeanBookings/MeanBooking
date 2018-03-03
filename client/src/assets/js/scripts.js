$( document ).ready(function() {
    console.log( "ready!" );
    $('body').on('click','.day-inner',function(){
        $('.day-inner').removeClass('day-selected')
        $(this).toggleClass('day-selected');
    });
});

