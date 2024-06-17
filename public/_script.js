function load() {
    var lSessionToken = sessionToken;
    const recipe = {recipe: {
            idv: {
                provider: {name: "incode"},
            },
            biometrics: {
                provider: {name: "incode"},
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
    const oneSdk = await OneSdk(oneSdkConfig);

    const oneSdkIndividual = oneSdk.individual();

    oneSdkIndividual.addConsent("general");
    oneSdkIndividual.addConsent("docs");
    oneSdkIndividual.addConsent("creditheader");

    await oneSdkIndividual.submit();

    const idv = oneSdk.flow('idv');

    // document.getElementById('startOcr').style.visibility = "hidden";
    // document.getElementById('heading').style.visibility = "hidden";

    idv.on('error', console.error);

    idv.on('*', (message)=> {
        console.log(`biometrics | * | ${JSON.stringify(message)}`)
    })

    idv.on("loading", (isloading, {message})=>{
        if (isloading) {
          //alert("loading, show now")
            document.querySelector(".loader-wrapper").style.display = "block"
        } else {
          //alert("loading, disappear")
            document.querySelector(".loader-wrapper").style.display = "none"
        }
    })
  
    idv.mount("#onboarding-container");
}

load()