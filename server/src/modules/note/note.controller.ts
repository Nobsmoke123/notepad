import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import NoteService from './note.service';
import {
  CreateNoteInput,
  DeleteNoteInput,
  UpdateNoteInput,
} from './note.schema';
import { success } from '../../shared/utils/httpResponse';

@injectable()
class NoteController {
  constructor(@inject(NoteService) private readonly noteService: NoteService) {}
  /**
   *  Create Note
   * @param req
   * @param res
   * @returns
   */
  createNote = async (
    req: Request<{}, {}, CreateNoteInput['body']>,
    res: Response,
  ) => {
    const { body } = req;
    const {
      user: { id: userId },
    } = req;
    const note = await this.noteService.createNote(body, userId);
    success(res, { ...note }, 201);
    return;
  };

  /**
   * Update note
   * @param req
   * @param res
   * @returns
   */
  updateNote = async (
    req: Request<UpdateNoteInput['params'], {}, UpdateNoteInput['body']>,
    res: Response,
  ) => {
    const { id } = req.params;
    const { body } = req;
    const {
      user: { id: userId },
    } = req;
    const note = await this.noteService.updateNote(id, userId, body);
    success(res, { ...note }, 200);
    return;
  };

  /**
   * Get a note by ID
   * @param req
   * @param res
   * @returns
   */
  getNote = async (req: Request<DeleteNoteInput['params']>, res: Response) => {
    const { id } = req.params;
    const note = await this.noteService.getNote(id);
    success(res, { ...note }, 200);
    return;
  };

  /**
   * Get all Notes
   * @param req
   * @param res
   * @returns
   */
  getNotes = async (req: Request, res: Response) => {
    const {
      user: { id: userId },
    } = req;
    const notes = await this.noteService.getNotesByUserId(userId);

    success(res, notes, 200);
    return;
  };

  /**
   * Delete note by ID
   * @param req
   * @param res
   * @returns
   */
  deleteNote = async (
    req: Request<DeleteNoteInput['params']>,
    res: Response,
  ) => {
    const { id } = req.params;
    const {
      user: { id: userId },
    } = req;
    const note = await this.noteService.deleteNote(id, userId);
    success(res, { ...note }, 200);
    return;
  };
}

export default NoteController;
