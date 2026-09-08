const mongo = require('mongoose');

function connectDB(){
    mongo.set('debug', true);
    const url = 'mongodb://localhost:27017/board_hsh';
    mongo.connect(url);
    const db = mongo.connection;

    db.on('error',()=>console.log('DB접속 실패'));

    db.on('open', ()=>console.log('DB접속 완료'));
}

module.exports = connectDB;