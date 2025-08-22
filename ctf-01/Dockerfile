FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY . /app

RUN npm install

RUN touch sqlite.db

RUN npx @better-auth/cli migrate -y

RUN npx next build

EXPOSE 3000

CMD ["npx", "next", "start"]