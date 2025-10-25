
import React from 'react';

// Fix: Create constants.ts to provide INITIAL_FILES and SYSTEM_INSTRUCTION.
export const BACKGROUNDS = [
  'https://i.ibb.co/RpYxkrmH/Google-AI-Studio-2025-10-21-T00-54-01-087-Z.png',
  'https://i.ibb.co/QFW3Vvwp/Google-AI-Studio-2025-10-21-T01-20-56-087-Z.png',
  'https://i.ibb.co/35ytn2r7/Google-AI-Studio-2025-10-21-T01-17-23-624-Z.png',
  'custom-sunset',
];

export const INTEGRATIONS_CONFIG = [
  {
    name: 'Stripe',
    description: 'Enable payments and manage subscriptions with the Stripe API.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 512 214", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { d: "M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658Zm-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756h-36.694Zm-90.31-51.627c-13.939 0-22.899 6.542-27.876 11.094l-1.85-8.818h-31.288v165.83l35.555-7.537l.143-40.249c5.12 3.698 12.657 8.96 25.173 8.96c25.458 0 48.64-20.48 48.64-65.564c-.142-41.245-23.609-63.716-48.498-63.716Zm-8.534 97.991c-8.391 0-13.37-2.986-16.782-6.684l-.143-52.765c3.698-4.124 8.818-6.968 16.925-6.968c12.942 0 21.902 14.506 21.902 33.137c0 19.058-8.818 33.28-21.902 33.28ZM241.493 36.551l35.698-7.68V0l-35.698 7.538V36.55Zm0 10.809h35.698v124.444h-35.698V47.36Zm-38.257 10.524L200.96 47.36h-30.72v124.444h35.556V87.467c8.39-10.951 22.613-8.96 27.022-7.396V47.36c-4.551-1.707-21.191-4.836-29.582 10.524Zm-71.112-41.386l-34.702 7.395l-.142 113.92c0 21.05 15.787 36.551 36.836 36.551c11.662 0 20.195-2.133 24.888-4.693V140.8c-4.55 1.849-27.022 8.391-27.022-12.658V77.653h27.022V47.36h-27.022l.142-30.862ZM35.982 83.484c0-5.546 4.551-7.68 12.09-7.68c10.808 0 24.461 3.272 35.27 9.103V51.484c-11.804-4.693-23.466-6.542-35.27-6.542C19.2 44.942 0 60.018 0 85.192c0 39.252 54.044 32.995 54.044 49.92c0 6.541-5.688 8.675-13.653 8.675c-11.804 0-26.88-4.836-38.827-11.378v33.849c13.227 5.689 26.596 8.106 38.827 8.106c29.582 0 49.92-14.648 49.92-40.106c-.142-42.382-54.329-34.845-54.329-50.774Z", fill: "#635BFF" })
    ),
    keys: [
      { id: 'publicKey', label: 'Publishable Key', placeholder: 'pk_test_...' },
      { id: 'secretKey', label: 'Secret Key', placeholder: 'sk_test_...' }
    ]
  },
  {
    name: 'Firebase',
    description: 'Use Google Firebase for authentication, databases, and hosting.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { d: "M10.8 4.2L4 24L10.8 43.8L24 28.5V4.2H10.8Z", fill: "#FFC24A" }),
      React.createElement('path', { d: "M24 4.2V28.5L37.2 43.8L24 4.2Z", fill: "#F4BD41" }),
      React.createElement('path', { d: "M24 33.6L10.8 43.8L15 33.6H24Z", fill: "#F6820C" }),
      React.createElement('path', { d: "M24 33.6H15L18.6 24L24 33.6Z", fill: "#F8A722" }),
      React.createElement('path', { d: "M24 28.5L18.6 24L24 4.2V28.5Z", fill: "#FCCA3F" })
    ),
    keys: [
      { id: 'apiKey', label: 'API Key', placeholder: 'AIza...' },
      { id: 'authDomain', label: 'Auth Domain', placeholder: 'your-project.firebaseapp.com' },
      { id: 'projectId', label: 'Project ID', placeholder: 'your-project-id' },
      { id: 'databaseURL', label: 'Database URL', placeholder: 'https://your-project.firebaseio.com' }
    ]
  },
  {
    name: 'Airtable',
    description: 'Connect to your Airtable bases to manage data.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 256 215", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { fill: "#FFBF00", d: "M114.259 2.701L18.86 42.176c-5.305 2.195-5.25 9.73.089 11.847l95.797 37.989a35.544 35.544 0 0 0 26.208 0l95.799-37.99c5.337-2.115 5.393-9.65.086-11.846L141.442 2.7a35.549 35.549 0 0 0-27.183 0" }),
      React.createElement('path', { fill: "#26B5F8", d: "M136.35 112.757v94.902c0 4.514 4.55 7.605 8.746 5.942l106.748-41.435a6.39 6.39 0 0 0 4.035-5.941V71.322c0-4.514-4.551-7.604-8.747-5.941l-106.748 41.434a6.392 6.392 0 0 0-4.035 5.942" }),
      React.createElement('path', { fill: "#ED3049", d: "m111.423 117.654l-31.68 15.296l-3.217 1.555L9.65 166.548C5.411 168.593 0 165.504 0 160.795V71.72c0-1.704.874-3.175 2.046-4.283a7.266 7.266 0 0 1 1.618-1.213c1.598-.959 3.878-1.215 5.816-.448l101.41 40.18c5.155 2.045 5.56 9.268.533 11.697" }),
      React.createElement('path', { fillOpacity: ".25", d: "m111.423 117.654l-31.68 15.296L2.045 67.438a7.266 7.266 0 0 1 1.618-1.213c1.598-.959 3.878-1.215 5.816-.448l101.41 40.18c5.155 2.045 5.56 9.268.533 11.697" })
    ),
    keys: [
      { id: 'apiKey', label: 'API Key', placeholder: 'key...' },
      { id: 'baseId', label: 'Base ID', placeholder: 'app...' }
    ]
  },
  {
    name: 'Slack',
    description: 'Send messages and notifications to your Slack channels.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 128 128", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement('path', { fill: "#de1c59", d: "M27.255 80.719c0 7.33-5.978 13.317-13.309 13.317C6.616 94.036.63 88.049.63 80.719s5.987-13.317 13.317-13.317h13.309zm6.709 0c0-7.33 5.987-13.317 13.317-13.317s13.317 5.986 13.317 13.317v33.335c0 7.33-5.986 13.317-13.317 13.317c-7.33 0-13.317-5.987-13.317-13.317zm0 0" }),
        React.createElement('path', { fill: "#35c5f0", d: "M47.281 27.255c-7.33 0-13.317-5.978-13.317-13.309C33.964 6.616 39.951.63 47.281.63s13.317 5.987 13.317 13.317v13.309zm0 6.709c7.33 0 13.317 5.987 13.317 13.317s-5.986 13.317-13.317 13.317H13.946C6.616 60.598.63 54.612.63 47.281c0-7.33 5.987-13.317 13.317-13.317zm0 0" }),
        React.createElement('path', { fill: "#2eb57d", d: "M100.745 47.281c0-7.33 5.978-13.317 13.309-13.317c7.33 0 13.317 5.987 13.317 13.317s-5.987 13.317-13.317 13.317h-13.309zm-6.709 0c0 7.33-5.987 13.317-13.317 13.317s-13.317-5.986-13.317-13.317V13.946C67.402 6.616 73.388.63 80.719.63c7.33 0 13.317 5.987 13.317 13.317zm0 0" }),
        React.createElement('path', { fill: "#ebb02e", d: "M80.719 100.745c7.33 0 13.317 5.978 13.317 13.309c0 7.33-5.987 13.317-13.317 13.317s-13.317-5.987-13.317-13.317v-13.309zm0-6.709c-7.33 0-13.317-5.987-13.317-13.317s5.986-13.317 13.317-13.317h33.335c7.33 0 13.317 5.986 13.317 13.317c0 7.33-5.987 13.317-13.317 13.317zm0 0" })
    ),
    keys: [
      { id: 'botToken', label: 'Bot User OAuth Token', placeholder: 'xoxb-...' }
    ]
  },
  {
    name: 'YouTube',
    description: 'Access YouTube data like videos, playlists, and channels.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 256 180", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { fill: "red", d: "M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z" }),
      React.createElement('path', { fill: "#FFF", d: "m102.421 128.06l66.328-38.418l-66.328-38.418z" })
    ),
    keys: [
      { id: 'apiKey', label: 'API Key', placeholder: 'AIza...' }
    ]
  },
  {
    name: 'Trello',
    description: 'Manage boards, lists, and cards on Trello.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { fill: "#0079BF", d: "M21 3a3 3 0 00-3-3H6a3 3 0 00-3 3v18a3 3 0 003 3h12a3 3 0 003-3V3z" }),
      React.createElement('path', { fill: "#FFF", d: "M10.5 8h3v8h-3zM15.5 8h3v5h-3z" })
    ),
    keys: [
      { id: 'apiKey', label: 'API Key', placeholder: 'Your Trello API Key' },
      { id: 'apiToken', label: 'API Token', placeholder: 'Your Trello API Token' }
    ]
  },
  {
    name: 'Asana',
    description: 'Integrate with Asana to manage tasks and projects.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 256 237", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { fill: "#F06A6A", d: "M200.325 125.27c-30.749 0-55.675 24.927-55.675 55.677s24.926 55.677 55.675 55.677S256 211.696 256 180.947c0-30.75-24.926-55.677-55.675-55.677Zm-144.65.005C24.927 125.275 0 150.197 0 180.947c0 30.75 24.927 55.677 55.675 55.677c30.75 0 55.678-24.928 55.678-55.677c0-30.75-24.928-55.672-55.678-55.672Zm128-69.6c0 30.75-24.927 55.68-55.674 55.68c-30.75 0-55.676-24.93-55.676-55.68C72.325 24.928 97.25 0 128 0c30.747 0 55.673 24.93 55.673 55.674Z" })
    ),
    keys: [
      { id: 'personalAccessToken', label: 'Personal Access Token', placeholder: '1/1234...' }
    ]
  },
  {
    name: 'Jira',
    description: 'Connect to Jira for issue and project tracking.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 256 256", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('defs', null, 
        React.createElement('linearGradient', { id: "logosJira0", x1: "98.031%", x2: "58.888%", y1: ".161%", y2: "40.766%" }, 
          React.createElement('stop', { offset: "18%", stopColor: "#0052CC" }),
          React.createElement('stop', { offset: "100%", stopColor: "#2684FF" })
        ),
        React.createElement('linearGradient', { id: "logosJira1", x1: "100.665%", x2: "55.402%", y1: ".455%", y2: "44.727%" }, 
          React.createElement('stop', { offset: "18%", stopColor: "#0052CC" }),
          React.createElement('stop', { offset: "100%", stopColor: "#2684FF" })
        )
      ),
      React.createElement('path', { fill: "#2684FF", d: "M244.658 0H121.707a55.502 55.502 0 0 0 55.502 55.502h22.649V77.37c.02 30.625 24.841 55.447 55.466 55.467V10.666C255.324 4.777 250.55 0 244.658 0Z" }),
      React.createElement('path', { fill: "url(#logosJira0)", d: "M183.822 61.262H60.872c.019 30.625 24.84 55.447 55.466 55.467h22.649v21.938c.039 30.625 24.877 55.43 55.502 55.43V71.93c0-5.891-4.776-10.667-10.667-10.667Z" }),
      React.createElement('path', { fill: "url(#logosJira1)", d: "M122.951 122.489H0c0 30.653 24.85 55.502 55.502 55.502h22.72v21.867c.02 30.597 24.798 55.408 55.396 55.466V133.156c0-5.891-4.776-10.667-10.667-10.667Z" })
    ),
    keys: [
      { id: 'domain', label: 'Jira Domain', placeholder: 'your-company.atlassian.net' },
      { id: 'email', label: 'Email Address', placeholder: 'user@example.com' },
      { id: 'apiToken', label: 'API Token', placeholder: 'Your Jira API Token' },
    ]
  },
   {
    name: 'Discord',
    description: 'Build bots and integrate services with Discord.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 256 256", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('g', { fill: "none" },
        React.createElement('rect', { width: "256", height: "256", fill: "#5865F2", rx: "60" }),
        React.createElement('g', { clipPath: "url(#skillIconsDiscord0)" },
          React.createElement('path', { fill: "#fff", d: "M197.308 64.797a164.918 164.918 0 0 0-40.709-12.627a.618.618 0 0 0-.654.31c-1.758 3.126-3.706 7.206-5.069 10.412c-15.373-2.302-30.666-2.302-45.723 0c-1.364-3.278-3.382-7.286-5.148-10.412a.643.643 0 0 0-.655-.31a164.472 164.472 0 0 0-40.709 12.627a.583.583 0 0 0-.268.23c-25.928 38.736-33.03 76.52-29.546 113.836a.685.685 0 0 0 .26.468c17.106 12.563 33.677 20.19 49.94 25.245a.648.648 0 0 0 .702-.23c3.847-5.254 7.276-10.793 10.217-16.618a.633.633 0 0 0-.347-.881c-5.44-2.064-10.619-4.579-15.601-7.436a.642.642 0 0 1-.063-1.064a86.364 86.364 0 0 0 3.098-2.428a.618.618 0 0 1 .646-.088c32.732 14.944 68.167 14.944 100.512 0a.617.617 0 0 1 .655.08a79.613 79.613 0 0 0 3.106 2.436a.642.642 0 0 1-.055 1.064a102.622 102.622 0 0 1-15.609 7.428a.638.638 0 0 0-.339.889a133.075 133.075 0 0 0 10.208 16.61a.636.636 0 0 0 .702.238c16.342-5.055 32.913-12.682 50.02-25.245a.646.646 0 0 0 .26-.46c4.17-43.141-6.985-80.616-29.571-113.836a.506.506 0 0 0-.26-.238ZM94.834 156.142c-9.855 0-17.975-9.047-17.975-20.158s7.963-20.158 17.975-20.158c10.09 0 18.131 9.127 17.973 20.158c0 11.111-7.962 20.158-17.974 20.158Zm66.456 0c-9.855 0-17.974-9.047-17.974-20.158s7.962-20.158 17.974-20.158c10.09 0 18.131 9.127 17.974 20.158c0 11.111-7.884 20.158-17.974 20.158Z" })
        ),
        React.createElement('defs', null,
          React.createElement('clipPath', { id: "skillIconsDiscord0" },
            React.createElement('path', { fill: "#fff", d: "M28 51h200v154.93H28z" })
          )
        )
      )
    ),
    keys: [
      { id: 'botToken', label: 'Bot Token', placeholder: 'Your Discord bot token' },
      { id: 'clientId', label: 'Client ID', placeholder: 'Your Discord application client ID' }
    ]
  },
  {
    name: 'Unsplash',
    description: 'Access a vast library of high-quality photos.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { fill: "#000000", d: "M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" })
    ),
    keys: [
      { id: 'accessKey', label: 'Access Key', placeholder: 'Your Unsplash Access Key' }
    ]
  },
  {
    name: 'Shopify',
    description: 'Build e-commerce experiences with the Shopify API.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 256 292", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { fill: "#95BF46", d: "M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357a19614 19614 0 0 0-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805c-.19.056-3.388 1.043-8.678 2.68c-5.18-14.906-14.322-28.604-30.405-28.604c-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635c-14.558 4.511-24.9 7.718-26.221 8.133c-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806.038 260.235.038 260.235l165.678 31.042l89.77-19.42S223.973 58.8 223.775 57.34ZM156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023c0-9.264-1.286-16.723-3.349-22.636c8.287 1.04 13.806 10.469 17.358 21.32Zm-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238c0 .572-.005 1.095-.01 1.624c-9.117 2.824-19.024 5.89-28.953 8.966c5.575-21.516 16.025-31.908 25.161-35.828Zm-11.131-10.537c1.617 0 3.246.549 4.805 1.622c-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828Z" }),
      React.createElement('path', { fill: "#5E8E3E", d: "M221.237 54.983a19614 19614 0 0 0-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233l89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357" }),
      React.createElement('path', { fill: "#FFF", d: "m135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693c0 15.038 39.2 20.8 39.2 56.024c0 27.713-17.577 45.558-41.277 45.558c-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232c0-19.616-32.16-20.491-32.16-52.724c0-27.129 19.472-53.382 58.778-53.382c15.145 0 22.627 4.338 22.627 4.338" })
    ),
    keys: [
      { id: 'storeName', label: 'Store Name', placeholder: 'your-store.myshopify.com' },
      { id: 'apiKey', label: 'API Key', placeholder: 'Your Admin API access token' }
    ]
  },
  {
    name: 'Google Maps',
    description: 'Embed maps and use geolocation services.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 256 367", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { fill: "#34A853", d: "M70.585 271.865a370.712 370.712 0 0 1 28.911 42.642c7.374 13.982 10.448 23.463 15.837 40.31c3.305 9.308 6.292 12.086 12.714 12.086c6.998 0 10.173-4.726 12.626-12.035c5.094-15.91 9.091-28.052 15.397-39.525c12.374-22.15 27.75-41.833 42.858-60.75c4.09-5.354 30.534-36.545 42.439-61.156c0 0 14.632-27.035 14.632-64.792c0-35.318-14.43-59.813-14.43-59.813l-41.545 11.126l-25.23 66.451l-6.242 9.163l-1.248 1.66l-1.66 2.078l-2.914 3.319l-4.164 4.163l-22.467 18.304l-56.17 32.432l-9.344 54.337Z" }),
      React.createElement('path', { fill: "#FBBC04", d: "M12.612 188.892c13.709 31.313 40.145 58.839 58.031 82.995l95.001-112.534s-13.384 17.504-37.662 17.504c-27.043 0-48.89-21.595-48.89-48.825c0-18.673 11.234-31.501 11.234-31.501l-64.489 17.28l-13.225 75.08Z" }),
      React.createElement('path', { fill: "#4285F4", d: "M166.705 5.787c31.552 10.173 58.558 31.53 74.893 63.023l-75.925 90.478s11.234-13.06 11.234-31.617c0-27.864-23.463-48.68-48.81-48.68c-23.969 0-37.735 17.475-37.735 17.475v-57l76.343-33.68Z" }),
      React.createElement('path', { fill: "#1A73E8", d: "M30.015 45.765C48.86 23.218 82.02 0 127.736 0c22.18 0 38.89 5.823 38.89 5.823L90.29 96.516H36.205l-6.19-50.75Z" }),
      React.createElement('path', { fill: "#EA4335", d: "M12.612 188.892S0 164.194 0 128.414c0-33.817 13.146-63.377 30.015-82.649l60.318 50.759l-77.721 92.368Z" })
    ),
    keys: [
      { id: 'apiKey', label: 'API Key', placeholder: 'Your Google Maps API Key' }
    ]
  },
  {
    name: 'Notion',
    description: 'Create and manage pages, databases, and blocks in Notion.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { fill: "#000000", d: "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514c-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233l4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" })
    ),
    keys: [
      { id: 'internalIntegrationToken', label: 'Internal Integration Token', placeholder: 'secret_...' }
    ]
  },
  {
    name: 'PayPal',
    description: 'Integrate PayPal for secure and easy online payments.',
    icon: (props: any) => React.createElement('svg', { ...props, viewBox: "0 0 256 302", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement('path', { fill: "#27346A", d: "M217.168 23.507C203.234 7.625 178.046.816 145.823.816h-93.52A13.393 13.393 0 0 0 39.076 12.11L.136 259.077c-.774 4.87 2.997 9.28 7.933 9.28h57.736l14.5-91.971l-.45 2.88c1.033-6.501 6.593-11.296 13.177-11.296h27.436c53.898 0 96.101-21.892 108.429-85.221c.366-1.873.683-3.696.957-5.477c-1.556-.824-1.556-.824 0 0c3.671-23.407-.025-39.34-12.686-53.765" }),
      React.createElement('path', { fill: "#27346A", d: "M102.397 68.84a11.737 11.737 0 0 1 5.053-1.14h73.318c8.682 0 16.78.565 24.18 1.756a101.6 101.6 0 0 1 6.177 1.182a89.928 89.928 0 0 1 8.59 2.347c3.638 1.215 7.026 2.63 10.14 4.287c3.67-23.416-.026-39.34-12.687-53.765C203.226 7.625 178.046.816 145.823.816H52.295C45.71.816 40.108 5.61 39.076 12.11L.136 259.068c-.774 4.878 2.997 9.282 7.925 9.282h57.744L95.888 77.58a11.717 11.717 0 0 1 6.509-8.74Z" }),
      React.createElement('path', { fill: "#2790C3", d: "M228.897 82.749c-12.328 63.32-54.53 85.221-108.429 85.221H93.024c-6.584 0-12.145 4.795-13.168 11.296L61.817 293.621c-.674 4.262 2.622 8.124 6.934 8.124h48.67a11.71 11.71 0 0 0 11.563-9.88l.474-2.48l9.173-58.136l.591-3.213a11.71 11.71 0 0 1 11.562-9.88h7.284c47.147 0 84.064-19.154 94.852-74.55c4.503-23.15 2.173-42.478-9.739-56.054c-3.613-4.112-8.1-7.508-13.327-10.28c-.283 1.79-.59 3.604-.957 5.477Z" }),
      React.createElement('path', { fill: "#1F264F", d: "M216.952 72.128a89.928 89.928 0 0 0-5.818-1.49a109.904 109.904 0 0 0-6.177-1.174c-7.408-1.199-15.5-1.765-24.19-1.765h-73.309a11.57 11.57 0 0 0-5.053 1.149a11.683 11.683 0 0 0-6.51 8.74l-15.582 98.798l-.45 2.88c1.025-6.501 6.585-11.296 13.17-11.296h27.444c53.898 0 96.1-21.892 108.428-85.221c.367-1.873.675-3.688.958-5.477c-3.122-1.648-6.501-3.072-10.14-4.279a83.26 83.26 0 0 0-2.77-.865" })
    ),
    keys: [
      { id: 'clientId', label: 'Client ID', placeholder: 'Your PayPal Client ID' },
      { id: 'clientSecret', label: 'Client Secret', placeholder: 'Your PayPal Client Secret' }
    ]
  },
  // Add more integrations here...
];


