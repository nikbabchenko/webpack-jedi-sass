import $ from 'jquery';

export function mobileMenuToggler() {
    $('.Header__burger').on('click', () => {
        $(this).toggleClass('Header__burger--active');
        $('.Header__menu').toggleClass('Header__menu--active');
    });
}