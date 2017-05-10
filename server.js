//require http
var http = require("http");
//require fileserver
var fs = require("fs");
//read count.txt 
var pageCount = parseInt(fs.readFileSync('./count.txt'));

//update count function
function updateCount(fileName, pageCount) {
    fs.writeFile(fileName, pageCount, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
}
//creates server
var server = http.createServer(function(req, res){
    if(req.url === "/"){
        fs.readFile("./cats.html", function(err, data){
            res.write(data); 
            //if visit home page
            pageCount = pageCount + 1; 
            //increase pageCount by one
            updateCount('./count.txt', pageCount); 
            //updates counts on count.txt with current pageCount
            res.end();
        });

    } else if (req.url === '/count'){
        fs.readFile("./count.txt", function(err, data){
            //write data to count.txt
            res.write(data); 
            res.end(); 
        });
    }
});
//listen in porta 8080
server.listen(8080);

//MAKE SURE SERVER IS LISTENING

console.log("LUKE, I AM YOUR SERVER");