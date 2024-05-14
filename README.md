# REST Enhanced Authentication API

This is a bare-bones example of a Enhanced Authentication providing a REST
API to a authenticate user.


## Install

    npm install

## Run the app

    node index.js

# >**Please use Auth Token in API by considering curl as example**<

# REST API

The REST API to the example app is described below.

## Get list of Users

### Request

`GET /all-users`

    curl --location 'https://vooshauthservice.onrender.com/api/user/all-users' \--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQyNDFhN2ZmNTJjOTgzYzNlNzkyMTAiLCJpc19BZG1pbiI6ZmFsc2UsImlzX1B1YmxpYyI6dHJ1ZSwiaWF0IjoxNzE1NjMwOTE4LCJleHAiOjE3MTU3MTczMTh9.uI4fEvhmNQS048-7GkWucbzDDJbWTuVU3ucXqVSOLVw'

### Response

    Status: 200 OK
    Content-Type: multipart/form-data
    Content-Length: 2

    []

## Create a new User

### Request

`POST /`

    curl --location 'https://vooshauthservice.onrender.com/api/user/' \
    --form 'name="Vishnu"' \
    --form 'bio="This is my bio"' \
    --form 'phone="9111490900"' \
    --form 'email="vishnutrd@gmail.com"' \
    --form 'password="Vishnu123"' \
    --form 'is_Admin="false"' \
    --form 'is_Public="false"' \
    --form 'photo=@"/Users/vishnu/Desktop/SS/Screenshot 2024-04-14 at 1.32.10 PM.png"'

### Response

    Status: 201 Created
    Connection: close
    Content-Type: multipart/form-data
    Location: /thing/1
    Content-Length: 36

    {"message": "Registration successful! Please login to use services."}

## Login API

### Request

`GET /login`

    curl --location 'https://vooshauthservice.onrender.com/api/user/login' \
    --form 'email="vishnutrd11@gmail.com"' \
    --form 'password="vishnutrd11@gmail.com"'

### Response

    Status: 200 OK
    Connection: close
    Content-Type: multipart/form-data
    Content-Length: 36

    {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQzNjA2ODE2NTE1Yjc5ZjVkMzliNTkiLCJpc19BZG1pbiI6ZmFsc2UsImlzX1B1YmxpYyI6ZmFsc2UsImlhdCI6MTcxNTY5MTczOCwiZXhwIjoxNzE1Nzc4MTM4fQ.xdY2T3Osjv6Kw__A5R2ebJFVQFZ3mXXVwIy60T0eGUk"
    }

## Log out API

### Request

`GET /logout`

    curl --location 'https://vooshauthservice.onrender.com/api/user/logout'

### Response

    Status: 200 OK
    Connection: close
    Content-Type:  multipart/form-data
    Content-Length: 35

    {"message": "Log-out successful"}

##  Google Login SSO

>Hint: Please use this link to generate the code for authentication in google.
```
https://accounts.google.com/o/oauth2/v2/auth?
 scope=https://www.googleapis.com/auth/userinfo.email&
 access_type=offline&
 include_granted_scopes=true&
 response_type=code&
 state=state_parameter_passthrough_value&
 redirect_uri=https://vooshauthservice.onrender.com/api/user/code&
 client_id=309424760743-8e6qbe9ipr92h2ers3k1afmmhu1ud6b7.apps.googleusercontent.com
```

You will get response like 

```
{
"message": "Code received successfully",
"code": "4/0AdLIrYd2zovTZ8ZpJhAey05fWY_Y5NxwsDcyx8sAqCRTyj2YeIEM3XNUR7womyNSRjh5zw"
}
```
use this code in the **google SSO**

### Request

`POST /login/google`

    curl --location 'http://localhost:3030/api/user/login/google' \
    --form 'code="4%2F0AdLIrYcvcP805yuElWTd-hTIdHL39wJoFHKuAPZGll5XHwB811n3CF1f940uioMOlOjkgA"'

### Response

  If new user
  
    Status: 200 OK
    Connection: close
    Content-Type:  multipart/form-data
    Content-Length: 35

    {"message": "Registration successful! Please login to use services."}
    
  If old user
  
    Status: 200 OK
    Connection: close
    Content-Type:  multipart/form-data
    Content-Length: 35
  
    {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQzNjA2ODE2NTE1Yjc5ZjVkMzliNTkiLCJpc19BZG1pbiI6ZmFsc2UsImlzX1B1YmxpYyI6ZmFsc2UsImlhdCI6MTcxNTY5MTczOCwiZXhwIjoxNzE1Nzc4MTM4fQ.xdY2T3Osjv6Kw__A5R2ebJFVQFZ3mXXVwIy60T0eGUk"
    } 

## Get all user API for {admin, normal} user

### Request

