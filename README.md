## Frankie Node App

Simple Express + Pug app to test the OneSDK

## Usage

1. `npm install`
2. Adjust the `.example.env` file to `.env` and populate env variables
3. generate or provide self signed certificates if running locally (`cert.pem` and `key.pem` files). https is needed for proper functioning of permission prompts.
4. `npm run start`

This uses node v20.

## Localhost port forwarding to run on phone

Biometrics and OCR are meant to be performed on mobile devices.

On a Mac, there are two steps to be able to run this locally on your phone:

1. Add your phone's ip to `/etc/hosts`

`127.0.0.1 <yourPhoneIp>`

2. Get your mac ip and set in your phone browser (both connected to the same network)

`ifconfig | grep "inet " | grep -v 127.0.0.1`

With the IP and the port in use for the node app load this on your phone (https) and you should see the app running. 

## Run via docker

`docker compose up --build`