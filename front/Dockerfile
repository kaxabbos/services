FROM node AS build
WORKDIR /usr/local/web
COPY . /usr/local/web
RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /usr/local/web/dist/front /usr/share/nginx/html
EXPOSE 80
