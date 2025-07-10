"use client";
import React, { useState } from 'react';
import { useLoginClient } from '../context/regester/login_context';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function PrivacyPage() {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const { deleteAccount } = useLoginClient();
    const [isLoading, setIsLoading] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

    if (showDeactivate) {
        return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fafafa'
        }}>
            <div style={{
            width: 570,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            padding: 24,
            position: 'relative'
            }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 24
            }}>
                <button
                onClick={() => setShowDeactivate(false)}
                style={{
                    fontSize: 22,
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                }}
                aria-label="Back"
                >←</button>
                <span style={{ fontWeight: 600 }}>Deactivate my account</span>
                <button
                onClick={() => window.history.back()}
                style={{
                    fontSize: 22,
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                }}
                aria-label="Close"
                >×</button>
            </div>
            {/* Illustration */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="Break" width={90} height={90} />
            </div>
            {/* Content */}
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Need a break?</div>
            <div style={{ color: '#444', fontSize: 15, marginBottom: 12 }}>
                By deactivating your account, both your Service Provider and Customer accounts will be disabled and you will be logged out of the platform.
            </div>
            <div style={{ color: '#444', fontSize: 15, marginBottom: 12 }}>
                The deactivation process is reversible. You can reactivate your account at any time by simply logging back in. Your data will be exactly as you left it.
            </div>
            <div style={{ color: '#444', fontSize: 15, marginBottom: 24 }}>
                If you would like to know your personal data, you can take a look at our <span style={{ color: '#22c55e', cursor: 'pointer' }}>exploratory tool</span>.
            </div>
            <button style={{
                width: '100%',
                background: '#fff0f0',
                color: '#ef4444',
                border: '1px solid #ef4444',
                borderRadius: 6,
                padding: '12px 0',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer'
            }}>
                Deactivate Account
            </button>
            </div>
        </div>
        );
    }

    if (showDelete) {
        return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fafafa'
        }}>
            <div style={{
            width: 570,
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            padding: 24,
            position: 'relative'
            }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 24
            }}>
                <button
                onClick={() => setShowDelete(false)}
                style={{
                    fontSize: 22,
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                }}
                aria-label="Back"
                >←</button>
                <span style={{ fontWeight: 600 }}>Delete my account</span>
                <button
                onClick={() => window.history.back()}
                style={{
                    fontSize: 22,
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                }}
                aria-label="Close"
                >×</button>
            </div>
            {/* Illustration */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="Delete" width={90} height={90} />
            </div>
            {/* Spinner and message */}
            {isLoading && (
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                    <i className="fa fa-spinner fa-spin" style={{ fontSize: 24, color: '#ef4444' }}></i>
                </div>
            )}
            {deleteMessage && (
                <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: 12 }}>
                    {deleteMessage}
                </div>
            )}
            {/* Content */}
            <div style={{ fontWeight: 600, marginBottom: 8 }}>We're sorry to see you go!</div>
            <div style={{ color: '#444', fontSize: 15, marginBottom: 12 }}>
                Before we continue, we want to share some useful information with you.
            </div>
            <ul style={{ color: '#444', fontSize: 15, marginBottom: 12, paddingLeft: 18 }}>
                <li>Your Service Provider and Customer accounts will be permanently deleted from our databases.</li>
                <li>Deletion is irreversible and you will no longer be able to access this data.</li>
                <li>If you decide to use [app] again, you'll need to create a new account.</li>
                <li>If you have a non-refundable balance in your account, it will be removed and will not be retrievable after the account is deleted.</li>
            </ul>
            <div style={{ color: '#444', fontSize: 15, marginBottom: 24 }}>
                If you are considering deleting your account because you no longer provide a service, we would like to offer our assistance. Please contact our support team for help.
            </div>
            <button
                onClick={async () => {
                    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
                    if (confirmDelete) {
                        setIsLoading(true);
                        setDeleteMessage(null);
                        const res = await deleteAccount();
                        setIsLoading(false);
                        if (!res.success) {
                            setDeleteMessage(res.message || "Account deletion failed.");
                        } else {
                            setDeleteMessage("Your account has been deleted successfully.");
                        }
                    }
                }}
                style={{
                    width: '100%',
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '12px 0',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    textTransform: 'lowercase',
                    opacity: isLoading ? 0.7 : 1
                }}
                disabled={isLoading}
                >
                {isLoading ? "Deleting..." : "delete my account"}
            </button>

            </div>
        </div>
        );
    }

    // Main Privacy Page
    return (
        <div style={{minHeight: '100vh',display: 'flex',alignItems: 'center',justifyContent: 'center',background: '#fafafa'}}>
            <div style={{
                width: 570,
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                padding: 24,
                position: 'relative'
                }}>

                {/* Header */}
                <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 24
                }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>Data and Privacy</span>
                <button
                    onClick={() => window.history.back()}
                    style={{
                    fontSize: 22,
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                    }}
                    aria-label="Close"
                >
                    ×
                </button>
                </div>

                {/* Options */}
                <div style={{
                borderTop: '1px solid #eee',
                borderBottom: '1px solid #eee'
                }}>
                <div
                    onClick={() => setShowDeactivate(true)}
                    style={{ padding: '16px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                    <div style={{ fontWeight: 500 }}>Deactivate My Account</div>
                    <div style={{ color: '#888', fontSize: 13 }}>
                    Temporarily deactivate your profile without losing your data.<br />
                    You can reactivate at any time.
                    </div>
                </div>
                <div
                    onClick={() => setShowDelete(true)}
                    style={{ padding: '16px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
                    <div style={{ fontWeight: 500 }}>Delete My Account</div>
                    <div style={{ color: '#888', fontSize: 13 }}>
                    Permanently delete all your data.
                    </div>
                </div>
                {/* <div
                    onClick={() => window.open("/privacy-policy", "_blank")}
                    style={{ padding: '16px 0', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                    <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, textTransform: 'capitalize' }}>Privacy Policy</div>
                    <div style={{ color: '#888', fontSize: 13 }}>
                        Read more about our privacy policy.
                    </div>
                    </div>
                    <span style={{ fontSize: 18, marginLeft: 8 }}>↗</span>
                </div> */}
                </div>

                {/* Save Button */}
                {/* <button style={{
                marginTop: 28,
                width: '100%',
                background: '#22c55e',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '12px 0',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer'
                }}>
                Save
                </button> */}
            </div>
        </div>
    );
}
