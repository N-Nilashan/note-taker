'use client'
import React from 'react';

const HighlightText = ({ text, searchQuery }) => {
  if (!searchQuery || !text) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <span key={i} className="bg-yellow-200 dark:bg-yellow-800/70 px-1 rounded">
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export default HighlightText;
