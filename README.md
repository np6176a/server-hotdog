
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Hot Dog Checker

<p align="center">
  <img src="readme_images/icon.png" width="100">
</p>

* [Overview](#overview)
* [Demo](#demo)
* [Approach](#approach)
* [Known Limitations](#known-limitations)
* [Running Locally](#running-locally)
* [Deployment](#deployment)
* [License](#license)

# Overview

The Hot Dog Checker is a react native app using [Amazon Image Rekognition](https://aws.amazon.com/rekognition/) to
check if the image is of a Hot Dog. This repo holds the Node server. The Front End 
can be found [here](https://github.com/np6176a/client-hotdog). Please refer to the Front End repo for more
detailed information.

# Demo

You can check out a demo here: [https://expo.io/@findniya/hotdog](https://expo.io/@findniya/hotdog).
To view the project as a mobile app you will need to download Expo Client on your mobile device.
You can view in browser using the default Appetize.io setup in Expo or request a link in the Expo project page. 

# Approach
The following will focus on the Front End code.

## Build Process

The build process is fully handled by the [zeit.cp](https://zeit.co/) default configuration for node, which works great for this use case.

## Deploy Process

The project currently is published on [expo.io](https://expo.io/@findniya/hotdog). This is done manually using the expo IDE.
The backend is deployed on [zeit.cp](https://zeit.co/).


## API Information
Please refer to the [Front End repo](https://github.com/np6176a/client-hotdog) for more information.

# Known Limitations

## Readability
Currently the server is just one index.js file. For the sake of readability it would make
sense to break down the file to smaller utils. Due to the limitations of time this was not done.

## Testing
No tests have been implemented.

# Running Back End Locally

1. Clone the repo

1. Install packages via `$ yarn install`

1. Copy the `.env.example` to `.env`

1. Fill in the `.env` with the relevant API keys from external providers

1. Start the development server via `$ yarn start`

1. Code to your ♡'s content

# Deployment

Deployment and Build are handles by zeit.co.
1. Run `now secret add aws-key your-key'. Repeat this for all your secrets.

1. Run `now -e NODE_ENV=production -e KEY_ID=@aws-key -e SECRET_KEY=@aws-secret -e BUCKET_NAME=@aws-bucket` 

Note: If you want you can also use the zeit.co desktop app to deploy.

# License

This project is licensed under the [MIT License](./LICENSE)

# Contributions

![FindNiya Logo](readme_images/logo-fn2.png)

This project is maintained by [FindNiya](https://www.findniya.com/). 
