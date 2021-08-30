module.exports = (sequelize, DataTypes) =>{
	const product = sequelize.define("tbl_product",{
		// 상품코드
		p_code : {
			type:DataTypes.STRING(10),
			primaryKey:true,
		},
		// 상품명
		p_name : {
			type:DataTypes.STRING(30),
			allowNull: false,
		},
		// 상품단가
		p_price : {
			type:DataTypes.INTEGER,
			allowNull: false,
		},
		// 세부설명
		p_rem : {
			type:DataTypes.STRING(255),
			
		},
		
	});
	product.associate = (models)=>{
		product.hasMany(models.tbl_order, {foreignKey: "o_pcode" });
	};
	return product;
	
};
