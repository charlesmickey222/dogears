import { Dogear } from "../models/dogear.js";

function index(req,res){
  Dogear.find({})
  .then(dogears=>{
    res.render('dogears/index',{
      title:'Dogears',
      dogears:dogears,
    })
  })
}


export{

}