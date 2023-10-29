FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

ENV NODE_ENV=production

ENV MONGO_URI=mongodb://mongo:27017/

EXPOSE 8080

CMD [ "npm","start" ]