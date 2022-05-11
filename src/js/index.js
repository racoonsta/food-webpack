"use strict";

import "../scss/style.scss";
import "../js/script.js";
import "regenerator-runtime/runtime";

console.log("Enono");

fetch("http://localhost:3000/api/hello") // Тестим GET сервер
  .then(res => console.log("RESPONSE:::", res))
  .catch(err => console.error('ТУТ' + err));

fetch("http://localhost:3000/api/post", {
    method: "POST",
    headers: {},
    body: {'test': "test"}
  }) // Тестим POST сервер
  .then(res => console.log("RESPONSE:::", res))
  .catch(err => console.error('ТУТ' + err));