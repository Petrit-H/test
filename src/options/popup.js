import {
  STATUS_DENY,
  STATUS_ALLOW,
  STATUS_DISMISS,
  COOKIES_CATEGORIES,
  CLOSE_ICON,
  CLOSE_ICON_WHITE,
  COOKIE_WIDGET_ICON_CIRCLE,
  COOKIE_WIDGET_ICON_TRIANGLE,
  CARET_DOWN_ICON,
} from "../constants/index.js";

export default {
  // if false, this prevents the popup from showing (useful for giving to control to another piece of code)
  enabled: true,

  // optional (expecting a HTML element) if passed, the popup is appended to this element. default is `document.body`
  container: null,

  // defaults cookie options - it is RECOMMENDED to set these values to correspond with your server
  cookie: {
    // This is the name of this cookie - you can ignore this
    name: "gjir-cmp",
    // This is the url path that the cookie 'name' belongs to. The cookie can only be read at this location
    path: "/",
    domain: "",
    // The cookies expire date, specified in days (specify -1 for no expiry)
    expiryDays: 365,
    // If true the cookie will be created with the secure flag. Secure cookies will only be transmitted via HTTPS.
    secure: true,
  },

  // each item defines the inner text for the element that it references
  content: {
    header: "Cookies used on the website!",
    title:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate est explicabo enim atque molestiae doloremque voluptates, consectetur vitae rem amet?",
    message:
      "By clicking “Accept”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.",
    // "This website uses cookies to ensure you get the best experience on our website.",
    dismiss: "Got it!",
    allow: "Allow",
    allowAll: "Accept All",
    deny: "Decline",
    link: "Learn more",
    href: "https://www.cookiesandyou.com",
    close: `<img src=${CLOSE_ICON} class="cc-close" alt="close button"/>`,
    closeWhite: `<img src=${CLOSE_ICON_WHITE} class="cc-close" alt="close button"/>`,
    target: "_blank",
    widgetImage: `<img src=${COOKIE_WIDGET_ICON_CIRCLE} class="cc-revoke static p-0" style="position:static;padding:0" alt="cookie icon bottom"/>`,
    policy: "Cookie Policy",
    settings: "Cookie Preferences",
  },

  // This is the HTML for the elements above. The string {{header}} will be replaced with the equivalent text below.
  // You can remove "{{header}}" and write the content directly inside the HTML if you want.
  //
  //  - ARIA rules suggest to ensure controls are tabbable (so the browser can find the first control),
  //    and to set the focus to the first interactive control (https://w3c.github.io/using-aria/)
  elements: {
    header: '<span class="cc-header">{{header}}</span>&nbsp',
    message:
      '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
    messagelink:
      '<span id="cookieconsent:desc" class="cc-message">{{policy}} <a aria-label="learn more about cookies" role=button tabindex="0" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a></span>',
    // dismiss: `<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-${STATUS_DISMISS}">{{dismiss}}</a>`,
    dismiss: `
    <div class="controlSection z-50 fixed top-0 right-0 pt-2 pr-2 flex justify-between items-center ">
      <span aria-label="dismiss cookie message" class="z-50" role=button tabindex="0">{{closeWhite}}</span>
    </div>
    <div id="CMP" class="CMPWrapper transform  bannerWrapper flex flex-col xl:flex-row justify-between w-screen	max-w-7xl mx-auto">
      <div class="bannerWrapper__description mb-9 xl:mb-0 w-full xl:w-2/3 leading-4 text-sm">
          <p class="text-black-faded">{{message}} <span id="cookieconsent:desc"><a aria-label="learn more about cookies" role=button tabindex="0" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{policy}}</a></span>
            <button class="text-white banner-type-change">Cookie Settings</button>
          </p>
      </div>
      <div class="bannerWrapper__controls flex justify-end text-sm">
        <button class="gotItButton px-10 w-3/4 cc-btn cc-save py-2.5 rounded-md cc-${STATUS_ALLOW}" id="declineCookies" >{{dismiss}}</button>
        <button class="banner-type-change px-10 w-3/4 cc-btn py-2.5 rounded-md " id="acceptCookies">{{settings}}</button>
      </div>
    </div>
    `,
    allow: `
    <div class="controlSection z-50 fixed top-0 right-0 pt-2 pr-2 flex justify-between items-center ">
      <span aria-label="dismiss cookie message" class="z-50" role=button tabindex="0">{{closeWhite}}</span>
    </div>
    <div id="CMP" class="CMPWrapper transform  bannerWrapper flex flex-col xl:flex-row justify-between w-screen	max-w-7xl mx-auto">
      <div class="bannerWrapper__description mb-9 xl:mb-0 w-full xl:w-2/3 leading-4 text-sm">
          <p class="text-black-faded">{{message}} <span id="cookieconsent:desc"><a aria-label="learn more about cookies" role=button tabindex="0" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{policy}}</a></span>
            <button class="text-white banner-type-change">Cookie Settings</button>
          </p>
      </div>
      <div class="bannerWrapper__controls flex justify-end text-sm">
        <button class="gotItButton px-10 cc-btn cc-save py-2.5 rounded-md cc-${STATUS_ALLOW}" id="declineCookies" >{{dismiss}}</button>
      </div>
    </div>
    `,
    deny: `<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-${STATUS_DENY}">{{deny}}</a>`,
    link: `<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a>`,
    close: `<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>`,
    categories: `
    <div class="max-w-lg xl:max-w-xl min-w-sm  w-full mx-auto z-10 flex flex-col justify-center items-center ">
    <div class="cmp-overlay"></div>
        <i class="hidden">COOKIE_DISPLAY</i>
        <div id="COOKIE_DISPLAY" class="cookieModal  relative overflow-hidden rounded-lg bg-white w-full">
          <div class="controlSection z-50 sticky top-0 p-4 flex justify-between items-center border-b-2 border-gray-200">
            <div class="title">Cookie Settings</div>
            <span aria-label="dismiss cookie message" role=button tabindex="0">{{close}}</span>
           </div>
          <div class="contentWrapper overflow-y-auto my-3">
            <div class="descSectoin px-4 py-3">
              <p class="2xl:pt-4 pb-2">{{title}}</p>
              <p class="2xl:pt-4 pb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, maxime?</p>
            </div>

            <ul class="cc-categories px-4 basic-categories-banner">

            </ul>
          </div>
          <div class=" bottom-0 border-gray-200 border-t-2  buttons flex justify-end left-0 p-3 w-full z-50">
            <button type="button"
              class="cc-btn cc-save cc-${STATUS_ALLOW}  allow-all border-0 rounded-md px-5 py-1.5 border-gray-200  mr-4" >{{allowAll}}</button>
            <button class="cc-btn cc-save  cc-${STATUS_ALLOW} border-none border-gray-200 rounded-md px-5 py-1.5 bg-blue-500 text-white">Confirm
              My Choices</button>
          </div>
        </div>

        <i class="hidden">COOKIE_SETTINGS</i>
        <div id="COOKIE_SETTINGS" class=" cookieModal hidden relative overflow-hidden rounded-lg bg-white w-full">
          <div class="controlSection z-50 sticky top-0 p-4 flex justify-between items-center border-b-2 border-gray-200">
            <div class="title">Cookie Settings</div>
            <span aria-label="dismiss cookie message" role=button tabindex="0">{{close}}</span>
          </div>
          <div class="contentWrapper overflow-y-scroll my-3">

            <div class="descSectoin px-4 py-3">
              <button id="goBack" class="group flex items-center cursor-pointer max-w-max xl:mb-7 mb-5">
                <img src=${CARET_DOWN_ICON} alt="goback " class="rotate-90 z-50 transform mr-3">
                <span class="text-black z-50">Back</span>
              </button>
              <p class="2xl:pt-4 pb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto excepturi vel
                quaerat
                obcaecati commodi
                eveniet placeat repudiandae natus nam deserunt tenetur voluptas facilis, voluptates explicabo quasi in,
                eum
                quod tempora!</p>
              <p class="2xl:pt-4 pb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, maxime?</p>
            </div>
            <div id="noData" class=" absolute bg-gray-100 flex  w-full items-center justify-center h-full top-0 left-0 text-2xl text-center text-gray-900 hidden">
            <p class="my-auto">No Data Available</p>
          </div>
          <div class="custom-categories-banner custom-categories-banner p-4"></div>
          </div>
          <div class=" bottom-0 border-gray-200 border-t-2  buttons flex justify-end left-0 p-3 w-full z-50">
            <button type="button"
              class="cc-btn cc-save  allow-all border-2 rounded-md px-5 py-1.5 border-gray-200  mr-4">{{allowAll}}</button>
            <button class="cc-btn cc-save border-none border-gray-200 rounded-md px-5 py-1.5 bg-blue-500 text-white">Confirm
              My
              Choices
            </button>
          </div>
        </div>
  </div>

      `,
    save: `<button class="cc-btn cc-save">Save your data</button>`,
    // compliance: compliance is also an element,  but it is generated by the application, depending on `type` below
  },

  // The placeholders {{classes}} and {{children}} both get replaced during initialisation:
  //  - {{classes}} is where additional classes get added
  //  - {{children}} is where the HTML children are placed
  window:
    '<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="CMPWrapper w-full transform opacity-0  z-50  TEST cc-window {{classes}}"><!--googleoff: all-->{{children}}<!--googleon: all--></div>',

  modal: "",

  // This is the html for the revoke button. This only shows up after the user has selected their level of consent
  // It can be enabled of disabled using the `revokable` option
  revokeBtn:
    '<button type="button" class="cc-revoke bottom-0">{{widgetImage}}</button>',

  // define types of 'compliance' here. '{{value}}' strings in here are linked to `elements`
  compliance: {
    info: '<div class="cc-compliance w-full">{{dismiss}}</div>',
    "opt-in": '<div class="cc-compliance cc-highlight">{{allow}}</div>',
    "opt-out":
      '<div class="cc-compliance cc-highlight">{{dismiss}}{{deny}}</div>',
    categories:
      '<div class="cmp-categories flex items-center">{{categories}}</div>',
  },

  // select your type of popup here
  type: "info", // refers to `compliance` (in other words, the buttons that are displayed)

  // define layout layouts here
  layouts: {
    // the 'block' layout tend to be for square floating popups
    basic: "{{compliance}}",
    "basic-close": "{{messagelink}}{{compliance}}{{close}}",
    "basic-header": "{{header}}{{message}}{{link}}{{compliance}}",
    // add a custom layout here, then add some new css with the class '.cc-layout-my-cool-layout'
    "my-cool-layout":
      '<div class="my-special-layout">{{message}}{{compliance}}</div>{{close}}',
  },

  // default layout (see above)
  layout: "basic",

  // this refers to the popup windows position. we currently support:
  //  - banner positions: top, bottom
  //  - floating positions: top-left, top-right, bottom-left, bottom-right
  //
  // adds a class `cc-floating` or `cc-banner` which helps when styling
  position: "bottom", // default position is 'bottom'

  // Available styles
  //    -block (default, no extra classes)
  //    -edgeless
  //    -classic
  // use your own style name and use `.cc-theme-STYLENAME` class in CSS to edit.
  // Note: style "wire" is used for the configurator, but has no CSS styles of its own, only palette is used.
  theme: "block",

  // The popup is `fixed` by default, but if you want it to be static (inline with the page content), set this to false
  // Note: by default, we animate the height of the popup from 0 to full size
  static: false,

  // if you want custom colours, pass them in here. this object should look like this.
  // ideally, any custom colours/themes should be created in a separate style sheet, as this is more efficient.
  //   {
  //     popup: {background: '#000000', text: '#fff', link: '#fff'},
  //     button: {background: 'transparent', border: '#f8e71c', text: '#f8e71c'},
  //     highlight: {background: '#f8e71c', border: '#f8e71c', text: '#000000'},
  //   }
  // `highlight` is optional and extends `button`. if it exists, it will apply to the first button
  // only background needs to be defined for every element. if not set, other colors can be calculated from it
  palette: null,

  // Some countries REQUIRE that a user can change their mind. You can configure this yourself.
  // Most of the time this should be false, but the `cookieconsent.legal` can change this to `true` if it detects that it should
  revokable: false,

  // if true, the revokable button will tranlate in and out
  animateRevokable: true,

  // used to disable link on existing layouts
  // replaces element messagelink with message and removes content of link
  showLink: true,

  // set value as scroll range to enable
  dismissOnScroll: false,

  // set value as time in milliseconds to autodismiss after set time
  dismissOnTimeout: false,

  // set value as click anything on the page, excluding the `ignoreClicksFrom` below (if we click on the revoke button etc)
  dismissOnWindowClick: false,

  // set value as click anything on the page, excluding the `ignoreClicksFrom` below (if we click on the revoke button etc)
  dismissOnLinkClick: false,

  // set value as keys are pressed, ( allowKeyCode = 13, denyKeyCode = 27 )
  dismissOnKeyPress: false,

  // If `dismissOnWindowClick` is true, we can click on 'revoke' and we'll still dismiss the banner, so we need exceptions.
  // should be an array of class names (not CSS selectors)
  ignoreClicksFrom: ["cc-revoke", "cc-btn", "cc-link"], // already includes the revoke button and the banner itself

  // The application automatically decide whether the popup should open.
  // Set this to false to prevent this from happening and to allow you to control the behaviour yourself
  autoOpen: true,

  // By default the created HTML is automatically appended to the container (which defaults to <body>). You can prevent this behaviour
  // by setting this to false, but if you do, you must attach the `element` yourself, which is a public property of the popup instance:
  //
  //     const instance = cookieconsent.factory(options)
  //     document.body.appendChild(instance.element)
  //
  autoAttach: true,

  // set value if floating layout should be forced for mobile devices
  mobileForceFloat: true,

  // simple whitelist/blacklist for pages. specify page by:
  //   - using a string : '/index.html'           (matches '/index.html' exactly) OR
  //   - using RegExp   : /\/page_[\d]+\.html/    (matched '/page_1.html' and '/page_2.html' etc)
  whitelistPage: [],
  blacklistPage: [],

  // If this is defined, then it is used as the inner html instead of layout. This allows for ultimate customisation.
  // Be sure to use the classes `cc-btn` and `cc-ALLOW`, `cc-DENY` or `cc-DISMISS`. They enable the app to register click
  // handlers. You can use other pre-existing classes too. See `src/styles` folder.
  overrideHTML: null,
};

/*
  compliance: {
    info: '<div class="cc-compliance w-full">{{dismiss}}</div>',
    "opt-in":
      '<div class="cc-compliance cc-highlight">{{dismiss}}{{allow}}{{customize}}</div>',
    "opt-out":
      '<div class="cc-compliance cc-highlight">{{dismiss}}{{deny}}</div>',
    categories:
      '<div class="cmp-categories flex items-center">{{categories}}</div>',
  },
*/
