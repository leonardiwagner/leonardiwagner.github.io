---
layout: post
title: "Continuous Integration and Deployment with AWS Lambda"
description: "Start guide with Continuous Integration and Deployment"
date: 2019-11-13
image: /assets/images/solid.jpg
tags: [continuous-deployment, continuous-integration, aws, lambda]
comments: true
share: true
---

AWS Lambdas are very fast, cheap and cool, right? But it can be uncertain how you update its code, especially working in a team, where some developers update the code manually on AWS Console or build the Lambda zip file locally.

Since we never should rely on local execution, I'm going show here how you easily integrate a build system which will update your AWS Lambda Function automatically.

## 1. Create your Lambda function in AWS

I'll create a Node.js application in Lambda named **node-lambda** in this example, but you can use any language you wish:

![creating a lambda in AWS](/assets/images/lambda_aws.png)

## 2. Setting up the Continuous Integration

I'm going to use [travis](https://travis-ci.org/) because it's free for public projects, but you can use any CI service as you wish. Connect with your source control repository, and set up the **AWS_ACCESS_KEY_ID**, **AWS_SECRET_ACCESS_KEY** and **AWS_DEFAULT_REGION** environment variables in your build settings for authentication when updating a AWS Lambda:

![setting up AWS environment variables](/assets/images/lambda_travis_env.png)

## 3. Setting up the Build

In your build you need to install your application dependencies, execute optional tasks such as running tests, and then publish the application code to AWS Lambda. In travis the build is done via `.travis.yml` file located in the application source control, with the following content:

```yml
language: node_js
node_js: "10"
install:
  - npm install
script:
  - npm test
after_success:
  - pip install --user awscli
  - zip -r lambda.zip *
  - aws lambda update-function-code --function-name node-lambda --zip-file fileb://lambda.zip
```

The publishing part of AWS Lambda is done in `after_success` section. First we need to install **awscli to communicate with AWS**, it'll get credentials from previously set environment variables. Then we need to place all application files (including dependencies) into a zip file to finally update your lambda function which in my case was named **node-lambda**.

## 4. Testing the Continuous Deployment

Now you just need to update the code in your source control and push it into remote, your CI service will trigger a new build:

![zipping application](/assets/images/lambda_travis_zip.png)

After application is zipped and sent to AWS, it'll return the success message:

![setting up AWS environment variables](/assets/images/lambda_travis_publishing.png)

That's all! You can check in the AWS console the updated code in your Lambda!

![setting up AWS environment variables](/assets/images/lambda_aws_result.png)

You can see the real project used in this example here: [https://github.com/coding-tutorials/aws-lambda](https://github.com/coding-tutorials/aws-lambda)

And the build log here: [https://travis-ci.org/coding-tutorials/aws-lambda/jobs/612941790](https://travis-ci.org/coding-tutorials/aws-lambda/jobs/612941790)

As homework you can set your build system to only publish in a certain branch, such one named as **production** to avoid to publish code which is not done to go live.

See you!