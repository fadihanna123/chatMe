FROM node:21.6.1-alpine
WORKDIR /app
COPY ./ .
RUN npm i -g @angular/cli serve
RUN yarn
RUN yarn build
EXPOSE 4200
CMD serve dist/client -l 4200
