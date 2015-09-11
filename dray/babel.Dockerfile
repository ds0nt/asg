FROM node

RUN npm install -g babel
CMD babel-node
