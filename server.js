const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port =process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log+'\n');
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintainance.hbs');
// });

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('titlePresentation',(text)=>{
    return text.charAt(0).toUpperCase() + text.slice(1);
})

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'welcome to my blog'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
    });

});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:'My Projects'
    });

});

app.get('/errorpage',(req,res)=>{
    res.send({
        ErrorMessage:"Access Denied: Page Under Construction"
    });
})

app.listen(port, ()=>{
    console.log('Server is up on port '+port);
});