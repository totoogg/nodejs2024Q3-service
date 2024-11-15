FROM node:22.9.0-alpine3.20

WORKDIR /app

COPY package*.json .

RUN npm cache clean --force

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run",  "start:docker"]