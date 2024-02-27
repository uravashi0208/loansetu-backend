const User = require("../model/user");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

exports.demo_data = (req, res, next) => {
    const user_name = "Supper Admin";
    const password = "123456";

    bcrypt.hash(
        password,
        saltRounds,
        function (err_pwd, hash) {
            if (err_pwd) {
                return next(err_pwd);
            } else {
                const UserData = {
                    user_name: user_name,
                    email:
                        "info@supper-admin.com",
                    password: hash,
                    role: "Admin",
                    user_status: true,
                };
                User.create(
                    UserData,
                    (
                        error,
                        userdata
                    ) => {
                        if (error) {
                            return next(
                                error
                            );
                        } else {
                            res.json({
                                response: true,
                                message:
                                    "Successfully Added the Data in Database",
                            });
                        }
                    }
                );
            }
        }
    );
};