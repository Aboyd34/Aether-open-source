// ---- Aether: Client-side Key Management & Backup ----
// Requires: libsodium-wrappers.js loaded first
// Stores key material in localStorage for demo purposes
// Handles: generate keys, encrypt/export, wipe, download

(async () => {
  await sodium.ready;
  const S = sodium; // convenience alias

  // ---- LocalStorage keys ----
  const LS_KEYS = 'aether_identity_bundle_v1';
  const LS_CIPHERTEXT_ARCHIVE = 'aether_ciphertext_archive_v1';

  // ---- Utility functions ----
  function safeLog(...args) {
    console.log('[Aether]', ...args);
  }

  function alertUser(title, msg) {
    alert(`${title}\n\n${msg}`);
  }

  function wipeLocalStorageKeys() {
    localStorage.removeItem(LS_KEYS);
    localStorage.removeItem(LS_CIPHERTEXT_ARCHIVE);
    safeLog('Local keys and ciphertext wiped.');
  }

  function toBase64(arr) {
    return btoa(String.fromCharCode(...new Uint8Array(arr)));
  }

  function fromBase64(str) {
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 2000);
  }

  // ---- Key generation ----
  function generateIdentityBundle() {
    const edKeyPair = S.crypto_sign_keypair();
    const edPublic = edKeyPair.publicKey;
    const edSecret = edKeyPair.privateKey;

    const xPublic = S.crypto_sign_ed25519_pk_to_curve25519(edPublic);
    const xSecret = S.crypto_sign_ed25519_sk_to_curve25519(edSecret);

    const signedPreKeyPair = S.crypto_box_keypair();
    const oneTimePreKeys = [];
    for (let i = 0; i < 8; i++) oneTimePreKeys.push(S.crypto_box_keypair());

    const bundle = {
      created_at: new Date().toISOString(),
      ed25519: {
        publicKey: toBase64(edPublic),
        privateKey: toBase64(edSecret)
      },
      x25519: {
        publicKey: toBase64(xPublic),
        privateKey: toBase64(xSecret)
      },
      signedPreKey: {
        publicKey: toBase64(signedPreKeyPair.publicKey),
        privateKey: toBase64(signedPreKeyPair.privateKey)
      },
      oneTimePreKeys: oneTimePreKeys.map(k => ({
        publicKey: toBase64(k.publicKey),
        privateKey: toBase64(k.privateKey)
      }))
    };

    localStorage.setItem(LS_KEYS, JSON.stringify(bundle));
    safeLog('Identity bundle generated:', bundle);
    return bundle;
  }

  // ---- Export / encrypt ----
  async function encryptWithPassphrase(bundle, passphrase) {
    const enc = new TextEncoder();
    const salt = S.randombytes_buf(16);
    const key = await crypto.subtle.importKey(
      'raw',
      await crypto.subtle.digest('SHA-256', enc.encode(passphrase + toBase64(salt))),
      'AES-GCM',
      false,
      ['encrypt']
    );
    const iv = S.randombytes_buf(12);
    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      enc.encode(JSON.stringify(bundle))
    );
    return { ciphertext: new Uint8Array(ciphertext), iv, salt };
  }

  async function handleExport(passphrase) {
    const bundle = JSON.parse(localStorage.getItem(LS_KEYS));
    if (!bundle) return alertUser('Error', 'No key bundle found.');
    const encrypted = await encryptWithPassphrase(bundle, passphrase);
    const blob = new Blob([JSON.stringify(encrypted)], { type: 'application/json' });
    const filename = `aether_export_${new Date().toISOString()}.json`;
    triggerDownload(blob, filename);
    alertUser('Export Ready', 'Encrypted export created.');
  }

  // ---- Delete / wipe ----
  async function handleDeleteFlow() {
    wipeLocalStorageKeys();
    alertUser('Account Wiped', 'Local keys and encrypted data removed.');
    // Optional: refresh UI here if needed
  }

  // ---- Expose functions globally for buttons ----
  window.aetherKeyManager = {
    generateIdentityBundle,
    handleExport,
    handleDeleteFlow
  };
})();
