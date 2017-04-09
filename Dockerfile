FROM node:7-alpine

# Update and install Git
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# Create app directory
RUN git clone https://github.com/damianfabian/smava.git src
WORKDIR /src

# Install app dependencies
RUN yarn install

EXPOSE  8080
CMD ["yarn", "start"]
