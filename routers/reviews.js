var express = require('express');
const Reviews = require("../schemas/Reviews");
var router = express.Router();

// 작성한 글을 저장하는 기능
router.post('/write', async(req, res)=>{
  const { username, password, title, content, musicUrl } = req.body;
  new_review = await Reviews.create({ username, password, title, content, musicUrl });

  if (new_review){
    res.send({message: "저장완료"})
  }

}) 

// 작성한 글을 수정하는 기능. 기존의 저장된 비밀번호와 같은 값을 입력한 경우에만 글을 수정할 수 있음
router.post('/update/:id', async(req, res)=>{
  const { username, confirm_password, title, content, musicUrl } = req.body;
  original_review = await Reviews.findOne({_id:req.params.id})

  if (original_review.password == confirm_password){
    await Reviews.updateOne({_id:req.params.id}, {$set:{username:username, password:confirm_password, title:title, content:content, musicUrl:musicUrl}},function(error,result){
      if (error){
        console.log(error);
      }else{
        res.status(200).send({message: "저장완료"})
      }
    })
  }else {
    res.status(400).send({message:"비밀번호가 틀렸습니다"})
  }
  


  
}) 

// 특정 글을 삭제하는 기능
  
module.exports = router;