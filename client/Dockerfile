FROM node:20.14.0-alpine3.20
WORKDIR /frontend
RUN npm i -g @angular/cli serve
COPY package.json .
RUN yarn
COPY . .
RUN yarn build
EXPOSE 4200
CMD serve build
