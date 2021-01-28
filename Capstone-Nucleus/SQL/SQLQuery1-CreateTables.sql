USE [master]

IF db_id('Capstone_Nucleus') IS NULL
  CREATE DATABASE [Capstone_Nucleus]
GO

USE [Capstone_Nucleus]
GO

DROP TABLE IF EXISTS [Item];
DROP TABLE IF EXISTS [RequisitionStatusLevel];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY,
  [Position] nvarchar(255) NOT NULL,
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [Department] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [DateRegistered] datetime NOT NULL,
  [DateDeactivated] datetime,
  [DateLastActivated] datetime,
  [UserTypeId] int NOT NULL,
  [IsActive] bit,

CONSTRAINT DisplayName UNIQUE (DisplayName),
CONSTRAINT [FK_UserProfile_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
)
GO

CREATE TABLE [Item] (
  [Id] int PRIMARY KEY IDENTITY,
  [UserId] int NOT NULL,
  [ItemLocation] nvarchar(255) NOT NULL,
  [VendorName] nvarchar(255) NOT NULL,
  [ItemName] nvarchar(255) NOT NULL,
  [ItemSKU]  int,
  [UnitPrice] float,
  [Quantity] int NOT NULL,
  [DateReceived] datetime NOT NULL,
  [IsActive] bit

CONSTRAINT [FK_Item_UserProfile] FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id]),
)
GO