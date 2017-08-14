FROM node:8.3.0-alpine
MAINTAINER blazedd

EXPOSE 8080:80
WORKDIR /home/website
ENV REFRESHED_AT 2016-04-28
ENV NODE_ENV=production

ADD package.json .
RUN npm install --production=false

COPY . .
RUN node ./node_modules/webpack/bin/webpack.js -p --progress --verbose
RUN npm prune --production
USER nobody


#RUN npm test

CMD ["npm", "start"]