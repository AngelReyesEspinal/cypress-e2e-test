import './App.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import cypressLogo from './static/download.webp'
import googleLogo from './static/580b57fcd9996e24bc43c51f.png'
import { useEffect, useState } from 'react';

const Checkbox = ({ developer, onCheckDeveloper }) => {

  const onCheckInput = (isChecked, developerId) => {
    const payload = {
      action: isChecked ? 'check' : 'unCheck',
      developerId
    };
    onCheckDeveloper(payload);
  }

  return(
    <label class="container"> {developer.name}
      <input id={developer.email} type="checkbox" onChange={e => onCheckInput(e.target.checked, developer.id)} />
      <span class="checkmark"></span>
    </label>
  )
}

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [developers, setDevelopers] = useState([
    {
      id: 1,
      name: 'Angel Arsenio Reyes Espinal',
      email: 'angel.reyesespinal@symphony.is'
    },
    {
      id: 2,
      name: 'Alejandro Villa',
      email: 'alejandro.villa@symphony.is'
    },
    {
      id: 3,
      name: 'Omar Gaston',
      email: 'omar.gaston@symphony.is'
    },
    {
      id: 4,
      name: 'Omar Gaston',
      email: 'omar.gaston@symphony.is'
    },
    {
      id: 5,
      name: 'Paulo Tavares',
      email: 'paulo.tavares@symphony.is'
    },
    {
      id: 6,
      name: 'Osivwi Okiti',
      email: 'osivwi.okiti@symphony.is'
    },
    {
      id: 7,
      name: 'Oba',
      email: 'obafemi.oderanti@symphony.is'
    },
  ]);
  const [selectedDevelopersId, setSelectedDevelopersId] = useState([]);

  useEffect(() => {
    window.addEventListener("storage", e => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('currentUser');
      if (token && email) setCurrentUser({ email, token });
    });
  }, []);

  const onCheckDeveloper = (payload) => {
    const newSelectedDevelopersId = payload.action === 'unCheck' 
      ? selectedDevelopersId.filter(id => id !== payload.developerId)
      : [ ...selectedDevelopersId, payload.developerId];
    setSelectedDevelopersId(newSelectedDevelopersId);
  }

  const onLoginSuccess = async credentialResponse => {
    const res = await fetch(process.env.REACT_APP_API_AUTH_URL, {
        method: "POST",
        body: JSON.stringify({
        token: credentialResponse.credential
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const { email, sub } = await res.json();
    localStorage.setItem('currentUser', email);
    localStorage.setItem('token', sub);
    setCurrentUser({ email, token: sub });
  }

  const onSendEmails = async () => {
    if (messageBody) {
        setIsLoading(true);
        const developerSelectedEmails = developers.filter(developer => selectedDevelopersId.includes(developer.id)).map(developer => developer.email);
        const payload = { receivers: developerSelectedEmails, messageBody, token: currentUser.token };
        const res = await fetch(process.env.REACT_APP_API_EMAIL_URL, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json"
          }
      });
      setIsLoading(false);
      setIsMessageSent(true);
    } else {
      alert('you should type something...');
    }
  }

  return (
    <div className="App">
      <div className="wrapper">  

        <div className="is-flex separator">  
          <img src={cypressLogo} width="100" />
          <img src={googleLogo} width="100" className="ml-10"/>
          <span className="sub-title ml-5"> - E2E Test 🧪 </span>
        </div>

        <div className="separator">  
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
              <GoogleLogin onSuccess={onLoginSuccess} onError={() => { console.log('Login Failed')}} />  
          </GoogleOAuthProvider>
        </div>
        
        { !currentUser 
          ? <span className="sub-title">  🔒 You are not logged In. </span>
          : <>
            <div className="separator"> 
              <span className="sub-title">  ✅ Welcome {currentUser.email}. </span>
            </div>
            
            <div className="separator is-flex is-colunm"> 
              <label className="label">  Your message body ✉️ </label>
              <textarea id="textareaId" rows="4" value={messageBody} onChange={e => setMessageBody(e.target.value)} />
            </div>

            <div className="separator">
              {
                developers.map((developer) => {
                  return(
                    <Checkbox key={developer.id} onCheckDeveloper={onCheckDeveloper} developer={developer}/>
                  )
                })
              }
            </div>

            { isLoading 
                ? <div class="loader"></div>
                : <button class="button" onClick={() => onSendEmails()}>
                <span> Send mail 📤 </span>
              </button>
            }

            { 
              isMessageSent && <>
              <br/>
              <div className='label'> Message Sent ✅ </div>
              </> 
            }
            
          </>
        }
      </div>
    </div>
  );
}

export default App;
