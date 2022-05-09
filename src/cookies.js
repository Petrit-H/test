import {
  // categories,
  // getCategories,
  getDomains,
  getCookies,
  // responseData,
} from "./getDomainsWithCookies";
import { setCookie } from "./utils/cookie";
import axios from "axios";
import { fetchClientIp } from "./options/location";

console.log(createUUID());
const OTHER = [];
const MARKETING = [];
const ANALYTICAL = [];
const PREFERENCES = [];
const NECESSARY = [];
// let responseData = [];
// let categories = [];
// let filteredCookies = [];
let responseForCookies = []; //?{ cookie_name: "", cookie_status: "" }
let cookiesPerCategory = [];
// let dataForBala = [];
let dataForBala = {};
let locationData = "";

window.addEventListener("load", function (event) {
  console.log(
    "welcome to🔐 \n",
    `
.------..------..------.
|C.--. ||M.--. ||P.--. |
| :/\\: || (\\/) || :/\\: |
| :\\/: || :\\/: || (__) |
| '--'C|| '--'M|| '--'P|
\`------'\`------'\`------'
    `
  );
  const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
  const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");
  const spinner = document.getElementById("spinner");

  const goBack = document.getElementById("goBack");

  // const cookieSectionInject = document.querySelector(".cookieSectionInject");
  const cookieSectionInject = document.getElementById("cookieSectionInject");

  // bannerAccordionToggle()

  setTimeout(() => {
    fetchClientIp().then((location) => {
      locationData = location;
      return location;
    });
  }, 400);
});

function createUUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
