const { default: mongoose } = require("mongoose")

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter name"],
        },
        email:{
            type: String,
            required: [true, "Please enter Email Address"],
        },
        phone:{
            type: String,
            required: false
        }

    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;