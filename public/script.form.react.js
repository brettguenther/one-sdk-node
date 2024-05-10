function load() {
    var lSessionToken = sessionToken;
    const recipe = {
        recipe: {
            form: {
                provider: {
                    name: 'react',
                    // googleApiKey: "<YOUR_API_KEY>"
                },
            },
            ocr: {
                maxDocumentCount: 3,
            },
            biometrics: {
                provider: { name: "incode" },
            },
        }
    }
    const modeConfig = { "mode": "development" }
    const sessionConfig = { session: { token: lSessionToken } }
    const oneSdkConfig = { ...sessionConfig, ...modeConfig, ...recipe };
    activateSDK(oneSdkConfig)
}
async function activateSDK(oneSdkConfig) {
    var oneSdk = await OneSdk(oneSdkConfig);

    const myStyle = {
        'ff-title': { 'color': 'green' },
        'ff-subtitle': { 'color': 'green' },
        'ff-button': { 'background-color': 'green' },
        'ff-descriptions': { 'font-family': 'Helvetica' },
        'ff-description': { 'font-family': 'Helvetica' },
        'ff-checkbox': { 'accent-color': 'green', 'background-color': 'green' }, // get this working
        'ff-form-wrapper': {},
        'ff-form-field': {}
    }

    const biometrics = oneSdk.component('biometrics');

    const welcomeForm = oneSdk.component("form", {
        name: "WELCOME",
        type: "ocr",
        title: { label: 'Let\'s get you onboarded', style: myStyle },
        descriptions: [
            { label: 'To join us you need to be over 18 years old.', style: myStyle },
            { label: 'You will need a valid form of identity. Valid types include a passport, licence or Medicare card.', style: myStyle },
        ],
        instructions: { style: myStyle, content: [{ icon: '/assets/images/green-check-mark-16.png', label: "fill out each page" }] },
        cta: { label: "Start", style: myStyle },
    });

    const consentForm = oneSdk.component("form", {
        name: "CONSENT",
        type: "ocr",
        descriptions: [
            { label: 'We will verify your ID against credit bureau data sources.', style: myStyle },
            { label: 'Have your ID handy for verification.', style: myStyle },
        ],
        checkBox: {
            style: myStyle
        },
        cta: { label: "Next", style: myStyle }
    });

    const documentForm = oneSdk.component("form", {
        name: "DOCUMENT",
        showPreps: true,
    });

    const loadingExtractingForm = oneSdk.component("form", {
        name: "LOADING",
        title: { label: "Extracting data..." },
        descriptions: [
            { label: "Hold tight, this can take up to 30 seconds. Please do not referesh this page or click the 'back' button on your browser." }
        ]
    });


    const loadingForm = oneSdk.component("form", {
        name: "LOADING",
        title: { label: "Loading now..." },
        descriptions: [
            { label: "Hold tight, this can take up to 30 seconds. Please do not referesh this page or click the 'back' button on your browser." }
        ]
    });

    const reviewForm = oneSdk.component("form", {
        name: "REVIEW",
        type: "ocr"
    });


    documentForm.on("form:document:ready", async ({ inputInfo }) => {
        docType = inputInfo.documentType;

        const ocr = oneSdk.component("ocr", {
            documents: [{ type: docType, countries: ["AUS", "USA"] }],
        });

        ocr.on("*", (message) => {
            console.log(`ocr wildcard: ${JSON.stringify(message)}`);
        });

        ocr.on("loading", (display)=> {
            if (display) {
                loadingForm.mount("#onboarding-container");
            } else {
                loadingForm.unmount() 
            }
        });

        ocr.on("results", ({ document }) => {
            // show a review screen after OCR
            reviewForm.mount("#onboarding-container")
        });

        console.log(`document ready: ${JSON.stringify(inputInfo)}`)

        ocr.mount("#onboarding-container");

        // run OCR with the selected documentType
    });

    // welcomeForm.on('*', (message)=> {
    //     console.log(`form | * | ${JSON.stringify(message)}`);
    // })

    welcomeForm.on('form:welcome:ready', (message) => {
        console.log(`form loaded: ${JSON.stringify(message)}`);
        consentForm.mount("#onboarding-container");
    })

    consentForm.on('form:consent:ready', (message) => {
        console.log(`consent form loaded: ${JSON.stringify(message)}`);
        documentForm.mount("#onboarding-container");
    })

    welcomeForm.mount("#onboarding-container");

    reviewForm.on("form:review:ready", async () => {
        biometrics.mount("#onboarding-container");
    });

}

load()