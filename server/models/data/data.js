import 'dotenv/config.js'
import '../../config/database.js'
import { users } from './users.js'
import { songs } from './songs.js'
import Song from '../Song.js'
import User from '../User.js'

let newSongs = async (songs) => await Song.insertMany(songs)

let newUsers = async (users) => await User.insertMany(users)


let data = async () => {
    await newSongs(songs)
    await newUsers(users)
    console.log('done!')
}

data()