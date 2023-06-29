import express from 'express';
import passport from '../middlewares/passport.js'
import validator from '../middlewares/validator.js'
import is_admin from '../middlewares/isAdmin.js'
// read
import getOneController from '../controllers/songs/get_one.js'
import getSongsController from '../controllers/songs/get_songs.js'
// create
import song_exists from '../middlewares/song/songExists.js'
import createController from '../controllers/songs/create.js'
import schemaNewSong from '../schemas/song.js'
import transform_lyrics from '../middlewares/song/transformLyrics.js'
// update
import updateController from '../controllers/songs/update.js'
import schemaUpdateSong from '../schemas/song_update.js'
// delete
import deleteController from '../controllers/songs/destroy.js'

let router = express.Router();

// user
const { get_one } = getOneController
const { get_songs } = getSongsController

router.get('/', get_songs)
router.get('/:id', get_one)

// admin
const { create } = createController
const { update } = updateController
const { destroy } = deleteController

router.post('/', passport.authenticate('jwt', {session: false}), is_admin, validator(schemaNewSong), song_exists, transform_lyrics, create)
router.put('/:id', passport.authenticate('jwt', {session: false}), is_admin, validator(schemaUpdateSong), song_exists, transform_lyrics, update)
router.delete('/:id', passport.authenticate('jwt', {session: false}), is_admin, destroy)

export default router;
