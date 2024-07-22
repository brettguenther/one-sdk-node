function load() {
    var lSessionToken = sessionToken;
    var lGoogleApiKey = googleApiKey;
    console.log(lSessionToken)
    console.log(lGoogleApiKey)
    const recipe = {recipe: {
            form: {
                provider: {
                    name: 'react',
                    googleApiKey: lGoogleApiKey
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
  const checkBox = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NC4wMDAwMDAsIC04Ni4wMDAwMDApIj48ZyBpZD0iY2hlY2stY2lyY2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NC4wMDAwMDAsIDg2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMCwwIEM0LjUsMCAwLDQuNSAwLDEwIEMwLDE1LjUgNC41LDIwIDEwLDIwIEMxNS41LDIwIDIwLDE1LjUgMjAsMTAgQzIwLDQuNSAxNS41LDAgMTAsMCBMMTAsMCBaIE04LDE1IEwzLDEwIEw0LjQsOC42IEw4LDEyLjIgTDE1LjYsNC42IEwxNyw2IEw4LDE1IEw4LDE1IFoiIGlkPSJTaGFwZSIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="

  const welcome = oneSdk.component("form", {
    name: "WELCOME",
    type: "manual",
  });

  const consent = oneSdk.component("form", {
    name: "CONSENT",
    type: "manual",
    descriptions: [
      { label: 'Your data is being collected in accordance with our privacy policy. We will verify your ID against credit bureau data sources.'},
    ],
  });

  const oneSdkIndividual = oneSdk.individual();
  oneSdkIndividual.setProfileType('auto');

  oneSdk.on('*', (msg)=>{
    console.log(`onesdk wildcard | ${JSON.stringify(msg)}`);
  })

  const personalNameForm = oneSdk.component("form", {
    name: "PERSONAL",
    type: "manual",
    title: {label: "Your legal name"},
    personal: {
      countries:{
        default:{
          default:{
            fields:[
              {
                fieldType: 'select',
                name: 'country',
                //label: 'Random label',
                options: [
                  {
                    label: "Australia",
                    value: "AUS",
                  },
                  {
                    label: "New Zealand",
                    value: "NZL",
                  },
                  {
                    label: "China",
                    value: "CHN",
                  },
                ],
                //hide: false
              },
              {
                fieldType: 'date',
                // dataType: 'text',
                name: 'dateOfBirth',
                hide: true,
              },
              {
                fieldType: 'input',
                // dataType: 'text',
                label: `Given Name`,
                name: 'givenName',
                hide: true,
              },
              {
                fieldType: 'input',
                // dataType: 'text',
                label: `Middle Name(s)`,
                name: 'middleName',
                hide: true,
              },
              {
                fieldType: 'input',
                // dataType: 'text',
                label: `Family Name`,
                name: 'familyName',
                hide: true,
              },
              {
                fieldType: 'address',
                dataType: 'current_addr',
                name: 'address.fullAddress',
                hide: true
              }
            ]
          }
        },
        AUS: {
          default: {
            fields: [
              // {
              //   fieldType: 'date',
              //   name: 'dateOfBirth',
              //   hide: true,
              // },
              {
                fieldType: 'address',
                name: 'address.fullAddress',
                hide: true,
              },
            ],
          },
        },
          NZL: {
            "default": {
              fields: [
                 {
                  fieldType: 'address',
                  dataType: 'current_addr',
                  name: 'address.fullAddress',
                  hide: true,
                },               
              ],
            },
          },
          CHN: {
            "default": {
              fields: [
                 {
                  fieldType: 'address',
                  dataType: 'current_addr',
                  name: 'address.fullAddress',
                  hide: true,
                },               
              ],
            },
          },
      }
    }
  });

  // var loadedNameForm = false;
  // var loadedDobForm = false;
  // var loadedAddressForm = false;

  const document = oneSdk.component("form", {
    name: "DOCUMENT",
    type: "manual",
    numberOfIDs: 1,
    title: {label: "Choose Your ID"},
    // TODO: include document customization
  });

  const review = oneSdk.component("form", {
    name: "REVIEW",
    type: "manual",
    verify: true
  });

  const retry = oneSdk.component("form", {
    name: "RETRY",
    type: "manual",
  });

  welcome.on("form:welcome:ready", () => {
    consent.mount("#onboarding-container");
  });

  consent.on("form:consent:ready", async () => {
    // loadedNameForm = true;
    personalNameForm.mount("#onboarding-container");
  });

  welcome.on("form:welcome:failed", (message) => {
    // display error message
    console.log(`welcome form failed: ${message}`)
  });

  // welcome.on("*", (message) => {
  //   console.log(`${JSON.stringify(message)}`);
  // });

  // personalNameForm.on("*", (msg) => {
  //   console.log(`${JSON.stringify(msg)}`);
  // })

  const dobForm = oneSdk.component("form", {
    name: "PERSONAL",
    type: "manual",
    title: {label: "Please enter your date of birth"},
    personal: {
      countries:{
        default:{
          default:{
            fields:[
              {
                fieldType: 'date',
                dataType: 'text',
                label: "Date of birth",
                name: 'dateOfBirth',
                hide: false
              },
              {
                name: 'address.fullAddress',
                hide: true
              },
              {
                name: 'givenName',
                hide: true,
              },
              {
                name: 'middleName',
                hide: true,
              },
              {
                name: 'familyName',
                hide: true,
              }
            ]
          }
        },
        AUS: {
          default: {
            fields: [
              {
                fieldType: 'date',
                name: 'dateOfBirth',
                hide: false,
              },
              {
                fieldType: 'address',
                name: 'address.fullAddress',
                hide: true,
              },
            ],
          },
        }
      }
    }
  });

  // dobForm.on("*", (msg) => {
  //   console.log(`dobForm: ${JSON.stringify(msg)}`);
  // })

  const addressForm = oneSdk.component("form", {
    name: "PERSONAL",
    type: "manual",
    title: {label: "Address input"},
    personal: {
      countries:{
        default:{
          default:{
            fields:[
              {
                fieldType: 'date',
                dataType: 'text',
                name: 'dateOfBirth',
                hide: false
              },
              {
                fieldType: 'address',
                // dataType: 'current_addr',
                name: 'address.fullAddress',
                hide: true
              },
              {
                fieldType: 'input',
                // dataType: 'text',
                label: `Given Name`,
                name: 'givenName',
                hide: true,
              },
              {
                fieldType: 'input',
                // dataType: 'text',
                label: `Middle Name(s)`,
                name: 'middleName',
                hide: true,
              },
              {
                fieldType: 'input',
                // dataType: 'text',
                label: `Family Name`,
                name: 'familyName',
                hide: true,
              }
            ]
          }
        },
        AUS: {
          default: {
            fields: [
              {
                fieldType: 'date',
                name: 'dateOfBirth',
                hide: false,
              },
              {
                fieldType: 'address',
                name: 'address.fullAddress',
                hide: true,
              },
            ],
          },
        }
      }
    }
  });
  
  let step = 0;

  personalNameForm.on("form:personal:ready", () => {
    console.log("personal form triggered")
    // if (loadedAddressForm) {
    //   document.mount("#onboarding-container");
    // }
    // else if (loadedDobForm) {
    //   loadedAddressForm = true;
    //   addressForm.mount("#onboarding-container");
    // }
    // else {
    //   loadedDobForm = true;
    //   dobForm.mount("#onboarding-container");
    // }
      if (step === 0) {
        dobForm.mount("#onboarding-container");
        step = 1;
      }  else if (step === 1) {
        addressForm.mount("#onboarding-container");
        step = 2;
      } else {
        document.mount("#onboarding-container");
      }
  });

  document.on("form:document:back", ({inputInfo}) => {
    personalNameForm.mount("#onboarding-container");
  });

  document.on("form:document:ready", ({inputInfo}) => {
    review.mount("#onboarding-container");
  });

  review.on("form:result:success", () => {
    console.log("result success")
  });
  let count = 0;

  review.on("form:result:partial", () => {
    if (count < 2) {
      retry.mount("#onboarding-container");
      count+=1;
    }
  });

  review.on("form:result:failed", () => {
    if (count < 2) {
      retry.mount("#onboarding-container");
      count+=1;
    }
  });

  welcome.mount("#onboarding-container");
}

load()