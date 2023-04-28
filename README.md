# LogBook
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)


## Description <a name="description"></a>

It is a full-stack blog web application built with React on the frontend and Django/DRF on the backend.

## Features
- JWT authentication and authorization
- Responsive layout with reuseable component
- Category-wise blogs filtering on the home page
- Pagination of blogs
- Search functionality 
- A rich text editor for writing a blog

- User Can:
  - Login,SignUp and Logout
  - Update Profile Information
  - Delete profile
  - Create Post
  - Update and delete their created posts
  - Create Comment 
  - Delete own created Comment
  
- Admin can:
  - Create Post
  - Update any post
  - Delete any Post
  - Delete any comment


## API Documentation <a name="api-documentation"></a>
- <ins>Users</ins>:
  - `api/user/create/`  - POST
  - `api/user/logout/`  - POST
  - `api/user/profile/` - GET, PUT, DELETE
  - `api/user/{username}/` - GET
  - `api/token/` - POST
  - `api/token/refresh/` - GET
  - 

- <ins>Posts</ins>:
  - `api/post/`  - POST
  - `api/posts/` - GET
  - `api/post/{postid}` - GET, DELETE, PUT
  - `api/post/{slug}/`  - GET
  - `api/post/{author}/`- GET
  - `api/categories/`   - GET
  - `api/search/`       - GET

- <ins>Comments</ins>:
  - `api/comment` - POST
  - `api/post/{postid}/comments` - GET
  - `api/comment/{commentId}/` - PUT, DELETE

- <ins>Admin</ins>:
  - `api/admin/post` - POST
  - `api/admin/posts` - GET
  - `api/admin/post/{postid}/` - PUT, DELETE, GET




## ERD Visualized <a name="erd-vis"></a>
![Blog (1)](https://user-images.githubusercontent.com/50201920/235182915-308341b6-1e4d-43d0-b855-71ec73a48b9c.jpeg)


## Screenshots <a name="screenshots"></a>
![](doc//p1.png)
![](doc//p2.png)
