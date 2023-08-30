FROM node:18.17.1 as Production

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN ["sh", "-c", "npm start"]
