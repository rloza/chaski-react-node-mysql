const express = require("express");
const app = express ();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password:"password",
        database: "chaski"
    }
);

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const ci = req.body.ci;

    db.query("INSERT INTO persons(nombre,apellidos,ci) values(?,?,?)",[nombre,apellidos,ci],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Resistro exitoso");
        }
    });
});


app.get("/persons",(req,res)=>{

    db.query("SELECT * from persons",
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.put("/update",(req,res)=>{

    const id= req.body.id;
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const ci = req.body.ci;

    db.query("UPDATE persons set nombre=?, apellidos=?, ci=? where id=?",[nombre,apellidos,ci,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send("Modificacion correcta");
        }
    });
});

app.delete("/delete/:id",(req,res)=>{

    const id= req.params.id;

    db.query("DELETE from persons where id=?",[id],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.listen(3001,()=>{
    console.log("Funciona 3001");
})