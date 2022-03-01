module.exports = CMP_Section = {
  // Fill a select element with options (html can be configured using `cb`)
  fillSelect: function (select, options, selected, cb) {
    if (typeof cb != "function") {
      cb = this.getSimpleOption;
    }
    select.innerHTML = Object.keys(options).reduce(function (str, key) {
      return str + cb(options[key], key, key == selected);
    }, "");
  },
  getSimpleOption: function (label, value, selected) {
    return (
      "<option " +
      (selected ? 'selected="selected"' : "") +
      ' value="' +
      value +
      '">' +
      label +
      "</option>"
    );
  },
  tabularObject: function (obj, formatVal, formatKey) {
    if (typeof formatKey !== "function")
      formatKey = function () {
        return arguments[0];
      };
    if (typeof formatVal !== "function")
      formatVal = function () {
        return arguments[0];
      };

    return (
      Object.keys(obj).reduce(function (str, key) {
        return (str +=
          "<li><em>" +
          formatKey(key, obj[key]) +
          "</em> " +
          formatVal(obj[key], key) +
          "</li>");
      }, "<ul>") + "</ul>"
    );
  },
  initialisePopupSelector: function (options) {
    const itemOpen = "<li><span>";
    const itemClose = "</span></li>";
    // const itemOpen = "<li><span>";
    // const itemClose = "</span></li>";
    const instances = [];

    //todo options.selector.innerHTML =
    //todo   itemOpen + Object.keys(options.popups).join(itemClose + itemOpen) + itemClose;
    //todo console.log("PETRITTTTT", Object.keys(options.popups).join(itemClose + itemOpen));

    //todo options.selector.onclick = function (event) {
    //todo   let targ = event.target;
    //todo   timeStamp();
    //todo   // if the target is the container, exit
    //todo   if (targ.isEqualNode(options.selector)) return;

    //todo   // from this point, only the child elements of opts.selector will get through.
    //todo   // out of these child elements, we want to find the closest direct decendant <li>
    //todo   while (targ.tagName != "LI" && targ.parentNode) {
    //todo     targ = targ.parentNode;
    //todo   }
    //todo   if (!targ.parentNode.isEqualNode(options.selector)) return;
    //todo   // from this point, 'targ' will be a direct decendant of opts.selector
    //todo   const index = Array.from(options.selector.children).indexOf(targ);
    //todo   console.log("🚀 ~ INDEX", index);

    //todo   if (index >= 0 && instances[index]) {
    //todo     instances[index].clearStatuses();
    //todo     // We could remember the popup that's currently open, but it gets complicated when we consider
    //todo     // the revoke button. Therefore, simply close them all regardless
    //todo     instances.forEach(function (instance) {
    //todo       if (instance.isOpen()) {
    //todo         instance.close();
    //todo       }
    //todo       instance.toggleRevokeButton(false);
    //todo     });
    //todo     instances[index].open();
    //todo   }
    //todo };

    // const index = Array.from(options.selector.children);

    const index = 0;

    // if (index >= 0 && instances[index]) {
    //   console.log(index);
    //   // instances[index].clearStatuses();
    //   // We could remember the popup that's currently open, but it gets complicated when we consider
    //   // the revoke button. Therefore, simply close them all regardless
    //   instances.forEach(function (instance) {
    //     if (instance.isOpen()) {
    //       instance.close();
    //     }
    //     instance.toggleRevokeButton(false);
    //   });
    //   console.log("🚀 ~ file: scripts.js ~ line 103 ~ instances[0]", instances[0])
    //   instances[0]?.open();
    // }

    //!================================
    //! let testType = "info";
    //! // let testType = "categories"
    //! const optionsObj = (countryCode, type) => {
    //!   // debugger;
    //!   console.log("CODE ", countryCode);
    //!   const options = {
    //!     cookieconsent: CookieConsent,
    //!     selector: document.querySelector(".example-selector"),
    //!     container: document.getElementById("CMP"),
    //!     // type: 'categories',
    //!     type: type,
    //!     regionalLaw: true,
    //!     legal: { countryCode },
    //!     law: {
    //!       regionalLaw: true,
    //!     },
    //!     location: true,
    //!     position: "bottom",
    //!     revokable: true,
    //!     palette: {
    //!       categories: {
    //!         display: "flex",
    //!         "flex-direction": "column",
    //!         height: "100vh",
    //!       },
    //!     },
    //!   };
    //!   console.log(
    //!     "🚀 ~ file: index.html ~ line 98 ~ optionsObj ~ options",
    //!     options
    //!   );
    //!   return options;
    //! };
    //!================================

    //? Event handlers
    //todo Object.keys(options).forEach(function (example, index) {
    //todo   console.log("🚀 ~ EXAMPLE ~ ", example);

    //todo   const myOpts = example;
    //todo   // Object.keys(options.popups).forEach(function (example, index) {
    //todo   //   console.log("🚀 ~ EXAMPLE ~ ", options.popups[example]);

    //todo   //   const myOpts = options.popups[example];
    //todo   myOpts.autoOpen = false;
    //todo   //! LAW SECTION OF OSANO
    //todo   instances[index] = new options.cookieconsent(myOpts);
    //todo   // instances[index] = new options.cookieconsent(optionsObj("XK", testType));
    //todo   const countryOpts = instances[index].getCountryLaws("EN");
    //todo   console.log(
    //todo     "🚀 ~ file: scripts.js ~ line 156 ~ countryOpts",
    //todo     countryOpts
    //todo   );
    //todo   // instances[index].on("initialized", (...args) => console.log(args));
    //todo   instances[index].on("initialized", function (popup) {
    //todo     popup.autoOpen();
    //todo   });
    //todo   instances[index].on("initialized", function (statuses) {
    //todo     console.log("initialized event fired with statuses: ");
    //todo     // Object.keys(statuses).forEach((status) => {
    //todo     // console.log(status, "--", statuses[status]);
    //todo     // });
    //todo   });
    //todo   instances[index].on("error", console.error);
    //todo   instances[index].on("popupOpened", (...args) =>
    //todo     console.log("Popup Open", args)
    //todo   );
    //todo   instances[index].on("popupClosed", (...args) =>
    //todo     console.log("Popup Closed", args)
    //todo   );
    //todo   instances[index].on("revokeChoice", (...args) =>
    //todo     console.log("Popup Reset", args)
    //todo   );
    //todo   instances[index].on("statusChanged", (...args) => console.log(args));
    //todo   instances[index].on("popupOpened", function () {
    //todo     const codediv = document.getElementById("options");
    //todo     if (codediv) {
    //todo       codediv.innerHTML = JSON.stringify(options, null, 2);
    //todo     }
    //todo   });
    //todo   instances[index].on("error", console.error);
    //todo });

    window.addEventListener("unload", () => {
      console.log("CLOSE");
      instances.forEach((instance) => {
        instance.clearStatuses();
        instance.destroy();
      });
    });

    return instances;
  },
  allowAllCookies: function (event) {
    setTimeout(() => {
      console.log("🚀 ~ ALLOW ALL", event);
      // const allowAllCookiesButton = document.querySelectorAll("allowAll");
      // console.log("🚀 ~ ALLOW ALL", allowAllCookiesButton);
      const radioButtons = document.querySelectorAll(".radioButtonCookie");
      const cookieRadioButton = document.querySelectorAll(".cc-btn");

      // allowAllCookiesButton.forEach((element) => {
      // event.target.addEventListener("click", () => {
      console.log("click allow all");
      for (let index = 0; index < radioButtons.length; index++) {
        const element = radioButtons[index];
        element.checked = true;
        // setTimeout(() => {
        console.log(element.checked);
        // cookieRadioButton[index].change()
        element.addEventListener("change", console.log("change"));
        const event = new Event("change");
        element.dispatchEvent(event);
        // }, 500);
      }
      // });
      // });
    }, 200);
    // console.log(radioButtons);
    document.removeEventListener("click", event.target);
  },
  bannerAccordionToggle: function (index) {
    debugger;
    let header = document.querySelectorAll(".cc-category .accordionHeader");
    let accordionContent = document.querySelectorAll(
      ".cc-category .accordionContent"
    );
    console.log("🚀 ~ ACCORDION-HEADER", header);
    console.log("🚀 ~ACCORDION-CONTENT", accordionContent);

    console.log("🚀 ~ HEADER LENGTH => ", header.length);
    console.log("🚀 ~ CONTENT LENGTH => ", accordionContent.length);

    ["h-0", "hidden"].map((i) => accordionContent[index]?.classList?.toggle(i));
    const children = accordionContent[index].children;
    console.log("🚀 ~ children", children.length);
    for (element in children) {
      children[element]?.classList?.toggle("opacity-0");
    }
    console.log("BANNER CLICK ACCORDION TOGGLE");
  },
  showModal: function () {
    let id;
    const toggle = document.querySelectorAll(".cookieDetails");
    for (const elmnt of toggle) {
      elmnt.addEventListener("click", (event) => {
        id = event.target.attributes.value.value;
        console.log("CATEGORY ID CLIKED: ", id);
        COOKIE_SETTINGS.classList.remove("hidden");
        COOKIE_DISPLAY.classList.add("hidden");
        filterCookiesByCategory(
          responseData,
          +id,
          cookiesPerCategory,
          "CLICKED ON"
        );
        settingsAccordionToggle();
        fillCookieSettingItem();
      });
    }
    // if (
    //   NECESSARY.length === 0 ||
    //   PREFERENCES.length === 0 ||
    //   MARKETING.length === 0 ||
    //   ANALYTICAL.length === 0  ||
    //   OTHER.lenght === 0
    // ) {
    //   //todo noData.classList.remove("hidden");
    //   console.log("~~~NO DATA TO DISPLAY~~~");
    // }
  },

  // typeToggleFunction: function () {
  //   let testType = "info";
  //   const locationElement = document.getElementById("location");
  //   const categoriesType = document.querySelector(".cc-window");
  //   const infoType = document.querySelector(".cc-window.cc-type-info");
  //   let ccInstance;

  //   console.log("TOGGGGGGLE");
  //   setTimeout(() => {
  //     const toggleType = document.querySelectorAll(".typeChange");

  //     console.log("🚀 ~ ", toggleType);

  //     for (const key of toggleType) {
  //       console.log(key);
  //       // key.addEventListener("click", (event) => {
  //         // timeStamp();
  //         console.log("🚀 ~ file: index.html ~ line 193 ~ type", testType);
  //         // toggleType.addEventListener("click", (e) => {
  //         console.log(
  //           "🚀 ~ file: index.html ~ line 204 ~ categoriesType => ",
  //           categoriesType
  //         );
  //         console.log(
  //           "🚀 ~ file: index.html ~ line 205 ~ infoType => ",
  //           infoType
  //         );
  //         // debugger
  //         // console.log("🚀 ~ file: index.html ~ line 193 ~ type", testType)
  //         if (testType === "info") {
  //           testType = "categories";
  //           optionsObj(
  //             locationElement[locationElement.selectedIndex].value,
  //             "categories"
  //           );
  //           ccInstance.clearStatuses().destroy();
  //           draw(locationElement[locationElement.selectedIndex].value);
  //           CMP_Section.bannerAccordionToggle();
  //           CMP_Section.showModal();
  //           console.log("🚀 ~ TYPE-> options.type", testType);
  //         } else if (testType === "categories") {
  //           testType = "info";
  //           optionsObj(
  //             locationElement[locationElement.selectedIndex].value,
  //             "info"
  //           );
  //           ccInstance.clearStatuses().destroy();
  //           draw(locationElement[locationElement.selectedIndex].value);
  //           console.log("🚀 ~TYPE->  options.type", testType);
  //           CMP_Section.allowAllCookies();
  //         } else {
  //           return this;
  //         }
  //       // });
  //     }
  //   }, 500);
  // },
};

//! Handles the tabs and its content
function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

//! Prevent the checkbox click to toggle the dropdown

(function preventChildDefault() {
  const checkbox = document.querySelectorAll("input[type=checkbox]");
  for (const index of checkbox) {
    index.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("click the toggler");
    });
  }
})();
