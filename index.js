//using express to create server (instead of https)
const express=require('express');
const app=express();
const port=8000;

app.listen(port,function(error){
    if(error)
    {
        // console.log('Error:',error);
        // or
        console.log(`Error: $(error)`);
    }
    console.log(`Server is running on the port: ${port}`);
})