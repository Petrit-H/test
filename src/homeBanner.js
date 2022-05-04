let cookies_settings = localStorage.getItem("cookies_settings");
const CMPWrapper = document.getElementsByClassName("CMPWrapper")[0];
const toggleModal = document.getElementById("toggle");
const declineCookies = document.getElementById("declineCookies");
const acceptCookies = document.getElementById("acceptCookies");
const closeIcon = document.querySelectorAll(".closeIcon");

const enableModal = () => {
  console.log("CLICKKKKKKKKKK");
  localStorage.setItem("cookies_settings", true);
  COOKIE_DISPLAY.classList.remove("hidden");
};
const disableModal = () => {
  localStorage.setItem("cookies_settings", false);
  COOKIE_DISPLAY.classList.add("hidden");
};