FROM node AS build
WORKDIR web
COPY package*.json .
RUN npm install
COPY . .

ENTRYPOINT ["ng", "serve"]
EXPOSE 4200