`GET /all-users`

    curl --location 'https://vooshauthservice.onrender.com/api/user/all-users' \
    --header 'Content-Type: multipart/form-data' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQzNjA2ODE2NTE1Yjc5ZjVkMzliNTkiLCJpc19BZG1pbiI6ZmFsc2UsImlzX1B1YmxpYyI6ZmFsc2UsImlhdCI6MTcxNTY5MTczOCwiZXhwIjoxNzE1Nzc4MTM4fQ.xdY2T3Osjv6Kw__A5R2ebJFVQFZ3mXXVwIy60T0eGUk'

### Response

    Status: 200 OK
    Connection: close
    Content-Type: multipart/form-data
    Content-Length: 74

    []

## Get profile API for both {admin, normal} user

### Request

`GET /profile/:id`

    curl --location 'http://localhost:3030/api/user/profile/664241a7ff52c983c3e79210' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQyNDFhN2ZmNTJjOTgzYzNlNzkyMTAiLCJpc19BZG1pbiI6ZmFsc2UsImlzX1B1YmxpYyI6dHJ1ZSwiaWF0IjoxNzE1NjMwOTE4LCJleHAiOjE3MTU3MTczMTh9.uI4fEvhmNQS048-7GkWucbzDDJbWTuVU3ucXqVSOLVw'

### Response

    Status: 200 OK
    Connection: close
    Content-Type: multipart/form-data
    Content-Length: 40

    {
    "_id": "6643606816515b79f5d39b59",
    "name": "Vishnu",
    "bio": "This is my bio",
    "phone": "9111490900",
    "email": "vishnutrd1@gmail.com",
    "password": "$2b$10$lon/IthoagmNXHEy2q5dBO8fL3fJ2J4Ij07Ezb2iFqoKDS9CuHKBy",
    "photo": "https://vooshauthservice.onrender.com/profile/photo_1715691622658.png",
    "is_Admin": false,
    "is_Public": false,
    "provider": "Normal",
    "createdAt": "2024-05-14T13:00:24.488Z",
    "updatedAt": "2024-05-14T13:00:24.488Z",
    "__v": 0
    }

## Update user data {name, bio, phone,email, photo, password, is_Admin, is_Public}

### Request

`PATCH /:id`

    curl --location --request PATCH 'http://localhost:3030/api/user/6642fb418f9c25b842020cd0' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQyZmI0MThmOWMyNWI4NDIwMjBjZDAiLCJpc19BZG1pbiI6ZmFsc2UsImlzX1B1YmxpYyI6ZmFsc2UsImlhdCI6MTcxNTY2NjkzNCwiZXhwIjoxNzE1NzUzMzM0fQ.xnphUH3pHAP35oPfX4K5eS2gGBkZZdR72dLrw5BJ5Nk' \
    --form 'name="Vishnu Updated"' \
    --form 'bio="This is my updated bio"'

### Response

    Status: 200 OK
    Connection: close
    Content-Type: multipart/form-data
    Content-Length: 40

    {"message": "User updated successfully"}

## Update user data by upload {photo}

### Request

`PATCH /upload/photo/:id`

    curl --location --request PATCH 'https://vooshauthservice.onrender.com/api/user/upload/photo/6643606816515b79f5d39b59' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQzNjA2ODE2NTE1Yjc5ZjVkMzliNTkiLCJpc19BZG1pbiI6ZmFsc2UsImlzX1B1YmxpYyI6ZmFsc2UsImlhdCI6MTcxNTY5MTczOCwiZXhwIjoxNzE1Nzc4MTM4fQ.xdY2T3Osjv6Kw__A5R2ebJFVQFZ3mXXVwIy60T0eGUk' \
    --form 'photo=@"/Users/vishnu/Desktop/SS/Screenshot 2024-02-13 at 9.29.20 AM.png"'

### Response

    Status: 200 OK
    Connection: close
    Content-Type:  multipart/form-data
    Content-Length: 41

    {"message": "User photo updated successfully"}

## Update user data by url {photo}
### Request

`PATCH /upload/photo/url/:id`

    curl --location --request PATCH 'https://vooshauthservice.onrender.com/api/user/upload/photo/url/6643606816515b79f5d39b59' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQzNjA2ODE2NTE1Yjc5ZjVkMzliNTkiLCJpc19BZG1pbiI6ZmFsc2UsImlzX1B1YmxpYyI6ZmFsc2UsImlhdCI6MTcxNTY5MTczOCwiZXhwIjoxNzE1Nzc4MTM4fQ.xdY2T3Osjv6Kw__A5R2ebJFVQFZ3mXXVwIy60T0eGUk' \
    --form 'photo="https://search.app.goo.gl/HJq3EtX"'

### Response

    Status: 200 OK
    Connection: close
    Content-Type:  multipart/form-data
    Content-Length: 41

    {"message": "User photo url updated successfully"}
