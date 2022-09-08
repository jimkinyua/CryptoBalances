# CryptoBalances

The Function **get_Latest_USD_Portifolio_Value_For_Each_Token**() uses polymophism. If you provided with Toke parameter, it will filter the transations of that token and make 
an API call to get the latest USD value of the token. 

If not Token is provied, it will get all the tokens out of the csv, filter out the latest transaction using the timestamp column, group them and make an API call to get the latest USD value of that token

The reason I did this is to avoid repetion in my code.


The Function **get_All_Tokens_USD_Values**() also employes the concept of polymophism. When provied with a token, it will only make an API call for that Specific Token but when no token is provided, it will make an API call for all the coins in the CSV file in one API call.

