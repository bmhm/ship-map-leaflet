import axios from 'axios';

export default function elasticQueryLastMonth(index){
    const requestBody= {
      "size": 10000,
      "query": {
        "range": {
          "data.BaseTimeAndDate": {
            "gte": "now-1M/M",
            "lte": "now/d"
          }
        }
      }
    };

    const requestURL = `http://localhost:9200/${index}/_search`;
    return axios.post(requestURL, requestBody);
 }