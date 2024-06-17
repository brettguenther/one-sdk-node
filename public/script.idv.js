function load() {
    var lSessionToken = sessionToken;
    var lGoogleApiKey = googleApiKey;
    const recipe = {recipe: {
            idv: {
                provider: {name: "incode"},
            },
            form: {
                provider: {
                    name: 'react',
                    googleApiKey: lGoogleApiKey
                },
            }
        }
    }

    if (lSessionToken === undefined) {
        fetch('http://localhost:3000/api/token')
        .then(response => response.json())
        .then(data => {
            //   document.getElementById('tokenDisplay').innerText = `Token: ${data.token}`;
            lSessionToken = data.sessionToken;
        })
        .catch(error => console.error('Error fetching token:', error));
    }

    const modeConfig = {"mode":"development"}
    const sessionConfig = {session:{token:lSessionToken}}
    const oneSdkConfig =  {...sessionConfig,...modeConfig,...recipe};
    activateSDK(oneSdkConfig)
}

async function activateSDK(oneSdkConfig) {
    // const checkBox = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NC4wMDAwMDAsIC04Ni4wMDAwMDApIj48ZyBpZD0iY2hlY2stY2lyY2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NC4wMDAwMDAsIDg2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMCwwIEM0LjUsMCAwLDQuNSAwLDEwIEMwLDE1LjUgNC41LDIwIDEwLDIwIEMxNS41LDIwIDIwLDE1LjUgMjAsMTAgQzIwLDQuNSAxNS41LDAgMTAsMCBMMTAsMCBaIE04LDE1IEwzLDEwIEw0LjQsOC42IEw4LDEyLjIgTDE1LjYsNC42IEwxNyw2IEw4LDE1IEw4LDE1IFoiIGlkPSJTaGFwZSIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="
    const checkBox = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzVfNCkiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwIDBDNC41IDAgMCA0LjUgMCAxMEMwIDE1LjUgNC41IDIwIDEwIDIwQzE1LjUgMjAgMjAgMTUuNSAyMCAxMEMyMCA0LjUgMTUuNSAwIDEwIDBaTTggMTVMMyAxMEw0LjQgOC42TDggMTIuMkwxNS42IDQuNkwxNyA2TDggMTVaIiBmaWxsPSIjMDAzRjdBIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfNV80Ij4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=";
    const oneSdk = await OneSdk(oneSdkConfig);

    const oneSdkIndividual = oneSdk.individual();

    oneSdkIndividual.addConsent("general");
    oneSdkIndividual.addConsent("docs");
    oneSdkIndividual.addConsent("creditheader");

    await oneSdkIndividual.submit();

    const welcomeForm = oneSdk.component("form", {
        name: "WELCOME",
        type: "ocr",
        title: {label:"ID verification"},
        /*descriptions: [
          { label: 'This is a sample dynamic page.', style: {} },
          { label: 'It can contain multiple paragraphs.', style: {} },
        ], */
        instructions: {
          content: [
            { label: "An ID on you (this must be a driver’s licence or passport)", icon: checkBox },
            { label: "Grant access permission on the camera of your phone so we can capture your ID", icon: checkBox },
            { label: "You must be an Australian citizen, permanent resident or Visa holder", icon: checkBox },
          ]
        }
    });

    // const resultFormSuccess = oneSdk.component('form', {
    //     name: 'WELCOME',
    //     type: 'ocr',
    //     title: { label: 'Success!' },
    //     descriptions: [
    //         { label: 'Your application is complete.' },
    //     ],
    //     instructions: {
    //         label: '',
    //         content: []
    //     },
    //     cta: { label: 'Get started now.' },
    // });

    const resultFormSuccess = oneSdk.component("form", {
      name: "RESULT",
      type: "manual",
      state: 'SUCCESS',
      title: {label:'Complete'},
      descriptions: [{label:'Process is now complete. You can close the page'}],
      cta:{label: 'Close'}
  });

    // const resultFormFail = oneSdk.component('form', {
    //     name: 'WELCOME',
    //     type: 'ocr',
    //     title: { label: 'Complete!' },
    //     descriptions: [
    //         { label: 'Thanks for submitting your details. Our team is reviewing and will reach out shortly.' },
    //     ],
    //     instructions: {
    //         label: '',
    //         content: []
    //     },
    //     cta: { label: 'Continue setup now.' },
    // });

    const resultFormFailIdType = oneSdk.component("form", {
        name: "RESULT",
        type: "manual",
        state: 'FAIL',
        title: {label:'Unsuccessful'},
        descriptions: [{label:'Your ID type didn\'t match your selection. Please try again.'}],
        cta:{label: 'Try again'}
    });

    const resultFormFail = oneSdk.component("form", {
      name: "RESULT",
      type: "manual",
      state: 'FAIL',
      title: {label:'Unsuccessful'},
      descriptions: [{label:'Capture unsuccessful. Please input details manually'}],
      cta:{label: 'Input details manually'}
    });

    const form_consent = oneSdk.component("form", { name: "CONSENT", type: "ocr", });
    const formLoadingDefault = oneSdk.component("form", { name: "LOADING", title: { label: "Loading..." }, descriptions: [{ label: "" }] });
    const formLoadingData = oneSdk.component("form", { name: "LOADING", title: { label: "Extracting data..." }, descriptions: [{ label: "Hold tight, this can take up to 30 seconds. Please do not refresh this page or click the 'back' button on your browser." }] });
    const formLoadingHold = oneSdk.component("form", { name: "LOADING", title: { label: "Processing results..." }, descriptions: [{ label: "" }] });
    const runningChecks = oneSdk.component("form", { name: "LOADING", title: { label: "Processing results..." }, descriptions: [{ label: "" }] });

    const idv = oneSdk.flow('idv');
    
    const driversLicenceReviewForm = oneSdk.component("form", {
      name: "REVIEW",
      type: "ocr",
    });

    driversLicenceReviewForm.on("form:review:ready", async () => {
      // biometrics.mount("#onboarding-container");
    });

    const passportReviewForm = oneSdk.component("form", {
      name: "REVIEW",
      type: "ocr",
      personal: {
        countries: {
          default: {
            default: {
              fields: [
                {
                  fieldType: 'address',
                  name: 'address.fullAddress',
                  hide: true
                }
              ]
            }
          }
        }
      }
    });

    // passportReviewForm.on("form:review:ready", async () => {
    //   biometrics.mount("#onboarding-container");
    // });

    const standardReviewForm = oneSdk.component("form", {
      name: "REVIEW",
      type: "ocr",
      personal: {
        countries: {
          default: {
            default: {
              fields: [
                {
                  fieldType: 'date',
                  name: 'dateOfBirth',
                  hide: false
                },
                {
                  fieldType: 'address',
                  name: 'address.fullAddress',
                  hide: true
                }
              ]
            }
          }
        }
      }
    });

    // function loadReviewScreen({ document }) {
    //   if (document) {
    //     console.log(`${JSON.stringify(document)}`);
    //     // console.log(`dob: ${document.ocrResult.dateOfBirth}`);
    //     // console.log("trying to load review screen");
    //     if (docType == "DRIVERS_LICENCE")
    //       driversLicenceReviewForm.mount("#onboarding-container");
    //     else if (docType == "PASSPORT") {
    //       passportReviewForm.mount("#onboarding-container");
    //     }
    //     else {
    //       standardReviewForm.mount("#onboarding-container");
    //     }
    //   } else {
    //     console.log("No document returned");
    //   }
    // }

    // ocr.on("ready", () => {
    //   formLoadingDefault.unmount();
    // });

    // ocr.on("*",(message) => {
    //   console.log(message);
    // })

    // ocr.on("input_required",(inputInfo, message, provideFile) => {
    //   console.log(`input required: ${message}`)
    //   if (message === "AWAITING_DOCUMENT_UPLOAD_INVALID_TYPE") {
    //     // alert('invalid id type detected, please select and use a supported id type');
    //     // formDocument.mount("#onboarding-container");
    //     resultFormFailIdType.mount("#onboarding-container");
    //   }
    // })

    // ocr.on("detection_failed", (message) => {
    //     console.log('detection failed: loading document form');
    // //   formDocument.mount("#onboarding-container");
    //     // detectionFail = true;
    //     // resultFormFail.mount("#onboarding-container");
    // });

    // ocr.on("results", ({ document }) => {
    //   loadReviewScreen({ document })
    // });

    // ocr.on("loading", (display)=> {
    //   if (display) {
    //     //alert("loading, show now")
    //     formLoadingDefault.mount("#onboarding-container");
    //     //document.querySelector(".loader-wrapper").style.display = "block"
    //   } else {
    //     //alert("loading, disappear")
    //     formLoadingDefault.unmount() 
    //     //document.querySelector(".loader-wrapper").style.display = "none"
    //   }
    // });

    // biometrics.on('error', console.error);

    // let error = false;
    // biometrics.on('detection_failed', () => {
    //   error = true;
    //   console.log('detection_failed')
    // });
    // biometrics.on('session_closed', () => {
    //   console.log('session_closed')
    //   if (error) biometrics.mount('#onboarding-container');
    //   error = false;
    // });

    // biometrics.on("loading", (display) => {
    //   if (display) {
    //     formLoadingHold.mount("#onboarding-container");
    //   } else {
    //     formLoadingHold.unmount()
    //   }
    // });

    // biometrics.on('results', async ({ checkStatus, document, entityId }) => {
    //   // Decide whether to proceed to the next stage of the onboarding process
    //   // depending on whether biometrics verification was successful.
    //   // console.log(result);
    //   if (checkStatus === "COMPLETE") {
    //     resultFormSuccess.mount("#onboarding-container");
    //   } else {
    //     resultFormFail.mount("#onboarding-container");
    //   }
    //   // if (checkStatus === "COMPLETE") {
    //   //   // run KYC checks
    //   //   console.log(`checks completed with status: ${checkStatus}`)
    //   //   var checkResults = await oneSdkIndividual.submit({verify: true});
    //   //   console.log(`checkResults: ${JSON.stringify(checkResults)}`)
    //   //   if (checkResults.status.key === "PASS") {
    //   //       // additional verification or next step in onboarding
    //   //       console.log('pass result');
    //   //       resultForm.mount("#onboarding-container");
    //   //   } else {
    //   //     console.log('failed result');
    //   //   }
    //   // } else if (checkStatus === "FAILED") {
    //   //     // handle biometrics failure
    //   //     console.log(`checks failed with status: ${checkStatus}`)
    //   //     resultForm.mount("#onboarding-container");
    //   // }
    // });

    // idv.on("loading", (isloading, {message})=>{
    //     if (isloading) {
    //       formLoadingDefault.mount("#onboarding-container");
    //       //alert("loading, show now")
    //         // document.querySelector(".loader-wrapper").style.display = "block"
    //     } else {
    //       formLoadingDefault.unmount();
    //       //alert("loading, disappear")
    //         // document.querySelector(".loader-wrapper").style.display = "none"
    //     }
    // })

    const formDocument = oneSdk.component("form", {
        name: "DOCUMENT",
        type: "ocr",
        showPreps: true,
    });

    const personalDetailsForm = oneSdk.component("form", {
      name: "PERSONAL",
      type: "manual",
      //showPreps: true,
      personal: {
        countries:{
          default:{
            default:{
              fields:[
                {
                  fieldType: 'input',
                  dataType: 'text',
                  name: 'givenName',
                  hide: false,
                  /*rules:{
                    minLength: {
                      value: 7,
                      message: 'Given name must be at least 7 charecters',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Version number must not exceed 10 charecters',
                    },
                  }*/
                },
                {
                  fieldType: 'input',
                  dataType: 'text',
                  label: 'Email',
                  name: 'extraData.email',
                  hide: true,
                  rules:{
                    required: {
                      value: true,
                      message: "Please enter your email"
                    }
                  }
                },
                {
                  fieldType: 'phone',
                  dataType: 'phone',
                  label: 'Phone Number',
                  name: 'extraData.phone',
                  hide: true,
                  placeholder: {
                    cc: "Code",
                    phoneNumber: "e.g. 0400 000 000"
                  },
                  options: [
                    {label: "AU +61", value: "+61"},
                    {label: "NZ +64", value: "+64"},
                  ],
                  rules:{
                    required: {
                      value: true,
                      message: "Please enter your phone number"
                    }
                  }
                }
              ]
            }
          }
        }
     }
    });

    idv.on('error', (err) => {
      console.log(`idv error: ${JSON.stringify(err)}`)
    });

    idv.on('*', (message)=> {
        console.log(`idv | * | ${JSON.stringify(message)}`)
    })

    idv.on('results', ({checkStatus, document, entityId}) => { 
      console.log(`idv results: ${checkStatus}`)
    })

    resultFormFail.on("form:result:failed", () => {
      console.log('failed result form listener')
      if (detectionFail) {
          personalDetailsForm.mount("#onboarding-container")
      }
      else {
          formDocument.mount("#onboarding-container");
      }
  });

    // document.getElementById('startOcr').style.visibility = "hidden";
    // document.getElementById('heading').style.visibility = "hidden";

    welcomeForm.on("form:welcome:ready", () => {
        // document.getElementById("logo").style.visibility = "hidden";
        form_consent.mount("#onboarding-container");
    });

    form_consent.on("form:consent:loaded", async () => {
      checkAndRequestCameraPermissions();
    });

    form_consent.on("form:consent:ready", async () => {
      formDocument.mount("#onboarding-container");
    });

    welcomeForm.on("form:welcome:failed", () => {
      // display error message
    });

    formDocument.on("form:document:ready", async ({ inputInfo }) => {
        ocr.mount("#onboarding-container");
    })

    // welcomeForm.mount("#onboarding-container");
    idv.mount("#onboarding-container");
}

load()