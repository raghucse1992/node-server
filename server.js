const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');

var app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engin', 'hbs');
app.use(express.static(__dirname+ '/public'));

app.use((req,res,next)=>{
     var now = new Date().toString();
     var log = `${now} : ${req.method}  ${req.url}`;
     fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append file');
        }
     })
     next();
});
app.get('/',(req,res) => {
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to my website'
    });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:'Projects'
    });
})

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle:'About Page',
        currentYear:new Date().getFullYear()
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});