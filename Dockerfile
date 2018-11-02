FROM node:10.12.0

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN npm install --production

COPY . .

CMD ["npm", "start"]
