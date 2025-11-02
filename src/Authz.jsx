import { useState, useEffect } from 'react';
//import bcrypt from 'bcryptjs'
function base64URLEncode(arrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function Authz() {
  const [verifier, setVerifier] = useState('');
  const [challenge, setChallenge] = useState('');

//     const [password1, setPassword1]= useState('')
 
    
 
//  useEffect(() => {
//      const plainpass = "user123";
//      bcrypt.hash(plainpass, 10).then((hash) => {
//        setPassword1(hash);
//      });
//    }, []);

  useEffect(() => {
    const generatePKCE = async () => {
      const randomBytes = new Uint8Array(32);
      crypto.getRandomValues(randomBytes);
      const generatedVerifier = base64URLEncode(randomBytes);
      setVerifier(generatedVerifier);

      const encoder = new TextEncoder();
      const data = encoder.encode(generatedVerifier);
      const digest = await crypto.subtle.digest('SHA-256', data);
      const generatedChallenge = base64URLEncode(digest);
      setChallenge(generatedChallenge);
    };

    generatePKCE();
  }, []);

  return (
    <div>
      <p><strong>Verifier:</strong> {verifier}</p>
      <p><strong>Challenge:</strong> {challenge}</p>
    </div>
  );
}

export default Authz;
