import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotify } from 'react-admin';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalDetails {
    payer?: {
        email_address?: string;
        name?: {
            given_name?: string;
        };
    };
    [key: string]: any;
}

interface PayPalPaymentProps {
    amount: string | number;
    project?: string;
    asignment?: string;
}

const PayPalPayment: React.FC<PayPalPaymentProps> = ({ amount, project, asignment }) => {
    const notify = useNotify();
    const navigate = useNavigate();

    return (
        <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "MXN" }}>
            <PayPalButtons
                key={amount}
                style={{ 
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal',
                }}

                createOrder={(_, actions) => {
                    if (!actions || !actions.order) {
                        notify('Error en la creación de la orden de PayPal', { type: 'error' });
                    }
                    const formattedMonto = parseFloat(`${amount}`).toFixed(2);
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            amount: { currency_code: "MXN", value: formattedMonto }
                        }]
                    });
                }}

                onApprove={(data, actions) => {
                    if (!actions || !actions.order) {
                        notify('Error al aprobar el pago de PayPal', { type: 'error' });
                    }
                    return actions.order.capture()
                        .then((details: PayPalDetails) => {
                            if(details.status === "COMPLETED"){
                                console.log('Pago exitoso:', details);
                                const token = localStorage.getItem('token');
                                const config = {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`
                                    },
                                    body: JSON.stringify({
                                        amount: amount,
                                        method: 'paypal',
                                        project: { id: project },
                                        asignment: asignment,
                                        paypal_payment_id: details.id,
                                        // payer_email: details.payer?.email_address,
                                        // payer_name: details.payer?.name?.given_name,
                                        // status: details.status
                                    })
                                };
                                fetch(`${import.meta.env.VITE_API_URL}/api/donations`, config)
                                    .then(response => {
                                        if (response.ok) {
                                            notify('Pago exitoso', { type: 'info' });
                                        } else {
                                            throw new Error('Error al guardar el pago en la base de datos');
                                        }
                                        return response.json();
                                    })
                                    .then(response => {
                                        navigate(`/dashboard/success/${response.donation}`);
                                    })
                                    .catch(err => {
                                        console.error('Error al guardar el pago en la base de datos:', err);
                                        notify('Error al guardar el pago en la base de datos', { type: 'error' });
                                    });
                            } else {
                                console.error('Error al capturar el pago de PayPal:', details);
                                notify('Error al capturar el pago de PayPal. Intente Nuevamente', { type: 'error' });
                            }
                        })
                        .catch((err: any) => {
                            console.error('Error al capturar el pago de PayPal:', err);
                            notify('Error al capturar el pago de PayPal. Intente Nuevamente', { type: 'error' });
                        });
                }}
                onError={(err: any) => {
                    console.error('Error con PayPal:', err);
                    notify('Error con PayPal. Intente Nuevamente', { type: 'error' });
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalPayment;