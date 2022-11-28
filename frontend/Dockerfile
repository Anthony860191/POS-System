FROM node

WORKDIR /app/frontend
COPY package.json /app/frontend

RUN npm install; exit 0
RUN npm install react-google-login --legacy-peer-deps

EXPOSE 3000
CMD ["npm", "start"]