module.exports = (sequelize, DataTypes) =>{
	const order = sequelize.define("tbl_order",{
		// seq
		o_seq : {
			type:DataTypes.STRING(10),
			primaryKey:true,
		},
		// 테이블id
		o_table : {
			type:DataTypes.STRING(10),
			allowNull: false,
		},
		// 상품코드
		o_pcode : {
			type:DataTypes.INTEGER,
			allowNull: false,
		},
		// 판매단가
		o_price : {
			type:DataTypes.INTEGER,
			allowNull: false,
		},
		// 판매수량
		o_count : {
			type:DataTypes.INTEGER,
			allowNull: false,
		},
		// 판매금액
		o_total : {
			type:DataTypes.INTEGER,
			allowNull: false,
		},
		// 고객id
		o_buyer : {
			type:DataTypes.STRING(10),
			allowNull: false,
		},
	});
	return order;

};