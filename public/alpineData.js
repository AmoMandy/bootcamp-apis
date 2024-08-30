document.addEventListener('alpine:init', () => {
    // Word Game Widget
    Alpine.data('wordGameWidget', () => ({
        sentence: '',
        result: {
            longestWord: '',
            shortestWord: '',
            sum: ''
        },
        async analyzeSentence() {
            try {
                const response = await axios.get(`/api/word_game?sentence=${this.sentence}`);
                this.result = response.data;
            } catch (error) {
                console.error('Error analyzing sentence:', error);
            }
        }
    }));

    // Phone Bill Widget
    Alpine.data('phoneBillWidget', () => ({
        bill: '',
        total: '',
        callPrice: 2.75, // Default price per call
        smsPrice: 0.65,  // Default price per SMS
        priceMessage: '',
        billMessage: '',

        async getTotalBill() {
            try {
                const calls = this.bill.split(',').filter(s => s.trim() === 'call').length;
                const sms = this.bill.split(',').filter(s => s.trim() === 'sms').length;
                const total = (calls * this.callPrice) + (sms * this.smsPrice);
                this.billMessage = `Total phone bill is R${total.toFixed(2)}`;

                const response = await axios.post('/api/phonebill/total', { bill: this.bill });
                this.total = response.data.total;
            } catch (error) {
                console.error('Error calculating total bill:', error);
            }
        },

        async setPrice(type, price) {
            try {
                const response = await axios.post('/api/phonebill/price', { type, price });
                this.priceMessage = response.data.message;
            } catch (error) {
                console.error('Error setting price:', error);
            }
        }
    }));

    // Enough Airtime Widget
    Alpine.data('enoughAirtimeWidget', () => ({
        usage: '',
        available: '',
        result: '',
        airtimeMessage: '',

        async checkEnoughAirtime() {
            try {
                const calls = this.usage.split(',').filter(s => s.trim() === 'call').length;
                const sms = this.usage.split(',').filter(s => s.trim() === 'sms').length;
                const totalCost = (calls * 2.75) + (sms * 0.65); // Using default prices
                const remainingAirtime = this.available - totalCost;

                this.airtimeMessage = remainingAirtime >= 0
                    ? `You have enough airtime. Remaining: R${remainingAirtime.toFixed(2)}`
                    : 'Sorry, you do not have enough airtime.';

                const response = await axios.post('/api/enough', { usage: this.usage, available: this.available });
                this.result = response.data.result;
            } catch (error) {
                console.error('Error checking airtime:', error);
            }
        }
    }));
});
