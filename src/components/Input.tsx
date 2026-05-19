import React from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  label?: string;
  error?: string;
  name?: string;
  id?: string;
}

const inputStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto'
  },
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = 'Напишите молитву',
  type = 'text',
  label,
  error,
  name,
  id,
}) => {
  const inputId = id || name;

  return (
    <div style={inputStyles.container}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 14, fontWeight: 600, color: '#444', marginBottom: 6, textAlign: 'left' }}>
          {label}
        </label>
      )}
      <style>{`
        .prayer-input {
          padding: 16px 20px;
          font-size: 16px;
          font-family: Arial, sans-serif;
          border: 2px solid #ff4444;
          border-radius: 12px;
          background-color: #fff0f0;
          color: #8b0000;
          outline: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(255, 68, 68, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .prayer-input::placeholder {
          color: #ff9999;
          font-style: italic;
          opacity: 0.8;
        }

        .prayer-input:hover {
          border-color: #ff6b6b;
          background-color: #ffe6e6;
          box-shadow: 0 6px 8px rgba(255, 68, 68, 0.2);
          transform: translateY(-2px);
        }

        .prayer-input:focus {
          border-color: #cc0000;
          background-color: #ffffff;
          box-shadow: 0 8px 12px rgba(204, 0, 0, 0.25);
          transform: translateY(-4px);
        }

        .prayer-input.has-error {
          border-color: #cc0000;
          background-color: #ffe6e6;
        }
      `}</style>

      <input
        id={inputId}
        name={name}
        className={`prayer-input${error ? ' has-error' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span style={{ color: '#cc0000', fontSize: 13, marginTop: 4, textAlign: 'left' }}>{error}</span>}
    </div>
  );
};

export default Input;
