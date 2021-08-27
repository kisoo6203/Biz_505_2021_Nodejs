const express = require("express")
const router = express.Router();

const {tbl_pos, tbl_product } = require("../models/index");

router.get("/detail",(req,res)=>{

    const o_seq = req.query.o_seq;

    tbl_pos
    .findOne({
        where : {o_seq},
        include : {model:tbl_product},
    })
    .then(result=>{
        console.log(result);
        res.render("detail",{POS:result});
    });

});

router.get("/delete",(req,res)=>{
    const b_id = req.query.b_id;
    tbl_bbs

    .destroy({
        where: {b_id},
    })
    .then(() => {
        res.redirect("/");
    });
});

router.get("/update",(req,res)=>{
    const b_id = req.query.b_id

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


router.get("/reply/delete/:rid",(req,res)=>{
    const rid = req.params.rid;

    tbl_reply.findByPk(rid)
    .then((result)=>{
        const postId = result.r_postId;
        tbl_reply.destroy( {where :{id : rid} })
        .then(()=>{
            res.redirect(`/bbs/detail?b_id=${postId}`);
        });
    });
});

module.exports = router;