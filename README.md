#FrankieNode Playground

Simple Express + Pug app to test the OneSDK

## Usage

1. Adjust the `.example.env` file to `.env` and fill in variables
2. `npm run start`

## Localhost port forwarding to run on phone

On a Mac, there are two steps to be able to run this locally on your phone.

1. Add your phone's ip to /etc/hosts

127.0.0.1 <yourPhoneIp>

2. Get your mac ip and set in your phone browser

`ifconfig | grep 192`

With the IP and the port in use for the node app load this on your phone and you should see the app running. 


