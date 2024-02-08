const NotesFromBService = require('../service/notes_from_b.service');

module.exports = {
  /**
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   * @param {import('express').NextFunction} next 
   */
  getNotes: async (req, res, next) => {
    const notes = await NotesFromBService.getNotes();

    res.status(200).json({
      success: true,
      result: notes
    });
  },

  /**
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   * @param {import('express').NextFunction} next 
   */
  insertNotes: async (req, res, next) => {
    await NotesFromBService.insertNotes();

    res.status(200).json({
      success: true
    });
  }
}