import Song from "../../models/Song.js";
import createError from 'http-errors';

const controller = {
    get_one: async (req, res, next) => {
        try {
            let song = await Song.findById(req.params.id)
            if (song) {
                return res
                    .status(200)
                    .json({ 
                        song })
            }
            return next(createError(404, 'Song does not exist'))
        } catch (err) {
            next(err)
        }
    }
}

export default controller