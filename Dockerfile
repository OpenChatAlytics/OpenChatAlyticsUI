FROM node:onbuild

RUN npm install 
RUN npm run dist

ARG NODE=production
ENV NODE_ENV ${NODE}

EXPOSE 3001