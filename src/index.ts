import "./router";

import { state } from "./state";
//import { Router } from "@vaadin/router";
const root = document.querySelector(".root");
//console.log(root);
// console.log(state, "soy el state");

(function () {
  state.init();
  //   state.singup("email@erg.com", "julian");
})();
