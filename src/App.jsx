import React from 'react';
import QRCode from 'react-qr-code';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code</h1>
      <QRCode value={window.location.origin + '/unique-code'} />
      <p>Scan the QR code to get a unique code.</p>
    </div>
  );
}

export default App;
