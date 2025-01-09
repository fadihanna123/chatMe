FROM node:22.13.0-alpine3.20
WORKDIR /frontend
RUN npm i -g --ignore-scripts --silent @angular/cli
COPY yarn.lock package.json ./
RUN yarn --ignore-scripts --silent --emoji
COPY . .
EXPOSE 4200
CMD ["yarn", "dev"]
