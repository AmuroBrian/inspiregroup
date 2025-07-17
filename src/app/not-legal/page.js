// src/app/not-legal/page.js
'use client';

import Head from 'next/head';

export default function NotLegal() {
  return (
    <>
      <Head>
        <title>Access Restricted</title>
      </Head>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        color: '#333',
        fontSize: '24px',
        fontFamily: 'sans-serif'
      }}>
        <h1>Access Denied - This is the Not Legal Page</h1>
      </div>
    </>
  );
}