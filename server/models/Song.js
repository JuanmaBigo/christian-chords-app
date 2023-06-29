import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        name: {type:String, require: true},
        original_name: { type: String, require: false },
        author: { type: String, require: false },
        biblic_reference: { type: String, require: false },
        lyrics: { type: Array, require: true },
    },{
        timestamps: true
    }
)

const Song = mongoose.model('songs',schema)
export default Song
