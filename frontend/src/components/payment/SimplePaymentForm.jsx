import React, { useState } from 'react';

const SimplePaymentForm = ({ onSuccess, amount }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Format card number with spaces (4242 4242 4242 4242)
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date (MM/YY)
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const validateCard = () => {
    const cardNumberClean = cardNumber.replace(/\s/g, '');
    
    if (cardNumberClean.length !== 16) {
      setError('Card number must be 16 digits');
      return false;
    }

    if (!expiryDate || expiryDate.length !== 5) {
      setError('Please enter valid expiry date (MM/YY)');
      return false;
    }

    const [month, year] = expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (parseInt(month) < 1 || parseInt(month) > 12) {
      setError('Invalid expiry month');
      return false;
    }

    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      setError('Card has expired');
      return false;
    }

    if (cvv.length !== 3) {
      setError('CVV must be 3 digits');
      return false;
    }

    if (!cardHolder.trim()) {
      setError('Please enter cardholder name');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateCard()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Create mock payment intent
      const mockPaymentIntent = {
        id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'succeeded',
        amount: amount,
        currency: 'pkr',
        created: Math.floor(Date.now() / 1000),
        charges: {
          data: [{
            id: `ch_${Date.now()}`,
            amount: amount,
            currency: 'pkr',
            status: 'succeeded',
            payment_method_details: {
              card: {
                brand: 'visa',
                last4: cardNumber.slice(-4),
                exp_month: parseInt(expiryDate.split('/')[0]),
                exp_year: parseInt('20' + expiryDate.split('/')[1])
              }
            }
          }]
        }
      };

      console.log('✅ Payment Successful:', mockPaymentIntent);
      onSuccess(mockPaymentIntent);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Card Number */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Card Number
        </label>
        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="4242 4242 4242 4242"
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-mono text-lg"
          required
        />
        {/* <p className="text-xs text-slate-500 mt-1">Test card: 4242 4242 4242 4242</p> */}
      </div>

      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          placeholder="M Ahil"
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 uppercase"
          required
        />
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Expiry Date
          </label>
          <input
            type="text"
            value={expiryDate}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-mono text-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            CVV
          </label>
          <input
            type="text"
            value={cvv}
            onChange={handleCvvChange}
            placeholder="123"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 font-mono text-lg"
            required
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm font-medium">⚠️ {error}</p>
        </div>
      )}

      {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          <strong>✓ Secure Payment:</strong> Your payment information is encrypted and secure
        </p>
      </div> */}

      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition ${
          isProcessing
            ? 'bg-slate-400 cursor-not-allowed'
            : 'bg-slate-900 hover:bg-slate-800 active:scale-95'
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Payment...
          </span>
        ) : (
          `Pay Rs ${(amount / 100).toLocaleString('en-PK')}`
        )}
      </button>
    </form>
  );
};

export default SimplePaymentForm;