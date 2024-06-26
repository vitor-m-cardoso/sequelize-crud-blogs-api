const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'categories',
  });

  return Category;
};

module.exports = CategoryModel;
