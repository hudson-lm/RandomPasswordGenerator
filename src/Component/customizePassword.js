import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { FaCopy, FaCheck } from 'react-icons/fa';

const Container = styled.div`
  color: white;
  position: relative;
  padding: 2rem;
  background-color: #1e1e1e;
  border-radius: 10px;
  width: 80%;
  margin: 2rem auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Label = styled.label`
  font-size: 2rem;
  cursor: pointer;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 2rem;
`;

const RadioButton = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Range = styled.input`
  width: 100%;
  margin-top: 1rem;
`;
const RangeValue = styled.label`
  display: inline-block;
  margin-left: 1rem;
  font-size: 1.5rem;
  color: ${(props) => {
      if(props.value <=6) return '#ff0000';
      if(props.value <=12) return '#ffff00';
      return '#00ff00';
    }
  }
`;

const Right = styled.div`
    width: 55%;
    position: absolute;
    top: 10%;
    right: 5%;
    min-height: 100px;
    max-height: 200px;
    float: right;
    overflow: auto;
    word-wrap: break-word;
    border: 5px solid brown;
`;

const PasswordSpace = styled.div`
    font-size: 3rem;
    word-break: break-all;
`;

const digits = '0123456789'.split('');
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'.split('');

const CopyButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 1rem;
  &:hover {
    color: #61dafb;
  }
`;


function CustomizePassword() {

  const [isCopied, setIsCopied] = useState(false);

const handleCopyToClipboard = (e) => {
  e.preventDefault();
  if (!generatePassword) return;
  
  navigator.clipboard.writeText(generatePassword)
    .then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    })
    .catch(err => {
      console.error('Failed to copy password: ', err);
      const textArea = document.createElement('textarea');
      textArea.value = generatePassword;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed: ', err);
      }
      document.body.removeChild(textArea);
    });
};

  const [isLettersChecked, setIsLettersChecked] = useState(false);
  const [isNumbersChecked, setIsNumbersChecked] = useState(false);
  const [isSpecialCharsChecked,setIsSpecialCharsChecked] = useState(false);


  const [letterCase, setLetterCase] = useState('');
  const [rangeValue, setRangeValue] = useState(6); // default value
  const [generatePassword, setGeneratePassword] = useState('');

  const handleLettersCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsLettersChecked(isChecked);
    if (isChecked) {
      setLetterCase('uppercase');
    } else {
      setLetterCase('');
    }
  };

  const handleNumbersCheckboxChange = (e) => {
    setIsNumbersChecked(e.target.checked);
  }

  const handleSpecialCharsCheckboxChange = (e) => {
    setIsSpecialCharsChecked(e.target.checked);
  }

  const handleRadioChange = (e) => {
    setLetterCase(e.target.value);
  };

  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
  };


  // generate passwords
  useEffect(() => {
    let characters = [];

    if(isLettersChecked){
      if(letterCase==="uppercase"){
        characters = characters.concat(uppercaseLetters);
      }
      else if(letterCase === "lowercase"){
        characters = characters.concat(lowercaseLetters);
      }
      else if(letterCase === "both"){
        characters = characters.concat(lowercaseLetters,uppercaseLetters);
      }
    }

    if(isNumbersChecked){
      characters = characters.concat(digits);
    }

    if(isSpecialCharsChecked){
      characters = characters.concat(specialChars);
    }

    if(characters.length === 0){
      setGeneratePassword('');
      return;
    }

    let password = '';
    for(let i=0; i<rangeValue;i++){
      const randomIndex = Math.floor(Math.random()*characters.length);
      password += characters[randomIndex];
    }
    
    setGeneratePassword(password);
  }, [isLettersChecked,isNumbersChecked,isSpecialCharsChecked,letterCase, rangeValue]);

  return (
    <Container>
      <Form>
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              id="letters"
              checked={isLettersChecked}
              onChange={handleLettersCheckboxChange}
            />
            <Label htmlFor="letters">Letters</Label>
          </CheckboxWrapper>

          {isLettersChecked && (
            <RadioWrapper>
              <Label style={{'font-size': '1.5rem'}}>
                <RadioButton
                  type="radio"
                  name="letterCase"
                  value="uppercase"
                  checked={letterCase === 'uppercase'}
                  onChange={handleRadioChange}
                />
                All Uppercase
              </Label>
              <Label style={{'font-size': '1.5rem'}}>
                <RadioButton
                  type="radio"
                  name="letterCase"
                  value="lowercase"
                  checked={letterCase === 'lowercase'}
                  onChange={handleRadioChange}
                />
                All Lowercase
              </Label>
              <Label style={{'font-size': '1.5rem'}}>
                <RadioButton
                  type="radio"
                  name="letterCase"
                  value="both"
                  checked={letterCase === 'both'}
                  onChange={handleRadioChange}
                />
                Both Uppercase and Lowercase
              </Label>
            </RadioWrapper>
          )}

          <CheckboxWrapper>
            <Checkbox type="checkbox" id="numbers" checked={isNumbersChecked} onChange={handleNumbersCheckboxChange}/>
            <Label htmlFor="numbers">Numbers</Label>
          </CheckboxWrapper>

          <CheckboxWrapper>
            <Checkbox type="checkbox" id="specialChars" checked={isSpecialCharsChecked} onChange={handleSpecialCharsCheckboxChange}/>
            <Label htmlFor="specialChars">Special Characters</Label>
          </CheckboxWrapper>

          <Right>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PasswordSpace>{generatePassword}</PasswordSpace>
              {generatePassword && (
              <CopyButton onClick={handleCopyToClipboard} title="Copy to clipboard">
                {isCopied ? <FaCheck color="green" /> : <FaCopy />}
              </CopyButton>
              )}
            </div>
          </Right>

        <Label style={{'padding-top':'5%'}}>
            Password Length:
            <Range type='range' min='1' max='50' value={rangeValue} onChange={handleRangeChange}/>
            <RangeValue value={rangeValue}>{rangeValue}</RangeValue>
        </Label>
      </Form>
    </Container>
  );
}

export default CustomizePassword;