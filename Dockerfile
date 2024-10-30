FROM node:20

COPY backend/package.json .
COPY . . 
RUN npm install
CMD ["npm", "start"]