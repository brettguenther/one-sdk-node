// script.js
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startOcr').addEventListener('click', function() {
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
    });
});


async function activateSDK(oneSdkConfig) {
    var oneSdk = await OneSdk(oneSdkConfig);

    const oneSdkIndividual = oneSdk.individual();

    // added based on carlos codepen
    oneSdkIndividual.addConsent("general");
    oneSdkIndividual.addConsent("docs");
    oneSdkIndividual.addConsent("creditheader");

    await oneSdkIndividual.submit();

    const ocr = oneSdk.component('ocr');

    ocr.on('error', console.error);

    ocr.on('*', (message)=> {
        console.log(`ocr | ${JSON.stringify(message)}`)
    })

    ocr.mount("#ocr-container");
}
