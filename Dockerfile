FROM node:6-alpine

COPY . /home/website

RUN cd /home/website \
	npm install \
	node ./node_modules/webpack/bin/webpack.js -p --progress \
	npm prune --production
RUN cd /home/website \
	npm test

EXPOSE 80

WORKDIR /home/website
USER nobody
CMD ["NPM", "start"]