# OpenChatAlyticsUI
[![Build Status](https://travis-ci.org/OpenChatAlytics/OpenChatAlyticsUI.svg?branch=master)](https://travis-ci.org/OpenChatAlytics/OpenChatAlyticsUI)
[![Coverage Status](https://coveralls.io/repos/github/OpenChatAlytics/OpenChatAlyticsUI/badge.svg?branch=master)](https://coveralls.io/github/OpenChatAlytics/OpenChatAlyticsUI?branch=master)
[![Apache 2.0 Licensed](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/OpenChatAlytics/OpenChatAlyticsUI/blob/master/LICENSE.txt)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/OpenChatAlytics?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> UI for realtime platform for processing Slack and HipChat messages.  

Note that this UI is dependent on (and built on top of) the [ChatAlytics](https://github.com/OpenChatAlytics/ChatAlytics) platform.

## Build instructions

Make sure you are running a recent version of `node` (node 5+).

Before starting install dependencies by running

```
npm install
```

Once dependencies have been installed, run

```
npm run start
```

Then go to [localhost:3001](http://localhost:3001).  Note that OpenChatAlyticsUI expects OpenChatalytics Web to be running on [localhost:8080](http://localhost:8080) by default.

## Docker

This project supports Docker via the provided Dockerfile or by pulling the latest build from DockerHub.  Assuming you have Docker installed, build the Docker image via

```
docker build -t chatalytics-ui .
```

Then start the image and bind port 3001 
```
docker run -p 3001:3001 -it --rm --name chatalytics-ui chatalytics-ui
```
And go to [localhost:3001](http://localhost:3001).  Note that if you are running on Windows / OSX you must use the IP of the Docker machine instead.  This
can usually be found by running `boot2docker ip`.

If you don't want to build the image, the latest build is always available on [DockerHub](https://hub.docker.com/r/openchatalytics/openchatalyticsui/).

First, pull the latest image:
```
docker pull openchatalytics/openchatalyticsui
```

Then run the image and bind port 3001 to a host port
```
docker run -p 3001:3001 openchatalytics/openchatalyticsui
```
And go to [localhost:3001](http://localhost:3001).  Note that if you are running on Windows / OSX you must use the IP of the Docker machine instead.  This
can usually be found by running `boot2docker ip`.

## Authors

[Paul Sastrasinh](https://github.com/psastras/)
