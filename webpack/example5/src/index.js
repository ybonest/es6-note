import $ from 'jquery';
$(function () {
  $('li:odd').css('background', 'red');
  $('li:even').css('background', 'yellow');
})
class Person {
  static info = { country: 'China' }
}
console.log(Person.info);