const express = require('express');
const router  = express.Router();
const con = require("../db");

//Handle Sites


router.get('/', (req,res)=>{
    var sql='SELECT * FROM list';
    con.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('welcome', { title: 'List', userData: data ,});
    });
});


router.get('/SolarSystem', (req,res)=>{
    res.render('solar')
})

router.get('/StarWars', (req,res)=>{
    res.render('starwars')
})

router.get('/StarFox', (req,res)=>{
    res.render('starfox')
})

router.get('/DeadLine', (req,res)=>{
    res.render('deadline')
})

router.get('/Floating', (req,res)=>{
    res.render('floating')
})

router.get('/3DLoading', (req,res)=>{
    res.render('3dloading')
})

router.get('/CustomAlert', (req,res)=>{
    res.render('customalert')
})

router.get('/BuildPage', (req,res)=>{
    res.render('buildpage')
})

router.get('/PureSphere', (req,res)=>{
    res.render('puresphere')
})

router.get('/SimpleCSSLoaders', (req,res)=>{
    res.render('simpleloaders')
})

router.get('/GanghamStyle', (req,res)=>{
    res.render('ganghamstyle')
})

router.get('/Mario', (req,res)=>{
    res.render('mario')
})

router.get('/BeeRightBack', (req,res)=>{
    res.render('beeback')
})

router.get('/BeeMine', (req,res)=>{
    res.render('beemine')
})

router.get('/FlyingBee', (req,res)=>{
    res.render('flyingbee')
})

router.get('/Pixies', (req,res)=>{
    res.render('pixies')
})

router.get('/Beehave', (req,res)=>{
    res.render('beehave')
})

router.get('/Beehave', (req,res)=>{
    res.render('beehave')
})

router.get('/Animated%20Background', (req,res)=>{
    res.render('pureback')
})

router.get('/404', (req,res)=>{
    res.render('404')
})

router.get('/SimpleCamera', (req,res)=>{
    res.render('simplecam')
})

router.get('/CandyButton', (req,res)=>{
    res.render('candybutton')
})
router.get('/LoginForm', (req,res)=>{
    res.render('loginform')
})
router.get('/KeyboardHero', (req,res)=>{
    res.render('keyboardhero')
})
router.get('/KillTheKing', (req,res)=>{
    res.render('killtheking')
})
router.get('/MagicCard', (req,res)=>{
    res.render('magiccard')
})
router.get('/CreditCard', (req,res)=>{
    res.render('creditcard')
})

router.get('/MediaPipe', (req,res)=>{
    res.render('mediapipe')
})

router.get('/AnimatedTabBar', (req,res)=>{
    res.render('animatedbar')
})
router.get('/Hole', (req,res)=>{
    res.render('hole')
})

module.exports  = router;