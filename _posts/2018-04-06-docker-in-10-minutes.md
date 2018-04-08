---
layout: post
title: "Docker in 10 minutes"
description: "All you should know about Docker"
date: 2018-04-06
image: /assets/images/solid.jpg
tags: [docker]
comments: true
share: true
---

# TODO say how to search docker images
# rename consumer app to webapp

I'm going to present all you need to know to understand and develop with docker, with practical and real-world examples.

You probably faced a problem of developing a software that runs good in your computer but doesn't work correctly in another machine or server due to using wrong configurations, installation or dependencies. Docker basically encapsulate the whole environment of your applications needs, including operational system, configurations, dependencies, like database, to guarantee your application will run and behave exactly as you expected, in both development or production machines.

Unlike a Virtual Machine (VM) which is isolated environment from the host (running computer) and needs a whole Operation System, Docker uses the base of host operational system, and that's the awesome part! In that way, we can execute images quickly in either development or production machines. Docker also works with small pieces working together (Containers) instead a single image with everything all glued at once, so everything which needs to make your application run is explicit and documented. Did you ever executed many steps to make an application run? No more! Let's go on practice now!

## Docker on practice

First, [install Docker](https://docs.docker.com/install/). We will create simple a Node.js app just for the sake of simplicity, you don't need to know node, it's really simple!

- Create `consumer.js` file in a new folder:

```
const app = require('express')()

app.get('/consume', (req, res) =>
  res.send(`Consumed: ${req.query.message}`)
)

app.listen(process.env.PORT, () =>
  console.log(`Listening ${process.env.PORT}`)
)
```

This program will require a dependency `express` and expose an API. You probably don't have express dependency or even Node.js to run this application in your machine. That's OK and you really don' t need, let's make Docker take care of this.

- Now create a `Dockerfile` file (yes, without extension) in the same folder:

```
# FROM: request a docker image
# we're a Node.js as our base image
FROM node:9

# WORKDIR: set the directory where docker will run commands
# we're creating "consumerApp" directory
WORKDIR /consumerApp

# COPY: copy files and directories to our image
# we're copying all files from current directory
COPY . /consumerApp

# EXPOSE: expose the container to a PORT
# we're setting the 2121 to be our container port
EXPOSE 2121

# ENV: set environment variables inside container
# we're creating a variable "PORT" with value "2121"
ENV PORT 2121

# RUN: execute command(s) when build image
# we're installing our app dependencies when our image build
RUN npm init -f -y && \
    npm install express


# CMD: execute command when container runs
# we're starting our node application
CMD node consumer.js
```

Great, now we need to Docker build our custom image, in the command-line inside your directory execute:

- `docker build -t consumer .`

The tag (`-t`) parameter will name this image as "consumer", and `.` indicates to use the `Dockerfile` inside our folder. It may take a while to Docker download the base image. After finished you can see our custom image executing:

- `docker images`

and it'll print the recently created image:

```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
consumer            latest              0a0b1a6a110d        2 minutes ago       196MB
```

Good, now we will run this image :

- `docker run -t consumer`

In this command we're running "consumer" image into a new Container, then it will also start our application (due `CMD` configured on `Dockerfile`) and will print: `Consumer listening on 2121` which was written on `consumer.js`. The `-t` parameter is to be possible to when we hit `Ctrl + C` we can go back to host command line.

 Press `Ctrl + C` to exit container, and now back on host command line, let's se a new command:

- `docker ps`

This command list docker running containers, as our recently created:

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
74772d604988        consumer            "/bin/sh -c 'node co…"   4 minutes ago       Up 4 minutes        2121/tcp            gracious_bartik
```

**VERY IMPORTANT:** There is listed the generated `CONTAINER ID`. This ID is very important to do the next operations with this container, so keep your generated ID.  I'm going to use the ID `74772d604988` which was generated for me, so everytime you see I'm using this ID please replace by the generated ID for you!

Let's start inspecting the container:

- `docker inspect 74772d604988`

Then will be printed a lot of container details, a important one is the IP Adress located at NetworkSettings > Networks:

```
[
  {
    ...,
    NetworkSettings:{
      ...,
      "Ports": {
        "2121/tcp": null
      },
      Networks: {
         bridge: {
           ...,
           IPAddress: "172.17.0.4"
         }  
      }
    }
  }
]
```

> Tip: you can use  to get straight the container ip. {% raw %}`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 74772d604988`{% endraw %} So if I go to my web browser and go to address http://172.17.0.4:2121/consume?message=hello , it will display:

`Consumed: hello`

Yes, we can access our running app from container that easy!

If you are curious how we can enter inside this container, just execute:

- `docker exec -ti 74772d604988 bash`


`root@6a8d6cecb5cf:/consumerApp# `

Cool uh? You can do everything here as in your host bash, such `ls` to list files :) , to go back to host command line just type:

- `exit`

Our application stills on because container keeps running. If you want to stop the container is very easy:

The `-it` parameter stands for `-t -i`, the `-t` is the same meaning as we saw on `docker run` command, the `-i` stands for be interactive, `bash` is what we want to execute, in that case we is using the bash inside the container:
- `docker stop 74772d604988`

> Tip: if you want to stop all running containers at once, then run: docker stop $(docker ps -a -q)

Good, it's stopped, if you list again with `docker ps` it will not be there, however if you list with `-a` parameter:

- `docker ps -a`

Then it will show all containers including stopped ones:

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                           PORTS               NAMES
74772d604988        consumer            "/bin/sh -c 'node co…"   21 minutes ago      Exited (137) 2 minutes ago                           gracious_bartik
```

If you really don't want to use this container anymore, you can totally remove it:

- `docker rm 74772d604988`

> Tip: if you want to remove all containers at once, run: `docker rm $(docker ps -a -q)` , if you want to remove also running containers include the `-f` force flag.

If you want to remove our custom image as well:

- `docker rmi consumer`

> Tip:if you want to remove all images at once, run: `docker rmi $(docker images -q)`

## Awesome commands cookbook

Horray, you are already to run applications inside a container! But there are pro commands that will make your life easier:

**1.** Add `--rm` flag when run a new container. This will stop and remove automatically the container after exiting, such as when we hit `Ctrl + C`:

- `docker run -t --rm image`

replace `image` with your image name

**2.** We've used the command `COPY` in `Dockerfile` and it only copies files to container, but we can use Volumes to share files between the host (your computer) and container, this is awesome at development because we can make changes in host and it'll be automatically reflected inside container. Sadly we can't make it via `Dockerfile` (its VOLUME option doesn't behave as we want), but it's solved with volume flag `-v` when we run a container:

- `docker run -t -v ${PWD}:/path image`

replace `image` with your image name, and `path` with the same path of your `WORKDIR` described on `Dockerfile`. You also can enter inside this container, just take care if you remove something from this path inside container, it'll also be removed from your computer! (host)
