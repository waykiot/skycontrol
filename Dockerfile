FROM node:20 

# Create app directory
WORKDIR /usr/src/app

RUN git clone https://github.com/waykiot/skycontrol.git
WORKDIR /usr/src/app/skycontrol

# Install server
WORKDIR /usr/src/app/skycontrol/server
RUN npm install

# Workaround for sqlite3 https://stackoverflow.com/questions/71894884/sqlite3-err-dlopen-failed-version-glibc-2-29-not-found
RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev && \
    apt-get autoremove -yqq --purge && \
    apt-get clean  && \
    rm -rf /var/lib/apt/lists/*  && \
    npm install --build-from-source --sqlite=/usr/bin sqlite3

ADD . /usr/src/app/skycontrol

WORKDIR /usr/src/app/skycontrol/server
EXPOSE 2000  
CMD [ "npm", "start" ]
