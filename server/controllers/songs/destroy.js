import Song from "../../models/Song.js";
import createError from 'http-errors';

const controller = {
    destroy: async (req, res, next) => {
        try {
            let song = await Song.deleteOne({ _id: req.params.id })
            if (song.deletedCount === 1) {
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: "song deleted!",
                    })
            }
            return next(createError(404, 'Song does not exist'))
        } catch (err) {
            next(err)
        }
    }
}

export default controller