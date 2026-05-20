# superbase-pg

Node.js API workspace for Supabase Postgres with Prisma migrations and CRUD endpoints.

## Setup

1. Copy `.env.example` to `.env`.
2. Add your Supabase direct Postgres connection string to `DATABASE_URL`.

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.____.supabase.co:5432/postgres?sslmode=require"
PORT=3000
```
3. Install dependencies:

```bash
npm install
```

4. Generate the Prisma client:

```bash
npm run prisma:generate
```

5. Start the API:

```bash
npm run dev
```

## Request Body

User add/update endpoints expect:

```json
{
  "username": "demo_user",
  "fullName": "Demo User"
}
```

`name` is also accepted instead of `fullName`.

Hobbies add/update endpoints expect:

```json
{
  "username": "demo_user",
  "hobbies": ["reading", "coding"]
}
```

## Endpoints

- `POST /user` adds a user from the request body.
- `GET /users` gets all users.
- `GET /user/:username` gets a user by username.
- `PUT /user` updates a user from the request body.
- `DELETE /user` deletes a user using `username` from the request body.
- `DELETE /user/:username` deletes a user by username.
- `POST /hobbies` or `POST /habits` creates hobbies for a new username, or appends to the existing hobbies array.
- `GET /hobbies` or `GET /habits` gets all hobbies rows.
- `GET /hobbies/:username` or `GET /habits/:username` gets hobbies by username.
- `PUT /hobbies` or `PUT /habits` updates hobbies from the request body.
- `DELETE /hobbies` or `DELETE /habits` deletes hobbies using `username` from the request body.
- `DELETE /hobbies/:username` or `DELETE /habits/:username` deletes hobbies by username.

## Scripts

- `npm run dev` starts the API with nodemon.
- `npm start` starts the API with Node.
- `npm run prisma:generate` generates the Prisma client.
- `npm run prisma:migrate` runs Prisma development migrations.
- `npm run prisma:studio` opens Prisma Studio.

## Schema Reference

The database reference diagram lives at `docs/db-schema.mmd`.

Current Prisma models:

- `user`: stores `username` and `full_name`.
- `hobbies`: stores one hobbies array per `username`.
