import axios from 'axios';

export default function elasticQueryDate(index, start, end){
    const requestBody= {
      "size": 10000,
      "query": {
        "range": {
          "data.BaseTimeAndDate": {
            "gte": start,
            "lte": end
          }
        }
      }
    };

    //const requestURL = 'https://localhost/elasticsearch-primary/${ais_v1}/_search';
    const requestURL = `http://localhost:9200/${index}/_search`;
    return axios.post(requestURL, requestBody);
 }



