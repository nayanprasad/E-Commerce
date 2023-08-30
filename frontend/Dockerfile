FROM node:18.17.1 as Production

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN ["sh", "-c", "npm run start:prod"]
