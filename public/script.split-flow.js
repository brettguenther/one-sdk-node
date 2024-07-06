import checkAndRequestCameraPermissions from './ocr-helper.mjs';

function load() {
    var lSessionToken = sessionToken;
    var lGoogleApiKey = googleApiKey;
    const recipe = {
        recipe: {
            form: {
                provider: {
                    name: 'react',
                    googleApiKey: lGoogleApiKey
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

// const myStyle = {
//     'ff-title': { 'color': '#4400c9' },
//     'ff-subtitle': { 'color': '#4400c9' },
//     'ff-button': { 'background-color': '#4400c9' },
//     'ff-descriptions': { 'font-family': 'Helvetica' },
//     'ff-description': { 'font-family': 'Helvetica' },
//     'ff-checkbox': { 'accent-color': '#4400c9', 'background-color': '#4400c9' }, // get this working
//     'ff-form-wrapper': {},
//     'ff-form-field': {},
//     'ff-instructions': { 'font-family': 'Helvetica' }
// }

async function activateSDK(oneSdkConfig) {
    var oneSdk = await OneSdk(oneSdkConfig);

    const checkBox = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NC4wMDAwMDAsIC04Ni4wMDAwMDApIj48ZyBpZD0iY2hlY2stY2lyY2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NC4wMDAwMDAsIDg2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMCwwIEM0LjUsMCAwLDQuNSAwLDEwIEMwLDE1LjUgNC41LDIwIDEwLDIwIEMxNS41LDIwIDIwLDE1LjUgMjAsMTAgQzIwLDQuNSAxNS41LDAgMTAsMCBMMTAsMCBaIE04LDE1IEwzLDEwIEw0LjQsOC42IEw4LDEyLjIgTDE1LjYsNC42IEwxNyw2IEw4LDE1IEw4LDE1IFoiIGlkPSJTaGFwZSIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="

    const individual = oneSdk.individual();
    const biometrics = oneSdk.component('biometrics');

    const welcomeForm = oneSdk.component('form', {
        name: 'WELCOME',
        type: 'ocr',
        title: { label: 'Let\'s get you onboarded' },
        descriptions: [
            { label: 'To join us you need to be over 18 years old.' },
            // { label: '', style: myStyle },
        ],
        instructions: { content: [{ icon: checkBox, label: "A valid form of identity. Valid types include a passport, licence or Medicare card." },{ icon: checkBox, label: "To provide consent and submit details" }] },
        cta: { label: 'Start' },
    });

    const consentForm = oneSdk.component("form", {
        name: "CONSENT",
        type: "ocr",
        descriptions: [
            { label: 'We will verify your ID against credit bureau data sources.' },
            // { label: 'Have your ID handy for verification.', style: myStyle },
        ],
        // checkBox: {
        //     style: myStyle
        // },
        cta: { label: "Next" }
    });

    const documentForm = oneSdk.component("form", {
        name: "DOCUMENT",
        showPreps: true,
        type: "ocr"
    });

    const loadingExtractingForm = oneSdk.component("form", {
        name: "LOADING",
        title: { label: "Extracting data..." },
        descriptions: [
            { label: "Hold tight, this can take up to 30 seconds. Please do not refresh this page or click the 'back' button on your browser." }
        ]
    });

    const processingResultsForm = oneSdk.component("form", {
        name: "LOADING",
        title: { label: "Processing results..." },
        descriptions: [
            { label: "Hold tight, this can take up to 15 seconds. Please do not refresh this page or click the 'back' button on your browser." }
        ]
    });

    const loadingForm = oneSdk.component("form", {
        name: "LOADING",
        title: { label: "Loading now..." },
        descriptions: [
            { label: "Hold tight. Please do not refresh this page or click the 'back' button on your browser." }
        ]
    });

    const reviewForm = oneSdk.component("form", {
        name: "REVIEW",
        type: "ocr"
    });

    const resultForm = oneSdk.component('form', {
        name: 'WELCOME',
        type: 'ocr',
        title: { label: 'Success!' },
        descriptions: [
            { label: 'Start browsing our products now.' },
        ],
        instructions: {
            label: '',
            content: []
        },
        cta: { label: 'Get started now.' },
    });

    const resultFormSuccess = oneSdk.component("form", {
        name: "RESULT",
        type: "manual",
        state: 'SUCCESS',
        title: {label:'Complete'},
        descriptions: [{label:'Process is now complete. Start browsing our products now.'}],
        cta:{label: 'Close'}
    });

    const resultFormFail = oneSdk.component("form", {
        name: "RESULT",
        type: "manual",
        state: 'FAIL',
        title: {label:'Additional detail verification.'},
        descriptions: [{label: 'Start browsing our products now as we verify a few of your details.'}],
        cta:{label: 'Done'}
      });

    const ocr = oneSdk.component("ocr", {
        // documents: [{ type: docType, countries: ["AUS", "USA"] }],
    });

    ocr.on("*", (message) => {
        console.log(`ocr wildcard: ${JSON.stringify(message)}`);
    });

    ocr.on("error", (error) => {
        console.log(`ocr error: ${JSON.stringify(error)}`)
    })

    ocr.on("loading", (display)=> {
        if (display) {
            loadingForm.mount("#onboarding-container");
        } else {
            loadingForm.unmount() 
        }
    });

    // welcomeForm.on('*', (message)=> {
    //     console.log(`form | * | ${JSON.stringify(message)}`);
    // })

    welcomeForm.on('form:welcome:ready', (message) => {
        console.log(`weclome form ready: ${JSON.stringify(message)}`);
        consentForm.mount("#onboarding-container");
    })

    consentForm.on('form:consent:ready', (message) => {
        console.log(`consent form loaded: ${JSON.stringify(message)}`);
        documentForm.mount("#onboarding-container");
    })

    documentForm.on("form:document:loaded", async () => {
        checkAndRequestCameraPermissions()
    });

    documentForm.on("form:document:ready", async ({ inputInfo }) => {
        // docType = inputInfo.documentType;
        console.log(`document ready: ${JSON.stringify(inputInfo)}`)
        
        // run OCR with the selected documentType
        ocr.mount("#onboarding-container");
    });

    ocr.on("results", ({ document }) => {
        console.log(`ocr result: ${JSON.stringify(document)}`)
        // show a review screen after OCR
        reviewForm.mount("#onboarding-container")
    });

    reviewForm.on("form:review:ready", async () => {
        biometrics.mount("#onboarding-container");
    });

    var biometricsMounted = false;
    
    biometrics.on("ready", () => {
        biometricsMounted = true;
    })

    biometrics.on("loading", (display)=> {
        if (biometricsMounted) {
            if (display) {
                processingResultsForm.mount("#onboarding-container");
            } else {
                processingResultsForm.unmount() 
            }
        }
    });

    biometrics.on("results", async ({checkStatus, document, entityId}) => {
        // to do: change this based on check status to actual result manual forms (when released)
        // resultFormSuccess and resultFormFail
        var checkResults = await individual.submit({verify: true});
        if (checkResults.status.key === "PASS") {
            // additional verification or next step in onboarding
            resultFormSuccess.mount("#onboarding-container");
        } else {
            resultFormFail.mount("#onboarding-container");
        }
    })

    biometrics.on("error", (error) => {
        console.log(`biometrics error: ${JSON.stringify(error)}`);
    })

    welcomeForm.mount("#onboarding-container");
}

load()