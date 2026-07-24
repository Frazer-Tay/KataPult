import React from 'react';

const paths = {
  arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  arrowLeft: <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
  brain: <><path d="M9.5 4.5A3 3 0 0 0 4 6a3 3 0 0 0 .8 5.8A3 3 0 0 0 7 17a3 3 0 0 0 5 2.2V5a3 3 0 0 0-2.5-.5Z" /><path d="M14.5 4.5A3 3 0 0 1 20 6a3 3 0 0 1-.8 5.8A3 3 0 0 1 17 17a3 3 0 0 1-5 2.2V5a3 3 0 0 1 2.5-.5Z" /><path d="M8 9h4M12 13h4" /></>,
  chat: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  clipboard: <><rect width="14" height="18" x="5" y="3" rx="2" /><path d="M9 3V1h6v2M9 8h6M9 12h6M9 16h4" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-2.5 5.5L8 16l2.5-5.5Z" /></>,
  flame: <path d="M12 22c4 0 7-3 7-7 0-3-1.5-5.5-4-8 .2 3-1 4.5-2.5 5.5.5-4-1-7-4-10C8 7 5 9.5 5 14c0 5 3 8 7 8Z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
  image: <><rect width="18" height="16" x="3" y="4" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m21 15-5-5L5 20" /></>,
  layers: <><path d="m12 2 9 5-9 5-9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" /><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" /></>,
  matching: <><rect x="3" y="4" width="6" height="6" rx="1" /><rect x="15" y="14" width="6" height="6" rx="1" /><path d="M9 7h6a3 3 0 0 1 3 3v4M15 17H9a3 3 0 0 1-3-3v-4" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></>,
  puzzle: <path d="M19.4 13.5A2.5 2.5 0 1 0 16 10V7h-3a2.5 2.5 0 1 0-5 0H5v4h3a2.5 2.5 0 1 1 0 5H5v4h11v-3.5a2.5 2.5 0 0 0 3.4-3Z" />,
  rocket: <><path d="M4.5 16.5c-1.5 1.3-2 4-2 4s2.7-.5 4-2" /><path d="m9 15-3-3c2-5 5-8 11-9l4 4c-1 6-4 9-9 11Z" /><circle cx="16" cy="8" r="1.5" /></>,
  sequencing: <><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="4" cy="6" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="18" r="1" /></>,
  sentence: <><path d="M4 6h16M4 12h10M4 18h13" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  sprout: <><path d="M7 20h10M12 20v-8" /><path d="M12 12C7 12 5 9 5 5c4 0 7 2 7 7ZM12 12c5 0 7-3 7-7-4 0-7 2-7 7Z" /></>,
  star: <path d="m12 2 3 6 6.5 1-4.7 4.6 1.1 6.4-5.9-3.1L6.1 20l1.1-6.4L2.5 9 9 8Z" />,
  trophy: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0Z" /><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 22a8 8 0 0 1 16 0" /></>,
  x: <><path d="m6 6 12 12M18 6 6 18" /></>,
};

const UiIcon = ({ name, size = 20, strokeWidth = 2, className = '', ...props }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    {...props}
  >
    {paths[name] || paths.star}
  </svg>
);

export default UiIcon;
