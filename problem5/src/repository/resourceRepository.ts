import { where } from "sequelize";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../error/customError";
import { Resource } from "../models/index";
import { ResourceAttributes } from "../models/resource";
import { Op } from 'sequelize';

interface ResourceQueryParams {
  search?: string;
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
}

interface ResourcePagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  resources: Resource[];
}

class ResourceRepository {
  async getAllResources({ search, page = 1, limit = 10, minPrice, maxPrice }: ResourceQueryParams): Promise<ResourcePagination> {
    const whereClause: any = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    if (minPrice) {
      whereClause.price = { ...whereClause.price, [Op.gte]: minPrice };
    }

    if (maxPrice) {
      whereClause.price = { ...whereClause.price, [Op.lte]: maxPrice };
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await Resource.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      resources: rows,
    };
  }

  async getResourceById(id: number): Promise<Resource> {
    const resource = await Resource.findByPk(id);

    if (!resource) {
      throw new NotFoundError(`Resource not found`);
    }

    return resource;
  }

  async createResource(newResource: ResourceAttributes): Promise<Resource> {
    if (!newResource.name || !newResource.price) {
      throw new BadRequestError();
    }

    const resource = await Resource.create(newResource);

    if (!resource) {
      throw new InternalServerError();
    }

    return resource;
  }

  async updateResource(
    id: number,
    updatedFields: Partial<ResourceAttributes>
  ): Promise<ResourceAttributes> {
    const resource = await Resource.findByPk(id);

    if (!resource) {
      throw new NotFoundError(`Resource not found`);
    }
    await resource.update(updatedFields);

    return resource;
  }

  async deleteResource(id: number): Promise<number> {
    return await Resource.destroy({
      where: {
        id: id,
      },
    });
  }
}

export default ResourceRepository;
