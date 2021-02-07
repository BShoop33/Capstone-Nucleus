set identity_insert [UserType] on
insert into [UserType] ([Id], [Position]) 
	VALUES	(1, 'Clerk'), 
			(2, 'Department Manager'), 
			(3, 'Department Director'), 
			(4, 'Vice President'), 
			(5, 'Materials Manager');
set identity_insert [UserType] off

set identity_insert [Department] on
insert into [Department] ([Id], [Name]) 
	VALUES	(1, 'Administrative Services'), 
			(2, 'Anesthetics'), 
			(3, 'Billing'), 
			(4, 'Cardiology'), 
			(5, 'Dermatology'), 
			(6, 'Ear, Nose, and Throat (ENT)'), 
			(7, 'Emergency Department (ED)'),
			(8, 'Environmental Services'),
			(9, 'Gastroenterology'), 
			(10, 'Hematology'),
			(11, 'Human Resources (HR)'),
			(12, 'Imaging and Radiology'),
			(13, 'Information Technology (IT)'),
			(14, 'Intensive Care Unit (ICU)'),
			(15, 'Materials Management'),
			(16, 'Neonatal'),
			(17, 'Neurology'),
			(18, 'Nutrition and Dietics'),
			(19, 'Oncology'),
			(20, 'Orthopedics'),
			(21, 'Pharmacy'),
			(22, 'Physiotherapy'),
			(23, 'Records and Billing'),
			(24, 'Surgery');
set identity_insert [Department] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirebaseUserId, Department, FirstName, LastName, DisplayName, Email, DateRegistered, DateDeactivated, DateLastActivated, UserTypeId, IsActive) values (1, 'sA973R6eHEVyPRdSG3viryFNsyk1', 'Environmental Services', 'Dwight', 'Shrute', 'DShrute', 'clerk@gmail.com', '7/2/2020', '01/01/1901', '01/01/1901', 1, 1);
insert into UserProfile (Id, FirebaseUserId, Department, FirstName, LastName, DisplayName, Email, DateRegistered, DateDeactivated, DateLastActivated, UserTypeId, IsActive) values (2, 'ewzN74kLG1bF1p4tXqFanFam4Qb2', 'Administrative Services', 'Ryan', 'Howard', 'RHoward', 'manager@gmail.com', '2/4/2020', '01/01/1901', '01/01/1901', 2, 1);
insert into UserProfile (Id, FirebaseUserId, Department, FirstName, LastName, DisplayName, Email, DateRegistered, DateDeactivated, DateLastActivated, UserTypeId, IsActive) values (3, 'b7HwoI7LffhQtYlvjNPIOEPeJTk2', 'Neonatal', 'Darryl', 'Philbin', 'DPhilbin', 'director@gmail.com', '2/11/2019', '01/01/1901', '01/01/1901', 3, 1);
insert into UserProfile (Id, FirebaseUserId, Department, FirstName, LastName, DisplayName, Email, DateRegistered, DateDeactivated, DateLastActivated, UserTypeId, IsActive) values (4, 'To61Sn28OATLEDWb9LtEC9qaPfQ2', 'Hematology', 'Kelly', 'Kapoor', 'KKapoor', 'vicepresident@gmail.com', '1/14/2019', '01/01/1901', '01/01/1901', 4, 0);
insert into UserProfile (Id, FirebaseUserId, Department, FirstName, LastName, DisplayName, Email, DateRegistered, DateDeactivated, DateLastActivated, UserTypeId, IsActive) values (5, 'YPIAsJKnNXOxseFUrl3oqoZnjYM2', 'Materials Management', 'Creed', 'Bratton', 'CBratton', 'materialsmanager@gmail.com', '3/24/1999', '01/01/1901', '01/01/1901', 5, 0);
set identity_insert [UserProfile] off

set identity_insert [Item] on
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (1, 1, null, 9, 'CDW', 'Scalpel', '28034', 183.74, 551.22, 3, '08/06/2019', 1);				
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (2, 1, null, 8, 'Grainger', 'Werth Sanitary Supply All Purpose Cleaner pkg. 12', '35YL42', 113.98, 341.94, 3, '09/12/2019', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (3, 1, null, 4, 'Henry Schein', 'Gowns', '82840', 16.34, 163.40, 10, '10/19/2019', 1);				
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (4, 1, null, 7, 'Staples', 'Paper', 'A4829', 63.23, 6323.00, 100, '07/07/2020', 1);  
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (5, 1, null, 1, '1', '1', '1', 1, 1, 1, '02/20/2020', 1); 
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (6, 1, null, 2, '2', '2', '2', 2, 4, 2, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (7, 1, null, 3, '3', '3', '3', 3, 9, 3, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (8, 1, null, 4, '4', '4', '4', 4, 16, 4, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (9, 1, null, 5, '5', '5', '5', 5, 25, 5, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (10, 1, null, 6, '6', '6', '6', 6, 36, 6, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (11, 1, null, 7, '7', '7', '7', 7, 49, 7, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (12, 1, null, 8, '8', '8', '8', 8, 64, 8, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (13, 1, null, 9, '9', '9', '9', 9, 81, 9, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (14, 1, null, 10, '10', '10', '10', 10, 100, 10, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (15, 1, null, 11, '11', '11', '11', 11, 121, 11, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (16, 1, null, 12, '12', '12', '12', 12, 144, 12, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (17, 1, null, 13, '13', '13', '13', 13, 169, 13, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (18, 1, null, 14, '14', '14', '14', 14, 196, 14, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (19, 1, null, 15, '15', '15', '15', 15, 225, 15, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (20, 1, null, 16, '16', '16', '16', 16, 256, 16, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (21, 1, null, 17, '17', '17', '17', 17, 289, 17, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (22, 1, null, 18, '18', '18', '18', 18, 324, 18, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (23, 1, null, 19, '19', '19', '19', 19, 361, 19, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (24, 1, null, 20, '20', '20', '20', 20, 400, 20, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (25, 1, null, 21, '21', '21', '21', 21, 441, 21, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (26, 1, null, 22, '22', '22', '22', 22, 484, 22, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (27, 1, null, 23, '23', '23', '23', 23, 529, 23, '02/20/2020', 1);
insert into Item (Id, UserProfileId, ItemPicture, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, TotalPrice, Quantity, DateReceived, IsActive) values (28, 1, null, 24, '24', '24', '24', 24, 576, 24, '02/20/2020', 1);
set identity_insert [Item] off