export const INITIAL_FILES: Record<string, string> = {
  'src/App.tsx': `
// The 'initialPage' prop is a special prop used by the preview environment to render a specific page.
// Do not remove it or the logic that uses it.
const App = ({ initialPage = 'home' }) => {
  const [page, setPage] = React.useState(initialPage);

  const navigateTo = (newPage) => {
    setPage(newPage);
  };

  const renderPage = () => {
    switch (page) {
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'about-us':
        return <AboutUsPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <nav className="bg-black/30 backdrop-blur-lg p-4 flex justify-between items-center border-b border-gray-700">
        <div className="text-2xl font-bold">MyApp</div>
        <div className="flex gap-6 text-lg">
          <button onClick={() => navigateTo('home')} className="hover:text-blue-400 transition-colors">Home</button>
          <button onClick={() => navigateTo('how-it-works')} className="hover:text-blue-400 transition-colors">How It Works</button>
          <button onClick={() => navigateTo('about-us')} className="hover:text-blue-400 transition-colors">About Us</button>
        </div>
      </nav>
      <main className="p-8">
        {renderPage()}
      </main>
    </div>
  );
};

const HomePage = () => (
  <div className="text-center">
    <h1 className="text-5xl font-extrabold mb-4">Welcome to Your Web App!</h1>
    <p className="text-xl text-gray-400">This is a multi-page application. You can now tell the AI assistant what you want to build or modify.</p>
  </div>
);

const HowItWorksPage = () => (
  <div>
    <h1 className="text-4xl font-bold mb-6">How It Works</h1>
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="p-6 bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-semibold mb-2 text-blue-400">Step 1: Describe Your Idea</h2>
        <p className="text-gray-300">Start by telling the AI assistant what you want to create or change. Be as descriptive as possible. For example, "Create a photo gallery with a search bar."</p>
      </div>
      <div className="p-6 bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-semibold mb-2 text-blue-400">Step 2: AI Generates the Code</h2>
        <p className="text-gray-300">Our powerful AI will analyze your request and generate the necessary React and Tailwind CSS code, creating or updating multiple files as needed.</p>
      </div>
      <div className="p-6 bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-semibold mb-2 text-blue-400">Step 3: Preview and Iterate</h2>
        <p className="text-gray-300">You'll see a live preview of your application instantly. If it's not perfect, you can ask for more changes until you're happy with the result.</p>
      </div>
    </div>
  </div>
);

const AboutUsPage = () => (
   <div>
    <h1 className="text-4xl font-bold mb-6">About Us</h1>
    <div className="space-y-6 max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
      <p>We are Rapid Web, a team of innovators passionate about making web development accessible to everyone. Our mission is to break down the barriers of coding and empower creators to bring their digital ideas to life.</p>
      <p>Our platform leverages cutting-edge AI to translate natural language into high-quality, production-ready code. Whether you're a seasoned developer looking to accelerate your workflow or a visionary with no coding experience, Rapid Web is your partner in creation.</p>
      <p>Join us on our journey to democratize technology and build the future of the web, together.</p>
    </div>
  </div>
);


// The component to be rendered in the preview must be assigned to a variable named 'Component'.
const Component = App;
`
};

