import { FaRegCopy } from 'react-icons/fa';
import './App.css';
import { FaArrowsRotate } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { Checkbox } from './component/checkbox';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [showAlert, setShowAlert] = useState(false);

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';


  const generatePassword = () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      showAlertMessage('Please select at least one character type.', 'error');
      return;
    }

    let characterPool = '';
    if (includeUppercase) characterPool += uppercase;
    if (includeLowercase) characterPool += lowercase;
    if (includeNumbers) characterPool += numbers;
    if (includeSymbols) characterPool += symbols;

    if (characterPool.length === 0) return;

    let generatedPassword = '';
    const randomValues = new Uint32Array(length); // Rastgele değerler için bir dizi oluştur
    crypto.getRandomValues(randomValues); // Rastgele değerlerle dizi doldur

    // Dizi içindeki rastgele değerleri kullanarak şifre oluştur
    for (let i = 0; i < length; i++) {
      const randomIndex = randomValues[i] % characterPool.length;;
      generatedPassword += characterPool[randomIndex];
    }

    setIsTyping(true); // Yazma animasyonunu başlat
    let typedPassword = '';
    const typingInterval = 1500 / length; // 2 saniye içinde tüm karakterleri yazma
    let currentIndex = 0;

    const typingEffect = setInterval(() => {
      if (currentIndex < generatedPassword.length) {
        typedPassword += generatedPassword[currentIndex];
        setPassword(typedPassword); // Şifreyi adım adım güncelle
        currentIndex++;
      } else {
        clearInterval(typingEffect);
        setIsTyping(false); // Yazma animasyonu bitti
      }
    }, typingInterval);
  };
  const copyPassword = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => showAlertMessage('Password copied to clipboard.', 'success'))
      .catch(() => showAlertMessage('Failed to copy password.', 'error'));
  };
  const showAlertMessage = (message, type) => {
    setAlert({ message, type });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return (
    <div className="App">
      <div className="container">
        <div className="password-display">
          <input type="text" id="password" readOnly value={password} className={isTyping ? 'typing-effect' : ''} />
          <button onClick={copyPassword}><FaRegCopy /></button>
          <button onClick={generatePassword}><FaArrowsRotate /></button>
        </div>
        <div className="customize">
          <h2>Customize your password</h2>
          <div className="customize-options">
            <div className="slider-container">
              <label for="slider">Password Length: <span id="slider-value">{length}</span></label>
              <input type="range" id="slider" min="6" max="30" value={length} step="1" onChange={(e) => setLength(parseInt(e.target.value))} />            </div>
            <div className="checkbox-group">
              <Checkbox
                id="uppercase"
                label="Uppercase"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              <Checkbox
                id="lowercase"
                label="Lowercase"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              <Checkbox
                id="numbers"
                label="Numbers"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <Checkbox
                id="symbols"
                label="Symbols"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
            </div>
          </div>

          <div className="alert_d">
            {alert.message && <div className={`alert ${alert.type} ${showAlert ? '' : 'hide'}`}>{alert.message}</div>}
          </div>
        </div>
      </div>
      <footer>
        <p>Developed by Osman Çelik - <a href='https://osmanceliktr'>osmancelik.tr</a></p>
      </footer>
    </div>
  );
}

export default App;
