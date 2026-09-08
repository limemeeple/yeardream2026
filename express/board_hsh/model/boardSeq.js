const mongoose = require('mongoose');

let boardCountSchema = new mongoose.Schema({

    id:{
        type:String,
        required:[true, '아이디는 필수입니다.'],
        unique:true
    },
    seq:{
        type:Number,
        default:0
    }
});

const BoardCount = mongoose.model('BoardCount', boardCountSchema);
module.exports = BoardCount;