export const SYSTEM_INSTRUCTION_PLAN = `You are a senior frontend engineer and UI/UX designer. The user will provide a request to build or modify a web application.
Your task is to first create a detailed, structured plan for the user to approve. The plan should be in markdown format using **bold headers** for sections and bullet points for lists. Include the following sections:
- **Overview**: A brief summary of the application or changes.
- **Features**: A bulleted list of new or changed functionality.
- **UI/UX**: A description of the visual design, layout, and user flow.
- **Color Palette**: A bulleted list of hex codes for primary, secondary, accent, and text colors with brief descriptions.
Be creative and professional. Ensure the plan is clear and easy to understand. Do not generate code. Respond only with the plan.`;

export const SYSTEM_INSTRUCTION_INTEGRATIONS = `You are an expert software architect. Based on the following application plan, identify which third-party integrations would be most beneficial.
Your response MUST be a JSON array of strings, where each string is the exact name of an integration from the provided list.
Do not include any other text, explanation, or markdown formatting.
If no integrations are relevant, return an empty array [].

Available Integrations: [
  "Stripe", "Firebase", "Airtable", "Slack", "YouTube", "Trello", "Asana", "Jira", "Discord", "Unsplash", "Shopify", "Google Maps", "Notion", "PayPal"
]

Application Plan:
---
[PLAN]
---

Example Response:
["Stripe", "Firebase"]`;


