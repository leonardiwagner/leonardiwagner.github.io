---
layout: post
title: "Continuous Deployment in Practice"
description: "Start guide with Continuous Integration and Deployment"
date: 2019-11-13
image: /assets/images/solid.jpg
tags: [continuous, integration, deployment]
comments: true
share: true
---

The first thing you should do when you start to develop a new project is to build the **Continuous Deployment** process.

Why? It doesn't matter how good is the development if customers can't see it for giving feedback and to validate if you are building what they expect. Furthermore, it's also important for developers to have an environment to upload and merge their work for testing purposes. These steps are **essential in the early stages** of development.

## Building the publishing environment

First, you should choose where are you going to host your project.

For this example I'm going to use AWS S3 to host a web application, but you can use any service that you want, even an FTP will work!

Besides creating an environment which you will present your project in production you also need at least one more **additional environment for testing new code before sending to production**, which I named QA (quality assurance):

![creating environments in AWS](/assets/images/cd_s3.png)

The way to control each environment code is through source control **branches**, so you should create a branch for each environment:

![branches in source control](/assets/images/cd_git.png)

The path to merge code is: feature branch **->** master branch **->** qa branch **->** production branch

## Setting up the build system

Now you have to configure your build system to publish your application after a successful build in **qa** and **production** branches. There are plenty of services of your choice, in this example I'll use [travis](https://travis-ci.org/) because it's free for public projects.

First, you have to set the required credentials to upload files in your publishing environment. Since I'm using AWS S3 in this example I need to set the AWS credentials:

![environment variables in travis](/assets/images/cd_travis_env.png)

After that, you have to write down all the steps required to **compile your program** and **upload files to your publishing environment**. I recommend creating bash files with all the commands and steps required. You need to create a file for each environment, in this example **publish.production.sh** will be:

```bash
#!/bin/bash
#build the application written in node.js
npm run build
#install aws to upload files
pip install --user awscli
#clean previous files in aws bucket
aws s3 rm $AWS_BUCKET_PRODUCTION_ADDRESS --recursive
#upload new files in aws bucket
aws s3 cp build/ $AWS_BUCKET_PRODUCTION_ADDRESS --recursive
```

Now, you have to tell how the build system will call those files for publishing and set values for each environment by their branch. In travis we do this configuration via .travis.yml file:

```yml
language: node_js
node_js: "10"
env:
  global:
    - AWS_BUCKET_QA_ADDRESS=s3://bucket-front-end-qa
    - AWS_BUCKET_PRODUCTION_ADDRESS=s3://bucket-front-end-production
install:
  - npm install
script:
  - npm test
after_success:
  - if [[ "$TRAVIS_BRANCH" = "qa" && "$TRAVIS_PULL_REQUEST" = "false" ]]; then ./publish.qa.sh; fi
  - if [[ "$TRAVIS_BRANCH" = "production" && "$TRAVIS_PULL_REQUEST" = "false" ]]; then ./publish.production.sh; fi
```

Few notes:
- In travis and other build systems you have built in plugins to easy publish to popular services such as AWS, I just did manually to show how it works under the hood and to you be free to publish in a service which your build system doesn't provide a plugin for publishing.

- I have set the credentials on build system configuration (which will be encrypted) and bucket names on **.travis.yml** (which will be "public" in the source control). There are no rules about that, you just need use common sense to just expose non-sensitive data.

- In travis I have to specify to only publish if it isn't a pull request build, in that way we are going only to publish only if the branch was merged (hopefully after a code revision if it's QA, or manual testing if it's production).

That's all! Now after each **pull request merge** in **qa** or **production** you can check the publishing steps in your build:

![travis build](/assets/images/cd_travis_build1.png)

and the files being uploaded to your publishing environment:

![travis build](/assets/images/cd_travis_build2.png)

You can check project of this example here: [https://github.com/coding-tutorials/aws-front-end](https://github.com/coding-tutorials/aws-front-end)

And the build log here: [https://travis-ci.org/coding-tutorials/aws-front-end/jobs/611511370](https://travis-ci.org/coding-tutorials/aws-front-end/jobs/611511370)

See you!