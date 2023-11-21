# Project Name

Splash-Image-Sharing-Web-App

## Overview
The project is a web application allowing users to manage images, galleries, and user profiles. It facilitates image uploads, private and public image galleries, user authentication, and search functionalities. Built using Next.js, React, MongoDB for data storage, and Cloudinary for image hosting.

## Features
### Authentication
- User signup, login, and protected route access using NextAuth.js.
- Utilization of authentication tokens for managing user sessions.

### Image Management
- **Upload Images:** Users can upload images (JPEG, PNG) processed using Cloudinary and stored in specific user folders.
- **Image Galleries:** Public and private galleries allow users to organize uploaded images. Private galleries are accessible only to the owner.
- **Favorite Images:** Users can mark images as favorites and access a dedicated gallery for favorited images.
- **Update/Delete Images:** Users can udate & delete their own image.

### User Management
- **User Profiles:** Each user has a profile displaying their images, public information, user-specific galleries, and favorited images.
- **Following/Follower System:** Users can follow others, showcasing follower/following lists on profiles.

### Search Functionality
- **Image Search:** Users can search images by titles and tags using efficient indexing.

## Components and Functionality
### Next.js Pages
- **Upload Page:** Allows users to upload images to the application.
- **Image Gallery Pages:** Displays public/private galleries.
- **User Profile Pages:** Showcase user-specific details, including uploaded images and follower/following lists.
- **Search Pages:** Implements image and user search.

### Middleware
- **Authentication Middleware:** Restricts access to private routes, ensuring only authenticated users can access certain functionalities

### Utility Functions
- **Image Uploading:** Cloudinary-powered image upload and storage.
- **Image Downloading:** Functionality to download images.
- **Pagination & Cursor Handling:** Efficient handling for image/user retrieval.

### Database Models
- **Image Model:** Defines image-related schema, including user references and favorites.
- **User Model:** Defines user-related schema, including followers and followings.

### External Services
- **Cloudinary:** Image storage and management.
- **MongoDB:** User and image data storage.
- **NextAuth.js:** Manages user authentication and sessions.

## Workflow
### User Interaction Flow
- **User Authentication:** sers can sign up or log in to access the application's functionalities.
- **Image Management:** Upload, organize, and view images within private and public galleries.
- **User Profiles:** Access user-specific information, follower/following lists, and favorited images.
- **Search:** Search for images based on titles and tags.

### Application Flow
- **Authentication Flow:** NextAuth.js handles user authentication, granting access to protected routes.
- **Image Upload Flow:** Users can upload images, which are processed using Cloudinary and stored in user-specific folders.
- **Gallery Management Flow:** Galleries are managed based on user permissions, with private galleries accessible only to the owner.
- **Search Flow:** Search functionalities leverage indexed data for efficient retrieval of images based on user queries.

### Technologies Used

- **Next.js**: Framework for building React applications, providing server-side rendering and routing capabilities.
- **React**: JavaScript library for building user interfaces.
- **MongoDB**: NoSQL database used for storing application data like user profiles, images, and galleries.
- **Cloudinary**: Cloud-based image management platform used for storing and hosting images.
- **NextAuth.js**: Library for authentication in Next.js applications, handling user authentication, and managing sessions.
- **Mongoose**: MongoDB object modeling tool for Node.js, used for interacting with MongoDB databases using JavaScript objects.
- **Intersection Observer API**: JavaScript API utilized for tracking elements entering or exiting the viewport.
- **Node.js**: JavaScript runtime environment for executing server-side code.
- **Express.js**: Web application framework for Node.js used for handling server-side logic.
- **JWT (JSON Web Tokens)**: Tokens used for authentication and authorization purposes.
- **Search Indexing Services**: Implementation of search functionality with indexes for efficient retrieval of images based on titles and tags.

