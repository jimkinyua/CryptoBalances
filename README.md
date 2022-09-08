# CryptoBalances

The Function get_Latest_USD_Portifolio_Value_For_Each_Token() uses polymopyism. If you provided with Toke parameter, it will filter the transations of that token and make 
an API call to get the latest USD value of the token. 

If not Token is provied, it will get all the tokens out of the csv, filter out the latest transaction using the timestamp column, group them and make an API call to get the latest USD value of that token

The reason I did this is to avoid repetion in my code.
