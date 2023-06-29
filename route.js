const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var mysql = require('mysql');
require("dotenv").config();

var configmysql = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "skyicttest"
};

const jwtValidate = (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    var ver = jwt.verify(token, process.env.TOKEN_KEY);
    req.userdata = ver;
  } catch (error) {
    return res.status(401).send('invalid token')
  }
  return next();
}


module.exports = {

  configure: function (app) {
    app.get('/',  async function (req, res) {
      res.send("Test Skyict")
    });

    app.post('/abc', function (req, res) {
      try {
        var str = req.body.input;
        const dictionary = ["butterfly", "cat", "dog", "bat"];
        var result = [];
        var temp = [];
        for (var i in dictionary) {
          var dict = dictionary[i];
          var firstidx = str.indexOf(dict);
          var lastidx = dict.length;
          if (firstidx >= 0) {
            var sub = str.substring(firstidx, lastidx + firstidx);
            temp.push({ idx: firstidx, str: sub });
          }
        }
        temp.sort((a, b) => a.idx - b.idx)
        temp.forEach(t => {
          result.push(t.str);
        });
        res.status(200).send(result);
      } catch (ex) {
        console.log(ex);
        res.status(400).send('');
      }
    });

    app.post('/login', async function (req, res) {
      try {
        var body = req.body;
        var con = mysql.createConnection(configmysql);
        var result = await new Promise(function (resolve, reject) {
          con.connect(function (err) {
            if (err) throw err;
            var sqlcmd = "SELECT * FROM userlogin WHERE username = '" + body.username + "'";
            // console.log(sqlcmd);
            con.query(sqlcmd, function (err, result) {
              if (err) throw err;
              resolve(result);
            });
            con.end();
          });
        })
        // console.log(result);

        if (result.length > 0) {
          var userdata = result[0];
          if (await bcrypt.compare(body.password, userdata.password)) {
            // createtoken
            const token = jwt.sign({ userid: userdata.id, username: userdata.username, roleid: userdata.roleid }, process.env.TOKEN_KEY, { expiresIn: "1h" })
            userdata.token = token;
            res.status(200).send(userdata);

          } else {
            res.status(400).send("Password is not match");
          }
        } else {
          res.status(400).send("Unknown Username");
        }

      } catch (ex) {
        console.log("ex : ", ex);
        res.status(400).send('');
      }
    });

    app.get('/customer', jwtValidate, async function (req, res) {
      // res.send("hello world")
      try {
        var con = mysql.createConnection(configmysql);
        var result = await new Promise(function (resolve, reject) {
          con.connect(function (err) {
            if (err) throw err;
            var sqlcmd = "SELECT * FROM customer";
            // console.log(sqlcmd);
            con.query(sqlcmd, function (err, result) {
              if (err) throw err;
              resolve(result);
            });
            con.end();

          });
        })
        // console.log("customer : ", result);
        if (result.length > 0) {
          res.status(200).send(result);
        } else {
          res.status(200).send("No Data");
        }

      } catch (ex) {
        console.log("ex : ", ex);
        res.status(400).send('');
      }
    });

    app.put('/customer', jwtValidate, async function (req, res) {
      // res.send("hello world")
      try {
        if (req.userdata.roleid == 1) {
          var body = req.body;
          // console.log(req.userdata);
          var con = mysql.createConnection(configmysql);
          var result = await new Promise(function (resolve, reject) {
            con.connect(function (err) {
              if (err) throw err;
              var sqlcmd = "UPDATE customer SET address = '" + body.address + "' ,modifieddate = NOW(), modifiedid = '" + req.userdata.userid + "' WHERE id = '" + body.id + "';";
              // console.log(sqlcmd);
              con.query(sqlcmd, function (err, result) {
                if (err) throw err;
                resolve(result);
              });
              con.end();

            });
          })
          // console.log("update : ", result);
          if (result.affectedRows > 0) {
            res.status(200).send("Update Success");
          } else {
            res.status(200).send("Can't Update");
          }
        }
        else {
          res.status(401).send("You are unable to access");

        }


      } catch (ex) {
        console.log("ex : ", ex);
        res.status(400).send('Bad Request');
      }
    });

    app.delete('/customer', jwtValidate, async function (req, res) {
      // res.send("hello world")
      try {
        if (req.userdata.roleid == 1) {
          var body = req.body;
          // console.log(req.userdata);

          var con = mysql.createConnection(configmysql);
          var result = await new Promise(function (resolve, reject) {
            con.connect(function (err) {
              if (err) throw err;
              var sqlcmd = "DELETE FROM customer WHERE id = '" + body.id + "';";
              console.log(sqlcmd);
              con.query(sqlcmd, function (err, result) {
                if (err) throw err;
                resolve(result);
              });
              con.end();
            });
          })
          console.log("DELETE : ", result);
          if (result.affectedRows > 0) {
            res.status(200).send("Delete Success");
          } else {
            res.status(200).send("Can't Delete");
          }
        }
        else {
          res.status(401).send("You are unable to access");

        }


      } catch (ex) {
        console.log("ex : ", ex);
        res.status(400).send('Bad Request');
      }
    });

    app.post('/customer', jwtValidate, async function (req, res) {
      try {
        if (req.userdata.roleid == 1) {
          var body = req.body;
          var con = mysql.createConnection(configmysql);
          var result = await new Promise(function (resolve, reject) {
            con.connect(function (err) {
              if (err) throw err;
              var sqlcmd = "INSERT INTO customer (custname,custcode,address,createid,createdate,modifieddate,modifiedid) \n" +
                "VALUES ('" + body.custname + "','" + body.custcode + "','" + body.address + "','" + req.userdata.userid + "',NOW(),NOW(),'" + req.userdata.userid + "')";
              // console.log(sqlcmd);
              con.query(sqlcmd, function (err, result) {
                if (err) throw err;
                resolve(result);
              });
              con.end();
            });
          })
          // console.log("Insert : ", result);
          if (result.affectedRows > 0) {
            res.status(200).send("Insert Success");
          } else {
            res.status(200).send("Can't Delete");
          }
        }
        else {
          res.status(401).send("You are unable to access");

        }


      } catch (ex) {
        console.log("ex : ", ex);
        res.status(400).send('Bad Request');
      }
    });
  }
};
