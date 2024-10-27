const request = require("supertest");
const app = require("../../app");

describe("Assets API", () => {
  it("should get all assets", async () => {
    const response = await request(app).get("/api/assets");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should get an asset by id", async () => {
    const response = await request(app).get("/api/assets/1");
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it("should get an asset by slug", async () => {
    const response = await request(app).get("/api/assets/slug/asset-1");
    expect(response.statusCode).toBe(200);
    expect(response.body.slug).toBe("asset-1");
  });

  it("should create a new asset", async () => {
    const newAsset = {
      name: "New Asset",
      price: 100,
      slug: "new-asset",
      image: "https://via.placeholder.com/150",
      tokenAssetAddress: "BQhCiUcQfDgoLLx6XUf6ne7kYe5YE8ZKMHpJ9j2yaW5N",
    };
    const response = await request(app).post("/api/assets").send(newAsset);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newAsset.name);
    expect(response.body.price).toBe(newAsset.price);
    expect(response.body.slug).toBe(newAsset.slug);
    expect(response.body.image).toBe(newAsset.image);
    expect(response.body.tokenAssetAddress).toBe(newAsset.tokenAssetAddress);
  });

  it("should update an existing asset", async () => {
    const updatedAsset = {
      name: "Updated Asset",
      price: 200,
      slug: "updated-asset",
      image: "https://via.placeholder.com/150",
      tokenAssetAddress: "BW7AjDhWJmdH7fsf8s7UkSaYm5CtvmUDjm5V7xy4jakh",
    };
    const response = await request(app)
      .patch("/api/assets/1")
      .send(updatedAsset);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedAsset.name);
    expect(response.body.price).toBe(updatedAsset.price);
    expect(response.body.slug).toBe(updatedAsset.slug);
    expect(response.body.image).toBe(updatedAsset.image);
    expect(response.body.tokenAssetAddress).toBe(
      updatedAsset.tokenAssetAddress
    );
  });

  it("should return 404 when updating a non-existent asset", async () => {
    const updatedAsset = {
      name: "Non-Existent Asset",
      price: 300,
      slug: "non-existent-asset",
      image: "https://via.placeholder.com/150",
      tokenAssetAddress: "BW7AjDhWJmdH7fsf8s7UkSaYm5CtvmUDjm5V7xy4jakh",
    };
    const response = await request(app)
      .patch("/api/assets/999")
      .send(updatedAsset);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Asset not found");
  });

  it("should delete an asset", async () => {
    const response = await request(app).delete("/api/assets/2");
    expect(response.statusCode).toBe(204);
  });

  it("should return 404 when deleting a non-existent asset", async () => {
    const response = await request(app).delete("/api/assets/999");
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Asset not found");
  });
});
