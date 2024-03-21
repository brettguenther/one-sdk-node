// import OneSdk from '@frankieone/one-sdk'

async function getSessionToken() {
  const customerReference = uuidv4();

  var response = await fetch(`${process.env.FRANKIE_BFF_URL}/auth/v2/machine-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "machine " + Buffer.from(`${process.env.CUSTOMER_ID}:${process.env.CUSTOMER_CHILD_ID}:${process.env.API_KEY}`).toString("base64"),
    },
    body: JSON.stringify({
      permissions: {
        preset: "one-sdk",
        // entityId: "YOUR_ENTITY_ID",
        reference: customerReference
      },
    }),
  })
  return response.headers.get('token');
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

module.exports = { getSessionToken };
