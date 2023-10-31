FROM node:18

WORKDIR /
COPY package.json .
COPY ./src/webapi ./src/webapi
RUN npm install
RUN npm run build --workspace=src/webapi
CMD npm run start --workspace=src/webapi