# Restful CRUD API for Wine Glass Guide

## Demo: https://wine-glass-guide-rest-api.fly.dev

## Steps to Setup

**1. Clone the application**

```bash
git clone git@github.com:wine-glass-guide/rest-api.git && cd rest-api
```

**2. Configure your private .env file, following the .env-sample sample**

**3. Initialize the database**

```bash
npm run db:init
```

**4. Run the app**

```bash
npm run dev # dev
```

```bash
npm run start # prod
```

## Explore Rest APIs

The app defines the following CRUD APIs.

### Auth

| Method | Url               | Description | 
|--------|-------------------|-------------|
| POST   | /api/auth/signup  | Sign up     |
| POST   | /api/auth/login   | Log in      |
| POST   | /api/auth/recover | Recover     |
| PUT    | /api/auth/reset   | Reset       |

### Grapes

| Method | Url         | Description    | 
|--------|-------------|----------------|
| GET    | /api/grapes | Get all grapes |

### Images

| Method | Url                               | Description                        |
|--------|-----------------------------------|------------------------------------|
| GET    | /api/images/:image?height=:height | Get get image with a specific size |

### Mails

| Method | Url        | Description |
|--------|------------|-------------|
| POST   | /api/mails | Send mail   |

### Messages

| Method | Url           | Description    |
|--------|---------------|----------------|
| POST   | /api/messages | Send a message |

### Users

| Method | Url                                 | Description                             |
|--------|-------------------------------------|-----------------------------------------|
| GET    | /api/users/me                       | Get current user                        |
| GET    | /api/users/me/statistics/:statistic | Get a statistic for the current user    |
| PUT    | /api/users/me                       | Update the current user                 |
| PUT    | /api/users/me/statistics/:statistic | Update a statistic for the current user |
| PUT    | /api/users/me/settings/:setting     | Update a setting for the current user   |
| DELETE | /api/users/me                       | Delete the current user                 |
| DELETE | /api/users/me/statistics/:statistic | Delete a statistic for the current user |

### Wine glasses

| Method | Url                      | Description                           |
|--------|--------------------------|---------------------------------------|
| GET    | /api/wine-glasses        | Get all wine glasses                  |
| GET    | /api/wine-glasses/:grape | Get a wine glass for a specific grape |
