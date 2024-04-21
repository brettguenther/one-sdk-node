// script.js
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('startOcr').addEventListener('click', function() {
//         var lSessionToken = sessionToken;
//         const recipe = {recipe: {
//                 // idv: {
//                 //     provider: {name: "incode"},
//                 // },
//                 biometrics: 
//                     {provider: {name: "incode"},
//                 },
//                 ocr: {
//                     provider: {name: "incode"},
//                     provideReviewScreen: true
//                 },
//                 form: {
//                     provider: {
//                         name: 'legacy',
//                         version: 'v4'
//                     },
//                 }
//             }
//         }
//         const modeConfig = {"mode":"development"}
//         const sessionConfig = {session:{token:lSessionToken}}
//         const oneSdkConfig =  {...sessionConfig,...modeConfig,...recipe};
//         activateSDK(oneSdkConfig)
//     });
// });

function load() {
    var lSessionToken = sessionToken;
    const recipe = {recipe: {
            // idv: {
            //     provider: {name: "incode"},
            // },
            biometrics: 
                {provider: {name: "incode"},
            },
            ocr: {
                provider: {name: "incode"},
                provideReviewScreen: true
            },
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

    const oneSdkIndividual = oneSdk.individual();

    // added based on carlos codepen
    oneSdkIndividual.addConsent("general");
    oneSdkIndividual.addConsent("docs");
    oneSdkIndividual.addConsent("creditheader");

    await oneSdkIndividual.submit();

    const ocr = oneSdk.component('ocr');

    // document.getElementById('startOcr').style.visibility = "hidden";
    // document.getElementById('heading').style.visibility = "hidden";

    ocr.on('error', console.error);

    ocr.on('*', (message)=> {
        console.log(`ocr | ${JSON.stringify(message)}`)
    })

    ocr.on("loading", (display)=>{
        if (display) {
          //alert("loading, show now")
        //   document.querySelector(".loader-wrapper").style.display = "block"
        }else{
          //alert("loading, disappear")
        //   document.querySelector(".loader-wrapper").style.display = "none"
        }
    })
  
    ocr.on("results", async ({checkStatus, document, entityId}) => {
        if (checkStatus) {
        //alert("results", JSON.stringify({checkStatus, document, entityId}))
        console.log("results succesfful");
        console.log(checkStatus);
        console.log(document);
        console.log(entityId);
        } else {
        console.log("no data returned");
        }
        const biometrics = oneSdk.component('biometrics');
        biometrics.on('*', (message)=> {
            console.log(`biometrics | ${JSON.stringify(message)}`)
        })
        biometrics.mount("#ocr-container")
    });

    ocr.on("error", ({ message, payload }) => {
        console.log("received error");
        console.log(message, payload);
    });

    ocr.on("detection_complete", (message) => {
        console.log("capture finished");
        console.log(message);
    });
  
    ocr.mount("#ocr-container");
}

load()