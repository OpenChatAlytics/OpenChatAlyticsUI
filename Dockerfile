FROM node:onbuild

ARG NODE=production
ENV NODE_ENV ${NODE}

EXPOSE 3001