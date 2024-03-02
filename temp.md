[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14029381&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

# Rent Room App

> Tuliskan API Docs kamu di sini

# API Documentation

## Models :

**_User :_**

- email : string, unique (_required_)
- password : string (_required_)
- role: string (_default:_ **Staff**)
- phoneNumber: string
- address: string

**_Type :_**

- name : string (_required_)

**_Lodging :_**

- name : string (_required_)
- facility : string (_required_)
- roomCapacity : integer (_required_)
- imgUrl : string (_required, isUrl_)
- location : string (_required_)
- price : integer (_required, min price_)
- createdAt : date
- updatedAt : date
- typeId : integer (_required_)
- authorId : integer (_required_)

## Relationship :

### **Many-to-Many / Double-One-To-Many**

## Endpoints :

### List of available endpoints:

​

### Public

- `GET /pub/lodgings`
- `GET /pub/lodgings/:id`
- `GET /pub/lodgings/types`

### User (Admin / Staff)

- `POST /login`
- `POST /add-user`
- `POST /lodgings`
- `GET /lodgings`
- `GET /lodgings/:id`
- `PUT /lodgings/:id`
- `DELETE /lodgings/:id`
- `PATCH /lodgings/:id`
- `POST /types`
- `GET /types`
- `PUT /types/:id`
- `DELETE /types/:id`

&nbsp;

---

# PUBLIC SESSION

## 1. GET /pub/lodgings

### Description: Get all lodgings but in public session

_Response (200 - OK)_

```json
[
  {
    "page": 1,
    "data": [
      {
        "id": 1,
        "name": "Oyo",
        "facility": "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
        "roomCapacity": 6,
        "imgUrl": "https://tse2.mm.bing.net/th?id=OIP.xgXRB7T0cEhUFBYtPOu4CgHaFj&pid=Api&P=0&h=180",
        "location": "Cilandak",
        "price": 300000,
        "typeId": 1,
        "authorId": 1,
        "createdAt": "2024-03-01T17:13:32.279Z",
        "updatedAt": "2024-03-01T17:13:32.279Z",
        "Type": {
          "id": 1,
          "name": "Regular",
          "createdAt": "2024-03-01T17:13:32.272Z",
          "updatedAt": "2024-03-01T17:13:32.272Z"
        }
      }
      ...
    ],
    "totalData": 20,
    "totalPage": 2,
    "dataPerPage": 10
  }
]
```

## 2. GET /pub/lodgings/:id

### Description: Get detail lodgings but in public session

Request :

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "name": "Oyo",
  "facility": "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
  "roomCapacity": 6,
  "imgUrl": "https://tse2.mm.bing.net/th?id=OIP.xgXRB7T0cEhUFBYtPOu4CgHaFj&pid=Api&P=0&h=180",
  "location": "Cilandak",
  "price": 300000,
  "typeId": 1,
  "authorId": 1,
  "createdAt": "2024-03-01T17:13:32.279Z",
  "updatedAt": "2024-03-01T17:13:32.279Z"
}
```

## 3. GET /pub/lodgings/types

### Description: Get types of lodgings but in public session

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Regular",
    "createdAt": "2024-03-01T17:13:32.272Z",
    "updatedAt": "2024-03-01T17:13:32.272Z"
  },
  {
    "id": 2,
    "name": "Premium",
    "createdAt": "2024-03-01T17:13:32.272Z",
    "updatedAt": "2024-03-01T17:13:32.272Z"
  },
  {
    "id": 3,
    "name": "Luxury",
    "createdAt": "2024-03-01T17:13:32.272Z",
    "updatedAt": "2024-03-01T17:13:32.272Z"
  }
]
```

---

# USER (Admin / Staff) SESSION

## 1. POST /add-user
### Description: register or add new user (Only Admin Have Access)
Request:

- headers:

```json
{
  "Authorization": "Admin only",
  "Authentication": "Bearer <access_token>"
}
```

- body:

```json
{
  "email": "test@mail.com",
  "password": "test",
  "role": "Staff",
  "phoneNumber": "08998091",
  "address": "Indonesia"
}
```

_Response (201 - Created)_

