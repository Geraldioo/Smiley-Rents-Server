const authorizationAdmin = async (req, res, next) => {
    try {
        // mau nge cek apkah user yang lagi login admin atau bukan
        if (req.user.role !== "Admin") throw {name: "Forbidden"}
        
        // kalo dia admin bakal di next
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const authorizationStaff = async (req, res, next) => {
    try {
        // mau nge cek apkah user yang lagi login Staff atau bukan
        console.log(req.user, "<><><><>>>>>>>");
        if (req.user.role !== "Staff") throw {name: "Forbidden"}
        
        // kalo dia Staff bakal di next
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}



module.exports = {authorizationAdmin, authorizationStaff}