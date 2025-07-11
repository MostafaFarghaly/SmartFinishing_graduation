"use client";
import React, { useState } from "react";
import { useLoginClient } from "../../context/regester/login_context";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
    const { changePassword } = useLoginClient();

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showRepeat, setShowRepeat] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
        const res = await changePassword({
            currentPassword: oldPassword,
            newPassword,
            confirmPassword: repeatPassword,
        });

        setMessage("Password changed successfully ✅");
        setOldPassword("");
        setNewPassword("");
        setRepeatPassword("");
        } catch (err) {
        if (err instanceof Error) {
            setMessage(err.message);
        } else {
            setMessage("Failed to change password.");
        }
        } finally {
        setIsLoading(false);
        setTimeout(() => {
            router.push("/account");
        }, 1500);
        }
    };

    return (
        <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f7f7f7"
        }}>
        <div style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            padding: 32,
            width: 400
        }}>
            <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24
            }}>
            <h2 style={{ fontWeight: 600, margin: 0 }}>Change password</h2>
            <button
                onClick={() => window.history.back()}
                style={{
                background: "none",
                border: "none",
                fontSize: 20,
                cursor: "pointer",
                lineHeight: 1,
                padding: 0
                }}
                aria-label="Close"
            >
                ✕
            </button>
            </div>

            <PasswordInput
            label="Old password"
            show={showOld}
            setShow={setShowOld}
            value={oldPassword}
            setValue={setOldPassword}
            link="/forgetPass"
            linkText="Forget password ?"
            />
            <PasswordInput
            label="New password"
            show={showNew}
            setShow={setShowNew}
            value={newPassword}
            setValue={setNewPassword}
            />
            <PasswordInput
            label="Repeat new password"
            show={showRepeat}
            setShow={setShowRepeat}
            value={repeatPassword}
            setValue={setRepeatPassword}
            />

            {message && (
            <p style={{
                color: message.includes("successfully") ? "#27ae60" : "#e74c3c",
                fontSize: 14,
                marginBottom: 12,
            }}>
                {message}
            </p>
            )}

            <button
            onClick={handleSubmit}
            style={{
                width: "100%",
                background: "#27ae60",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "12px 0",
                fontSize: 17,
                fontWeight: 500,
                cursor: "pointer",
            }}
            disabled={isLoading}
            >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Save password"}
            </button>
        </div>
        </div>
    );
    }

    type PasswordInputProps = {
    label: string;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    link?: string;
    linkText?: string;
    };

    function PasswordInput({
    label,
    show,
    setShow,
    value,
    setValue,
    link,
    linkText,
    }: PasswordInputProps) {
    return (
        <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 14, color: "#222" }}>{label}</label>
        <div style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #27ae60",
            borderRadius: 8,
            marginTop: 6,
            paddingRight: 8
        }}>
            <input
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Enter your password`}
            style={{
                border: "none",
                outline: "none",
                flex: 1,
                padding: "10px 12px",
                fontSize: 15,
                borderRadius: 8
            }}
            />
            <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            >
            {show ? "🙈" : "👁️"}
            </button>
        </div>

        {link && (
            <div style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 4
            }}>
            <a href={link} style={{
                color: "#27ae60",
                fontSize: 13,
                textDecoration: "none"
            }}>
                {linkText || "Forget password ?"}
            </a>
            </div>
        )}
        </div>
    );
}