```json
{
  "message": "User created",
  "user": {
    "id": 1,
    "email": "test@mail.com",
    "password": "$2a$10$0skyzRJrZfieC9fo1vlbB./XLq1tFyR97cBTFW/c2yujgEUjWH//y",
    "role": "Staff",
    "phoneNumber": "08998091",
    "address": "Indonesia",
    "updatedAt": "2024-03-02T09:27:04.939Z",
    "createdAt": "2024-03-02T09:27:04.939Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email can't be empty"
}
OR
{
  "message": "email can't be null"
}
OR
{
  "message": "input must be email format"
}
OR
{
  "message": "email already exist"
}
OR
{
  "message": "password can't be empty"
}
OR
{
  "message": "phoneNumber can't be empty"
}
OR
{
  "message": "phoneNumber can't be null"
}
OR
{
  "message": "address can't be empty"
}
OR
{
  "message": "address can't be null"
}
```

&nbsp;

## 2. POST /login
### Description: login as Admin /  Staff
Request:

- body:

```json
{
  "email": "test@mail.com",
  "password": "test"
}
```

_Response (200 - OK)_
​

```json
{
  "message": "success login",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzA5MzcyMDMwfQ.AGiJdiw7hUj5cfW6ge1NSBO-0BiVqRD5-pL8TASD4GE"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email/Password"
}
```

&nbsp;

## 3. POST /lodgings
### Description: create new lodgings

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "RedDorz",
  "facility": "Swimming Pool, Gym, Restaurant, Cafe, Rooftop,",
  "roomCapacity": 2,
  "imgUrl": "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
  "location": "Pondok Labu",
  "price": 250000,
  "typeId": 1
}
```

_Response (201 - Created)_
​

```json
{
  "id": 2,
  "name": "RedDorz",
  "facility": "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
  "roomCapacity": 2,
  "imgUrl": "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
  "location": "Pondok Labu",
  "price": 250000,
  "typeId": 1,
  "authorId": 1,
  "updatedAt": "2024-03-02T09:39:44.545Z",
  "createdAt": "2024-03-02T09:39:44.545Z"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "name can't be empty"
}
OR
{
    "message": "name can't be null"
}
OR
{
    "message": "facility can't be empty"
}
OR
{
    "message": "facility can't be null"
}
OR
{
    "message": "roomCapacity can't be empty"
}
OR
{
    "message": "roomCapacity can't be null"
}
OR
{
    "message": "imgUrl can't be empty"
}
OR
{
    "message": "imgUrl can't be null"
}
OR
{
    "message": "must be url format"
}
OR
{
    "message": "location can't be empty"
}
OR
{
    "message": "location can't be null"
}
OR
{
    "message": "price can't be empty"
}
OR
{
    "message": "price can't be null"
}
OR
{
    "message": "min price is 10_000"
}
OR
{
    "message": "typeId can't be empty"
}
OR
{
    "message": "typeId can't be null"
}

```

&nbsp;

## 4. GET /lodgings

### Description: Get all lodgings

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
   {
        "id": 1,
        "name": "Oyo",
        "facility": "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
        "roomCapacity": 6,
        "imgUrl": "https://tse2.mm.bing.net/th?id=OIP.xgXRB7T0cEhUFBYtPOu4CgHaFj&pid=Api&P=0&h=180",
        "location": "Cilandak",
        "price": 300000,
        "typeId": 1,
        "authorId": 1,
        "createdAt": "2024-03-01T17:13:32.279Z",
        "updatedAt": "2024-03-01T17:13:32.279Z",
        "User": {
            "email": "user1@gmail.com",
            "role": "Admin",
            "phoneNumber": "081210043016",
            "address": "Jl. Andara"
        }
    },
    {
        "id": 2,
        "name": "RedDorz",
        "facility": "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
        "roomCapacity": 2,
        "imgUrl": "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
        "location": "Pondok Labu",
        "price": 250000,
        "typeId": 1,
        "authorId": 1,
        "createdAt": "2024-03-02T09:39:44.545Z",
        "updatedAt": "2024-03-02T09:39:44.545Z",
        "User": {
            "email": "user1@gmail.com",
            "role": "Admin",
            "phoneNumber": "081210043016",
            "address": "Jl. Andara"
        }
    }
    ...
]
```

&nbsp;

## 5. GET /lodgings/:id

