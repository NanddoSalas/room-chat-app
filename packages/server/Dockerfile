FROM node:16.13.2-alpine

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

EXPOSE 4000

CMD ["node", "dist/index.js"]