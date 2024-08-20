import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());


const prices = {
    call: 2.75,
    sms: 0.65
};

function longestWord(sentence) {
    let arr = sentence.split(' ')
    let sum = 0;
    let longest = '';
    for(let i=0;i<arr.length;i++){
      let word = arr[i];
      if (word.length >= sum){
        sum = word.length;
        longest = word;
      }
    }   return longest;
  }
  
  function shortestWord(sentence) {
     let arr = sentence.split(' ');
    let sum = 3;
    let shortest = '';
    for(let i=0;i<arr.length;i++){
      let word = arr[i];
      if (word.length <= sum){
        sum = word.length;
       shortest = word;
      }
    }   return shortest;
  }
  
  function wordLengths(sentence){
   let arr = sentence.split(' ')
   let words =  arr.map(w => w.length);
    let sum = 0;
    for(let i=0;i<words.length;i++){
      sum = sum + words[i]
      }
     return sum;
  }

function calculateTotalPhoneBill(data) {
    const actions = data.split(', ');
    let callCount = 0;
    let smsCount = 0;

    actions.forEach(action => {
        if (action === 'call') {
            callCount++;
        } else if (action === 'sms') {
            smsCount++;
        }
    });

    const callCost = callCount * 2.75;
    const smsCost = smsCount * 0.65;
    const totalBill = callCost + smsCost;

    return 'R' + totalBill.toFixed(2);
}

 function checkEnoughAirtime(usage, available) {
    const items = usage.split(',');
    let total = 0;

    items.forEach(item => {
        if (item === 'call') {
            total += prices.call;
        } else if (item === 'sms') {
            total += prices.sms;
        }
    });

    return available - total;
}


app.get('/api/word_game', function (httpRequest, httpResponse) {
    const sentence = httpRequest.query.sentence;
    // console.log(word);
    // let wordGame = game(word)
    // const sum = httpRequest.query.sum;
    httpResponse.json({
        longestWord: longestWord(sentence),
        shortestWord: shortestWord(sentence),
        sum: wordLengths(sentence),

    });

    // const analysis = analyzeSentence(sentence);
    // res.json(analysis);
});


app.post('/api/phonebill/total', function (httpRequest, httpResponse) {
    const data = httpRequest.body.bill;
    const total = calculateTotalPhoneBill(data);
    httpResponse.json({
        total: total
    });
});

app.get('/api/phonebill/prices', function (httpRequest, httpResponse) {
    httpResponse.json({
        call: 2.75,
        sms: 0.65,
    });
});

app.post('/api/phonebill/price', function (httpRequest, httpResponse) {
    const phonebill = httpRequest.body.phonebill;
    const price = httpRequest.body.price;
    httpResponse.json({
        status: "success",
        message: "The call was set to 2.85"
    });
});


app.post('/api/enough', function (httpRequest, httpResponse) {
    const { usage, available } = httpRequest.body;
    const result = checkEnoughAirtime(usage, available);
    httpResponse.json({
        result
    });
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
})
