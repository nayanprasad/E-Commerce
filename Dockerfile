FROM node:18.17.1 as Production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./backend ./backend

EXPOSE 5000

CMD ["npm", "run", "start"]
