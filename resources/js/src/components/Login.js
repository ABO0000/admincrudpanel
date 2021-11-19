import React, { useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {Navbar,Route,Link, Redirect} from 'react-router-dom';
import api from '../../Api'
import '../../../css/login.sass'


function Login() {

    const [user,setUser] = useState({
        email:'',
        password:'',
    })

    const userForm = useRef(null)
    
    const [errors, setErrors] = useState({})

    

    const Login=()=>{
        const res =  api.post('/login',user)
        .then((data) => {
            if(localStorage.getItem('userData')){
                localStorage.removeItem('userData')
            }
            var oldItems = JSON.parse(localStorage.getItem('userData')) || [];
            
            oldItems.push(data.user);
            console.log(oldItems)

                localStorage.setItem('userData', JSON.stringify(oldItems));
                return window.location.href = '/'

            // localStorage.setItem('userData', JSON.stringify(oldItems));
            // return window.location.href = '/adminprofile'
        })
        .catch((errors) => {
            setErrors(errors.response && errors.response.data.errors ? errors.response.data.errors : [])
        })
        
        
    }



    const [regUser,setRegUser] = useState({
        name:'',
        surname:'',
        email:'',
        password:'',
    })

    const [regErrors, setRegErrors] = useState({})
    
    const saveUser = (e) =>{
        const res =  api.post('/register',regUser)
        
        .then(data => {
            if (data.status == 200) {
                {
                    setRegUser({
                        name:'',
                        surname:'',
                        email:'',
                        password:''
                    })
                }
            }
        })
        .catch((errors) => {
            console.log(errors.response.data.errors)
            setRegErrors(errors.response.data.errors)
        })
    }


  
    const loginButton = () => {
        userForm.current.classList.add('bounceRight')
        userForm.current.classList.remove('bounceLeft')
    }
    
    const signupButton = () => {
        userForm.current.classList.add('bounceLeft')
        userForm.current.classList.remove('bounceRight')
    }

    


    return (
        

        <section className="user" style={{background:'rgb(209, 230, 243)'}}>
            <div className="user_options-container">
                <div className="user_options-text">
                    <div className="user_options-unregistered">
                        <h2 className="user_unregistered-title">Don't have an account?</h2>
                        <p className="user_unregistered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
                        <button className="user_unregistered-signup" id="signup-button" onClick={()=>signupButton()}>Sign up</button>
                    </div>
                    <div className="user_options-registered">
                        <h2 className="user_registered-title">Have an account?</h2>
                        <p className="user_registered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
                        <button className="user_registered-login" id="login-button" onClick={()=>loginButton()}>Login</button>
                    </div>

                </div>
                
                <div className="user_options-forms" name='user_options-forms' id="user_options-forms" ref={userForm}>
                    <div className="user_forms-login">
                        <h2 className="forms_title">Login</h2>
                        <div className="forms_form">
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                <label htmlFor="#username">{errors.email}</label>
                                <input type="email" id='email' placeholder="Email" className="forms_field-input" required autoFocus value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
                                </div>
                                <div className="forms_field">
                                <label htmlFor="#password">{errors.password}</label>
                                <input type="password" id="url" placeholder="Password" className="forms_field-input" required value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                <input type="submit" value="Log In" className="forms_buttons-action" onClick={()=>Login()}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="user_forms-signup regForm" style={{minHeight: 600}}>
                        <h2 className="forms_title">Sign Up</h2>
                        <div className="forms_form">
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input type="text" placeholder="Full Name" className="forms_field-input" required value={regUser.name} onChange={(e)=>setRegUser({...regUser,name:e.target.value})}/>
                                    <p>{regErrors.name}</p>
                                </div>
                                <div className="forms_field">
                                    <input type="text" placeholder="Surname" className="forms_field-input" required value={regUser.surname} onChange={(e)=>setRegUser({...regUser,surname:e.target.value})}/>
                                    <p>{regErrors.surname}</p>
                                </div>
                                <div className="forms_field">
                                    <input type="email" placeholder="Email" className="forms_field-input" required value={regUser.email} onChange={(e)=>setRegUser({...regUser,email:e.target.value})}/>
                                    <p>{regErrors.email}</p>
                                </div>
                                
                                <div className="forms_field">
                                    <input type="password" placeholder="Password" className="forms_field-input" required value={regUser.password} onChange={(e)=>setRegUser({...regUser,password:e.target.value})}/>
                                    <p>{regErrors.password}</p>
                                </div>
                            </fieldset>
                            <div className="forms_buttons">

                                <input type="submit" value="Sign up" className="forms_buttons-action" onClick={() => saveUser()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>






    );

}

export default Login;




        