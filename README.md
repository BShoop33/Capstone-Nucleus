# Capstone-Nucleus
Nucleus is an app designed to serve as a basic inventory management system for a hospital.

## Purpose
The purpose of Nucleus is to provide a portal that makes it easy for hospital workers to view items in, add items to, edit items, and remove items from their hospital's inventory.

## Usage
### Login or Registration
Upon arriving at the Nucleus login page (either by hosting the Nucleus application locally or by accessing a version of it hosted on the internet), an existing user may log into Nuclues by entering a valid email address and password combination and then clicking the <em>SIGN IN</em> button. If the user is not an existing Nucleus user, they may register for Nucleus by cliking the link that says <em>Sign up here</em>. After clicking that link, a registration form will appear prompting the user to enter a first name, last name, display name, department, job title, email address, password, and password confirmation (Note that in a real production environment a user would be unable to register for Nucleus because his or her authentication credentials would be assigned and managed with a system like Active Directory rather than self-appointed). When all that information is entered, the user may then click the <em>REGISTER</em> button to finalize the registration process and enter the Nucleus portal. If the user preferred to return to the Login page rather than registering, they could do so by clicking the <em>Log in here</em> link rather than clicking the <em>REGISTER</em> button.

### Item View
Upon entering the Nucleus portal, the user immediately sees a listing of all inventory items in the entire hospital arranged alphabetically by department. The user can scroll through the list to find any items of interest or they can use either the <em>Search by Item Name</em> search bar or <em>FILTER BY LOCATION</em> dropdown to find items more quickly. If the user clicks the <em>FILTER BY LOCATION</em> dropdown, a dropdown menu of all departments in the hospital will appear. The user can then click any of those departments, which will cause all items that are not in that department to disappear. If the user then wants to return to viewing all items in the hospital's inventory, they may do so by clicking the yellow <em>REMOVE FILTER</em> button that appeared when they first selected a department. If the user instead wants to view an item based on its name, they can begin typing that name into the <em>Search by Item Name</em> search bar. As the user types the item's name, the items with names that do not contain letters specified in the order shown in the search bar will disappear from view. If the user then wants to return to viewing all items in the hospital's inventory, they can simply delete the letters they have entered into the search bar to make any hidden items reappear.

### Add Item
If the user decides to add an item to the hospital's inventory, they may do so by clicking the <em>ADD NEW ITEM</em> button. Clicking that button carries the user to the <em>ADD ITEM</em> page. On this page, if this user decides to return to the <em>Inventory</em> page, they can simply click the <em>CANCEL</em> button to return to that page. If the user instead decides to are a file input field for uploading a picture of the item from the user's computer, selecting the department where the item will reside in the <em>Item Location</em> dropdown menu, entering the name of the vendor from whom the item is sourced in the <em>Vendor Name</em> text input field, entering the name of the item in the <em>Item Name</em> field, entering the vendor's SKU or item number for the item in the <em>Item SKU</em> field, entering the per unit price of the item in the <em>Unit Price</em> field, and entering the quantity of the items being added in the <em>Quantity</em> field. The only field that is optional on this page is the item picture field, and all other fields are required as designated with <em>* Required</em> messaging. After populating those fields, the user may click the <em>SAVE ITEM</em> button to finish saving the item to the hospital's inventory. The user will then be carried back to the <em>Inventory</em> page where they can confirm the item did in fact get added. 

### Edit Item
If the user is a Manager, Director, Vice President, or Materials Manager, they will see an <em>Edit</em> button appear to the right of each item in the inventory. If the user clicks that button an edit item form page will appear. On that page the user may enter any or all of the following new attributes for the item:  Image, Item Location, Vendor Name, Item Name, Item SKU, Unit Price, and Quantity. After those attributes are updated, the user may save the edits by clicking the <em>SAVE ITEM/em> button or return to the Inventory page without saving the edits by clicking the <em>Cancel</em> button.

### Delete Item
If the user is a Manager, Director, Vice President, or Materials Manager, they will see a <em>Delete</em> button appear at the right of each item in the inventory. If the user clicks that button the item will be soft deleted fom the inventory removing it from all users' view.

### Edit Profile
If the user wants to edit their first name, last name, or display name, the can click the <em>Edit Profile</m> link at the right of the navigation bar. Clicking that link will navigate the user to the <em>Edit Profile</em> form page. On this page, the user can change the first name, last name, or display name fields to reflect their preferences and then either click the <em>Save Edits</em> button to save the changes or the <em>Cancel</em> button to disregard any changes and return to the <em>Inventory</em> page.

### Dashboard
If the user wants to view metrics for the hospital's inventory, they can click the <em>Dashboard</em> link in the navigation bar. Clicking that link navigates the user to the <em>Dashboard</em> page where the following four charts appear:  Total # of Items by Department YTD (showing the number of items each department ordered within the past 12 months), Total Hospital Inventory by Month (showing how many total items the hospital ordered each month for the past 12 months), Total Expenditure by Department YTD (showing the amount of money each department spent on items within the past 12 months), and Total Hospital Expenditure by Month (showing how much total money the hospital spent on items each month for the past 12 months). When the user is ready to return to the <em>Inventory</em> page, they may do so by clicking the <em>Inventory</em> link in the navigation bar.

### Logging Out
Whenever the user is ready to exit Nucleus, they may do so by clicking the <em>Log Out</em> button at the right side of the navigation bar on either the <em>Inventory</em> page or the <em>Dashboard</em> page.

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
