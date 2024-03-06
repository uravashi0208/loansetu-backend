const User = require("../model/user");
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/staff/'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
}); // You can change this to store files on disk if needed
const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

const fileFilter = (req, file, cb) => {
    console.log("file.mimetype :",file.mimetype);
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
    cb(new Error('Invalid file type. Only images (JPEG, JPG, PNG, GIF) are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

exports.update_profile = (req, res, next) => {

    User.findOne({ _id: req.body.userId })
    .then(async (foundUser) => {
        if (foundUser) {
            const updatedData = {
                email:req.body.email,
                user_name:req.body.user_name
            };
            await User.findOneAndUpdate({ _id: req.body.userId }, updatedData, { new: false });
            res.json({
                response: true,
                message: "Profile Updated.",
                data:foundUser
            });
        } else {
            res.json({
                response: false,
                message: "User not found.",
            });
        }
    })
    .catch((error) => {
        return next(error);
    });
};

exports.add_staff = upload.single('image'), async (req, res, next) => {
    try {
        // Check if email or phone number already exists
        const existingUser = await User.findOne({
            $or: [{ email: req.body.email }, { phone: req.body.phone }],
        });

        if (existingUser) {
            return res.json({
                response: false,
                message: "Email or phone number already exists.",
            });
        }

        const avatarData = req.file;
        if (!avatarData || !avatarData.buffer) {
            return res.json({
                response: false,
                message: "No file uploaded or invalid file format.",
            });
        }

        const updatedData = {
            user_name: req.body.first_name + ' ' + req.body.last_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.isAdmin ? 'Admin' : 'Staff',
            user_status: true,
            isAdmin: req.body.isAdmin,
            isStaff: req.body.isStaff,
            isSendWelcomeMail: req.body.isSendWelcomeMail,
            rate: req.body.rate,
            phone: req.body.phone,
            emailsignature: req.body.emailsignature,
            image: avatarData.buffer
        };

        const updatedUser = await User.create(updatedData);

        res.json({
            response: true,
            message: "Profile Updated.",
            data: updatedUser,
        });
    } catch (error) {
        return next(error);
    }
};


exports.getAllStaff = (req, res, next) => {
    User.find({}).then((foundUser) => {
        console.log("foundUser :",foundUser);
    });
};