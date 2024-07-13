import { Resource } from '../models/index';
import { ResourceAttributes } from '../models/resource';
import  ResourceRepository  from '../repository/resourceRepository';
const resourceRepository = new ResourceRepository();

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

class ResourceService {

  async getAllResources(queryParams: ResourceQueryParams): Promise<ResourcePagination> {
    return await resourceRepository.getAllResources(queryParams);
  }

  async getResourceById(id: number): Promise<Resource> {
    return await resourceRepository.getResourceById(id);
  }

  async createResource(newResource: ResourceAttributes): Promise<Resource> {
    return await resourceRepository.createResource(newResource);
  }

  async updateResource(id: number, updatedFields: Partial<ResourceAttributes>): Promise<ResourceAttributes> {
    await resourceRepository.getResourceById(id);
  
    const updatedResource = await resourceRepository.updateResource(id, updatedFields);
    return updatedResource;
  }

  async deleteResource(id: number): Promise<number> {
    await resourceRepository.getResourceById(id);

    const deletedResource = await resourceRepository.deleteResource(id);
    return deletedResource;
  }
}

export default ResourceService;
