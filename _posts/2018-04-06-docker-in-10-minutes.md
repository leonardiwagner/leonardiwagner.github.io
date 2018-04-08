---
layout: post
title: "Docker in 10 minutes"
description: "All you should know about Docker"
date: 2018-04-06
image: /assets/images/docker.jpg
tags: [docker]
comments: true
share: true
---

I'm going to present all you need to know to understand and develop with Docker, with practical and real-world examples in just 10 minutes!

# Why Docker?

You probably already had problems with your application working well on your computer but at other environment doesn't, or even have to take a lot of steps to make the application works and behave correctly in a new environment. Docker solves these problems because it encapsulates the whole environment of your application, such as operational system (OS), configurations and dependencies, and this guarantees your application will run and behave exactly as expected, in either development or production machines.

You may have heard about Virtual Machines (VMs), which is really a new computer inside the host (your running machine), where you can save a single image containing everything you need glued all together (even a whole new OS). Docker in another hand uses the base of host OS, so every image is much more lighter and just contains the essential, example: an image containing only the application and other image containing only the database, nothing more! That makes Docker awesome, with a Docker file you can orchestrate these images into Containers, and how they will work together to make your application run. The advantages are:

- It's explicit every bit which composes your application: configurations, dependencies, and installation process.
- It's automated: once you create these steps in Docker file, with a single command everything is installed and running in minutes on any machine containing Docker, either in a development or production environment.

- Since it isn't a Virtual Machine, you can develop something like Java for example in your machine only with a Java container, without needing to have Java in your computer!

- It's easier to modify any aspect of your application environment, just change Docker file!

## Docker in practice

