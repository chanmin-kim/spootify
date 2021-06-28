var express = require('express');
const Reviews = require("../schemas/Reviews");
var router = express.Router();

// 작성한 글을 저장하는 기능
router.post('/write', async(req, res)=>{
  const { username, password, title, content } = req.body;
  new_review = await Reviews.create({ username, password, title, content });

  if (new_review){
    res.send({message: "저장완료"})
  }

}) 

// 작성한 글을 수정하는 기능


// 특정 글을 삭제하는 기능
  
module.exports = router;