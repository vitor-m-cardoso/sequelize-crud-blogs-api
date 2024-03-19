const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  User.associate = (model) => {
    User.hasMany(model.BlogPost, {
      foreignKey: 'user_id', as: 'blogPosts'
    });
  };

  return User;
};

module.exports = UserModel;
