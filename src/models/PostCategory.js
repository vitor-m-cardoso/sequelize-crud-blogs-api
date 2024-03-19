const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  PostCategory.associate = (model) => {
    model.Category.belongsToMany(model.BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    model.BlogPost.belongsToMany(model.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  };

  return PostCategory;
};

module.exports = PostCategoryModel;
