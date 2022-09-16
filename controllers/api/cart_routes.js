const router = require("express").Router();
const {Menu_items,Cart} = require("../../models");

router.get('/',async (req,res) =>{
    try {
        console.log(req.session.currentUser);
        let cart = await Cart.findAll(
            {
                where:{user_id:req.session.currentUser}
            }
        );
        if(cart===[]){
            cart = await Cart.create(
                {
                    user_id:req.session.currentUser
                }
            );
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;