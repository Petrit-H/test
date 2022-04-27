import {
  // categories,
  getCategories,
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
/*   console.log(
    "welcome to🔐 \n",
    `
      CCCCCCCCCCCCC MMMMMMMM              MMMMMMMMM PPPPPPPPPPPPPPP
    CCC:::::::::::C M:::::::M             M:::::::M P:::::::::::::::P
  CC::::::::::::::C M::::::::M           M::::::::M P:::::PPPPPP:::::P
 C:::::CCCCCCCC:::C M:::::::::M         M:::::::::M P:::::P     P:::::P
C:::::C       CCCCC M::::::::::M       M::::::::::M P:::::P     P:::::P
C:::::C              M::::::::::M     M::::::::::M   P::::P     P:::::P
C:::::C              M::::::M::::M   M::::M::::::M   P::::PPPPPP:::::P
C:::::C              M:::::M M::::M M::::M M:::::M   P:::::::::::::PP
C:::::C              M:::::M  M::::M::::M  M:::::M   P::::PPPPPPPPP
C:::::C              M:::::M   M:::::::M   M:::::M   P::::P
C:::::C              M:::::M    M:::::M    M:::::M   P::::P
C:::::C       CCCCC M::::::M     MMMMM     M::::::M P::::::P
 C:::::CCCCCCCC:::C M::::::M               M::::::M P::::::P
  CC::::::::::::::C M::::::M               M::::::M P::::::P
    CCC:::::::::::C M::::::M               M::::::M P::::::P
       CCCCCCCCCCCC MMMMMMMM               MMMMMMMM PPPPPPPP
    `
  ); */
  const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
  const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");
  const spinner = document.getElementById("spinner");

  const goBack = document.getElementById("goBack");

  // const cookieSectionInject = document.querySelector(".cookieSectionInject");
  const cookieSectionInject = document.getElementById("cookieSectionInject");

  // bannerAccordionToggle()

  setTimeout(() => {
    fetchClientIp().then((location) => {
      console.log("PETRIT LOCATION", location);
      locationData = location;
      return location;
    });

    // dataForBala = {
    //   id: createUUID(),
    //   domains: responseData,
    //   NECESSARY: NECESSARY,
    //   PREFERENCES: PREFERENCES,
    //   ANALYTICAL: ANALYTICAL,
    //   MARKETING: MARKETING,
    //   OTHER: OTHER,
    // };
    console.log("🚀 ~ locationData", locationData);
    /*  console.log("==================🧲🧲🧲🧲====================");
    console.log("🚀 ~ categories", categories);
    console.log("🚀 ~ DATA-4-BALA", dataForBala);
    console.log("==================🧲🧲🧲🧲=====================");
 */
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

//   }
// }
