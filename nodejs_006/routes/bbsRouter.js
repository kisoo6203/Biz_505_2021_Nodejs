const express = require("express")
const router = express.Router();
// JS,  nodejs 에서 날짜 시간을 취급하는 
// 가장  많이 사용되는 middleware
const moment = require("moment");

const {tbl_bbs, tbl_reply } = require("../models/index");

/**
 * 설정된 root get는
 * URL에서 localhost:3000/bbs/write요청할때
 * 응답할 함수
 */
router.get("/write",(req,res)=>{

    const BBS = {
        b_date : moment().format("YYYY[-]MM[-]DD"),
        b_time : moment().format("HH:mm:ss"),
    };

    res.render("write", {BBS});
});

router.post("/write",(req,res)=>{
    // form을 통해서 POST로 전송되어온 데이터는
    // req.body에 담겨서 온다
    tbl_bbs.create(req.body)
    .then(result=>res.redirect("/"));
});

router.get("/detail",(req,res)=>{
    // list에서 게시물을 클릭했을 때
    // 게시물의 id(b_id)값을 queryString으로 가지고
    // 여기에 도달한다
    const b_id = req.query.b_id;

    // PK를 기준으로 1개의 데이터를 추출하라
    // tbl_bbs.findByPk(b_id).then(result=>{
    //     console.table(result);
    //     res.render("detail", {BBS: result});
    // });

    // tbl_bbs에서 b_id 칼럼값으로 데이터를 1개 SELECT하고
    // tbl_reply의 r_postId = b_id 로 WHERE를 실행하여
    // tbl_reply를 SELECT하고 그 list를 함께 묶어서 결과로 달라
    tbl_bbs.findOne({
        where : {b_id},
        include : {model:tbl_reply},
    })
    .then(result=>{
        console.log(result);
        res.render("detail",{BBS:result});
    });

});

router.get("/delete",(req,res)=>{
    const b_id = req.query.b_id;
    tbl_bbs
    // 데이터를 삭제
    .destroy({
        // b_id 칼럼의 값이 변수 b_id에 담긴 값과 같으면
        where: {b_id},
    })
    .then(() => {
        res.redirect("/");
    });
});

router.get("/update",(req,res)=>{
    const b_id = req.query.b_id

    // PK 또는 일반 칼럼에 조건을 주어 1개의 데이터를
    // SELECT 할때
    // tbl_bbs.findOnde({
    //     where : {b_id},
    // });

    tbl_bbs.findByPk(b_id)
    .then(result=>{
        res.render("write",{BBS:result});
    });
});

router.post("/update",(req,res)=>{
    const b_id = req.query.b_id

    req.body.b_id = b_id;
    tbl_bbs.update(req.body,{where : {b_id}})
    .then(result=>{
        res.redirect("/");
    });
});

router.post("/reply",(req,res)=>{
    tbl_reply.create(req.body).then((result)=>{
        res.redirect("/bbs/detail?b_id=" + req.body.r_postId);
    });
});

module.exports = router;