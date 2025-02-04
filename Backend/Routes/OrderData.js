const express = require("express");
const router = express.Router();
const Order = require("../modles/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_data: req.body.order_data });
//  console.log("1231242343242354",req.body.email)

  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ "email": req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      // console.log(data);
   //  console.log("1231242343242354", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      }
      );
    } catch (error) {
 //     console.log(error.message);
   //   res.send("Server Error", error.message);
 return  res.status("Server Error").send(error.message)
    }
  }
});
router.post("/orderData", async (req, res) =>{
try{
let mydata=await Order.findOne({'email':req.body.email})
res.json({orderData:mydata})
}catch(error){
  return res.send("Server Error",error.message)
}
})



module.exports = router;
