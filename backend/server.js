const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');


//Express 서버 생성
const app = express();

//json 형식으로 오는 요청 본문을 해석할 수 있도록
app.use(bodyParser.json());

//create DB table named lists
// db.pool.query('CREATE TABLE lists (id INTEGER AUTO_INCREMENT, value Text, PRIMARY KEY (id))', (err, result, fields) => {
//     console.log('results', results)
// })

//API 1 - DB 테이블에 있는 모든 데이터를 프론트엔드 서버에 보내주기
app.get('/api/values', function (req, res) {
    //get DB valuse
    db.pool.query('SELECT * FROM lists',
        (err, result, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json(results)
        })
})
//API 2 - 클라이언트에서 입력한 값을 DB lists에 넣기
app.post('/api/value', function (req, res, next) {
    //insert data to DB
    db.pool.query('INSERT INTO lists (value) VALUES("${req.body.value}")',
        (err, results, fields) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json({ success: true, value: req.body.value })
        })
})


app.listen(5000, () => {
    console.log('애플리케이션이 500번 포트에서 시작됩니다.')
})