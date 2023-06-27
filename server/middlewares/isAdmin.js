async function isAdmin(req, res, next) {
    if (req.user.is_admin) {
        return next()
    }
    return res.status(400).json({
        success: true,
        message: `You don't have admin authorization!`,
        data: req.body
    })
}

export default isAdmin