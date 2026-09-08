const mongoose = require('mongoose');

let boardSchema = new mongoose.Schema({

    seq:{
        type:Number,
        required:[true, '시퀀스는 필수입니다.'],
        unique:true,
        trim:true
    },
    id:{
        type:String,
        required:[true, '작성자는 필수입니다.'],
        trim:true
    },
    title:{
        type:String,
        required:[true, '제목은 필수입니다.'],
        trim:true,
        maxLength:[100, '제목은 100자 이하입니다.']
    },
    content:{
        type:String,
        required:[true, '내용은 필수입니다.'],
        trim:true
    }
},{
    collection: 'board',
    timestamps:true,
    id:false
});

boardSchema.index({name:1});
module.exports = mongoose.model('Board', boardSchema);