const router = require("express").Router();
const {Menu_items,Cart} = require("../../models");

router.get('/',async (req,res) =>{
    try {
        console.log(req.session.currentUser);
        const cart = await Cart.findAll(
            {
                where:{user_id:req.session.currentUser}
            }
        );
        if(!cart){
            res.status(404).json({message:"No cart has been created for this user."});
            return;
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;