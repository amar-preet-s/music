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