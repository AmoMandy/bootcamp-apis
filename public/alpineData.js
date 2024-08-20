document.addEventListener('alpine:init', () => {
    Alpine.data('wordGameWidget', () => ({
        sentence: '',
        result: {
            longestWord: '',
            shortestWord: '',
            sum: ''
        },
        async analyzeSentence() {
            const response = await axios.get(`/api/word_game?sentence=${this.sentence}`);
            this.result = response.data;
        }
    }));

    Alpine.data('phoneBillWidget', () => ({
        bill: '',
        total: '',
        callPrice: 0,
        smsPrice: 0,
        priceMessage: '',
        async getTotalBill() {
            const response = await axios.post('/api/phonebill/total', { bill: this.bill });
            this.total = response.data.total;
            const calls = this.phoneString.split(',').filter(s => s.trim() === 'call').length;
            const sms = this.phoneString.split(',').filter(s => s.trim() === 'sms').length;
            const total = (calls * 2.75) + (sms * 0.65);
            this.billMessage = `Total phone bill is R${total.toFixed(2)}`;
        },
        async setPrice(type, price) {
            const response = await axios.post('/api/phonebill/price', { type, price });
            this.priceMessage = response.data.message;
        }
    }));

    Alpine.data('enoughAirtimeWidget', () => ({
        usage: '',
        available: '',
        result: '',
        async checkEnoughAirtime() {
            const response = await axios.post('/api/enough', { usage: this.usage, available: this.available });
            this.result = response.data.result;
            const calls = this.usageString.split(',').filter(s => s.trim() === 'call').length;
            const sms = this.usageString.split(',').filter(s => s.trim() === 'sms').length;
            const totalCost = (calls * 2.75) + (sms * 0.65);
            const remainingAirtime = this.availableAirtime - totalCost;
            this.airtimeMessage = remainingAirtime >= 0 ?
                `You have enough airtime. Remaining: R${remainingAirtime.toFixed(2)}` :
                'Sorry, you do not have enough airtime.';
        }
    }));
});