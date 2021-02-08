# Capstone-Nucleus
Nucleus is an app designed to serve as a basic inventory management system for a hospital.

## Purpose
The purpose of Nucleus is to provide a portal that is easy for hospital workers to access to view, add to, edit, and remove from items in their hospital's inventory.

## Status
-Nucleus Version 1.0 is complete.

-Nucleus Verison 1.1 will feature a delete function that allows users to remove a given quantity of an item rather than having to delete all quantities simultaneously.

-Nucleus Version 1.2 will feature an inventory requisition capability that enables users to submit supply requisitions along an approval workflow that ultimately arrives at a Materials Manager who could use that information to order items and enter them into inventory upon receipt.

## Planning Documentation
*Entity Relationship Diagram (ERD): https://dbdiagram.io/d/5f68b6017da1ea736e2eb421
*Wireframes: https://miro.com/app/board/o9J_lb9rSlk=/

## Technologies Used in Current Version
*Firebase for authentication management
*React Bootrap for styling
*ReactJS for front-end, client-side management
*.NET Entity framework for back-end, server-side management
*SQL Server for database management
*T-SQL for database queries
*Cloudinary integration for image hosting

## Asset Installation
For this project, please ensure you have Node.js, Node Package Manager (NPM), ReactJS, ReactJS Router DOM, React-Bootstrap, and Cloudinary installed on your device. To install those assets, please reference the following instructions:

-To install Node.js please visit https://nodejs.org/en/ and click on the install button that contains the letters "LTS". When downloading that software be sure to accept all of the defaults settings.

-To install Node Pacakage Manager (NPM), please visit https://www.npmjs.com/get-npm and follow that resource's instructions.

From a command line interface, create the directory where you want this project to reside. In that directory install the ReactJS library with the following command (For more information about React, please reference https://reactjs.org/docs/getting-started.html):
    <strong>-npx create-react-app .</strong>

Then install the ReactJS Router DOM with the following command (For more information about React Router Dom integration, please reference https://www.npmjs.com/package/react-router-dom):
    <strong>npm i --save react-router-dom</strong>

Then install Firebase with the following command (Note that Firebase implementation requires you to create a Firebase account and to configure certain settings prior to use. Also note that Firebase implementation may vary significantly depending on your usage preferencers. For more information about Firebase integration, please visit https://firebase.google.com/docs):
    <strong>npm install --save firebase</strong>

Then install React Bootstrap with the following command (For more information about React-Bootstrap integration, please reference https://react-bootstrap.github.io/getting-started/introduction):
    <strong>npm install react-bootstrap bootstrap</strong>

Finally install Cloudinary with the following command (Note that Cloudinary implementation requires you to create a Cloudinary account and to configure certain settings prior to use. Also note that Cloudinary implementation may vary significantly depending on the SDK you use. For more information about Cloudinary integration, please visit https://cloudinary.com/documentation/how_to_integrate_cloudinary):
    <strong>npm install cloudinary</strong>

## Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
