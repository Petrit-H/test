//! check if the user has selected any option
let cookies_settings = localStorage.getItem("cookies_settings");

// console.log(
//   "🚀 ~ file: homeBanner.js ~ line 7 ~ cookies_settings",
//   cookies_settings
// );

// let cookies_settings= true;
const CMPWrapper = document.getElementsByClassName("CMPWrapper")[0];
const toggleModal = document.getElementById("toggle");
const declineCookies = document.getElementById("declineCookies");
const acceptCookies = document.getElementById("acceptCookies");
const closeIcon = document.querySelectorAll(".closeIcon");
// const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
// const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");

// console.log("🚀 ~ file: homeBanner.js ~ line 4 ~ toggle", toggle);
// console.log("🚀 ~ file: cookies.js ~ line 20 ~ CMPWrapper", CMPWrapper);

const enableModal = () => {
  console.log("CLICKKKKKKKKKK");
  // CMPWrapper.classList.add("opacity-0");
  // localStorage.setItem("cookies_settings", false);
  localStorage.setItem("cookies_settings", true);
  COOKIE_DISPLAY.classList.remove("hidden");
  //  COOKIE_SETTINGS.classList.add("hidden")
  // console.log("modal show");
};
const disableModal = () => {
  // CMPWrapper.classList.remove("opacity-0");
  localStorage.setItem("cookies_settings", false);
  COOKIE_DISPLAY.classList.add("hidden");
  // COOKIE_SETTINGS.classList.remove("hidden")
  // localStorage.setItem("cookies_settings", true);
  // console.log("modal hidden");
};

//! handle the clicks in the modal, where ever they might be
// let modalDisplay = () => {
//   cookies_settings = localStorage.getItem("cookies_settings");
//   console.log("click");
//   // console.log(cookies_settings);
//   //! close the cookies modal on X click and display the
//   for (const item of closeIcon) {
//     item.addEventListener("click", function () {
//       COOKIE_DISPLAY.classList.add("hidden");
//       COOKIE_SETTINGS.classList.add("hidden");
//       localStorage.setItem("cookies_settings", !cookies_settings);
//       // localStorage.clear();
//       if (cookies_settings === true) {
//         enableModal();
//       } else {
//         disableModal();
//       }
//     });
//   }
//   if (cookies_settings !== true) {
//     disableModal();
//   } else {
//     enableModal();
//   }
// };

//! show the consent banner on window load and after x seconds
// window.onload = () => {
// CMPWrapper.classList.add("hideModal");
// setTimeout(() => {
// CMPWrapper.classList.remove("opacity-0");
// modalDisplay();
// }, 1000);
// };
