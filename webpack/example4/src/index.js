import $ from 'jquery';
import './css/a.css';  //引入css
import './css/b.scss';  //引入scss
import './css/c.less';  //引入less

$(function(){
  $('li:even').css('background','red');
  $('li:odd').css('background','yellow');
})