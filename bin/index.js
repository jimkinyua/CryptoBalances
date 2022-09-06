#!/usr/bin/env node
const yargs = require('yargs');
const Reader = require('readline');
const fetch = require('node-fetch');


const apiVariables ={
    token: 'a437b4c681a49c9b45382a38c319ed0a795b9180041154d9dc5702e534e72107'
} 

var TokenUSDValues;

parameters = yargs.argv;

let get_Latest_USD_Portifolio_Value_For_Each_Token =(token) => {
        // console.log(token)
        var PortifolioValues = [];

        // if(token){ //Check If Toke Provided
            let SelectedTokenTransactions = { "token": token, "amount": 0, "timestamp": 0 };
        // }else{
            //No Token Not Provided Hence Default Values Fot Our Tokens are these.
            let BitCoinTransactions = { "token": "BTC", "amount": 0, "timestamp": 0 };
            let EheriumTransactions = { "token": "ETH", "amount": 0, "timestamp": 0 };
            let XRPTransactions = { "token": "XRP", "amount": 0, "timestamp": 0 };
        // }

       
        var lineReader = Reader.createInterface({
            input: require('fs').createReadStream('E:\\Propine\\test.csv')
        });

        lineReader.on('line', function (line) {

            var LineData = {};
            var SplitLineDataArray = line.split(','); //Split the row data using comma 

            LineData.timestamp = SplitLineDataArray[0];
            LineData.transaction_type = SplitLineDataArray[1];
            LineData.token = SplitLineDataArray[2];
            LineData.amount = SplitLineDataArray[3];

            // console.log(LineData);
            if(token && LineData.token == token){ //Check If Toke Provided
                if (LineData.timestamp > SelectedTokenTransactions.timestamp) { 
                    SelectedTokenTransactions.amount = LineData.amount;
                    SelectedTokenTransactions.timestamp = LineData.timestamp;
                }
            }else{//No Token Provided
                if (LineData.token === 'BTC') {
                    //Check if Current Line Timestamp is Greater than What is in Our BitCoinTransactions Object
                    if (LineData.timestamp > BitCoinTransactions.timestamp) {   
                        BitCoinTransactions.amount = LineData.amount;
                        BitCoinTransactions.timestamp = LineData.timestamp;
                    }
                }
                else if (LineData.token === 'ETH') {
                    //Check if Current Line Timestamp is Greater than What is in Our EheriumTransactions Object
                    if (LineData.timestamp > EheriumTransactions.timestamp) {
                        EheriumTransactions.amount = LineData.amount;
                        EheriumTransactions.timestamp = LineData.timestamp
                    }
                }
                else if (LineData.token === 'XRP') {
                    //Check if Current Line Timestamp is Greater than What is in Our XRPTransactions Object
                    if (LineData.timestamp > XRPTransactions.timestamp) {
                        XRPTransactions.amount = LineData.amount;
                        XRPTransactions.timestamp = LineData.timestamp;
                    }
                }
            }
           
        }

        );
        lineReader.on('close', function () {

            if(token && SelectedTokenTransactions.timestamp <= 0){ //No Toke Found Hence no need to make the API call
                return console.log('No Coin Found');
            }

            let ApiResult = get_All_Tokens_USD_Values(token);

            ApiResult.then( (response)=> {
                response.json().then((USD_Values)=>{

                    if(token){
                        // console.log(USD_Values);
                        SelectedTokenTransactions.amount = SelectedTokenTransactions.amount * USD_Values.USD;
                        PortifolioValues.push(SelectedTokenTransactions);
                    }else{
                            //Do the Math to Covert to USD
                            EheriumTransactions.amount = EheriumTransactions.amount * USD_Values.ETH.USD;
                            BitCoinTransactions.amount = BitCoinTransactions.amount * USD_Values.BTC.USD;
                            XRPTransactions.amount = XRPTransactions.amount * USD_Values.XRP.USD;

                            // console.log(XRPTransactions);
                            PortifolioValues.push(EheriumTransactions);
                            PortifolioValues.push(BitCoinTransactions);
                            PortifolioValues.push(XRPTransactions);
                    }
                
                //Log the Latest Portifolio Values to the User
                console.table(PortifolioValues)
                })
            }).catch((err)=> {console.log(err.message)})

        });
}

// function to fetch the USD Values from CryptoCompare
let get_All_Tokens_USD_Values = (token)=> {
    if(token){
        var cryptoURL = `https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=USD&api_key=${apiVariables.token}`;
    }else{
        var cryptoURL = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,XRP,ETH&tsyms=USD&api_key=${apiVariables.token}`;
    }
    return fetch(cryptoURL)
}

// if(args.token === undefined && args.date === undefined){
    // get_Latest_USD_Portifolio_Value_For_Each_Token();
// }else 
if (parameters.token){
    // console.log(parameters.token)
    get_Latest_USD_Portifolio_Value_For_Each_Token(parameters.token);
}
