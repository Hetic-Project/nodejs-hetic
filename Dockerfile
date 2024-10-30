FROM node:20

WORKDIR /backend

COPY backend/package.json ./
RUN npm install

COPY backend/ . 

CMD ["node", "server.js"]