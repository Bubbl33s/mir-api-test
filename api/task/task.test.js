const request = require("supertest");
const app = require("../../app");

describe("Tasks API", () => {
  it("should get all tasks", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should create a new task", async () => {
    const newTask = {
      title: "New Task",
      description: "New Description",
    };
    const response = await request(app).post("/api/tasks").send(newTask);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTask.title);
    expect(response.body.description).toBe(newTask.description);
    expect(response.body.completed).toBe(false);
  });

  it("should not create a task without title", async () => {
    const newTask = {
      description: "Missing title",
    };
    const response = await request(app).post("/api/tasks").send(newTask);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Title is required");
  });

  it("should update an existing task", async () => {
    const updatedTask = {
      title: "Updated Task",
      description: "Updated Description",
    };
    const response = await request(app).patch("/api/tasks/1").send(updatedTask);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedTask.title);
    expect(response.body.description).toBe(updatedTask.description);
  });

  it("should return 404 when updating a non-existent task", async () => {
    const updatedTask = {
      title: "Non-Existent Task",
      description: "Does not exist",
    };
    const response = await request(app)
      .patch("/api/tasks/999")
      .send(updatedTask);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Task not found with id: 999");
  });

  it("should delete a task", async () => {
    const response = await request(app).delete("/api/tasks/1");
    expect(response.statusCode).toBe(204);
  });

  it("should return 404 when deleting a non-existent task", async () => {
    const response = await request(app).delete("/api/tasks/999");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Task not found with id: 999");
  });
});
