import myKhaltiKey from "./KhaltiKey";

let config = KhaltiPayConfig(  
    publicKey = myKhaltiKey.publicTestKey,  
    pidx = "<your_pidx>",  
    returnUrl = Uri.parse("your_return_url"),  
    environment = Environment.TEST  
);

export default config;