# ChatAlyticsUI
UI for realtime platform for processing Slack and HipChat messages.  This UI is dependent on the [ChatAlytics](https://github.com/gneokleo/ChatAlytics) platform.

## Installation instructions

Make sure you are running a recent version of `node`.

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
docker build .
```

Then start the image and bind port 3001 (ex. `docker run $image_id -p 3001:3001`), and go to
[localhost:3001](http://localhost:3001).