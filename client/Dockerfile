FROM node:20.16.0-alpine3.20
WORKDIR /frontend
RUN npm i -g --ignore-scripts --silent @angular/cli
COPY yarn.lock package.json ./
RUN yarn --silent
COPY . .
EXPOSE 4200
CMD ["yarn", "dev"]
