const express = require('express')
const app = express()
const port = 3000
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
const reviewsRouter = require("./routers/reviews");
const mongoose = require('mongoose');
const connect = require("./schemas");
const Reviews = require("./schemas/Reviews");
connect();

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })

// 메인페이지 : 홈화면, 작성한 글 목록을 최신순으로 보여줌
app.get('/', async (req, res) => {
    reviews =  await Reviews.find().sort({created: -1})
    if (reviews){
        res.render('index', {reviews : reviews});
    }else{
        console.log("DB에서 데이터를 불러올 수 없습니다")
    }
    
})

// 작성페이지 : 리뷰 작성 버튼을 누르면 글을 작성할 수 있는 페이지로 이동
app.get('/write', (req, res) => {
    res.render('write');
})

// 상세페이지 : 글 목록에서 제목을 누르면 해당 글의 상세페이지로 이동
app.get('/detail/:id', (req, res)=>{
    review = Reviews.findOne({_id: req.params.id}, (error, result)=>{
        if (error) return console.log(error);
        res.render('detail.ejs', {review : result});
    })
})

// 수정페이지 : 상세페이지에서 수정 버튼을 누르면 글을 수정할 수 있는 페이지로 이동
app.get('/update/:id', (req,res)=>{
    review = Reviews.findOne({_id: req.params.id}, (error, result)=>{
        if (error) return console.log(error);
        res.render('update.ejs', {review : result});
    })
})

// 검색결과페이지 : 상단 검색바에서 작성자명으로 검색하면, 그에 해당하는 글들을 보여줌


// api : 글 작성, 수정, 삭제에 대한 정보처리를 담당하는 부분
app.use("/api",reviewsRouter);

