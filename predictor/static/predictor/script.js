
var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}
function hideMenu() {
    navLinks.style.right = "-200px";
}
$(document).ready(function(){
$(window).scroll(function(){
    if(this.scrollY > 15){
        $('.header').addClass("sticky");
    }else{
        $('.header').removeClass("sticky");
    }
    if(this.scrollY >500){
    $('.scroll-up-btn').addClass("show");
    }else{
        $('.scroll-up-btn').removeClass("show");
    }
})
});
// Slide up script
$('.scroll-up-btn').click(function(){
$('html').animate({scrollTop: 0});
});
