// import React, { useState, useEffect } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { confirmCardPayment } from '../../utils/mockStripe';

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: '#111827',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
//       fontSize: '16px',
//       fontSmoothing: 'antialiased',
//       '::placeholder': {
//         color: '#9ca3af',
//       },
//     },
//     invalid: {
//       color: '#ef4444',
//       iconColor: '#ef4444',
//     },
//   },
//   hidePostalCode: true,
// };

// const StripeCheckoutForm = ({ onSuccess, amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [clientSecret, setClientSecret] = useState(null);

//   useEffect(() => {
//     if (!amount || amount < 50) {
//       setErrorMessage('Invalid amount');
//       return;
//     }

//     const createPaymentIntent = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             amount: Math.round(amount),
//             currency: 'usd',
//           }),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || 'Failed to create payment intent');
//         }

//         const data = await response.json();
//         setClientSecret(data.clientSecret);
//       } catch (error) {
//         setErrorMessage(`Failed to initialize payment: ${error.message}`);
//       }
//     };

//     createPaymentIntent();
//   }, [amount]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErrorMessage(null);

//     if (!clientSecret) {
//       setErrorMessage('Payment system is not ready. Please wait...');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const cardElement = elements?.getElement(CardElement);

//       if (!cardElement) {
//         throw new Error('Card element not found');
//       }

//       const { error, paymentIntent } = await confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       if (error) {
//         setErrorMessage(error.message);
//         setIsLoading(false);
//       } else if (paymentIntent.status === 'succeeded') {
//         onSuccess(paymentIntent);
//       } else {
//         setErrorMessage('Payment could not be completed. Please try again.');
//         setIsLoading(false);
//       }
//     } catch (error) {
//       setErrorMessage(`Error: ${error.message}`);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
//           Card Information
//         </label>
//         <div className="p-4 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
//           <CardElement options={CARD_ELEMENT_OPTIONS} />
//         </div>
//       </div>

//       {errorMessage && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-700 text-sm font-medium">⚠️ {errorMessage}</p>
//         </div>
//       )}

//       <button
//         type="submit"
//         disabled={isLoading || !clientSecret}
//         className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition ${isLoading || !clientSecret
//           ? 'bg-slate-300 cursor-not-allowed'
//           : 'bg-slate-900 hover:bg-slate-800 active:scale-95'
//           }`}
//       >
//         {isLoading ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Processing...
//           </span>
//         ) : (
//           `Pay $${(amount / 100).toFixed(2)}`
//         )}
//       </button>
//     </form>
//   );
// };

// export default StripeCheckoutForm;














// import React, { useState, useEffect } from 'react';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: '#111827',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
//       fontSize: '16px',
//       fontSmoothing: 'antialiased',
//       '::placeholder': {
//         color: '#9ca3af',
//       },
//     },
//     invalid: {
//       color: '#ef4444',
//       iconColor: '#ef4444',
//     },
//   },
// };

// const StripeCheckoutForm = ({ onSuccess, amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [clientSecret, setClientSecret] = useState(null);
//   const [cardComplete, setCardComplete] = useState({
//     cardNumber: false,
//     cardExpiry: false,
//     cardCvc: false,
//   });

//   useEffect(() => {
//     if (!amount || amount < 50) {
//       setErrorMessage('Invalid amount');
//       return;
//     }

//     const createPaymentIntent = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             amount: Math.round(amount),
//             currency: 'usd',
//           }),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.error || 'Failed to create payment intent');
//         }

//         const data = await response.json();
//         console.log('✅ Payment Intent Created:', data.id);
//         setClientSecret(data.clientSecret);
//       } catch (error) {
//         console.error('❌ Payment Intent Error:', error);
//         setErrorMessage(`Failed to initialize payment: ${error.message}`);
//       }
//     };

//     createPaymentIntent();
//   }, [amount]);

//   const handleCardChange = (elementType) => (event) => {
//     setCardComplete(prev => ({
//       ...prev,
//       [elementType]: event.complete
//     }));
    
//     if (event.error) {
//       setErrorMessage(event.error.message);
//     } else {
//       setErrorMessage(null);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setErrorMessage(null);

//     if (!stripe || !elements || !clientSecret) {
//       setErrorMessage('Payment system is not ready. Please wait...');
//       return;
//     }

//     // Check if all card fields are complete
//     if (!cardComplete.cardNumber || !cardComplete.cardExpiry || !cardComplete.cardCvc) {
//       setErrorMessage('Please complete all card fields');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const cardNumberElement = elements.getElement(CardNumberElement);

//       if (!cardNumberElement) {
//         throw new Error('Card element not found');
//       }

//       console.log('🔄 Confirming payment...');

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardNumberElement,
//         },
//       });

//       if (error) {
//         console.error('❌ Payment Error:', error);
//         setErrorMessage(error.message);
//         setIsLoading(false);
//       } else if (paymentIntent.status === 'succeeded') {
//         console.log('✅ Payment Succeeded:', paymentIntent.id);
//         onSuccess(paymentIntent);
//       } else {
//         console.warn('⚠️ Payment Status:', paymentIntent.status);
//         setErrorMessage('Payment could not be completed. Please try again.');
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error('❌ Payment Exception:', error);
//       setErrorMessage(`Error: ${error.message}`);
//       setIsLoading(false);
//     }
//   };

//   const allFieldsComplete = cardComplete.cardNumber && cardComplete.cardExpiry && cardComplete.cardCvc;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
//           Card Information
//         </label>
        
