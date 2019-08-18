let  express = require('express');
let app = express();
app.use(express.static(__dirname));
app.get('/eventSource',function(req,res){
});
app.listen(8889);