export const SYSTEM_INSTRUCTION = `You are an expert frontend developer specializing in React and Tailwind CSS.
You will be given a user request and an approved plan. Your primary goal is to generate code that strictly adheres to the provided plan.
The user will provide a request to modify a web application. You will be given the current project files as a JSON object.
Your response MUST be a single JSON object that contains the complete, updated content for ALL files in the project.
Do not use markdown formatting (like \`\`\`json) around your response.
The JSON keys should be the file paths, and the values should be the full string content of the files.
Ensure the code is clean, functional, and directly implements the user's request.

- The live preview environment injects \`React\` into the scope. Do NOT include \`import React from 'react';\` in your code.
- The root component must be in 'src/App.tsx'.
- The root component in 'src/App.tsx' MUST be assigned to a variable named 'Component'. Example: \`const Component = App;\`. This is crucial for the preview.

**IMAGE INPUT:**
If the user provides an image (from an upload, paste, or a drawing), it will be included in a multi-part request. Treat the image as a visual reference or mockup. Your primary goal is to generate code for a user interface that closely matches the design, layout, color scheme, and style of the provided image. The user's text prompt may provide additional instructions.

**CLONE FROM URL:**
If the user's prompt is to "Clone the website at this URL: [URL]", you should analyze its structure, layout, and style, and then generate code that replicates the visual appearance of that website. You do not need to replicate complex functionality, focus on the UI and static content.

**INTEGRATIONS:**
If the user's prompt includes a "Connected Integrations" section with API keys, you MUST use these keys to implement the requested functionality.
For example, if Stripe keys are provided, generate code that uses the Stripe.js library or Stripe API with those keys.
If Firebase config is provided, create a firebase.js or firebase.ts file to initialize the app and then import it where needed.
Do not display the API keys in the generated UI. They should be used in the code logic only.

**ADVANCED EDITING CONTEXT:**
Sometimes, the user's request will include a "Context" section. This means the user is editing a specific part of the app visually.
- **Page-Level Context:** If the context mentions editing a specific page component (e.g., 'HomePage'), you should focus your changes on that component within 'src/App.tsx'.
- **Element-Level Context:** If the context describes a specific element (e.g., "a button with text 'Click Me'"), you must locate that element within the specified page component and apply the user's changes to it.
- When context is provided, you must still return the ENTIRE project file structure in the JSON response, even if you only changed one file.

**NETLIFY DEPLOYMENT:**
If asked to prepare for Netlify deployment or to add a 'netlify.toml' file, you MUST add a \`netlify.toml\` file to the root of the project. This file should be configured for a single-page application (SPA). Since there is no build step in this environment, the publish directory should be the project root.
Example \`netlify.toml\`:
\`\`\`toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
\`\`\`

**IMPORTANT PREVIEW REQUIREMENT:**
The root App component in 'src/App.tsx' is passed a special prop \`initialPage\` by the preview environment.
Your generated code MUST accept this prop and use it to set the initial state for the router.
Example:
\`\`\`
const App = ({ initialPage = 'home' }) => {
  const [page, setPage] = React.useState(initialPage);
  // ... rest of the app
};
\`\`\`
This is essential for the multi-page preview canvas to work correctly. Do not remove this functionality.
`;
