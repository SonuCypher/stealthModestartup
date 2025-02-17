
## Deployment

 install dependencies

```bash
  npm install -y
```
 setup your env variables

```bash
JWTSECRET="your jwt secret",
MONGODB_CONNECTION="your database URL"
```
To deploy this project run

```bash
  npm run dev
```
server will be running locally on port 3000

```bash
  localhost:3000/api
```


## API Reference

### If there are no other existing users you will be assigned as admin

#### sign Up

```http
  POST /api/auth/signup
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. your email |
| `name` | `string` | **Required**. Your name |
| `password` | `string` | **Required**. Your password |

#### login

```http
  GET /api/auth/login
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. your email |
| `password`      | `string` | **Required**. your password |

## Protected Routes(requires jwt token)
### only admins can delete user and assign admin privileges

#### get all users

```http
  GET /api/users
```


#### create user

```http
  POST /api/users
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. user email |
| `name` | `string` | **Required**. user name |
| `role` | `string` | **Required**. user role |

#### get user by id

```http
  GET /api/users/:id
```

| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. user id |


#### update user

```http
  PUT /api/users/:id
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. user email |
| `name` | `string` | **Required**. user name |
| `role` | `string` | **Required**. user role |


| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. user id |


#### delete user by id

```http
  DELETE /api/users/:id
```

| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. user id |


