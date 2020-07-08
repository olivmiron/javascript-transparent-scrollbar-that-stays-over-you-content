
/*  mu_s   -   made_up_scrollbar  */
var mu_s_container_to_scroll, mu_s_scrollbar, mu_s_scroller;


var mu_s_content_scroll_value;
var mu_s_scroller_timeout;


function mu_s_resize_and_place_scrollbar() {
    /* resize part */
    mu_s_scroller.style.height = ( (mu_s_container_to_scroll.clientHeight / mu_s_container_to_scroll.scrollHeight) * mu_s_scrollbar.clientHeight ) + "px";

    /* replace part */
    mu_s_content_scroll_value = mu_s_container_to_scroll.scrollTop / (mu_s_container_to_scroll.scrollHeight - mu_s_container_to_scroll.clientHeight);
    mu_s_scroller.style.marginTop = ( (mu_s_scrollbar.clientHeight - mu_s_scroller.clientHeight) * mu_s_content_scroll_value ) + "px";
}



function mu_s_show_and_hide_scrollbar() {
    clearTimeout(mu_s_scroller_timeout);
    mu_s_scroller.style.opacity = "1";
    mu_s_scroller_timeout = setTimeout(() => {mu_s_scroller.style.opacity = "0.3";}, 875);
}






/* when you scroll with scrollwheel */ /* PUT THIS IN THE CONAINER THAT NEEDS TO BE SCROLLED - onscroll="" */
function mu_s_container_onsscroll(mu_s_container_to_scroll_id, mu_s_scrollbar_id, mu_s_scroller_id) {

    mu_s_container_to_scroll = document.getElementById(mu_s_container_to_scroll_id);
    mu_s_scrollbar = document.getElementById(mu_s_scrollbar_id);
    mu_s_scroller = document.getElementById(mu_s_scroller_id);



    mu_s_show_and_hide_scrollbar();
    mu_s_resize_and_place_scrollbar();
}




/* when you scroll by moving the scroller with the mouse; compared to the image picker, the scroller margin will be modified and not the top value */
var mu_s_mouse_old_y, mu_s_mouse_new_y;
var mu_s_scrollbar_scrolled; /* the fraction, not the percentage */


/* PUT THIS ON THE SCROLLER - onmousedown="" */
function mu_s_scroller_click_down(mu_s_container_to_scroll_id, mu_s_scrollbar_id, mu_s_scroller_id) {

    event.preventDefault();


    mu_s_container_to_scroll = document.getElementById(mu_s_container_to_scroll_id);
    mu_s_scrollbar = document.getElementById(mu_s_scrollbar_id);
    mu_s_scroller = document.getElementById(mu_s_scroller_id);



    mu_s_mouse_old_y = event.clientY;
    
    document.onmouseup = function() {document.onmouseup = null;document.onmousemove = null;};

    document.onmousemove = function() {


        mu_s_show_and_hide_scrollbar(mu_s_scroller);



        mu_s_mouse_new_y = parseInt(mu_s_scroller.style.marginTop, 10) + event.clientY - mu_s_mouse_old_y;

        if( mu_s_mouse_new_y >= 0 && mu_s_mouse_new_y <= (mu_s_scrollbar.clientHeight - mu_s_scroller.clientHeight) ) {mu_s_scroller.style.marginTop = mu_s_mouse_new_y + "px";}



        mu_s_scrollbar_scrolled = parseInt(mu_s_scroller.style.marginTop, 10) / (mu_s_scrollbar.clientHeight - mu_s_scroller.clientHeight);

        mu_s_container_to_scroll.scrollTop = ( (mu_s_container_to_scroll.scrollHeight - mu_s_container_to_scroll.clientHeight) * mu_s_scrollbar_scrolled );



        mu_s_mouse_old_y = event.clientY;
    };

};

