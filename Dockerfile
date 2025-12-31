FROM node:20-alpine

WORKDIR /apps
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN npm install -g yarn && \
  yarn install

COPY . .
RUN yarn run build

RUN rm -rf src tsconfig.json scripts .vscode .gitignore .dockerignore .prettierrc README.md

ARG PORT=11906
ENV PORT=${PORT}

EXPOSE ${PORT}
CMD [ "yarn","run","start:prod" ]