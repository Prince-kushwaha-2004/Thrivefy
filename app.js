const express=require("express");
const mysql = require("mysql2");
const app=express();
const methodOverride = require("method-override");
app.use(methodOverride("_method"))
const path = require("path");
const ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate);




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'thrivefy',
    password: 'Prince@102004@'
});



app.listen(8080,()=>{
    console.log("server listning from port 8080");
})
//medicine store page route
app.get("/medicines",(req,res)=>{
    res.send("Login to your account to go to store👤")
})
app.get("/medicines/:email",(req,res)=>{
    let {email}=req.params;
    console.log(email)
    let url,username;
    q = `select * from users where email='${email}'`;
    try {
        connection.query(q, (error, result) => {
            if (error) res.send("user not found");
            let {url,username,email} = result[0];
            q = `select * from medicines`;
            try {
                connection.query(q, (error, result) => {
                    if (error) res.send("user not found");
                    let datas = {result};
                    let data={username,url,email,datas}
                    // console.log(userdata)
                    // res.send(data)
                    res.render("medicines.ejs", { data });
                })
            } catch (error) {
                console.log("error found");
            }
        })
    } catch (error) {
        console.log("error found");
    }

})
//create account routes
app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
})
app.post("/signup",(req,res)=>{
    let {username,email,address,password1,password2,url,mobno}=req.body;
    if (password1 != password2) {
        res.render("wrongpassword.ejs");
    } else {


        q = `INSERT INTO Users (username, email, address, url, mobno, password) VALUES ('${username}','${email}','${address}','${url}','${mobno}','${password1}')`
        try {
            connection.query(q, (error, result) => {
                if (error) res.send("some error in database" + error.stack);
                data = { username, email, address, password1 };
                res.render("user.ejs", { data })
            })
        } catch (error) {
            console.error('error in data base');
        }
    }
})
//users page route
app.post("/users",(req,res)=>{
    let { email, password } = req.body;
    q = `select * from users where email='${email}'`;
    try {
        connection.query(q, (error, result) => {
            if (error) res.send("user not found");
            let data = result[0];
            console.log(data)
            if (password == data.password) {
                console.log(data)
                res.render("user.ejs", { data })
            } else {
                res.render("wrongpassword.ejs");
            }

        })
    } catch (error) {
        console.log("error found");
    }
})
//home route
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
//hospital login page
app.get("/hospitals",(req,res)=>{
    res.render("hospital_login.ejs");
});

// to render hosptal page
app.post("/hospitals", (req, res) => {
    let { email, password } = req.body;
    let q = `SELECT * FROM hospitals WHERE email='${email}'`;
    try {
      connection.query(q, (error, result) => {
        if (error || result.length === 0) {
          res.send("User not found");
        } else {
          let hospitalData = result[0];
          if (password === hospitalData.password) {
            let q2 = `SELECT d.* FROM doctors d INNER JOIN hospitals h ON d.hospital_id = h.hospital_id WHERE h.email = '${email}'`;
            try {
              connection.query(q2, (error, result2) => {
                if (error) {
                  res.send("Error fetching doctors");
                } else {
                  let doctorsData = result2;
                  let data={ hospitalData, doctorsData }
                //   console.log(data);
                  res.render("hospital.ejs",data);
                }
              });
            } catch (error) {
              console.log("Error executing doctors query:", error);
              res.send("Error fetching doctors");
            }
          } else {
            res.render("wrongpassword.ejs");
          }
        }
      });
    } catch (error) {
      console.log("Error executing hospitals query:", error);
      res.send("Error fetching hospital data");
    }
  });
  app.get("/hospitals/:email",(req,res)=>{
    let {email}=req.params;
    let q = `SELECT * FROM hospitals WHERE email='${email}'`;
    try {
      connection.query(q, (error, result) => {
        if (error || result.length === 0) {
          res.send("User not found");
        } else {
          let hospitalData = result[0];
            let q2 = `SELECT d.* FROM doctors d INNER JOIN hospitals h ON d.hospital_id = h.hospital_id WHERE h.email = '${email}'`;
            try {
              connection.query(q2, (error, result2) => {
                if (error) {
                  res.send("Error fetching doctors");
                } else {
                  let doctorsData = result2;
                  let data={ hospitalData, doctorsData }
                //   console.log(data);
                  res.render("hospital.ejs",data);
                }
              });
            } catch (error) {
              console.log("Error executing doctors query:", error);
              res.send("Error fetching doctors");
            }}})}catch(error){
              console.log("Error executing hospitals query:", error);
              res.send("Error fetching hospital data");
            }
  })
  // updation of hospital data
  app.put("/hospitals/:email",(req,res)=>{
  let {email}=req.params;
    let data= req.body;
    let bool;
    if(data.ambulance_service_available==1){
      bool=true;
    }else{
      bool=false;
    }
    let q = `UPDATE hospitals SET emergency_bed_available = ${data.emer_bed}, normal_bed_available =${data.norm_bed}, ambulance_service_available =${bool} WHERE email ='${email}' `;
     try {
      connection.query(q, (error, result) => {
        if (error || result.length === 0) {
          res.send("User not found");
        } else {
          
          res.send("Data updated")
        }
      })
    }catch (error) {
      console.log("Error executing hospitals query:", error);
      res.send("Error fetching hospital data");
    }
  })

  //find hospitals route
  app.get("/findhospitals",(req,res)=>{
    q = `select * from hospitals`;
    try {
        connection.query(q, (error, result) => {
            if (error) res.send("hospital not found");
            let data = result;
            res.render("findhospital.ejs", { data })

        })
    } catch (error) {
        console.log("error found");
    }
    })