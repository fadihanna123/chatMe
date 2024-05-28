FROM node:lts
WORKDIR /frontend
COPY package.json .
RUN yarn
COPY . .
RUN npm i -g @angular/cli
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
