/**

  This file should be removed 
  on Bootstrap 5+

**/
// -- -- --
// Polyfill: Array forEach
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
if ( !Array.prototype['forEach'] ) {
	Array.prototype.forEach=function(r,o){if(null==this)throw new TypeError("Array.prototype.forEach called on null or undefined");var n,t,e=Object(this),f=e.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(arguments.length>1&&(n=o),t=0;t<f;){var i;t in e&&(i=e[t],r.call(n,i,t,e)),t++}};
}
// [IE 9+] Polyfill: forEach
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
// document.querySelectorAll('.selector').forEach(function(e) {...});
// array.forEach(function(e) {...});
if ( window.NodeList && !NodeList.prototype.forEach ) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}