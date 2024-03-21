Firstly i made an api for which i can set the limitedrate manually , in cloutflow file , using express-rate-limiter ,
then i implemented the required logic , using a queue keeping track of number of requests stored in queue so that 
if number of requests exceed 50 , i can show "too many request try again late" with status code 429 otherwise just return the data/or call the ratelimited api. i checked it using postman .
but then i found a parameter in the header of "retry-after" which gives the time after which the the api would be able to get any more request
so i just check retry-after parameter and if it is grater than 5sec return 429
