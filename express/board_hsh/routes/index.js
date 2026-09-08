const express = require('express');
const router = express.Router();
const Board = require('../model/board');
const BoardCount = require('../model/boardSeq');

router.get(['/list', '/'], async (req, res) => {
  console.log("list 실행합니다.");
  let list = await Board.find()
      .sort({'seq' : -1})
      .lean();

  let board = '<table style="border: 1px solid black; border-collapse: collapse; text-align: center;">';

   board += `<tr> 
                <th>글번호</th> 
                <th>제목</th> 
                <th>작성자</th> 
             </tr>`;

  for(let item of list){
    console.log(item);
    board += `
               <tr onclick="location.href='/detail/${item.seq}'" style="cursor:pointer; border:1px solid black;">
                   <td>${item.seq}</td>
                   <td>${item.title}</td>
                   <td>${item.id}</td>
               </tr>`
  }
  board += '</table>';


  res.send(board);

});

router.post('/write', async(req, res) => {
  const {id, title, content} = req.body;
  const cntId = 'board_counter';
  const update = {};
  let countData = await BoardCount.findOne({id: 'board_counter'}).lean();

  let seq = 0;

  if(countData != null){
    seq = countData.seq;
  }

  console.log('seq : ', seq);
  seq = seq + 1;

  try{

    let result = await Board.create({seq, id, title, content});
    let object = result.toObject();
    res.json({'success': true, 'data':object});

    update['seq'] = seq;

    await BoardCount.findOneAndUpdate({id: 'board_counter'}, update,{
      new:true,
      runValidators:true,
      upsert: true
    }).lean();

  }catch(e){
    console.error(e,'CODE : ' + e.code);
  }
});

router.get('/detail/:seq', async (req, res) => {
  const seq = req.params.seq;
  let data = await Board.findOne({seq}).lean();

  console.log(data);

  if(data == null){
    res.json({'success' : false, 'data':{'info':{}, 'msg':'없는 글 입니다.'}});
  }

  let board = `<table style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                   <tr style="border:1px solid black;">
                        <th>제목</th>
                        <td>${data.title}</td>
                    </tr>
                    <tr style="border:1px solid black;">
                        <th>작성자</th>
                        <td>${data.id}</td>
                    </tr>
                    <tr style="border:1px solid black;">
                        <th>내용</th>
                        <td>${data.content}</td>
                    </tr>
                  </table>
                  `

  res.send(board);
});

router.post('/update/:seq', async(req, res) => {
  const {title, content} = req.body;
  const seq = req.params.seq;
  const update = {};
  console.log('seq', seq);

  if(title != undefined){
    update['title'] = title;
  }

  if(content != undefined){
    updata['content'] = content;
  }

  const board = await Board.findOneAndUpdate({seq}, update,{
    new:true,
    runValidators:true
  }).lean();

  if(board == null){
    res.json({'success' : false, 'msg' : '수정 실패 했습니다.'});
  }

  res.json({'success' : true, 'msg' : '수정 성공 했습니다.', data:board});
});

router.post('/del/:seq', async (req, res) => {
  const seq = req.params.seq;

  const board = await Board.findOneAndDelete({seq}).lean();

  if(board == null){
    res.json({'success': false, 'msg' : '삭제에 실패하였습니다.'});
  }

  res.json({'success': true, 'msg' : '삭제에 성공했습니다.'});

});

module.exports = router;