FROM node:24-alpine

WORKDIR /apps
COPY package-*.json .
COPY tsconfig.json .

COPY . .
RUN npm run build \
  && rm -rf src tsconfig.json scripts .vscode .gitignore .dockerignore .prettierrc README.md \
  && chown -R node:node /apps

USER node

ARG PORT=11906
ENV PORT=${PORT}

EXPOSE ${PORT}
CMD [ "npm","run","start:prod" ]