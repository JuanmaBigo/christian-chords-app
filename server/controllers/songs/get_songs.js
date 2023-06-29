import Song from "../../models/Song.js"
import createError from 'http-errors';

const controller = {
    get_songs: async (req,res,next) => {
        let filter = {}

        if(req.query.name){
            filter.name = new RegExp(req.query.name.trim(),'i') 
        }
        
        try{
            let get_songs = await Song.find(filter)
                .sort({title:1})
                .select("name author")

            if (get_songs.length){
                return res
                .status(200)
                .json({ 
                    songs: get_songs 
                })
            }
            return next(createError(404, "Couldn't find any songs"))
            
        }catch(err){
            next(err)
        }
    }
}

export default controller