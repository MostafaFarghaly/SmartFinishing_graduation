"use client";
import React, { useState } from 'react';

export default function Payment() {
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(0); // step for modal
    const [activeModal, setActiveModal] = useState<'payment' | 'balance' | null>(null);

    const handleClose = () => {
        setShowModal(false);
        setStep(0);
        setActiveModal(null);
    };

    return (
        <div style={{ display: 'flex', minHeight: '80vh', background: '#fff', padding: '32px 24px' }}>
            {/* Left Side: Menu */}
            <div style={{ flex: 1 }}>
                <div style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
                    Account &nbsp; &gt; &nbsp; <span style={{ color: '#222' }}>Safe</span>
                </div>
                <h2 style={{ fontWeight: 600, fontSize: 28, marginBottom: 32 }}>Safe</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '16px 0',
                            borderBottom: '1px solid #eee'
                        }}
                        onClick={() => { setShowModal(true); setStep(0); setActiveModal('payment'); }}
                    >
                        <div>
                            <div style={{ fontWeight: 500, fontSize: 18 }}>Payment methods</div>
                            <div style={{ color: '#888', fontSize: 14 }}>manage your saved payment methods</div>
                        </div>
                        <span style={{ fontSize: 20 }}>{'>'}</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '16px 0',
                            borderBottom: '1px solid #eee'
                        }}
                        onClick={() => { setShowModal(true); setStep(0); setActiveModal('balance'); }}
                    >
                        <div>
                            <div style={{ fontWeight: 500, fontSize: 18 }}>Balance</div>
                            <div style={{ color: '#888', fontSize: 14 }}>Verify transactions and payment details</div>
                        </div>
                        <span style={{ fontSize: 20 }}>{'>'}</span>
                    </div>
                </div>
            </div>
            {/* Right Side: Info */}
            <div style={{ width: 380, marginLeft: 48 }}>
                <div style={{ background: '#fafbfc', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <div style={{ marginBottom: 24 }}>
                        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>About Payment Methods</div>
                        <div style={{ color: '#555', fontSize: 15 }}>
                            Manage and save your preferred payment options easily. Add, remove, or update your payment methods anytime to ensure smooth transactions.
                        </div>
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>About Your Balance</div>
                        <div style={{ color: '#555', fontSize: 15 }}>
                            View and verify your current balance. Track your payments, refunds, and history in one place for complete control over your finances.
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: 12,
                        width: 400,
                        padding: 24,
                        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
                        position: 'relative'
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                            <button onClick={handleClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>{'←'}</button>
                            <div style={{ fontWeight: 600, fontSize: 18 }}>
                                {activeModal === 'payment' ? 'Payment methods' : 'Balance'}
                            </div>
                            <button onClick={handleClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>{'×'}</button>
                        </div>
                        {/* Payment Modal Steps */}
                        {activeModal === 'payment' && (
                            <>
                                {step === 0 && (
                                    <>
                                        {/* Cards */}
                                        <div style={{ marginBottom: 12 }}>
                                            <div style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                background: '#f6fff6', borderRadius: 8, padding: '12px 16px', marginBottom: 8
                                            }}>
                                                <span>💳 **** 4887</span>
                                                <button style={{ background: 'none', border: 'none', color: '#f44', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                                            </div>
                                            <div style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                background: '#f6fff6', borderRadius: 8, padding: '12px 16px'
                                            }}>
                                                <span>💳 **** 1234</span>
                                                <button style={{ background: 'none', border: 'none', color: '#f44', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                                            </div>
                                        </div>
                                        {/* Add new */}
                                        <div
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                background: '#f8f8f8', borderRadius: 8, padding: '12px 16px', marginBottom: 16, cursor: 'pointer'
                                            }}
                                            onClick={() => setStep(1)}
                                        >
                                            <span>Add new payment method</span>
                                            <span style={{ color: '#2ecc40', fontSize: 20 }}>+</span>
                                        </div>
                                        {/* Info */}
                                        <div style={{
                                            background: '#f6fff6', borderRadius: 8, padding: '10px 12px', fontSize: 14,
                                            color: '#2ecc40', display: 'flex', alignItems: 'center', marginBottom: 16
                                        }}>
                                            <span style={{ marginRight: 8 }}>ℹ️</span>
                                            Monogramming your company name will give it a more professional appearance.
                                        </div>
                                        {/* OK Button */}
                                        <button
                                            style={{
                                                width: '100%',
                                                background: '#2ecc40',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 6,
                                                padding: '12px 0',
                                                fontWeight: 600,
                                                fontSize: 16,
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setStep(1)}
                                        >
                                            ok
                                        </button>
                                    </>
                                )}
                                {step === 1 && (
                                    <>
                                        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Add credit/debit card</div>
                                        <div style={{ color: '#888', fontSize: 14, marginBottom: 18 }}>
                                            When you add a new card, it will be saved automatically. You can delete it later if you prefer.
                                        </div>
                                        <div style={{ marginBottom: 12 }}>
                                            <label style={{ fontSize: 14, fontWeight: 500 }}>Card Number</label>
                                            <div style={{ display: 'flex', alignItems: 'center', background: '#fafbfc', borderRadius: 6, border: '1px solid #eee', padding: '8px 12px', marginTop: 4 }}>
                                                <input type="text" placeholder="1234 1234 1234 1234" style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 16 }} />
                                                <span style={{ marginLeft: 8, fontSize: 20 }}>💳</span>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ fontSize: 14, fontWeight: 500 }}>Expiration Date</label>
                                                <input type="text" placeholder="MM/YY" style={{ width: '100%', borderRadius: 6, border: '1px solid #eee', padding: '8px 12px', fontSize: 16, marginTop: 4, background: '#fafbfc' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ fontSize: 14, fontWeight: 500 }}>CVV</label>
                                                <input type="text" placeholder="123" style={{ width: '100%', borderRadius: 6, border: '1px solid #eee', padding: '8px 12px', fontSize: 16, marginTop: 4, background: '#fafbfc' }} />
                                            </div>
                                        </div>
                                        <button
                                            style={{
                                                width: '100%',
                                                background: '#2ecc40',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 6,
                                                padding: '12px 0',
                                                fontWeight: 600,
                                                fontSize: 16,
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setStep(2)}
                                        >
                                            consent
                                        </button>
                                    </>
                                )}
                                {step === 2 && (
                                    <>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
                                            <div style={{
                                                background: '#ffb84d',
                                                borderRadius: 12,
                                                width: 260,
                                                height: 120,
                                                marginBottom: 12,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'flex-start',
                                                padding: 16,
                                                color: '#fff',
                                                fontWeight: 600,
                                                fontSize: 18
                                            }}>
                                                <div>John Smith</div>
                                                <div style={{ fontSize: 14, margin: '8px 0' }}>**** **** **** 4321</div>
                                                <div style={{ fontSize: 16 }}>$3,420.00</div>
                                            </div>
                                            <div style={{ marginBottom: 8, color: '#555', fontSize: 14 }}>
                                                A validation code has been sent to your number
                                            </div>
                                            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                                <input style={{ width: 32, height: 32, textAlign: 'center', borderRadius: 6, border: '1px solid #eee', fontSize: 16 }} maxLength={1} />
                                                <input style={{ width: 32, height: 32, textAlign: 'center', borderRadius: 6, border: '1px solid #eee', fontSize: 16 }} maxLength={1} />
                                                <input style={{ width: 32, height: 32, textAlign: 'center', borderRadius: 6, border: '1px solid #eee', fontSize: 16 }} maxLength={1} />
                                                <input style={{ width: 32, height: 32, textAlign: 'center', borderRadius: 6, border: '1px solid #eee', fontSize: 16 }} maxLength={1} />
                                            </div>
                                            <div style={{ color: '#2ecc40', fontSize: 13, cursor: 'pointer' }}>Resend Code (1:32)</div>
                                        </div>
                                        <button
                                            style={{
                                                width: '100%',
                                                background: '#2ecc40',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 6,
                                                padding: '12px 0',
                                                fontWeight: 600,
                                                fontSize: 16,
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setStep(3)}
                                        >
                                            Confirm
                                        </button>
                                    </>
                                )}
                                {step === 3 && (
                                    <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                        <div style={{ marginBottom: 16 }}>
                                            {/* صورة توضيحية */}
                                            <img src="/images/success.png" alt="success" style={{ width: 120, height: 120 }} />
                                        </div>
                                        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Payment methods</div>
                                        <div style={{ color: '#2ecc40', fontSize: 16, fontWeight: 500 }}>
                                            Credit card added <span style={{ fontWeight: 700 }}>successfully!</span>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        {/* Balance Modal Steps */}
                        {activeModal === 'balance' && (
                            <>
                                {step === 0 && (
                                    <>
                                        <div style={{ textAlign: 'center', marginBottom: 16 }}>
                                            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Balance</div>
                                            <div style={{ fontSize: 32, fontWeight: 700, color: '#2ecc40', marginBottom: 8 }}>4,200 EGP</div>
                                            <button
                                                style={{
                                                    width: '100%',
                                                    background: '#2ecc40',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: 6,
                                                    padding: '12px 0',
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    cursor: 'pointer',
                                                    marginBottom: 12
                                                }}
                                                onClick={() => setStep(1)}
                                            >
                                                Withdraw
                                            </button>
                                            <div style={{ textAlign: 'left', margin: '0 auto', maxWidth: 320 }}>
                                                <div style={{ color: '#f44', marginBottom: 4 }}>- 120 EGP (pending)</div>
                                                <div style={{ color: '#f44', marginBottom: 4 }}>- 200 EGP (pending)</div>
                                                <div style={{ color: '#2ecc40', marginBottom: 4 }}>+ 1,000 EGP</div>
                                                <div style={{ color: '#2ecc40', marginBottom: 4 }}>+ 3,520 EGP</div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {step === 1 && (
                                    <>
                                        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Withdraw</div>
                                        <div style={{ marginBottom: 16 }}>
                                            <label style={{ fontSize: 14, fontWeight: 500 }}>Amount</label>
                                            <input type="number" placeholder="Enter amount" style={{ width: '100%', borderRadius: 6, border: '1px solid #eee', padding: '8px 12px', fontSize: 16, marginTop: 4, background: '#fafbfc' }} />
                                        </div>
                                        <button
                                            style={{
                                                width: '100%',
                                                background: '#2ecc40',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 6,
                                                padding: '12px 0',
                                                fontWeight: 600,
                                                fontSize: 16,
                                                cursor: 'pointer',
                                                marginBottom: 8
                                            }}
                                            onClick={() => setStep(2)}
                                        >
                                            Continue
                                        </button>
                                    </>
                                )}
                                {step === 2 && (
                                    <>
                                        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Choose payment method</div>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            background: '#f6fff6', borderRadius: 8, padding: '12px 16px', marginBottom: 8
                                        }}>
                                            <span>💳 Visa **** 4887</span>
                                            <input type="radio" name="withdraw-method" defaultChecked />
                                        </div>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            background: '#f6fff6', borderRadius: 8, padding: '12px 16px', marginBottom: 16
                                        }}>
                                            <span>💳 Mastercard **** 1234</span>
                                            <input type="radio" name="withdraw-method" />
                                        </div>
                                        <button
                                            style={{
                                                width: '100%',
                                                background: '#2ecc40',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 6,
                                                padding: '12px 0',
                                                fontWeight: 600,
                                                fontSize: 16,
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setStep(3)}
                                        >
                                            Confirm
                                        </button>
                                    </>
                                )}
                                {step === 3 && (
                                    <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                        <div style={{ marginBottom: 16 }}>
                                            {/* صورة توضيحية للنجاح */}
                                            <img src="/images/success.png" alt="success" style={{ width: 120, height: 120 }} />
                                        </div>
                                        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Payment methods</div>
                                        <div style={{ color: '#2ecc40', fontSize: 16, fontWeight: 500 }}>
                                            The operation was <span style={{ fontWeight: 700 }}>successful!</span>
                                        </div>
                                    </div>
                                )}
                                {/* لو عايز تعرض فشل بدل النجاح غير الصورة والنص هنا */}
                                {/* {step === 4 && (
                                    <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                        <div style={{ marginBottom: 16 }}>
                                            <img src="/images/fail.png" alt="fail" style={{ width: 120, height: 120 }} />
                                        </div>
                                        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Payment methods</div>
                                        <div style={{ color: '#f44', fontSize: 16, fontWeight: 500 }}>
                                            The operation <span style={{ fontWeight: 700 }}>failed!</span>
                                        </div>
                                    </div>
                                )} */}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
