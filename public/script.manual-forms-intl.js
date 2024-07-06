function load() {
  var lSessionToken = sessionToken;
  var lGoogleApiKey = googleApiKey;
  console.log(lSessionToken)
  console.log(lGoogleApiKey)
  const recipe = {
    recipe: {
      form: {
        provider: {
          name: 'react',
          googleApiKey: lGoogleApiKey
        },
      }
    }
  }
  const modeConfig = { "mode": "development" }
  const sessionConfig = { session: { token: lSessionToken } }
  const oneSdkConfig = { ...sessionConfig, ...modeConfig, ...recipe };
  activateSDK(oneSdkConfig)
}

async function activateSDK(oneSdkConfig) {
  var oneSdk = await OneSdk(oneSdkConfig);
  const checkBox = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NC4wMDAwMDAsIC04Ni4wMDAwMDApIj48ZyBpZD0iY2hlY2stY2lyY2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NC4wMDAwMDAsIDg2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMCwwIEM0LjUsMCAwLDQuNSAwLDEwIEMwLDE1LjUgNC41LDIwIDEwLDIwIEMxNS41LDIwIDIwLDE1LjUgMjAsMTAgQzIwLDQuNSAxNS41LDAgMTAsMCBMMTAsMCBaIE04LDE1IEwzLDEwIEw0LjQsOC42IEw4LDEyLjIgTDE1LjYsNC42IEwxNyw2IEw4LDE1IEw4LDE1IFoiIGlkPSJTaGFwZSIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="

  //   const welcome = oneSdk.component("form", {
  //     name: "WELCOME",
  //     type: "manual",
  //     title: { label: 'Let\'s get you onboarded' },
  //     descriptions: [
  //         { label: 'We need to collect some personal information to verify your identity. All fields must be filled and it is important you enter your details accurately.', style: {'ff-descriptions': { 'font-family': 'Helvetica' }} },
  //     ],
  //     // descriptions: [
  //     //   { label: 'To join us you need to be over 18 years old.', style: {'ff-descriptions': { 'font-family': 'Helvetica' }} },
  //     //   { label: 'You will need a valid form of identity. Valid types include a passport and license.', style: {} },
  //     // ],
  //     instructions: { content: [{
  //         label: "A few mins to complete this application", icon: checkBox }, 
  //         {label: "An ID on you (this could be a driver’s licence, passport or Medicare card)", icon: checkBox },
  //         {label: "You must be over 18 years of age", icon: checkBox }
  //         ], 
  //         style: {'ff-instructions': { 'font-family': 'Helvetica' }}
  //     },
  //     // cta: {label: 'Start' }}
  //   });

  const welcome = oneSdk.component("form", {
    name: "WELCOME",
    type: "manual",
    title: { label: '让我们开始您的注册' },
    descriptions: [
      {
        label: '我们需要收集一些个人信息来验证您的身份。所有字段都必须填写，且请准确输入您的详细信息。',
        style: { 'ff-descriptions': { 'font-family': 'Helvetica' } }
      },
    ],
    instructions: {
      label: "您需要",
      content: [
        { label: "几分钟内完成此申请", icon: checkBox },
        { label: "需要有一个身份证明（这可以是驾驶执照、护照或卡）", icon: checkBox },
        { label: "您必须年满18岁", icon: checkBox }
      ],
      style: { 'ff-instructions': { 'font-family': 'Helvetica' } }
    },
    cta: { label: '开始' }
  });


  const consent = oneSdk.component("form", {
    name: "CONSENT",
    type: "manual",
    descriptions: [
      { label: 'Your data is being collected in accordance with our privacy policy. We will verify your ID against credit bureau data sources.' },
    ],
  });

  const chnRegex = /^[\u4e00-\u9fa5]+$/;

  const personal = oneSdk.component("form", {
    name: "PERSONAL",
    type: "manual",
    personal: {
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
                    label: "China",
                    value: "CHN"
                  }
                ],
                //hide: false
              },
              {
                fieldType: 'address',
                dataType: 'current_addr',
                name: 'address.fullAddress',
                hide: true
              },
              {
                fieldType: 'date',
                // dataType: 'text',
                name: 'dateOfBirth',
                hide: true,
              },
              {
                fieldType: "input",
                name: "middleName",
                hide: true
              },
              {
                fieldType: "input",
                name: "familyName",
                hide: true
              },
              {
                fieldType: "input",
                name: "givenName",
                hide: true
              },
            ]
          }
        },
        AUS: {
          default: {
            fields: [
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
        },
        CHN: {
          default: {
            fields: [
              {
                fieldType: "date",
                label: "出生日期",
                name: "dateOfBirth",
                hide: false,
                calendarConfig: {
                  // export enum CalendarType {
                  //   Gregorian = 'gregory',
                  //   Buddhist = 'buddhist',
                  //   Chinese = 'chinese',
                  //   Coptic = 'coptic',
                  //   EthiopicAmeteAlem = 'ethioaa',
                  //   Ethiopic = 'ethiopic',
                  //   Hebrew = 'hebrew',
                  //   Islamic = 'islamic',
                  //   IslamicUmalqura = 'islamic-umalqura',
                  //   Persian = 'persian',
                  //   BikramSambat = 'bikram-sambat',
                  // }
                  type: "chinese",
                  day: {
                    placeholder: "ra"
                  },
                  month: {
                    placeholder: "ra2"
                  },
                  year: {
                    placeholder: "ra3"
                  },
                  age: {
                    min: 18,
                    max: 85,
                    message: "年龄必须在18到85岁之间",
                    // export enum LocaleType {
                    //   English = 'en',
                    //   Spanish = 'es',
                    //   French = 'fr',
                    //   German = 'de',
                    //   Italian = 'it',
                    //   Japanese = 'ja',
                    //   Korean = 'ko',
                    //   Chinese = 'zh',
                    //   Arabic = 'ar',
                    //   Russian = 'ru',
                    // }
                    locale: "zh"
                  }
                },
                helperText: "请输入您的出生日期"
              },
              {
                fieldType: "input",
                label: "名字",
                name: "givenName",
                helperText: "请输入您的名字",
                hide: false,
                rules: {
                  required: { value: true, message: "入您" },
                  pattern: { value: chnRegex, message: "入您" }
                }
              },
              {
                fieldType: "input",
                label: "中间名",
                name: "middleName",
                hide: true,
              },
              {
                fieldType: "input",
                label: "姓氏",
                name: "familyName",
                hide: false,
                helperText: "请输入您的姓氏",
                rules: {
                  pattern: { value: chnRegex, message: "入您" }
                }
              },
              {
                fieldType: "address",
                label: "法定地址",
                hide: false,
                name: "address.fullAddress",
                helperText: "请输入您的居住地址",
                placeholder: "请输入一个地址"
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
    title: { label: "Choose Your ID" },
    // TODO: include document customization
    documents: [
      {
        type: "DRIVERS_LICENCE",
        //label: "DL",
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
                    }
                  ],
                  //hide: false
                }
              ]
            }
          }
        }
      },
      {
        type: "PASSPORT",
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
                      label: "China",
                      value: "CHN"
                    }
                  ],
                  //hide: false
                }
              ]
            }
          },
          CHN: {
            default: {
              fields: [
                {
                  fieldType: 'select',
                  name: 'country',
                  label: 'Passport Issuing Country',
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
                      label: "China",
                      value: "CHN"
                    }
                  ],
                  //hide: false
                },
                {
                  fieldType: "input",
                  name: "idNumber",
                  label: "中国护照号码",
                  rules: {
                    required:{
                      value: true,
                      message: "请输入您的中国护照号码"
                    }
                  }
                },
                {
                  fieldType: "input",
                  name: "extraData.document_number",
                  dataType: "document_extra",
                  label: "文件编号",
                  rules: {
                    required:{
                      value: true,
                      message: "请输入您的文件编号"
                    }
                  }
                }
              ]
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
    // consent.mount("#form-container");
    personal.mount("#form-container");
    // document.mount("#form-container");
  });

  consent.on("form:consent:ready", async () => {
    personal.mount("#form-container");
    // document.mount("#form-container");
  });

  welcome.on("form:welcome:failed", (message) => {
    // display error message
    console.log(`welcome form failed: ${message}`)
  });

  // welcome.on("*", (message) => {
  //   console.log(`${JSON.stringify(message)}`);
  // });

  personal.on("form:personal:ready", async () => {
    document.mount("#form-container");
  });

  document.on("form:document:back", async ({ inputInfo }) => {
    personal.mount("#form-container");
  });

  document.on("form:document:ready", async ({ inputInfo }) => {
    review.mount("#form-container");
  });

  review.on("form:result:success", async () => {
    console.log("result success")
  });
  let count = 0;

  review.on("form:result:partial", async () => {
    if (count < 2) {
      retry.mount("#form-container");
      count += 1;
    }
  });

  review.on("form:result:failed", async () => {
    if (count < 2) {
      retry.mount("#form-container");
      count += 1;
    }
  });

  welcome.mount("#form-container");
}

load()