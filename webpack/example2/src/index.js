import $ from 'jquery';

$(function(){
  $('li:even').css('background','red');
  $('li:odd').css('background','yellow');
})