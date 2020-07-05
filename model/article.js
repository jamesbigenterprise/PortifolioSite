const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const articleSchema = new Schema({
    createdby:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:false//true
    },
    creation:{
        type:Date,
        required:true
    },
    article:[   
            { 
                value:{
                    type: String,
                },
                position:{
                    type: Number,
                },
                name:{
                    type: String,
                }
            }            
        ]
});


articleSchema.methods.addElement = function (value, position, name) {
        
    this.article.push({
            //WHERE THE MAGIC HAPPENS
            value: value,
            position:position,
            name: name
        });
};

module.exports = mongoose.model('Article', articleSchema);
