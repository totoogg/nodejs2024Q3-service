FROM node:16-alpine3.18

WORKDIR /app

COPY package*.json .

RUN npm cache clean --force

RUN npm install --production

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run",  "start:docker"]