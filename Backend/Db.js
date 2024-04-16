const mongoose = require("mongoose");
const mongoURI ="mongodb+srv://anujrohitkumar3010:%40Anuj3010@cluster0.1zp0ufs.mongodb.net/myfood?retryWrites=true&w=majority"
//  "mongodb+srv://anujrohitkumar3010:%40Anuj3010@cluster0.1zp0ufs.mongodb.net/myfood?retryWrites=true&w=majority";

const mongoDB = async () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
    if (err) console.log("---", err);
    else {
      console.log("connected Rohit is here");
      const fetched_data = mongoose.connection.db.collection("sample"); //food_items==sample
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCateogry = await mongoose.connection.db.collection(
          "food_items"
        );
        foodCateogry.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.foodCateogry = catData;
          }
        });

        // if (err) console.log(err);
        // else {
        //   global.food_items = data;
        //    console.log(global.food_items);
        // }
      });
    }
  });
};
module.exports = mongoDB;
