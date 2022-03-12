const express = require('express');
const router = express.Router();
const request =require('request');
const config = require('config');


//@route   GET api/github/repository
//@desc    get github repositories
//@access  public

router.get('/repository/:username', (req,resp)=> {
try {
    const options={
        uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&
        sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=
        ${config.get('githibClientSecret')}`,
        method: 'GET',
        headers: {'user-agent': 'node.js'}
    };

    request(options,(error,response,body)=>{

        if(error) console.log(error);

        resp.json(JSON.parse(body));
    })
} catch (error) {
    console.log(error.message);
    res.status(500).send('Sever Error');
}

});

//@route   GET api/github/pulls/:username/:reponame
//@desc    get github pull request for specific user and repository
//@access  public

router.get('/pulls/:username/:reponame', (req,resp)=> {
    try {
        const options={
            uri:`https://api.github.com/repos/${req.params.username}/${req.params.reponame}/pulls?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githibClientSecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        };
    
        request(options,(error,response,body)=>{
    
            if(error) console.log(error);
    
            resp.json(JSON.parse(body));
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Sever Error');
    }
    
    });


//@route   GET api/github/commits /:username/:reponame/
//@desc    get github pull request files
//@access  public

router.get('/commits/:username/:reponame/:pullnumber', (req,resp)=> {
    try {
        const options={
            uri:`https://api.github.com/repos/${req.params.username}/${req.params.reponame}/pulls/${req.params.pullnumber}/files?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githibClientSecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        };
    
        console.log(options.uri);
        request(options,(error,response,body)=>{
    
            if(error) console.log(error);
    
            resp.json(JSON.parse(body));
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Sever Error');
    }
    
    });

    
// export the api
module.exports = router;