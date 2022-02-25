FROM arm32v7/node as base

WORKDIR /usr/src/app/

# COPY package*.json ./
# COPY src ./src
# COPY nodemon.json ./
# COPY prisma ./prisma

COPY . .

# RUN apt-get update
RUN apt-get -y install openssl wget &&\
    wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/query-engine &&\
    wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/libquery_engine.so &&\
    wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/introspection-engine &&\
    wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/migration-engine &&\
    wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/prisma-fmt &&\
    chmod +x query-engine &&\
    chmod +x introspection-engine &&\
    chmod +x migration-engine &&\
    chmod +x prisma-fmt &&\
    mv libquery_engine.so libquery_engine-linux-arm-openssl-1.1.x.so.node  

ENV PRISMA_QUERY_ENGINE_BINARY /usr/src/app/query-engine
ENV PRISMA_QUERY_ENGINE_LIBRARY /usr/src/app/libquery_engine-linux-arm-openssl-1.1.x.so.node
ENV PRISMA_INTROSPECTION_ENGINE_BINARY /usr/src/app/introspection-engine
ENV PRISMA_MIGRATION_ENGINE_BINARY /usr/src/app/migration-engine
ENV PRISMA_FMT_BINARY /usr/src/app/prisma-fmt
ENV PRISMA_CLI_QUERY_ENGINE_TYPE binary
ENV PRISMA_QUERY_ENGINE_TYPE binary

RUN npm i
# RUN npx prisma generate 



# RUN wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/query-engine
# RUN wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/libquery_engine.so
# RUN wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/introspection-engine
# RUN wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/migration-engine
# RUN wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/prisma-fmt

# RUN chmod +x query-engine
# RUN chmod +x introspection-engine
# RUN chmod +x migration-engine
# RUN chmod +x prisma-fmt
# RUN mv libquery_engine.so libquery_engine-linux-arm-openssl-1.1.x.so.node

# ENV PRISMA_QUERY_ENGINE_BINARY /usr/src/app/query-engine
# ENV PRISMA_QUERY_ENGINE_LIBRARY /usr/src/app/libquery_engine-linux-arm-openssl-1.1.x.so.node
# ENV PRISMA_INTROSPECTION_ENGINE_BINARY /usr/src/app/introspection-engine
# ENV PRISMA_MIGRATION_ENGINE_BINARY /usr/src/app/migration-engine
# ENV PRISMA_FMT_BINARY /usr/src/app/prisma-fmt
# ENV PRISMA_CLI_QUERY_ENGINE_TYPE binary
# ENV PRISMA_QUERY_ENGINE_TYPE binary


# RUN npm i
# RUN npx prisma generate 
#     # && npx migrate dev --name init
# RUN  npx prisma migrate dev --name init

# FROM base as production

# ENV NODE_PATH=./build

# RUN npm run build















# ////////////////////







# FROM node:lts-slim as base

# WORKDIR /home/node/app

# COPY package*.json ./

# # COPY src ./src
# COPY dist ./dist

# COPY prisma ./prisma

# RUN npm i

# RUN apt-get update
# RUN apt-get -y install openssl wget


# RUN wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/query-engine
# RUN wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/libquery_engine.so
# RUN wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/introspection-engine
# RUN wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/migration-engine
# RUN wget --quiet https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/prisma-fmt


# RUN npx prisma generate 
#     # && npx migrate dev --name init

# # FROM base as production

# # ENV NODE_PATH=./build

# # RUN npm run build

