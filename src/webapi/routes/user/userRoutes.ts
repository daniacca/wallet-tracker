import express, { Express } from "express";
import UserController from "../../controllers/user/UserController.js";

const router = express.Router();
const controller = new UserController();

// GET /api/users
router.get("/", async (_, res) => {
  const users = await controller.find();
  res.send({ users });
});

// GET /api/users/:id
router.get("/:id", async (req, res) => {
  const user = await controller.findUserById(req.params.id);
  res.send({ user });
});

// POST /api/users
router.post("/", async (req, res) => {
  const user = await controller.create(req.body);
  res.send({ user });
});

// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  const user = await controller.update(req.params.id, req.body);
  res.send({ user });
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  const user = await controller.remove(req.params.id);
  res.send({ user });
});

export default (app: Express) => app.use("/api/users", router);
