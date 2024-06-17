function load() {
    var lSessionToken = sessionToken;
    const recipe = {recipe: {
            form: {
                provider: {
                    name: 'legacy',
                    version: 'v4'
                },
            }
        }
    }
    const modeConfig = {"mode":"development"}
    const sessionConfig = {session:{token:lSessionToken}}
    const oneSdkConfig =  {...sessionConfig,...modeConfig,...recipe};
    activateSDK(oneSdkConfig)
}

async function activateSDK(oneSdkConfig) {
  var oneSdk = await OneSdk(oneSdkConfig);

  const ff_config_object = {
      "mode": "production",
      ageRange: [18, 125],
      organisationName: "My Bank",
      // "checkProfile": "auto",
      // "phrases": phrases_v2,
      "welcomeScreen": true,
      "maxAttemptCount": 3,
      "documentTypes": [
        {
          "icon": "driving-licence",
          "label": "document.type_drivers_licence.label",
          "subtitle": "document.type_drivers_licence.subtitle",
          "type": "DRIVERS_LICENCE"
        },
        {
          "idExpiry": true,
          "icon": "passport",
          "label": "document.type_passport.label",
          "subtitle": "",
          "type": "PASSPORT",
          "acceptedCountries": [
            "AUS"
          ]
        }
      ],
      "successScreen": {
        "ctaUrl": null,
        "ctaText": "Continue to My Account"
      },
      "failureScreen": true,
      "progressBar": true,
      // "googleAPIKey": "xxxxxxxxxxxxxxxxxxxx",
      "acceptedCountries": [
        "AUS"
      ],
  
      "organisationName": "Organisation",
      "dateOfBirth": {
        "type": "gregorian"
      },
      "pendingScreen": {
        "htmlContent": null,
        "ctaActions": []
      },
      //"consentText": "help",
      "requestAddress": {
        "acceptedCountries": [
          "AUS"
        ]
      },
      "documentUploads": false,
      "lazyIDCheck": false,
      "requestID": true,
      "disableThirdPartyAnalytics": false,
      "saveOnly": false,
      injectedCssTagID: 'smart-ui-styles',
    }

    const smartUI = oneSdk.component("form", ff_config_object);
    smartUI.mount("#smartui-container");
}

load()