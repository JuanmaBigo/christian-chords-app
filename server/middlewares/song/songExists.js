import Song from '../../models/Song.js'
import createError from "http-errors";

async function song_exists(req, res, next) {
    const song = await Song.findOne({ name: req.body.name })
    if (!song) {
        return next()
    }

    return next(createError(400,'song name already exists, either use another name or update the exisiting one'))
}

export default song_exists