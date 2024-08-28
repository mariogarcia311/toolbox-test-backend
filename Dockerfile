
# FROM --platform=linux/amd64 node:20-alpine3.20

FROM node:14.5.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]