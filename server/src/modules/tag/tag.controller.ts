import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import TagService from './tag.service';
import { success } from '../../shared/utils/httpResponse';
import { CreateTagInput, DeleteTagInput, UpdateTagInput } from './tag.schema';

@injectable()
class TagController {
  constructor(@inject('TagService') private readonly tagService: TagService) {}

  /**
   * Create a new tag
   * @param req
   * @param res
   * @returns
   */
  createTag = async (
    req: Request<{}, {}, CreateTagInput['body']>,
    res: Response,
  ) => {
    const { name } = req.body;
    const {
      user: { id: userId },
    } = req;
    const tag = await this.tagService.createTag(name, userId);
    success(res, { ...tag }, 201);
    return;
  };

  /**
   * Update an existing tag
   * @param req
   * @param res
   * @returns
   */
  updateTag = async (
    req: Request<UpdateTagInput['params'], {}, UpdateTagInput['body']>,
    res: Response,
  ) => {
    const { id } = req.params;
    const { name } = req.body;
    const tag = await this.tagService.updateTag(id, name);
    success(res, { ...tag }, 200);
    return;
  };

  /**
   * Delete an existing tag
   * @param req
   * @param res
   * @returns
   */
  deleteTag = async (req: Request<DeleteTagInput['params']>, res: Response) => {
    const { id } = req.params;
    await this.tagService.deleteTag(id);
    success(res, {}, 204);
    return;
  };

  /**
   * Get a tag by its ID
   * @param req
   * @param res
   * @returns
   */
  getTag = async (req: Request<DeleteTagInput['params']>, res: Response) => {
    const { id } = req.params;
    const tag = await this.tagService.getTagById(id);
    success(res, { ...tag }, 200);
    return;
  };

  /**
   * Get all tags for the authenticated user
   * @param req
   * @param res
   * @returns
   */
  getTags = async (req: Request, res: Response) => {
    const {
      user: { id: userId },
    } = req;
    const tags = await this.tagService.getAllTagsByUserId(userId);
    success(res, { ...tags }, 200);
    return;
  };
}

export default TagController;
