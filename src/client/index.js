import handleSubmit from "./js/app.js";
require ("bootstrap");
import jquery from "./js/jquery.min.js";
import "./styles/style.scss";
import "bootstrap";
import Logo from "./media/Logo.png";
import background from "./media/TogetherInTravel.jpg";
import "./js/app.js";
//import axios from 'axios';

window.Popper = require("popper.js").default;
window.$ = window.jQuery = require("jquery");

document.addEventListener('DOMContentLoaded', function(){
  document
      .getElementById("btnSearch")
      .addEventListener("click", handleSubmit);
});

