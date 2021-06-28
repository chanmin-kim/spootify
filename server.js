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
connect();

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })

// 메인페이지 : 작성한 글 목록을 보여줌
app.get('/', (req, res) => {
    res.render('index');
})

// 상세페이지 : 글 목록에서 제목을 누르면 해당 글의 상세페이지로 이동


// 수정페이지 : 상세페이지에서 수정 버튼을 누르면 글을 수정할 수 있는 페이지로 이동


// api : 글 작성, 수정, 삭제에 대한 정보처리를 담당하는 부분
app.use("/api",reviewsRouter);

