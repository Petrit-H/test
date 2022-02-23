import axios from 'axios'


const toError = (obj) => {
  console.log("🚀 ~ file: location.js ~ line 4 ~ toError ~ obj", obj);
  setTimeout(() => {
    let errorMessage = new Error(
      "Error [" + (obj.code || "UNKNOWN") + "]: " + obj.error
    );
    return errorMessage;
  }, 200);
};

// console.log("PITI 1");

let url = "";

const fetchAPI = () => {
  let config = {
    method: "get",
    url: "https://cmp.gjirafa.dev/GetPublicIp",
    headers: {},
  };

  axios(config)
    .then(function (response) {
      url = response.data;
      console.log("==========︾==========");
      console.log("🚀 ~ ", url.Country);
      console.log("🚀 ~ ", url.CountryCode);
      console.log("🚀 ~ ", url.Timezone);
      console.log("🚀 ~ ", url.CountryID);
      console.log("==========︽==========");
      toError({ code: url.CountryCode, error: "Invalid response" });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default {
  // The default timeout is 5 seconds. This is mainly needed to catch JSONP requests that error.
  // Otherwise there is no easy way to catch JSONP errors. That means that if a JSONP fails, the
  // app will take `timeout` milliseconds to react to a JSONP network error.

  timeout: 5000,

  // the order that services will be attempted in
  serviceDefinitions: {
    ipinfo: function (options) {
      fetchAPI();
      return {
        url: "https://cmp.gjirafa.dev/GetPublicIp",
        callback: function (done, response) {
          // console.log("🚀 ~ file: location.js ~ line 19 ~ done", done);
          try {
            var json = JSON.parse(response);
            console.log("🚀 ~ JSON ", json);
            if (json.CountryCode) {
              return { code: json.CountryCode };
            }
            // throw "Could not find a country code in the response";
          } catch (error) {
            return toError({
              code: json.CountryCode,
              error: "Invalid response (" + error + ")",
            });
            // return new Error("Invalid response (" + error + ")");
          }
        },
      };
    },
  },
  services: [
    // 'ipinfo' ,
    {
      name: "ipinfo",
      // interpolateUrl: {
      //   // obviously, this is a fake key
      //   api_key:
      //     "vOgI3748dnIytIrsJcxS7qsDf6kbJkE9lN4yEDrXAqXcKUNvjjZPox3ekXqmMMld",
      // },
    },

    function () {
      return { name: "ipinfo" };
    },
  ],
};

//! =======================================
// ;

// const toError = (obj) =>
//   new Error("Error [" + (obj.code || "UNKNOWN") + "]: " + obj.error);
// console.log("ssddsdsdsdsdsdsd");

// export default {
//   // The default timeout is 5 seconds. This is mainly needed to catch JSONP requests that error.
//   // Otherwise there is no easy way to catch JSONP errors. That means that if a JSONP fails, the
//   // app will take `timeout` milliseconds to react to a JSONP network error.
//   timeout: 5000,

//   // the order that services will be attempted in
//   services: [
//     "ipinfo",

//     // 'ipinfodb' requires some options, so we define it using an object
//     // this object will be passed to the function that defines the service

//     {
//       name: "ipinfodb",
//       interpolateUrl: {
//         // obviously, this is a fake key
//         api_key:
//           "vOgI3748dnIytIrsJcxS7qsDf6kbJkE9lN4yEDrXAqXcKUNvjjZPox3ekXqmMMld",
//       },
//     },

//     // as well as defining an object, you can define a function that returns an object

//     function () {
//       return { name: "ipinfodb" };
//     },
//   ],

//   serviceDefinitions: {
//     ipinfo: function () {
//       return {
//         // This service responds with JSON, so we simply need to parse it and return the country code
//         url: "https://ip.gjirafa.tech/94.22.57.102",
//         headers: ["Accept: application/json,Access-Control-Allow-Origin: *"],
//         callback: function (done, response) {
//           try {
//             const json = JSON.parse(response);
//             return json.error
//               ? toError(json)
//               : {
//                   code: json.country,
//                 };
//           } catch (err) {
//             return toError({ error: "Invalid response (" + err + ")" });
//           }
//         },
//       };
//     },

//     // This service requires an option to define `key`. Options are proived using objects or functions
//     ipinfodb: function () {
//       return {
//         // This service responds with JSON, so we simply need to parse it and return the country code
//         url: "//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}",
//         // 'https://ip.gjirafa.tech/94.22.57.102',
//         // isScript: true, // this is JSONP, therefore we must set it to run as a script
//         callback: function (done, response) {
//           console.log("🚀 ~ response", response);
//           try {
//             const json = JSON.parse(response);
//             return json.statusCode == "ERROR"
//               ? toError({ error: json.statusMessage })
//               : {
//                   code: json.countryCode,
//                 };
//           } catch (err) {
//             return toError({ error: "Invalid response (" + err + ")" });
//           }
//         },
//       };
//     },

//     maxmind: function () {
//       return {
//         // This service responds with a JavaScript file which defines additional functionality. Once loaded, we must
//         // make an additional AJAX call. Therefore we provide a `done` callback that can be called asynchronously
//         url: "//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js",
//         isScript: true, // this service responds with a JavaScript file, so it must be run as a script
//         callback: function (done) {
//           // if everything went okay then `geoip2` WILL be defined
//           if (!window.geoip2) {
//             done(
//               new Error(
//                 "Unexpected response format. The downloaded script should have exported `geoip2` to the global scope"
//               )
//             );
//             return;
//           }

//           geoip2.country(
//             function (location) {
//               try {
//                 done({
//                   code: location.country.iso_code,
//                 });
//               } catch (err) {
//                 done(toError(err));
//               }
//             },
//             function (err) {
//               done(toError(err));
//             }
//           );

//           // We can't return anything, because we need to wait for the second AJAX call to return.
//           // Then we can 'complete' the service by passing data or an error to the `done` callback.
//         },
//       };
//     },
//   },
// };

// !===========================

// ;

// const toError = (obj) =>
//   new Error("Error [" + (obj.code || "UNKNOWN") + "]: " + obj.error);

// export default {
//   // The default timeout is 5 seconds. This is mainly needed to catch JSONP requests that error.
//   // Otherwise there is no easy way to catch JSONP errors. That means that if a JSONP fails, the
//   // app will take `timeout` milliseconds to react to a JSONP network error.
//   timeout: 5000,

//   // the order that services will be attempted in
//   services: [
//     "ipinfo",

//     // 'ipinfodb' requires some options, so we define it using an object
//     // this object will be passed to the function that defines the service

//     {
//       name: "ipinfodb",
//       interpolateUrl: {
//         // obviously, this is a fake key
//         api_key:
//           "vOgI3748dnIytIrsJcxS7qsDf6kbJkE9lN4yEDrXAqXcKUNvjjZPox3ekXqmMMld",
//       },
//     },

//     // as well as defining an object, you can define a function that returns an object

//     function () {
//       return { name: "ipinfodb" };
//     },
//   ],

//   serviceDefinitions: {
//     ipinfo: function () {
//       return {
//         // This service responds with JSON, so we simply need to parse it and return the country code
//         url: "//ipinfo.io",
//         headers: ["Accept: application/json"],
//         callback: function (done, response) {
//           try {
//             const json = JSON.parse(response);
//             return json.error
//               ? toError(json)
//               : {
//                   code: json.country,
//                 };
//           } catch (err) {
//             return toError({ error: "Invalid response (" + err + ")" });
//           }
//         },
//       };
//     },

//     // This service requires an option to define `key`. Options are proived using objects or functions
//     ipinfodb: function () {

//       return {
//         // This service responds with JSON, so we simply need to parse it and return the country code
//         url: "//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}",
//         isScript: true, // this is JSONP, therefore we must set it to run as a script
//         callback: function (done, response) {
//           try {
//             console.log("first test thing");
//             const json = JSON.parse(response);
//             return json.statusCode == "ERROR"
//               ? toError({ error: json.statusMessage })
//               : {
//                   code: json.countryCode,
//                 };
//           } catch (err) {
//             return toError({ error: "Invalid response (" + err + ")" });
//           }
//         },
//       };
//     },

//     maxmind: function () {
//       return {
//         // This service responds with a JavaScript file which defines additional functionality. Once loaded, we must
//         // make an additional AJAX call. Therefore we provide a `done` callback that can be called asynchronously
//         url: "//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js",
//         isScript: true, // this service responds with a JavaScript file, so it must be run as a script
//         callback: function (done) {
//           // if everything went okay then `geoip2` WILL be defined
//           if (!window.geoip2) {
//             done(
//               new Error(
//                 "Unexpected response format. The downloaded script should have exported `geoip2` to the global scope"
//               )
//             );
//             return;
//           }

//           geoip2.country(
//             function (location) {
//               try {
//                 done({
//                   code: location.country.iso_code,
//                 });
//               } catch (err) {
//                 done(toError(err));
//               }
//             },
//             function (err) {
//               done(toError(err));
//             }
//           );

//           // We can't return anything, because we need to wait for the second AJAX call to return.
//           // Then we can 'complete' the service by passing data or an error to the `done` callback.
//         },
//       };
//     },
//   },
// };
