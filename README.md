# ChatAlyticsUI
[![Build Status](https://travis-ci.org/OpenChatAlytics/OpenChatAlyticsUI.svg?branch=master)](https://travis-ci.org/OpenChatAlytics/OpenChatAlyticsUI)
[![Coverage Status](https://coveralls.io/repos/github/OpenChatAlytics/OpenChatAlyticsUI/badge.svg?branch=master)](https://coveralls.io/github/OpenChatAlytics/OpenChatAlyticsUI?branch=master)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/OpenChatAlytics?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> UI for realtime platform for processing Slack and HipChat messages.  

Note that this UI is dependent on (and built on top of) the [ChatAlytics](https://github.com/OpenChatAlytics/ChatAlytics) platform.

## Installation instructions

Make sure you are running a recent version of `node` (node 5+).

Before starting install dependencies by running

```
npm install
```

Once dependencies have been installed, run

```
npm run start
```

Then go to [localhost:3001](http://localhost:3001).  Note that ChatAlyticsUI expects Chatalytics Web to be running on [localhost:8080](http://localhost:8080) by default.

## Docker

This project supports Docker via the provided Dockerfile.  Assuming you have Docker installed, build the Docker image via

```
docker build -t chatalytics-ui .
```

Then start the image and bind port 3001 
```
docker run -p 3001:3001 -it --rm --name chatalytics-ui chatalytics-ui
```
And go to [localhost:3001](http://localhost:3001).

### Sinopia

Note that if you're building the Docker image constantly, we recommend installing a local npm registry cache like Sinopia to prevent constantly fetching from npm

```
# installation and starting (application will create default
# config in config.yaml you can edit later)
$ npm install -g sinopia
$ sinopia

# npm configuration
$ npm set registry http://localhost:4873/

# if you use HTTPS, add an appropriate CA information
# ("null" means get CA list from OS)
$ npm set ca null
```

## Authors

[Paul Sastrasinh](https://github.com/psastras/)
