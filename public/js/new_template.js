/*!
=========================================================
* Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll

// Now you can use $ as you would in a browser with jQuery
// $(document).ready(function () {
//     $(".navbar .nav-link").on('click', function (event) {

//         if (this.hash !== "") {

//             event.preventDefault();

//             var hash = this.hash;

//             $('html, body').animate({
//                 scrollTop: $(hash).offset().top
//             }, 700, function () {
//                 window.location.hash = hash;
//             });
//         }
//     });
// });

// // navbar toggle
const navToggle = $('#nav-toggle');
const mainNavigation = $('#main-navigation');

function closeNavigation() {
    navToggle.removeClass('is-active').attr('aria-expanded', 'false');
    mainNavigation.removeClass('show');
}

navToggle.on('click', function () {
    const isExpanded = $(this).attr('aria-expanded') === 'true';
    $(this).toggleClass('is-active', !isExpanded).attr('aria-expanded', String(!isExpanded));
    mainNavigation.toggleClass('show', !isExpanded);
});

mainNavigation.find('a').on('click', closeNavigation);

$(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
        closeNavigation();
    }
});

$(window).on('resize', function () {
    if (window.matchMedia('(min-width: 992px)').matches) {
        closeNavigation();
    }
});
