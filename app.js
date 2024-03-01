const express = require('express');
const mongoose = require('mongoose');

const app =express();
mongoose.connect("mongodb://127.0.0.1:27017/expresss")
.then(()=>{
    console.log("connected to mongodb");
})
.catch((err)=>{
    console.log(err);
});

const empSchema = new mongoose.Schema({
    name:String,
    id:String,
    salary:Number
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("home page")
})

app.get('/about',(req,res)=>{
    res.send("About page")
})

const empModel = mongoose.model("emp", empSchema); 

app.post('/addEmp',async(req,res)=>{
 const empData=req.body;
 console.log(empData);
 const data=new empModel (empData);
 const result=await data.save();
 console.log(result);
})

app.put("/updateEmp/:id", async (req, res) => {
    const id = req.params.id;
    let { name, salary } = req.body;
    salary = Number(salary);
    const updateData = await empModel.updateOne(
      { id: id },
      { $set: { name: name, salary: salary } }
    );
    console.log(updateData);
  
    res.send("employee data updated...1");
  });

  app.delete("/deletEmp/:id", async (req, res) => {
    const id = req.params.id;
    console.log("Employee  deleted with ID : " + id);
    const data = await empModel.deleteOne({ id: id });
    console.log(data);
    res.send("employee deleted..");
  });
  
  //display all employees data
  app.get("/showEmps", async (req, res) => {
    console.log("Display Data");
    const showData = await empModel.find();
    res.send(showData);
    console.log(showData);
  });
  
  //to display specific data
  app.get("/findEmp/:id", async (req, res) => {
    const id = req.params.id;
    const data = await empModel.findOne({ id: id });
    res.send(data);
    console.log("employee found");
  });

app.listen(3000,()=>{
    console.log("lins");
})
