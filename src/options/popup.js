import {
  STATUS_DENY,
  STATUS_ALLOW,
  STATUS_DISMISS,
  // COOKIES_CATEGORIES,
  CMP_CLOSE_ICON,
  CMP_CLOSE_ICON_WHITE,
  CMP_WIDGET_ICON_CIRCLE,
  CMP_WIDGET_ICON_TRIANGLE,
  CMP_CARET_DOWN_ICON,
  CMP_HEADER_MESSAGE,
  CMP_BANNER_TITLE,
  CMP_MESSAGE,
  CMP_DISMISS_BUTTON_CONSTENT,
  CMP_ALLOW_BUTTON_CONTENT,
  CMP_ALLOW_ALL_BUTTON_CONTENT,
  CMP_DENY_BUTTON_CONTENT,
  CMP_LEARN_MORE_CONTENT,
  CMP_COOKIE_POLICY,
  CMP_COOKIE_POLICY_URL,
  CMP_PRIVACY_POLICY,
  CMP_PRIVACY_POLICY_URL,
  CMP_COOKIE_POLICY_LINK_TARGET,
  CMP_COOKIE_SETTINGS,
  CMP_BANNER_LOGO,
  CMP_BANNER_LANGUAGES_ICON,
  // CMP_COOKIE_POLICY,
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
    header: CMP_HEADER_MESSAGE,
    title: CMP_BANNER_TITLE,
    message: CMP_MESSAGE,
    dismiss: CMP_DISMISS_BUTTON_CONSTENT,
    allow: CMP_ALLOW_BUTTON_CONTENT,
    allowAll: CMP_ALLOW_ALL_BUTTON_CONTENT,
    deny: CMP_DENY_BUTTON_CONTENT,
    link: CMP_LEARN_MORE_CONTENT,
    href: CMP_COOKIE_POLICY_URL,
    close: `<img src=${CMP_CLOSE_ICON} class="cc-close" alt="close button"/>`,
    closeWhiteIcon: `<img src=${CMP_CLOSE_ICON} class="cc-close" alt="close button"/>`,
    target: CMP_COOKIE_POLICY_LINK_TARGET,
    widgetImage: `<img src=${CMP_WIDGET_ICON_CIRCLE} class="cc-revoke static p-0" style="position:static;padding:0" alt="cookie icon bottom"/>`,
    cookiePolicy: CMP_COOKIE_POLICY,
    cookiePolicyURL: CMP_COOKIE_POLICY_URL,
    privacyPolicy: CMP_PRIVACY_POLICY,
    privacyPolicyURL: CMP_PRIVACY_POLICY_URL,
    settings: CMP_COOKIE_SETTINGS,
  },

  // This is the HTML for the elements above. The string {{header}} will be replaced with the equivalent text below.
  // You can remove "{{header}}" and write the content directly inside the HTML if you want.
  //
  //  - ARIA rules suggest to ensure controls are tabbable (so the browser can find the first control),
  //    and to set the focus to the first interactive control (https://w3c.github.io/using-aria/)
  elements: {
    header: '<span class="cc-header">{{header}}</span>&nbsp',
    message: '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
    messagelink: '<span id="cookieconsent:desc" class="cc-message">{{policy}} <a aria-label="learn more about cookies" role=button tabindex="0" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a></span>',
    // dismiss: `<a aria-label="dismiss cookie message" role=button tabindex="0" class="cc-btn cc-${STATUS_DISMISS}">{{dismiss}}</a>`,
    //? <button class="text-blue banner-type-change">Cookie Settings</button>

    dismiss: `
    <button type="button" class="control-section z-50 fixed top-0 right-0 pt-2 pr-2 flex justify-between items-center ">
      <span aria-label="dismiss cookie message" class="z-50" role=button tabindex="0">{{closeWhiteIcon}}</span>
    </button>
    <div id="cmp" class="cmp-container  transform  banner-wrapper flex flex-col md:flex-row justify-between w-screen	max-w-7xl mx-auto">
      <div class=" cmp-banner-description w-auto md:w-3/4 lg:w-3/4 mb-9 md:mb-0 leading-4 ">
        <p class="text-base font-normal text-black-400 mb-3">We value your privacy</p>
        <div class=" font-normal text-black-400 text-xsmall">
          <span>{{message}}</span>
          <div class="inline-block" id="cookieconsent:desc">
            <a class="text-blue-400 border-b-1 break-word border-b-blue-400 mx-0 md:mx-1" aria-label="learn more about cookies" role=button tabindex="0" href="{{privacyPolicyURL}}" rel="noopener noreferrer nofollow" target="{{target}}">{{privacyPolicy}}</a>
            <a class="text-blue-400 border-b-1 break-word border-b-blue-400 mx-1" aria-label="learn more about cookies" role=button tabindex="0" href="{{cookiePolicyURL}}" rel="noopener noreferrer nofollow" target="{{target}}">{{cookiePolicy}}</a>
          </div>
        </div>
      </div>
      <div class="banner-wrapper-controls w-full md:w-1/2 lg:w-1/2 flex flex-col xs:flex-row  items-center justify-start md:justify-end text-sm ">
        <button class="md:mr-2 border-1 border-blue-400 bg-blue-400 text-small text-white mr-0 xs:mr-2 px-10 mb-2 xs:mb-0 w-full sm:w-auto cc-btn cc-save py-2.5 rounded-4 cc-${STATUS_ALLOW}" id="accept-all-cookies-at-once" >{{allowAll}}</button>
        <button class="border-1 border-blue-400 bg-white text-small text-blue-400 banner-type-change px-10 w-full sm:w-auto py-2.5 rounded-4 " id="accept-cookies">{{settings}}</button>
      </div>
    </div>
    `,
    allow: `
    <div class="control-section z-50 fixed top-0 right-0 pt-2 pr-2 flex justify-between items-center ">
      <span aria-label="dismiss cookie message" class="z-50" role=button tabindex="0">{{closeWhiteIcon}}</span>
    </div>
    <div id="cmp" class="cmp-container transform  banner-wrapper flex flex-col xl:flex-row justify-between w-screen	max-w-7xl mx-auto">
      <div class="cmp-banner-description mb-9 xl:mb-0 w-full xl:w-2/3 leading-4 text-sm">
          <p class="text-black-400">{{message}}
          <span id="cookieconsent:desc">
            <a aria-label="learn more about cookies" role=button tabindex="0" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{policy}}</a>
          </span>
          <button class=" banner-type-change">Cookie Settings</button>
          </p>
      </div>
      <div class="banner-wrapper-controls flex justify-end text-sm">
        <button class="got-it-button px-10 cc-btn cc-save py-2.5 rounded-md cc-${STATUS_ALLOW}" id="accept-necessary-cookies" >{{dismiss}}</button>
      </div>
    </div>
    `,
    deny: `<a aria-label="deny cookies" role=button tabindex="0" class="cc-btn cc-${STATUS_DENY}">{{deny}}</a>`,
    link: `<a aria-label="learn more about cookies" role=button tabindex="0" class="cc-link" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{link}}</a>`,
    close: `<span aria-label="dismiss cookie message" role=button tabindex="0" class="cc-close">{{close}}</span>`,
    categories: `
    <div class="consent-banner-wrapper bg-white w-full mx-auto z-10 flex flex-col justify-center items-center ">

    <div class="cmp-overlay"></div>
    <div class="cookie-modal  relative overflow-hidden rounded-lg bg-white w-full">
      <div class="control-section z-50 sticky top-0 mb-1 px-6 py-6 flex justify-between items-center ">
        <div><img src=${CMP_BANNER_LOGO} alt="Consent Logo" /></div>
        <div class="flex">
        <div id="language-icon-button" class="relative">
          <button aria-label="dismiss cookie message" type="button" tabindex="0"  class="h-full hover:bg-gray-faded active:bg-gray-faded rounded-sm">
            <img src=${CMP_BANNER_LANGUAGES_ICON}  alt="language picker" />
          </button>
          <div id="language-options" class="hidden shadow-2 max-w-100 transition-all duration-500 ease-in-out absolute right-0  flex-col justify-start bg-white z-50 w-100 max-w- text-left border-1 border-gray-light rounded-md">
              <button class="language px-3 py-3 w-full text-left text-blue-300 active:text-blue-500 focus:text-blue-500 hover:text-blue-500 text-base font-normal">English</button>
              <button class="language px-3 py-3 w-full text-left text-blue-300 active:text-blue-500 focus:text-blue-500 hover:text-blue-500 text-base font-normal">Czech</button>
          </div>
        </div>
          <button aria-label="dismiss cookie message" type="button" tabindex="0">{{close}}</button>
        </div>
      </div>
      <div class="tabs flex justify-start px-6  border-b border-blue-300">
          <button type="button" class="tab pointer relative pb-4 mr-6 text-blue-300 font-bold text-base active:text-blue-500 focus:text-blue-500 hover:text-blue-500  after:bg-blue after:rounded active" data-tab-target="#cookie-display">Categories</button>
          <button type="button" class="tab pointer relative pb-4  text-blue-300 font-bold text-base active:text-blue-500 focus:text-blue-500 hover:text-blue-500  after:bg-blue after:rounded " id="cookies-tab" data-tab-target="#cookie-settings">Cookies</button>
      </div>
      <div class="content-wrapper px-6 overflow-y-auto my-3">
        <div class="description-section py-3">
          <p class="2xl:pt-4 pb-2 text-blue-300 text-small font-medium  leading">{{title}}</p>
          <div class="flex">
            <span id="cookieconsent:desc" class="text-blue text-small font-medium border-b-1 border-blue">
             <a aria-label="learn more about cookies" role=button tabindex="0" href="{{privacyPolicyURL}}" rel="noopener noreferrer nofollow" target="{{target}}">{{privacyPolicy}}</a>
            </span>
            <span id="cookieconsent:desc" class="text-blue text-small font-medium ml-2 border-b-1 border-blue">
             <a aria-label="learn more about cookies" role=button tabindex="0" href="{{href}}" rel="noopener noreferrer nofollow" target="{{target}}">{{cookiePolicy}}</a>
            </span>
          </div>
        </div>

        <div class="tab-content">
          <div id="cookie-display" class="tab-content active" data-tab-content>
            <ul id="basic-categories-banner" class=" cc-categories "></ul>
          </div>
          <div id="noData"
              class=" absolute  bg-gray-100 flex  w-full items-center justify-center h-full top-0 left-0 text-2xl text-center text-gray-900 hidden">
              <p class="my-auto">No Data Available</p>
            </div>
          <div id="cookie-settings" class="tab-content py-6" data-tab-content>
            <div id="custom-categories-banner" class=" "></div>
          </div>
        </div>

      </div>
      <div class=" bottom-0 border-gray-200 border-t-2  buttons flex justify-start left-0 px-6 py-6 w-full z-50">
        <div>
          <button
          class="cc-btn cc-save  cc-${STATUS_ALLOW} border-1 border-blue-200 rounded-md px-5 py-1.5 bg-white text-blue-400">Confirm
          My Choices
          </button>
          <button type="button"
            class="cc-btn cc-save cc-${STATUS_ALLOW}  allow-all-button border-1 border-blue-400 rounded-md text-white bg-blue-400 px-5 py-1.5  ml-2">
            {{allowAll}}
          </button>
        </div>
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
  window: '<div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cmp-container w-full transform opacity-0  z-50 shadow-3 cc-window {{classes}}">{{children}}</div>',

  modal: "",

  // This is the html for the revoke button. This only shows up after the user has selected their level of consent
  // It can be enabled of disabled using the `revokable` option
  revokeBtn: '<button type="button" class="cc-revoke bottom-0">{{widgetImage}}</button>',

  // define types of 'compliance' here. '{{value}}' strings in here are linked to `elements`
  compliance: {
    info: '<div class="cc-compliance bg-white w-full">{{dismiss}}</div>',
    "opt-in": '<div class="cc-compliance bg-white cc-highlight">{{allow}}</div>',
    "opt-out": '<div class="cc-compliance bg-white cc-highlight">{{dismiss}}{{deny}}</div>',
    categories: '<div class="cmp-categories flex items-center">{{categories}}</div>',
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
    "my-cool-layout": '<div class="my-special-layout">{{message}}{{compliance}}</div>{{close}}',
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
