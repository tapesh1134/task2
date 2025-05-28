FROM node

WORKDIR /testapp

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
