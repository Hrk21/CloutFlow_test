const express = require("express");
const app = express();
const axios = require("axios")
// const globle = require("globle");


// requestQueue = [];

async function requestWithRateLimit(url) {
  let response;
//   console.log(response.headers);
try{
     response = await axios.get(url);
}
 catch(e){
    // console.log(e.response.headers);
    response = e.response;
    
    if (response.status === 429) {
    const secondsToWait = Number(response.headers["retry-after"])
    // console.log(secondsToWait);
    if(secondsToWait >= 5){
        return {status : 429};
    }
    await new Promise(resolve => setTimeout(resolve, secondsToWait * 1000))
    return requestWithRateLimit(url)

    //can directly do by checking retry after 
  }
 }
  

    // requestQueue.shift();
  
  return response

}

app.get("/", async(req, res) => {
    // if(requestQueue.length >= 50){
        
    //     return res.status(429).send("Too many request try again later");

    // }

    // requestQueue.push(req.data);
    const response = await requestWithRateLimit("http://localhost:5000/api");
    if(response.status == 429){
          return res.status(429).send("Too many request try again later");
    }
    res.send(response.data);
    // console.log(requestQueue);
    //problem is now we have to pop out the elemet from queue and hit our ratelimited api 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});