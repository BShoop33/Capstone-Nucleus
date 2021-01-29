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
			(8, 'Gastroenterology'), 
			(9, 'Gynecology'), 
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
			(24, 'Surgery'),
			(25, 'Urology');
set identity_insert [Department] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirebaseUserId, Department, FirstName, LastName, DisplayName, Email, DateRegistered, DateDeactivated, DateLastActivated, UserTypeId, IsActive) values (1, '3572545826976967', 'Baby', 'Donall', 'Wyness', 'Donall Wyness', 'dwyness0@gravatar.com', '7/2/2018', '4/8/2018', '3/23/2019', 1, 1);
insert into UserProfile (Id, FirebaseUserId, Department, FirstName, LastName, DisplayName, Email, DateRegistered, DateDeactivated, DateLastActivated, UserTypeId, IsActive) values (2, '3529238972400487', 'Home', 'Lena', 'Watson', 'Lena Watson', 'lwatson1@earthlink.net', '2/4/2020', '12/9/2019', '10/29/2019', 1, 1);
insert into UserProfile (Id, FirebaseUserId, Department, FirstName, LastName, DisplayName, Email, DateRegistered, DateDeactivated, DateLastActivated, UserTypeId, IsActive) values (3, '3587091616869222', 'Jewelery', 'Dino', 'Dennis', 'Dino Dennis', 'ddennis2@jigsy.com', '2/11/2020', null, '4/11/2020', 4, 1);
insert into UserProfile (Id, FirebaseUserId, Department, FirstName, LastName, DisplayName, Email, DateRegistered, DateDeactivated, DateLastActivated, UserTypeId, IsActive) values (4, '3565264619532826', 'Movies', 'Tabitha', 'Skews', 'Tabitha Skews', 'tskews3@blog.com', '1/14/2019', null, '6/16/2018', 5, 0);
insert into UserProfile (Id, FirebaseUserId, Department, FirstName, LastName, DisplayName, Email, DateRegistered, DateDeactivated, DateLastActivated, UserTypeId, IsActive) values (5, '3587828696241453', 'Movies', 'Cassandra', 'Ruppelin', 'Cassandra Ruppelin', 'cruppelin4@feedburner.com', '3/24/2020', '10/7/2019', '7/31/2020', 1, 0);
set identity_insert [UserProfile] off

set identity_insert [Item] on
insert into Item (Id, UserId, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, Quantity, DateReceived, IsActive) values (1, 1, 1, 'Tambee', 'Wine - Tribal Sauvignon', '28034', 18719.18, 832, '08/06/2019', 1);
insert into Item (Id, UserId, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, Quantity, DateReceived, IsActive) values (2, 2, 3, 'Thoughtworks', 'Beef - Bones, Marrow', '28035', 10202.71, 616, '12/12/2020', 0);
insert into Item (Id, UserId, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, Quantity, DateReceived, IsActive) values (3, 3, 5, 'Feedfish', 'Onions - Green', '28036', 4724.56, 993, '08/28/2020', 0);
insert into Item (Id, UserId, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, Quantity, DateReceived, IsActive) values (4, 4, 7, 'Abatz', 'Anchovy In Oil', '28037', 9148.15, 547, '03/04/2020', 1);
insert into Item (Id, UserId, DepartmentId, VendorName, ItemName, ItemSKU, UnitPrice, Quantity, DateReceived, IsActive) values (5, 5, 9, 'Ailane', 'Rabbit - Whole', '28038', 3958.53, 523, '09/10/2020', 0);
set identity_insert [Item] off