First, [install Docker](https://docs.docker.com/install/). Once Docker is installed on your computer, we will create a simple Node.js app to run with Docker. If you don't know Node.js it's OK because it's really simple.

- Create `webapp.js` file in a new folder:

```
// require "express" library dependency
var app = require('express')()

// starts a web server the PORT number will be
// read from environment variables, configurated at Dockerfile
app.listen(process.env.PORT_NUMBER, () =>
  console.log(`Webapp listening at: ${process.env.PORT_NUMBER}`)
)

// starts a endpoint on web server
app.get('/receiveMessage', (req, res) =>
  res.send(`Message: ${req.query.message}`)
)
```

You probably don't have Node.js or "express" library on your computer to make this app run, and you really don't need, because Docker will take care about this for us! We just need to tell Docker instructions to what we need to run this application.

- Create a file named `Dockerfile` (yes, without extension) in the same folder:

```
# FROM: request a docker base image
# we're requesting a base image with Node.js version 9
FROM node:9

# WORKDIR: set the directory where docker will run commands
# we're creating "webapp" directory
WORKDIR /webapp

# COPY: copy files and directories to our image
# we're copying all files from the current directory
COPY . /webapp

# EXPOSE: expose the container to a PORT number
# we're setting the 2121 to be our container port
EXPOSE 2121

# ENV: set environment variables inside the container
# we're creating a variable "PORT_NUMBER" with value "2121"
ENV PORT_NUMBER 2121

# RUN: execute command(s) when build image
# we're installing our app dependencies when our image is built
RUN npm init -f -y && \
    npm install express


# CMD: execute a command when container starts
# we're starting our node application
CMD node webapp.js
```
Observations:

- `#` indicates commentary, you can remove it from `Dockerfile`.
- The `node:9` image is located at [https://hub.docker.com/](https://hub.docker.com/) , there are tons of images ready for use for running and compiling applications, databases, tools, and etc.., but you can also create a custom image.

After creating a `Dockerfile` with instructions, we need to build our webapp image, run this command inside your directory:

- `docker build -t webapp .`

The tag (`-t`) parameter will name this image as "webapp", and `.` indicates to use the `Dockerfile` inside our current directory. It may take a while to Docker download the base image and create ours. After finished, you can execute a command to see both `node:9` base and our custom image with:

- `docker images`

It will print:

```
REPOSITORY        TAG                 IMAGE ID            CREATED             SIZE
webapp            latest              0a0b1a6a110d        2 minutes ago       196MB
node              9                   aa3e171e4e95        2 days ago          673MB
```

Good, now we will run our `webapp` image inside a Container:

- `docker run -t webapp`

This will also start our application (due `CMD` configured on `Dockerfile`) and will print:

`Webapp listening at: 2121`

That message was written on `webapp.js`. The `-t` parameter is to be possible to when we hit `Ctrl + C` we can go back to host command line.

 Press `Ctrl + C` to exit container, and now back on host command line, let's see the created containers:

- `docker ps`

Then will be listed the running containers. Note that even when get back to host with `Ctrl + C` command, the container still running:

```
CONTAINER ID  IMAGE     COMMAND                  STATUS         PORTS
74772d604988  webapp    "/bin/sh -c 'node we…"   Up 4 minutes   2121/tcp
```

**VERY IMPORTANT:** There is listed the generated `CONTAINER ID` for created Container. This ID is very important to do the next operations with this container, so keep your generated ID.  I'm going to use the ID `74772d604988` for the next examples, which was generated for me, so everytime you see I'm using this ID please replace by the generated ID for you instead!

Let's start inspecting the container:

- `docker inspect 74772d604988`

Then will be printed a lot of Container details, an important one is the IP Adress located at NetworkSettings > Networks:

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

> Tip: you can see only the Container ip via this command:
> - {% raw %}`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 74772d604988`{% endraw %}

Then if you type the container IP and PORT in your web browser: `http://172.17.0.4:2121/consume?message=hello` , it will be displayed:

`Message: hello`

Yes, we can access our running app from the container that easy! It's all working with Docker, congratulations! If you got curious if we can enter inside this container, just execute:

- `docker exec -ti 74772d604988 bash`

Hooray! We are inside the container:

`root@6a8d6cecb5cf:/webapp# `

Now you can do everything here as in your host bash, such `ls` to list files 😃, to go back to host command line just type:

- `exit`

Our application stills on because container keeps running. If you want to stop the container it's very easy:

- `docker stop 74772d604988`

> Tip: if you want to stop all running containers at once, then run: `docker stop $(docker ps -a -q)`

Good, it's stopped, if you list again with `docker ps` it will not be there, however, if you list with `-a` parameter:

- `docker ps -a`

Then it will show all containers including stopped ones:

```
CONTAINER ID  IMAGE  STATUS
74772d604988  webapp Exited (137) 2 minutes ago
```

If you really don't want to use this container anymore, you can totally remove it:

- `docker rm 74772d604988`

> Tip: if you want to remove all containers at once, run: `docker rm $(docker ps -a -q)` , if you want to remove also running containers include the `-f` force flag.

If you want to remove our custom image as well:

- `docker rmi consumer`

> Tip: if you want to remove all images at once, run: `docker rmi $(docker images -q)`

## Bonus: awesome Docker commands

It's done! Now, you are already able to develop and run applications with Docker! But there are some cookbooks commands to make you more productive:

**1.** Add `--rm` flag when run a new container. This will stop and remove automatically the container after exiting, such as when we hit `Ctrl + C`:

- `docker run -t --rm image`

Replace `image` with your image name.

**2.** Run and enter inside a container at once:

- `docker run image -ti bash`

Replace `image` with your image name. You can also combine this command with `--rm`

**3.** We've used the command `COPY` in `Dockerfile` and it only copies files to container, but we can use Volumes to share files between the host (your computer) and container, this is awesome at development because we can make changes in host and it'll be automatically reflected inside container. Sadly we can't make it via `Dockerfile` (its VOLUME option doesn't behave as we want), but it's solved with volume flag `-v` when we run a container:

- `docker run -t -v ${PWD}:/path image`

replace `image` with your image name, and `path` with the same path of your `WORKDIR` described on `Dockerfile`. The `${PWD}` is a bash shortcut to your current path, if you are using Windows for eg. just write the whole path or use a equivalent command. You also combine other commands to enter inside this container, just take care if you remove something from this directory inside the container, it'll also be removed from your host computer!

That's all, hope you enjoyed! 😎
