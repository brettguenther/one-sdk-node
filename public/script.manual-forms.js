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
  const checkMark = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NC4wMDAwMDAsIC04Ni4wMDAwMDApIj48ZyBpZD0iY2hlY2stY2lyY2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NC4wMDAwMDAsIDg2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMCwwIEM0LjUsMCAwLDQuNSAwLDEwIEMwLDE1LjUgNC41LDIwIDEwLDIwIEMxNS41LDIwIDIwLDE1LjUgMjAsMTAgQzIwLDQuNSAxNS41LDAgMTAsMCBMMTAsMCBaIE04LDE1IEwzLDEwIEw0LjQsOC42IEw4LDEyLjIgTDE1LjYsNC42IEwxNyw2IEw4LDE1IEw4LDE1IFoiIGlkPSJTaGFwZSIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="
  const checkBox = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAADpJREFUKFO1yqERwDAAxLDsv3QKLPplEfT5vHR/maINpmiDKdpgijaYog2maIMp2mCKNpiiDaYHzvkAci8q5Gg0BsgAAAAASUVORK5CYII=)"
  const licenseOutline = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBpbWFnZS1yZW5kZXJpbmc9Im9wdGltaXplUXVhbGl0eSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCA1MTIgMzQ4LjA0Ij48cGF0aCBkPSJNNDMxLjY0IDE5OS41N2M0MC45OS0uMzIgNzQuNDkgMzIuNjQgNzQuODIgNzMuNjQuMzIgNDEtMzIuNjQgNzQuNS03My42NCA3NC44My00MSAuMzItNzQuNDktMzIuNjUtNzQuODItNzMuNjQtLjMzLTQxIDMyLjY0LTc0LjUgNzMuNjQtNzQuODN6TTU0LjQzIDQyLjIyaDQwMy4xNGMzLjUxIDAgNi4zOCAyLjg4IDYuMzggNi4zOXYzNC4xNWMwIDMuNTEtMi44NyA2LjM4LTYuMzggNi4zOEg1NC40M2MtMy41MSAwLTYuMzgtMi44Ny02LjM4LTYuMzhWNDguNjFjMC0zLjUyIDIuODctNi4zOSA2LjM4LTYuMzl6TTI3LjE5IDBoNDU3LjYyYzcuNDggMCAxNC4yOSAzLjA2IDE5LjIxIDcuOTggNC45MiA0LjkyIDcuOTggMTEuNzQgNy45OCAxOS4yMXYyMDEuNDNhOTEuNzYzIDkxLjc2MyAwIDAgMC0xNS40Ny0yMC4xNmwtLjM5LS4zN1YyNy4xOWMwLTMuMS0xLjI4LTUuOTQtMy4zNC03Ljk5YTExLjI3MyAxMS4yNzMgMCAwIDAtNy45OS0zLjM0SDI3LjE5Yy0zLjEyIDAtNS45NiAxLjI3LTcuOTkgMy4zbC0uMDQuMDRjLTIuMDMgMi4wMy0zLjMgNC44Ny0zLjMgNy45OXYyNjIuNjZjMCAzLjExIDEuMjggNS45NCAzLjM0IDggMi4wNSAyLjA1IDQuODkgMy4zMyA3Ljk5IDMuMzNoMzE3LjU0YTkwLjk0OSA5MC45NDkgMCAwIDAgNi42NSAxNS44NkgyNy4xOWMtNy40NyAwLTE0LjI5LTMuMDYtMTkuMjEtNy45OEMzLjA2IDMwNC4xNCAwIDI5Ny4zMyAwIDI4OS44NVYyNy4xOWMwLTcuNDUgMy4wNi0xNC4yNCA3Ljk4LTE5LjE3bC4wNC0uMDRDMTIuOTcgMy4wNSAxOS43NSAwIDI3LjE5IDB6bTExNS40OSAyMDQuOTNjOC4wNyA2Ljk2IDMxLjEyIDQuODggMzkuNzQgOS42OCAyLjc0IDEuNTMgNS4yMyAzLjQ5IDcuMjIgNi4xMiA0Ljk0IDYuNTIgNS4zMiA4LjkxIDcuMjEgMTYuODgtLjQ0IDQuNjktMy4xIDcuNC04LjM0IDcuOEg1Mi44M2MtNS4yNC0uNC03LjktMy4xMS04LjM0LTcuOCAxLjg5LTcuOTcgMi4yNy0xMC4zNiA3LjIxLTE2Ljg4IDEuOTktMi42NCA0LjQ3LTQuNTkgNy4yMi02LjEyIDguNDgtNC43MyAzMC45My0yLjY3IDM5LjMzLTkuMzQgMS4yNy0yLjc1IDIuNTYtNi42NSAzLjM3LTkuMTEuMDQtLjEzLS4wNy4yLjM0LTEuMDIuOTQtMi44LTQuNjEtOC4yOC02LjQ2LTExLjIybC02Ljg4LTEwLjk1Yy0yLjUyLTMuNzUtMy44Mi03LjE4LTMuOS0xMC0uMDQtMS4zMi4xOC0yLjUyLjY3LTMuNThhNi42NiA2LjY2IDAgMCAxIDIuMzctMi43NSA4LjYyIDguNjIgMCAwIDEgMS42Ni0uODVjLS40NC01LjkzLS42MS0xMC40NC0uMzItMTYuNy4xNS0xLjQ5LjQzLTIuOTcuODUtNC40NiAyLjUyLTkgMTAuMjUtMTUuNDggMTkuMDktMTguNTQgNC4yOS0xLjQ4IDIuNjMtNS4wMSA2Ljk3LTQuNzcgMTAuMjcuNTYgMjYuMTIgNy4xOCAzMi4yMSAxNC4yIDguNTMgOS44MyA2LjMzIDE4Ljk4IDYuMDQgMzAuOTggMS45MS41OSAzLjEzIDEuOCAzLjYzIDMuNzUuNTYgMi4xNy0uMDQgNS4yMy0xLjg4IDkuNDFsLS4wMS0uMDFjLS4wMy4wOC0uMDcuMTUtLjExLjIzbC03Ljg0IDEyLjkxYy0zLjAzIDQuOTgtNi4xIDkuOTctMTAuMTkgMTMuOC0uMi4xOS0uNC4zNy0uNjEuNTUuNi44MyAxLjI5IDEuODUgMi4wMyAyLjkzIDEuMDcgMS41NyAyLjI0IDMuMjkgMy40IDQuODZ6bTc1Ljc5LTY5LjU5Yy0zLjY1IDAtNi42MS0zLjk1LTYuNjEtOC44MSAwLTQuODcgMi45Ni04LjgyIDYuNjEtOC44MkgzNDkuNGMzLjY1IDAgNi42MSAzLjk1IDYuNjEgOC44MiAwIDQuODYtMi45NiA4LjgxLTYuNjEgOC44MUgyMTguNDd6bTAgMTAwLjEyYy0zLjY1IDAtNi42MS0zLjk0LTYuNjEtOC44MSAwLTQuODcgMi45Ni04LjgxIDYuNjEtOC44MWgxNDEuMTRhOTEuMjU2IDkxLjI1NiAwIDAgMC0xMC42NiAxNy42MkgyMTguNDd6bTAtNTAuMDZjLTMuNjUgMC02LjYxLTMuOTUtNi42MS04LjgxIDAtNC44NyAyLjk2LTguODIgNi42MS04LjgyaDE5Ny4xN2MzLjY1IDAgNi42MSAzLjk1IDYuNjEgOC44MiAwIDQuODYtMi45NiA4LjgxLTYuNjEgOC44MUgyMTguNDd6TTQzMS45IDI3NGEzLjg1IDMuODUgMCAwIDEgMy44OCAzLjgxYy4wMSAyLjEzLTEuNjkgMy44Ni0zLjgxIDMuODctMi4xMi4wMi0zLjg2LTEuNjktMy44Ny0zLjhhMy44MzUgMy44MzUgMCAwIDEgMy44LTMuODh6bS0uMDQtMTAuMDVjNy42NS0uMDcgMTMuOTEgNi4wOSAxMy45NyAxMy43NC4wNiA3LjY2LTYuMDkgMTMuOTEtMTMuNzQgMTMuOTgtNy42Ni4wNS0xMy45MS02LjEtMTMuOTctMTMuNzUtLjA3LTcuNjYgNi4wOS0xMy45MSAxMy43NC0xMy45N3ptLTU2LjE3LTEwLjA3YzUuMjYtMTQuOTIgMTYuMTMtMjcuNTYgMjkuODItMzQuMDggMTguODItOC45NiA0MS43My05LjcgNjEuMjggNC41MiAxMS41MSA4LjM4IDE1Ljc1IDE1LjI5IDIxLjU2IDI3LjU2IDQuNDIgMTAuODguODkgMTQuNDUtMTMuMDYgOC40NC0yOC44Ni0xMy45OS01Ny45MS0xMy4xMy04Ny4xMy42OS0xMC43NyA3LjE2LTE2Ljg5IDEuMy0xMi40Ny03LjEzem03NC40NyA3Ny4zMWMyMC4wMi02LjQ4IDMxLjY0LTE5LjM2IDM4LjctMzUuNzIgNC41OC0xMi42NC0xMC4xMi0xNi43OS0xNS4xOS04LjQ1LTMuMDQgNi4xNC02LjY2IDExLjQxLTExLjQzIDE1LjUxLTcuNDMgNi40My0xOC4yOCA3LjY3LTE5Ljg3IDE5LjY5LS44MyA2LjI1LjY0IDExLjgzIDcuNzkgOC45N3ptLTM0LjYxLjI3Yy0yMC4xMi02LjE2LTMxLjk1LTE4Ljg1LTM5LjI3LTM1LjA5LTQuNzctMTIuNTYgOS44NS0xNi45NSAxNS4wNi04LjcgMy4xMyA2LjA5IDYuODQgMTEuMyAxMS42NyAxNS4zNCA3LjU0IDYuMyAxOC40IDcuMzggMjAuMTkgMTkuMzYuOTIgNi4yNC0uNDUgMTEuODUtNy42NSA5LjA5eiIvPjwvc3ZnPg==";

  const oneSdkIndividual = oneSdk.individual();
  oneSdkIndividual.setProfileType('safe_harbour_id');

  const welcome = oneSdk.component("form", {
    name: "WELCOME",
    type: "manual",
    title: { 
      label: 'Let\'s get you onboarded'
    },
    descriptions: [
      {
        label: 'We need to collect personal details to verify your identity before using our services.'
      }
    ],
    instructions: { 
      content: [
        { 
          icon: checkMark, 
          label: "Fill out each page" 
        },
        { 
          icon: checkMark, 
          label: "Be 18 years or older." 
        },
        { 
          icon: checkMark, 
          label: "Have a valid form of ID." 
        }
      ]
    },
    cta: {
      label: 'Start'
    }
  });

  const consent = oneSdk.component("form", {
    name: "CONSENT",
    type: "manual",
    descriptions: [
      { label: 'Your personal information is being collected in accordance with our privacy policy. We will verify your ID against credit bureau data sources.'},
      { label: 'In addition, for the purposes of verifying your identity, you conseent to: a) the verification of my personal information with credit bureau header files; b) against records held by official document issuers or official record holders via third party systems; and c) verification agent(s) acting as a nominated intermediary in accordance with Australian Privacy Principles.'},
      // { label: 'Have your ID handy for verification.'},
    ],
    checkBox: {
      content: [{label: 'I have read and agree to the above disclosure.'}]
    },
    cta: {
      label: "Next"
    }
  });

  const personal = oneSdk.component("form", {
    name: "PERSONAL",
    type: "manual",
    personal: {
      countries:{
        default:{
          default:{
            fields:[
              {
                fieldType: 'date',
                dataType: 'text',
                name: 'dateOfBirth',
                hide: false,
                calendarConfig: {
                  age: {
                    min: 18,
                    max: 85,
                    message: "The age must be between 18 and 85"
                  }
                }
              }
            ]
          }
        }
      }
    }
  });

  const document = oneSdk.component("form", {
    name: "DOCUMENT",
    type: "manual",
    numberOfIDs: 1,
    title: {label: "Choose Your ID"},
    documents: [
      {
        type: "DRIVERS_LICENCE",
        label: "Driver's Licence",
        subtitle: "Valid unexpired license",
        // icon: licenseOutline, // to fix: sizing is off
        countries: {
          default: {
            default: {
              fields: [
                {
                  fieldType: 'select',
                  name: 'country',
                  //label: 'Random label',
                  options: [
                    {
                      label: "Australia",
                      value: "AUS"
                    },
                    {
                      label: "New Zealand",
                      value: "NZL"
                    },
                    {
                      label: "France",
                      value: "FRA"
                    }
                  ],
                  //hide: false
                },
              ]
            }
          },
          FRA: {
            // default: {
            //   fields: [
            //     {
            //       fieldType: 'select',
            //       hide: false,
            //       dataType: 'text',
            //       label: `Driver's Licence State or Territory`,
            //       name: 'region',
            //       rules: {
            //         required: {
            //           value: true,
            //           message: `Please enter your driver's licence number`,
            //         },
            //         minLength: {
            //           value: 1,
            //           message: `Licence number must be at least 1 digits`,
            //          },
            //         maxLength: {
            //           value: 15,
            //           message: `Licence number must not exceed 15 characters`,
            //         },
            //         // pattern: { ... }
            //       }
            //     },
            //      {
            //       fieldType: 'input',
            //       hide: false,
            //        dataType: 'text',
            //       label: 'Licence Number',
            //       name: 'idNumber',
            //       // rules: {
            //       //     ...
            //       // },
            //     },
            //     // {
            //     //   fieldType: 'input',
            //     //   hide: false,
            //     //   dataType: 'text',
            //     //   label: 'Card Number',
            //     //   name: 'extraData.document_number',
            //     //   rules: {
            //     //       ...
            //     //   },
            //     // }
            //   ]
            // }
            default: {
              fields: [{
                "fieldType": "input",
                "name": "idNumber",
                "label": "numéro d'identification",
                "rules": {
                  "required": {
                    "value": true,
                    "message": "numéro d'identification"
                  }
                }
              },
              {
                "fieldType": "input",
                "name": "extraData.document_number",
                "dataType": "document_extra",
                "label": "numéro de document",
                "rules": {
                  "required": {
                    "value": true,
                    "message": "numéro de document"
                  }
                }
              }]
            }
          }
        }
      },
      {
        type: "BIRTH_CERT",
        label: "Birth Certification",
      },
      {
        type: "PASSPORT",
        label: "Your passport",
        countries: {
          default: {
            default: {
              fields: [{
                fieldType: 'date',
                hide: false,
                dataType: 'text',
                expiryDate: true,
                label: 'License Date of Expiry',
                name: 'idExpiry',
                rules: {
                  required: {
                    value: true,
                    message: `Please select your Passport expiry date`,
                  },
                  min: {
                    value: 1,
                    message: 'Minimum Days to be one',
                  },
                  max: {
                    value: 31,
                    message: 'Maximum Days to be 31 only',
                  },
                },
                calendarConfig: {
                  type: 'gregory',
                  locale: 'en',
                  day: {
                    required: true,
                    placeholder: 'Day',
                  },
                  month: {
                    required: true,
                    placeholder: 'Month',
                  },
                  year: {
                    required: true,
                    placeholder: 'Year',
                  },
                  // age: {
                  //     max: 30,
                  //     min: 1,
                  //     message: 'Should be between 1 and 30 years in the future',
                  // },
                  // dateRange: {
                  //   min:{
                  //     value:  DateTime.now().toFormat('yyyy-MM-dd'),
                  //   },
                  //   // max:{
                  //   //     value: '2030-12-31',
                  //   // },
                  // },
                  message: 'Please select your Passport expiry date',
                },
              }]

            }
          }
        }
      }
    ]
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
    personal.mount("#onboarding-container");
    // document.mount("#onboarding-container");
  });

  welcome.on("form:welcome:failed", (message) => {
    // display error message
    console.log(`welcome form failed: ${JSON.stringify(message)}`)
  });

  // welcome.on("*", (message) => {
  //   console.log(`${JSON.stringify(message)}`);
  // });

  personal.on("form:personal:ready", async () => {
    document.mount("#onboarding-container");
  });

  document.on("form:document:back", async ({inputInfo}) => {
    personal.mount("#onboarding-container");
  });

  document.on("form:document:ready", async ({inputInfo}) => {
    review.mount("#onboarding-container");
  });

  review.on("form:result:success", async () => {
    console.log("result success")
  });
  let count = 0;

  review.on("form:result:partial", async () => {
    if (count < 2) {
      retry.mount("#onboarding-container");
      count+=1;
    }
  });

  review.on("form:result:failed", async () => {
    if (count < 2) {
      retry.mount("#onboarding-container");
      count+=1;
    }
  });

  welcome.mount("#onboarding-container");
}

load()