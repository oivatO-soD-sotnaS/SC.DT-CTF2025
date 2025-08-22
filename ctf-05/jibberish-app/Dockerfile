FROM node:current-alpine3.20

WORKDIR /app

COPY . /app

RUN npm install

RUN npx next build

EXPOSE 3000

CMD ["npx", "next", "start"]