require("dotenv").config();

const express = require("express");
const { PrismaClient } = require("@prisma/client");

const port = Number(process.env.PORT || 3000);
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

function badRequest(res, message) {
  return res.status(400).json({
    error: "Bad Request",
    message
  });
}

function getUserPayload(body) {
  const username = body.username;
  const fullName = body.fullName || body.name;

  if (!username || typeof username !== "string") {
    return { error: "username is required as a string" };
  }

  if (!fullName || typeof fullName !== "string") {
    return { error: "fullName or name is required as a string" };
  }

  return {
    data: {
      username,
      fullName
    }
  };
}

function getHobbiesPayload(body) {
  const { username, hobbies } = body;

  if (!username || typeof username !== "string") {
    return { error: "username is required as a string" };
  }

  if (!Array.isArray(hobbies) || hobbies.some((hobby) => typeof hobby !== "string")) {
    return { error: "hobbies is required as an array of strings" };
  }

  return {
    data: {
      username,
      hobbies
    }
  };
}

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { username: "asc" }
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.get("/user/:username?", async (req, res, next) => {
  try {
    const { username } = req.params;

    if (!username) {
      return badRequest(res, "username is required in the URL path");
    }

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return res.status(404).json({
        error: "Not Found",
        message: `No user found for username ${username}`
      });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
});

app.post("/user", async (req, res, next) => {
  try {
    const payload = getUserPayload(req.body);
    if (payload.error) {
      return badRequest(res, payload.error);
    }

    const user = await prisma.user.create({
      data: payload.data
    });

    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
});

app.put("/user", async (req, res, next) => {
  try {
    const payload = getUserPayload(req.body);
    if (payload.error) {
      return badRequest(res, payload.error);
    }

    const user = await prisma.user.update({
      where: { username: payload.data.username },
      data: { fullName: payload.data.fullName }
    });

    return res.json(user);
  } catch (error) {
    return next(error);
  }
});

app.delete("/user/:username?", async (req, res, next) => {
  try {
    const username = req.params.username || req.body.username;

    if (!username) {
      return badRequest(res, "username is required in the URL path or request body");
    }

    await prisma.user.delete({
      where: { username }
    });

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

app.get(["/hobbies", "/habits"], async (req, res, next) => {
  try {
    const hobbies = await prisma.hobbies.findMany({
      orderBy: { username: "asc" }
    });

    res.json(hobbies);
  } catch (error) {
    next(error);
  }
});

app.get(["/hobbies/:username?", "/habits/:username?"], async (req, res, next) => {
  try {
    const { username } = req.params;

    if (!username) {
      return badRequest(res, "username is required in the URL path");
    }

    const hobbies = await prisma.hobbies.findUnique({
      where: { username }
    });

    if (!hobbies) {
      return res.status(404).json({
        error: "Not Found",
        message: `No hobbies found for username ${username}`
      });
    }

    return res.json(hobbies);
  } catch (error) {
    return next(error);
  }
});

app.post(["/hobbies", "/habits"], async (req, res, next) => {
  try {
    const payload = getHobbiesPayload(req.body);
    if (payload.error) {
      return badRequest(res, payload.error);
    }

    const existingHobbies = await prisma.hobbies.findUnique({
      where: { username: payload.data.username }
    });

    if (!existingHobbies) {
      const hobbies = await prisma.hobbies.create({
        data: payload.data
      });

      return res.status(201).json(hobbies);
    }

    const hobbies = await prisma.hobbies.update({
      where: { username: payload.data.username },
      data: {
        hobbies: [...existingHobbies.hobbies, ...payload.data.hobbies]
      }
    });

    return res.json(hobbies);
  } catch (error) {
    return next(error);
  }
});

app.put(["/hobbies", "/habits"], async (req, res, next) => {
  try {
    const payload = getHobbiesPayload(req.body);
    if (payload.error) {
      return badRequest(res, payload.error);
    }

    const hobbies = await prisma.hobbies.update({
      where: { username: payload.data.username },
      data: { hobbies: payload.data.hobbies }
    });

    return res.json(hobbies);
  } catch (error) {
    return next(error);
  }
});

app.delete(["/hobbies/:username?", "/habits/:username?"], async (req, res, next) => {
  try {
    const username = req.params.username || req.body.username;

    if (!username) {
      return badRequest(res, "username is required in the URL path or request body");
    }

    await prisma.hobbies.delete({
      where: { username }
    });

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `No route registered for ${req.method} ${req.originalUrl}`
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);
  return res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
