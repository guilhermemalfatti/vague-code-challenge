# vague-code-challenge

## User Stories

A simple application which works with two REST APIs.
Suppose the user object only has three properties: id, name and role.

The first API allows the client to query a specific set of user objects by property
where the request may look like this.

    GET /users/?role=foo

The response should look like this.

    [
        {
            id: 2345,
            name: "java beans",
            role: "foo"
        },
        ...
    ]

The second API allows the client to create a user object with a request like this.

    POST /users/
    {
        name: "panda python",
        role: "bar"
    }

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

## Prerequisites

For development, you will only need git and docker installed.
This project was not tested in a windows machine since docker does not work properly.

## Install

I expect that the docker and GitHub are already installed in your machine. Please pay attention to the paths in the docker-compose.yml for containers web and db, should be changed by your own path.

    $ git clone https://github.com/guilhermemalfatti/api-car-insurance.git
    $ cd PROJECT
    $ docker-composer build
  
## Running the tests

    $ cd app
    $ npm test

## Start & watch

    $ docker-composer up

    
## Authors

* **Guilherme Malfatti** - *Initial work*