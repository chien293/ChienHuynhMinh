import { Request, Response } from "express";
import { Resource } from "../models";
import  ResourceService  from "../services/resourceService";
import { BadRequestError, InternalServerError, NotFoundError } from "../error/customError";

const resourceService = new ResourceService();

class ResourceController {
  async getAllResources(req: Request, res: Response): Promise<void> {
    const { search, page, limit, minPrice, maxPrice } = req.query;

    const resources = await resourceService.getAllResources({
      search: search as string,
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(limit as string, 10) || 10,
      minPrice: parseFloat(minPrice as string),
      maxPrice: parseFloat(maxPrice as string),
    });

    if (!resources) {
      throw new InternalServerError();
    }
    res.json(resources);
  }

  async getResourceById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    const resource = await resourceService.getResourceById(id);

    res.status(200).json(resource);
  }

  createResource = async (req: Request, res: Response): Promise<void> => {
    const { name, description, price } = req.body;

    const resource = { name, description, price };

    const newResource = await resourceService.createResource(resource);

    res.status(201).json(newResource);
  };

  updateResource = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { name, description, price } = req.body;

    if (!name && !description && !price) {
      throw new BadRequestError();
    }

    const updatedFields = { name, description, price };

    const newEmployee = await resourceService.updateResource(id, updatedFields);
    res.status(201).json(newEmployee);
  };

  deleteResource = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    await resourceService.deleteResource(id);

    res.status(204).json(`Resource deleted successfully`);
  };
}

export default ResourceController;
