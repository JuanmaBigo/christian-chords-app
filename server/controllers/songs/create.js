import Song from "../../models/Song.js"

const controller = {
    create: async(req, res) => {
        try{
            await Song.create(req.body)
            return res.status(201).json({
                sucess: true, 
                song: req.body,
                user: req.user
            })
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}

export default controller