
const mongoose = require('mongoose');


const beautifyUnique = require('mongoose-beautiful-unique-validation');


const autoSchema = new mongoose.Schema({
    region: Number,
    src: {
        type: String,
        unique: false
    },
    model: String,
    number: {
        type: String,
        unique: false
    },
    comment: String,
    time: String
});

autoSchema.plugin(beautifyUnique);

autoSchema.statics.publicFields = ['model', 'number'];

module.exports = mongoose.model('Auto', autoSchema);



const Auto = mongoose.model("Auto", );