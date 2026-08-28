const mongo = require('mongoose');

function connectDB(){
    mongo.set('debug', true); //실행되는 쿼리를 로그에 출력(개발용)
    const url = 'mongodb://localhost:27017/yeardream'; //url이 길어질 경우도 있어서
    mongo.connect(url);
    const db = mongo.connection;

    db.on('error',()=>console.log('DB접속 실패'));

    db.on('open', ()=>console.log('DB접속 완료'));
}

module.exports = connectDB;