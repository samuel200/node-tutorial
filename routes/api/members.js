const express = require('express');
const members = require('../../Members')

const router = express.Router();

// display json data
router.get("/", (req, res)=>{
    res.json(members)
})

router.get("/:id", (req, res)=>{
    const newMembersList = members.filter(member=>member.id == req.params.id);
    if(newMembersList.length === 0){
        res.status(400).json({msg: `No user with <id: ${req.params.id}> found`})
    }else{
        res.json(newMembersList);
    }
})

// create member
router.post("/", (req, res)=>{
    const {name, occupation} = req.body;
    if(name && occupation){
        members.push({
            id: members.length+1,
            name,
            occupation
        })
        // res.send(members);
        res.redirect("/")
    }else{
        res.status(400).json({msg: "name and occupation are required"})
    }

})

// update members

router.put("/:id", (req, res)=>{
    const member = members.splice(req.params.id-1, 1)[0];
    if(!member){
        res.status(400).json({msg: `No user with <id: ${req.params.id}> found`})
    }else{
        members[req.params.id-1] = {...member, ...req.body};
        res.json(members);
    }
})

router.delete("/:id", (req, res)=>{
    const newMembersList = members.filter(member=>member.id == req.params.id);
    if(newMembersList.length === 0){
        res.status(400).json({msg: `No user with <id: ${req.params.id}> found`})
    }else{
        members = members.filter(member=>member.id != req.params.id)
        res.json(members);
    }
})

module.exports = router;