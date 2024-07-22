// import OneSDK from '@frankieone/one-sdk'

async function getSessionToken(customerRef) {
  var customerReference;
  if (customerRef) {
    customerReference = customerRef;
  } else {
    customerReference = DemoGuid();
  }
  // const oneSdk = await OneSDK({ session: "test" });

  const authToken = (process.env.CUSTOMER_CHILD_ID != undefined) ? `${process.env.CUSTOMER_ID}:${process.env.CUSTOMER_CHILD_ID}:${process.env.API_KEY}` : `${process.env.CUSTOMER_ID}:${process.env.API_KEY}`
  // console.log(authToken);
  var response = await fetch(`${process.env.FRANKIE_BFF_URL}/auth/v2/machine-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "machine " + Buffer.from(authToken).toString("base64"),
    },
    body: JSON.stringify({
      permissions: {
        preset: "one-sdk",
        // entityId: "YOUR_ENTITY_ID",
        reference: customerReference
      },
    }),
  })
  // console.log(`${JSON.stringify(response)}`)
  return response.headers.get('token');
}

function DemoGuid() {
  const getRandomDigits = () => Math.floor(1000 + Math.random() * 9000).toString();
  return `customer-${getRandomDigits()}-${getRandomDigits()}`;
}

module.exports = { getSessionToken };
