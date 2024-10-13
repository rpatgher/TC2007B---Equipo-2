// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { useNotify } from "react-admin";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//     CardElement,
//     useStripe,
//     useElements,
//     Elements,
// } from "@stripe/react-stripe-js";

// // // Load Stripe.js as an asynchronous script
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// interface CheckoutFormProps {
//     clientSecret: string;
// }

// const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret }) => {
//     const notify = useNotify();
//     const navigate = useNavigate();
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState<string | null>(null);
//     const [isProcessing, setIsProcessing] = useState(false);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         notify("Procesando el pago...", { type: "info" });

//         if (!stripe || !elements) {
//             notify("Error al cargar Stripe", { type: "error" });
//             return;
//         }
//         setIsProcessing(true);
//         const cardElement = elements.getElement(CardElement);
//         if (!cardElement) {
//             notify("Error al encontrar el elemento de tarjeta", { type: "error" });
//             setError("Error al encontrar el elemento de tarjeta");
//             setIsProcessing(false);
//             return;
//         }

//         const result = await stripe.confirmPayment({
//             elements,
//             confirmParams: {
//                 return_url: `${window.location.origin}/success`,
//             }
//         });
//         const { error } = result;

//         if (error) {
//             notify(error.message, { type: "error" });
//             setError(error.message || "Error al procesar el pago");
//         } else {
//             notify("Pago exitoso", { type: "success" });
//             navigate("/dashboard/success");
//         }
//         setIsProcessing(false);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement />
//             <button type="submit" disabled={!stripe || isProcessing}>
//                 {isProcessing ? "Procesando..." : "Pagar"}
//             </button>
//             {error && <div>{error}</div>}
//         </form>
//     );
// };

// const StripePayment = ({ amount, project, asignment }: { amount: number, project: string, asignment: string }) => {
//     const [clientSecret, setClientSecret] = useState<string | null>(null);

//     useEffect(() => {
//         // format amount to cents and stringify
//         const token = localStorage.getItem("token");
//         // Call backend to create a PaymentIntent
//         fetch(`${import.meta.env.VITE_API_URL}/api/auth/stripe`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ amount: amount * 100 }),
//         })
//             .then((res) => res.json())
//             .then((data) => setClientSecret(data.clientSecret));
//     }, []);

//     return (
//         <div>
//             <h1>Pagar con Stripe</h1>
//             {clientSecret ? (
//                 <Elements stripe={stripePromise} options={{
//                     clientSecret: clientSecret
//                 }}>
//                     <CheckoutForm clientSecret={clientSecret} />
//                 </Elements>
//             ) : (
//                 <p>Cargando...</p>
//             )}
//         </div>
//     );
// };

// export default StripePayment;


const StripePayment = ({ amount, project, asignment }: { amount: number, project: string, asignment: string }) => {
    return (
        <>
            <p>{amount}</p>
            <p>{project}</p>
            <p>{asignment}</p>
        </>
    )
}

export default StripePayment;