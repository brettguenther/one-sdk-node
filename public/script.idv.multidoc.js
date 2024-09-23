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

    oneSdkIndividual.setExtraData({
        "idv_multi_doc": "true"
    })

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

    const idv = oneSdk.flow('idv');

    idv.on('error', (err) => {
      console.log(`idv error: ${JSON.stringify(err)}`)
    });

    idv.on('*', (message)=> {
        console.log(`idv | * | ${JSON.stringify(message)}`)
    })

    idv.on('results', ({checkStatus, document, entityId}) => { 
      console.log(`idv results: ${checkStatus}`)
    })

    idv.mount("#onboarding-container");
}

load()