
$(".search-bar").focus(function(){
    $(this).text("");
    $(this).css({"border":"1px solid silver","border-radius":"4px"});
})

$(".search-bar").blur(function(){
    if($(this).text()== ""){
        $(this).text("Search....");
    }
    $(this).css({"border":"","border-radius":""});
})

$(".song-player-container").scroll(function () {

 let scroll_top = $(".song-player-container").scrollTop();
  if (scroll_top > 400) {
    $('.song-head-bar').addClass('headbar-stick');
  }
  if (scroll_top < 401) {
    $('.song-head-bar').removeClass('headbar-stick');
  }

});