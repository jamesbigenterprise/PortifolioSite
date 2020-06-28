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
                htmltype:{
                    type: String,
                },
                position:{
                    type: Number,
                },
            }            
        ]
});


articleSchema.methods.addElement = function (value, htmltype, position) {
        
    this.article.push({
            //WHERE THE MAGIC HAPPENS
            value: value,
            htmltype: htmltype,
            position:position
        });
};

module.exports = mongoose.model('Article', articleSchema);
