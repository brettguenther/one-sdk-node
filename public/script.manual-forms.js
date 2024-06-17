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

  const consent = oneSdk.component("form", {name: "CONSENT"});

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
                    min: 20,
                    max: 76,
                    message: "The age must be between 20 and 76"
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
    consent.mount("#form-container");
  });

  consent.on("form:consent:ready", async () => {
    personal.mount("#form-container");
  });

  welcome.on("form:welcome:failed", (message) => {
    // display error message
    console.log(`welcome form failed: ${message}`)
  });

  welcome.on("*", (message) => {
    console.log(`${JSON.stringify(message)}`);
  });

  personal.on("form:personal:ready", async () => {
    document.mount("#form-container");
  });

  document.on("form:document:back", async ({inputInfo}) => {
    personal.mount("#form-container");
  });


  document.on("form:document:ready", async ({inputInfo}) => {
    review.mount("#form-container");
  });

  let count = 0;
  review.on("form:result:failed", async () => {
    if (count < 2)
    {
      retry.mount("#form-container");
      count+=1;
    }

  });

  welcome.mount("#form-container");
}

load()