//         {/* Card Number */}
//         <div className="mb-3">
//           <div className="p-4 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
//             <CardNumberElement 
//               options={CARD_ELEMENT_OPTIONS}
//               onChange={handleCardChange('cardNumber')}
//             />
//           </div>
//           <p className="text-xs text-slate-500 mt-1">Test card: 4242 4242 4242 4242</p>
//         </div>

//         {/* Expiry and CVC */}
//         <div className="grid grid-cols-2 gap-3">
//           <div className="p-4 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
//             <CardExpiryElement 
//               options={CARD_ELEMENT_OPTIONS}
//               onChange={handleCardChange('cardExpiry')}
//             />
//           </div>
//           <div className="p-4 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
//             <CardCvcElement 
//               options={CARD_ELEMENT_OPTIONS}
//               onChange={handleCardChange('cardCvc')}
//             />
//           </div>
//         </div>
//       </div>

//       {errorMessage && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-700 text-sm font-medium">⚠️ {errorMessage}</p>
//         </div>
//       )}

//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//         <p className="text-xs text-blue-800">
//           <strong>✓ Test Mode:</strong> Use card 4242 4242 4242 4242 with any future expiry and any 3-digit CVC
//         </p>
//       </div>

//       <button
//         type="submit"
//         disabled={isLoading || !clientSecret || !stripe || !allFieldsComplete}
//         className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition ${
//           isLoading || !clientSecret || !stripe || !allFieldsComplete
//             ? 'bg-slate-300 cursor-not-allowed'
//             : 'bg-slate-900 hover:bg-slate-800 active:scale-95'
//         }`}
//       >
//         {isLoading ? (
//           <span className="flex items-center justify-center gap-2">
//             <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Processing...
//           </span>
//         ) : !clientSecret ? (
//           'Initializing...'
//         ) : !allFieldsComplete ? (
//           'Complete Card Details'
//         ) : (
//           `Pay $${(amount / 100).toFixed(2)}`
//         )}
//       </button>

//       {!stripe && (
//         <p className="text-xs text-center text-slate-500">Loading payment system...</p>
//       )}
//     </form>
//   );
// };

// export default StripeCheckoutForm;









 ////////////// Second Claude


 import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// SINGLE CARD ELEMENT - Much more reliable than split elements
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#111827',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#9ca3af',
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444',
    },
  },
  hidePostalCode: false,
};

const StripeCheckoutForm = ({ onSuccess, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (!amount || amount < 50) {
      setErrorMessage('Invalid amount');
      setIsInitializing(false);
      return;
    }

    const createPaymentIntent = async () => {
      try {
        console.log('💳 Creating payment intent for amount:', amount);
        
        const response = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(amount),
            currency: 'usd',
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create payment intent');
        }

        const data = await response.json();
        console.log('✅ Payment Intent Created:', data.id);
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('❌ Payment Intent Error:', error);
        setErrorMessage(`Failed to initialize payment: ${error.message}`);
      } finally {
        setIsInitializing(false);
      }
    };

    createPaymentIntent();
  }, [amount]);

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    
    if (event.error) {
      setErrorMessage(event.error.message);
    } else {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!stripe || !elements) {
      setErrorMessage('Stripe has not loaded yet. Please wait...');
      return;
    }

    if (!clientSecret) {
      setErrorMessage('Payment system is not ready. Please wait...');
      return;
    }

    if (!cardComplete) {
      setErrorMessage('Please complete all card fields');
      return;
    }

    setIsLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error('Card element not found');
      }

      console.log('🔄 Confirming payment...');

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error('❌ Payment Error:', error);
        setErrorMessage(error.message);
        setIsLoading(false);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('✅ Payment Succeeded:', paymentIntent.id);
        onSuccess(paymentIntent);
      } else {
        console.warn('⚠️ Payment Status:', paymentIntent.status);
        setErrorMessage('Payment could not be completed. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('❌ Payment Exception:', error);
      setErrorMessage(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  // Show loading state while Stripe initializes
  if (!stripe || !elements || isInitializing) {
    return (
      <div className="space-y-4">
        <div className="p-8 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-blue-900 font-semibold">Initializing secure payment...</p>
          <p className="text-blue-600 text-sm mt-2">Please wait while we set up Stripe</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
          Card Information
        </label>
        
        {/* Single Card Element - All fields in one */}
        <div className="p-4 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
          <CardElement 
            options={CARD_ELEMENT_OPTIONS}
            onChange={handleCardChange}
          />
        </div>
        
        <p className="text-xs text-slate-500 mt-2">
          🔒 Test card: <span className="font-mono font-semibold">4242 4242 4242 4242</span>
          <span className="mx-2">•</span>
          Any future date • Any 3-digit CVC
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm font-medium">⚠️ {errorMessage}</p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          <strong>✓ Secure Payment:</strong> Your card information is encrypted and never stored on our servers
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !clientSecret || !stripe || !cardComplete}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition ${
          isLoading || !clientSecret || !stripe || !cardComplete
            ? 'bg-slate-300 cursor-not-allowed'
            : 'bg-slate-900 hover:bg-slate-800 active:scale-95'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Payment...
          </span>
        ) : !clientSecret ? (
          'Initializing...'
        ) : !cardComplete ? (
          'Complete Card Details'
        ) : (
          `Pay $${(amount / 100).toFixed(2)}`
        )}
      </button>

      {!stripe && (
        <p className="text-xs text-center text-slate-500">⏳ Loading Stripe...</p>
      )}
    </form>
  );
};

export default StripeCheckoutForm;