import React from 'react';

interface TextProps {
  content: string;
}

const Text: React.FC<TextProps> = ({ content }) => {
  return <span>{content}</span>;
};

export default Text;