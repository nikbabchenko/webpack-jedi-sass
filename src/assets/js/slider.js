import $ from 'jquery';
import 'slick-carousel';

export function sliderInit() {
    $('.main__slider').slick({
        dots: true,
        arrows: false
    });
}