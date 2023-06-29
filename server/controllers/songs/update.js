import Song from '../../models/Song.js'
import createError from 'http-errors';

const controller = {

    update: async (req, res, next) => {

        try {
            let song = await Song.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                    { new: true }
            )
            if (song) {
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: "song succesfully updated!"
                    })
            }
            return (next(createError(404, 'Song does not exist')))
        } catch (error) {
            next(error)
        }
    }
}


export default controller