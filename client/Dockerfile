FROM node:20.14.0-alpine3.20
WORKDIR /frontend
COPY package.json .
RUN yarn
COPY . .
RUN npm i -g @angular/cli
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