### Description: Get specific lodgings base on id

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "RedDorz",
    "facility": "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
    "roomCapacity": 2,
    "imgUrl": "https://tse1.mm.bing.net/th?id=OIP.CRrzC41ZBDmjBCr3IWsvjwHaE8&pid=Api&P=0&h=180",
    "location": "Pondok Labu",
    "price": 250000,
    "typeId": 1,
    "authorId": 1,
    "createdAt": "2024-03-02T09:39:44.545Z",
    "updatedAt": "2024-03-02T09:39:44.545Z",
    "User": {
        "email": "user1@gmail.com",
        "role": "Admin",
        "phoneNumber": "081210043016",
        "address": "Jl. Andara"
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```


&nbsp;


## 6. PUT /lodgings/:id

### Description: Update specific lodgings based on id (Admin can update all lodgings while staff can only update their own)

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>",
  "Authorization": "Admin and Staff"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "Mares (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Lodging with id: 1 has been updated",
  "lodging": {
    "id": 1,
    "name": "Mares",
    "facility": "Swimming Pool, Gym, Restaurant, Cafe, Rooftop, Playground",
    "roomCapacity": 6,
    "imgUrl": "https://tse2.mm.bing.net/th?id=OIP.xgXRB7T0cEhUFBYtPOu4CgHaFj&pid=Api&P=0&h=180",
    "location": "Cilandak",
    "price": 300000,
    "typeId": 1,
    "authorId": 1,
    "createdAt": "2024-03-01T17:13:32.279Z",
    "updatedAt": "2024-03-02T09:54:10.580Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name can't be empty"
}
```
&nbsp;


## 7. DELETE /lodgings/:id

### Description: Delete specific lodgings based on id (Admin can delete all lodgings while staff can only delete their own)

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>",
  "Authorization": "Admin and Staff"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Lodging with id: 1 success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## 8. PATCH /lodgings/:id

### Description: Patch specific lodgings based on id (Admin can patch all types while staff can only patch their own)

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>",
  "Authorization": "Admin and Staff"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body **file**:

```
  "key" : "image"

  -- test.jpg
```

_Response (200 - OK)_

```json
{
  "message": "image Oyo success to update"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "imgUrl/imgFile can't empty"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

## 9. POST /types

### Description: Create new types

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "Eksklusif"
}
```

_Response (201 - Created)_
​

```json
{
  "id": 4,
  "name": "Eksklusif",
  "updatedAt": "2024-03-02T10:02:04.438Z",
  "createdAt": "2024-03-02T10:02:04.438Z"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "type name can't be empty"
}
OR
{
    "message": "type name can't be null"
}
```

&nbsp;

## 10. GET /types

### Description: Get all types

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Regular",
    "createdAt": "2024-03-01T17:13:32.272Z",
    "updatedAt": "2024-03-01T17:13:32.272Z"
  },
  {
    "id": 2,
    "name": "Premium",
    "createdAt": "2024-03-01T17:13:32.272Z",
    "updatedAt": "2024-03-01T17:13:32.272Z"
  },
  {
    "id": 3,
    "name": "Luxury",
    "createdAt": "2024-03-01T17:13:32.272Z",
    "updatedAt": "2024-03-01T17:13:32.272Z"
  },
  {
    "id": 4,
    "name": "Eksklusif",
    "createdAt": "2024-03-02T10:02:04.438Z",
    "updatedAt": "2024-03-02T10:02:04.438Z"
  }
]
```

&nbsp;

## 11. PUT /products/:id

### Description: Update specific types based on id (Admin can update all lodgings while staff can only update their own)

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>",
  "Authorization": "Admin and Staff"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "name": "Super Eksklusif"
}
```

_Response (200 - OK)_

```json
{
  "message": "Type with id: 4 has been updated",
  "type": {
    "id": 4,
    "name": "Super Eksklusif",
    "createdAt": "2024-03-02T10:02:04.438Z",
    "updatedAt": "2024-03-02T10:10:37.244Z"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "type name can't be empty"
}
OR
{
  "message": "type name can't be null"
}
```

&nbsp;

## 12. DELETE /types/:id

### Description: Delete specific types based on id (Admin can delete all types while staff can only delete their own)

Request:

- headers:

```json
{
  "Authentication": "Bearer <access_token>",
  "Authorization": "Admin and Staff"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

_Response (200 - OK)_

```json
{
  "message": "Type with id: 4 success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
OR
{
  "message": "Invalid Email/Password"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
