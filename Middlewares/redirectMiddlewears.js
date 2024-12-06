module.exports=async(req,res,next)=>{
try {
    if(req.session.userID) {
        return res.status(401).redirect("/")
    }
next();
} catch (error) {
    return res.status(500).send("Bir hata oluştu")
}
}
