const frontImageInput = document.getElementById('frontImage');
const backImageInput = document.getElementById('backImage');
const frontImagePreview = document.getElementById('frontImagePreview');
const backImagePreview = document.getElementById('backImagePreview');
const jsonResults = document.getElementById('jsonResults');
var imgFront;
var imgBack;

// Image preview handling
frontImageInput.addEventListener('change', function() {
  const file = this.files[0];
  imgFront = file;
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      frontImagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

backImageInput.addEventListener('change', function() {
  const file = this.files[0];
  imgBack = file;
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      backImagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Submit for OCR using FrankieOne's OneSDK OCR module
document.getElementById('submitBtn').addEventListener('click', async function() {
    jsonResults.textContent = 'processing image(s)...';
    // const formData = new FormData();
    // formData.append('frontImage', frontImageInput.files[0]);
    // formData.append('backImage', backImageInput.files[0]);

    // Assuming the OCR endpoint has been set up to handle the FrankieOne OCR module
    //   try {
    //     const response = await fetch('/ocr-endpoint', {
    //       method: 'POST',
    //       body: formData
    //     });
        
    //     if (!response.ok) throw new Error('Failed to process OCR request');
        
    //     const data = await response.json();
    //     jsonResults.textContent = JSON.stringify(data, null, 2);
    //   } catch (error) {
    //     jsonResults.textContent = 'Error: ' + error.message;
    //   }
    loadOneSDK(imgFront,imgBack)
});

function loadOneSDK(imgFront,imgBack) {
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
    activateSDKOcr(oneSdkConfig,imgFront,imgBack)
}

async function activateSDKOcr(oneSdkConfig,imgFront,imgBack) {
    // const checkBox = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NC4wMDAwMDAsIC04Ni4wMDAwMDApIj48ZyBpZD0iY2hlY2stY2lyY2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NC4wMDAwMDAsIDg2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMCwwIEM0LjUsMCAwLDQuNSAwLDEwIEMwLDE1LjUgNC41LDIwIDEwLDIwIEMxNS41LDIwIDIwLDE1LjUgMjAsMTAgQzIwLDQuNSAxNS41LDAgMTAsMCBMMTAsMCBaIE04LDE1IEwzLDEwIEw0LjQsOC42IEw4LDEyLjIgTDE1LjYsNC42IEwxNyw2IEw4LDE1IEw4LDE1IFoiIGlkPSJTaGFwZSIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="
    const checkBox = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzVfNCkiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwIDBDNC41IDAgMCA0LjUgMCAxMEMwIDE1LjUgNC41IDIwIDEwIDIwQzE1LjUgMjAgMjAgMTUuNSAyMCAxMEMyMCA0LjUgMTUuNSAwIDEwIDBaTTggMTVMMyAxMEw0LjQgOC42TDggMTIuMkwxNS42IDQuNkwxNyA2TDggMTVaIiBmaWxsPSIjMDAzRjdBIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfNV80Ij4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=";
    const oneSdk = await OneSdk(oneSdkConfig);

    const oneSdkIndividual = oneSdk.individual();

    oneSdkIndividual.addConsent("general");
    oneSdkIndividual.addConsent("docs");
    oneSdkIndividual.addConsent("creditheader");

    await oneSdkIndividual.submit();

    const ocr = oneSdk.component("ocr");
        // const biometrics = oneSdk.component("biometrics");

    ocr.on('*', (message) => {
        console.log(`ocr wildcard | ${JSON.stringify(message)}`);
    })

    ocr.on('file_uploaded', (fileName, mimeType, scanId, statusAfterUpload, stateBeforeUpload) => {

    })

    ocr.on("input_required", async (inputInfo, state, callback) => {
        console.log("input_required")
        console.log(`input info: ${JSON.stringify(inputInfo)}`);
        console.log(`state: ${state}`);
        const { documentType, side } = inputInfo;
        if (documentType === "PASSPORT") {
            // alert('passport');
            // present UI to capture a passport image
        } else if (documentType === "DRIVERS_LICENCE") {
            // check which side of the drivers licenses is required
            // alert(side);
            if (side === "front") {
                // alert('front');
                console.log("dl type: front side input_required")
                // const blob = await fetch('./auLicenseFront.png')
                // const blob = imgFront;
                callback(imgFront)
                //.then(r => r.blob())
                //.then((blob) => callback(blob))
                // present UI to capture the front side
            } else if (side === "back") {
                // alert('back');
                console.log("dl type: backside input_required")
                // const blob = await fetch('./auLicenseBackSample.png')
                //     .then(r => r.blob())
                //     .then((blob) => callback(blob))
                // present UI to capture the back side
                callback(imgBack)
            }
            else {
                console.log('unexpected side provided')
                // present UI to capture any side
            }
        } 
        // else {
        //     console.log("other document type detected: uploading front")
        //     // present UI to capture any type of identity document

        //     // navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
        //     //   // Do something with the stream.
        //     //   const track = mediaStream.getVideoTracks()[0];
        //     //   let imageCapture = new ImageCapture(track);
        //     //   imageCapture.takePhoto().then((blob) => callback(blob));
        //     // });
        //     //const blob = await fetch('./IMG_3096.jpg')
        //     // alert('default');

        //     // const blob = await fetch('./auLicenseFront.png')
        //     //     // //const blob = await fetch('./aus_passport.jpeg')
        //     //     .then(r => r.blob())
        //     //     .then((blob) => callback(blob))
        //     callback(imgFront)
        // }
        if (state === "AWAITING_DOCUMENT_UPLOAD_FRONT") {
            callback(imgFront)
        }
        // AWAITING_DOCUMENT_UPLOAD_BACK could be used for back

    });

    ocr.on("results", ({ document }) => {
        // Present the details of the document that were detected from the uploaded image or images.
        // Decide whether to proceed to the next stage of the onboarding process
        // depending on whether document verification was successful.
        // console.log('ocr results');
        if (document) {
            console.log(`document: ${JSON.stringify(document)}`);
            // console.log(document.ocrResult.dateOfBirth);
            jsonResults.textContent = JSON.stringify(document, null, 2);
            //oneSdkIndividual.submit();
            // biometrics.mount("#biometrics-container");
        } else {
            console.log("No document returned in results");
        }
    });

    ocr.on("error", (error) => {
        console.error(error.message);
        jsonResults.textContent = `Error: ${error.message}`;
    });
    // ocr.mount("#biometrics-container");

    ocr.start(true);
}