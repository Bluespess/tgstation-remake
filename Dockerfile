FROM node:carbon

RUN apt-get update && apt-get install -y \
    unzip && \
    rm -rf /var/lib/apt/lists/*

RUN npm i --no-audit -g gulp-cli

WORKDIR /src
RUN wget -q -O bluespess.zip https://github.com/Bluespess/bluespess/archive/master.zip && \
    wget -q -O tgstation-remake.zip https://github.com/bluespess/tgstation-remake/archive/master.zip && \
    unzip -q tgstation-remake.zip && \
    unzip -q bluespess.zip && \
    rm tgstation-remake.zip && \
    rm bluespess.zip && \
    cd /src/bluespess-master && \
    cd /src/tgstation-remake-master && \
    npm i --no-audit && \
    npm i --no-audit ../bluespess-master && \
    cd client_src && \
    npm i --no-audit && \
    npm i --no-audit ../../bluespess-master/client && \
    gulp

EXPOSE 8080
WORKDIR /src/tgstation-remake-master
CMD node /src/tgstation-remake-master/index