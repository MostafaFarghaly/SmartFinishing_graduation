"use client";
import React from "react";

type TextFieldProps = {
    id: string;
    label: string;
    type?: string;
    error?: string;
    showError?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextField({ id, label, type = "text", error, showError, value, onChange }: TextFieldProps) {
return (
    <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
        type={type}
        id={id}
        name={id}
        value={value || ''}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={`mt-1 w-full px-4 py-2 border ${showError && error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none`}
    />
    {showError && error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);
}

type SelectFieldProps = {
id: string;
label: string;
error?: string;
showError?: boolean;
value: string;
onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
options: { id: string; name: string }[];
};

export function SelectField({ id, label, error, showError, options, value, onChange }: SelectFieldProps) {
return (
    <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <select
        id={id}
        name={id}
        value={value || ''}
        onChange={onChange}
        className={`mt-1 w-full px-4 py-2 border ${showError && error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none`}
    >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((item) => (
        <option key={item.id} value={item.id}>{item.name}</option>
        ))}
    </select>
    {showError && error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);
}

type TextAreaFieldProps = {
id: string;
label: string;
error?: string;
showError?: boolean;
value: string;
onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function TextAreaField({ id, label, error, showError, value, onChange }: TextAreaFieldProps) {
return (
    <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
        id={id}
        name={id}
        value={value || ''}
        onChange={onChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={`mt-1 w-full px-4 py-2 border ${showError && error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none`}
    />
    {showError && error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);
}
type InfoBoxProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
};

export function InfoBox({ icon, title, desc, onClick }: InfoBoxProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-3 sm:p-4 rounded shadow cursor-pointer hover:bg-gray-50"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-start gap-3">
          <div className="text-lg sm:text-xl text-green-600">{icon}</div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{desc}</p>
          </div>
        </div>
        <span className="text-xl text-gray-400">›</span>
      </div>
    </div>
  );
}


