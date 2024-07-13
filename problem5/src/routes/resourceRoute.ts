import { Request, Router } from "express";
import ResourceController from "../controllers/resourceController";
import { asyncHandler } from "../middleware/asyncHandler";

export const router = Router();
const resourceController = new ResourceController();

router.get("/", asyncHandler(resourceController.getAllResources));

router.get("/:id", asyncHandler(resourceController.getResourceById));

router.post("/", asyncHandler(resourceController.createResource));

router.put("/:id", asyncHandler(resourceController.updateResource));

router.delete("/:id", asyncHandler(resourceController.deleteResource));
