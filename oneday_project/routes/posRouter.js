const express = require("express")
const router = express.Router();

const {tbl_order, tbl_product } = require("../models/index");

router.get("/detail",(req,res)=>{

    const o_seq = req.query.o_seq;

    tbl_order
    .findOne({
        where : {o_seq},
        include : {model:tbl_product},
    })
    .then(result=>{
        console.log(result);
        res.render("detail",{ORDER:result});
    });

});

router.get("/delete",(req,res)=>{
    const o_seq = req.query.o_seq;
    tbl_order

    .destroy({
        where: {o_seq},
    })
    .then(() => {
        res.redirect("/");
    });
});

router.get("/update",(req,res)=>{
    const o_seq = req.query.o_seq

    tbl_order.findByPk(o_seq)
    .then(result=>{
        res.render("write",{ORDER:result});
    });
});

router.post("/update",(req,res)=>{
    const o_seq = req.query.o_seq

    req.body.o_seq = o_seq;
    tbl_order.update(req.body,{where : {o_seq}})
    .then(result=>{
        res.redirect("/");
    });
});

router.post("/product",(req,res)=>{
    tbl_product.create(req.body).then((result)=>{
        res.redirect("/order/detail?o_seq=" + req.body.p_code);
    });
});


router.get("/product/delete/:rid",(req,res)=>{
    const rid = req.params.rid;

    tbl_product.findByPk(rid)
    .then((result)=>{
        const code = result.p_cde;
        tbl_product.destroy( {where :{id : rid} })
        .then(()=>{
            res.redirect(`/order/detail?o_seq=${p_code}`);
        });
    });
});

module.exports = router;