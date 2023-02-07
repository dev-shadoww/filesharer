# FileShare

`FileShare` is an application through which users can share files primarily images and text files.

## How it works ?

Since it is created as a DBMS mini project there are users and based on their username the users can share files, actually these files are stored in the database and when the user tries to download them, they are directly fetched from the database.

## UI ?

In it's first stage the `UI` is kept minimal with single page.

1. At beginning there is a signUp and logIn pop up.
2. Once the user has created his/her account or logged in the user can share the files.
3. This single page has two parts, in one part of the page the details of the files are provided and in other half the received files are showed, and these are downloadable.
4. If the username is invalid then the submit will not work.

## Tech Stack ?

HTML, CSS, JS, NODEJS, MONGODB

## Layout ?

![fileShare](/imgs/drawing.svg)

## Info from SENDER SIDE.

1. Username
2. Name of the file
3. File location
4. File Size
5. File type
6. Message
7. Encryption Type
