
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import api from '../../Api'

import '../../../css/home.scss'
// import '../../../css/profile.css'
import { isSet } from 'lodash';
import useDebounceEffect from '../helpers/useDebounceEffect';




function Home() {

  let user = JSON.parse(localStorage.getItem('userData'))
  

  const Logout=()=>{
    if(localStorage.getItem('userData')){
      localStorage.removeItem('userData')
    }
    var oldItems = JSON.parse(localStorage.getItem('userData')) || [];
  }

  const [searchArticle,setSearchArticle] = useState({
    
    title:''
    
  })

  console.log(searchArticle)
  
  const [Articles,setArticles] = useState([])


  useDebounceEffect(() => {
    if(searchArticle.title!=''){
    api
    .post('/searchArticle', searchArticle)
    .then(res => {
      setArticles(res.articles.data)
    })
  }
  }, [searchArticle], 1)


  
  // const SearchArticle = (e) =>{
  //   api.post('/searchArticle',searchArticle)
    
  //   .then(res => {
  //     setArticles(res.articles.data)
  //     setSearchArticle({
  //       title:'',
        
  //     })
      
  //   })
  //   .catch((errors) => {
  //     setAddErrors(errors.response.data.errors)
  //   })
  // }


  const Delete = (e)=>{
    api.post('/deleteArticle',e)
    
    .then(res => {
      setArticles(res.articles.data)
      
      
    })
  }
  return (
    <div>
      <div className="google_homepage">
        <div className="google_homepage_header">
      
          <ul>
          {
            (!user)?
            
              <li className="nav-link"><Link to='/login'  style={{color:'black'}} > Login</Link></li>:
            (user[0].type==0)
            ?
            <div  style={{display:'flex',flexWrap:'wrap',justifyContent:'center' , alignItems:'center'}}>
              <h5  style={{color:'black'}}>{user[0].name} {user[0].surname} </h5>
              <li className="nav-link"><Link to='/'  href="#button"  style={{color:'black'}} onClick={()=>Logout()} > Logout</Link></li>
              <li className="nav-link"><Link to='/addArticles' style={{color:'black'}}>Add articles</Link></li>
            </div>:
            (user[0].type==1)?
            
            <div  style={{display:'flex',flexWrap:'wrap',justifyContent:'center' , alignItems:'center'}}>
              <h5  style={{color:'black'}}>{user[0].name} {user[0].surname} </h5>
              <li className="nav-link"><Link to='/addArticles' style={{color:'black'}}>Add articles</Link></li>
              <li className="nav-link" ><Link to='/'  href="#button"  style={{color:'black'}} onClick={()=>Logout()} > Logout</Link></li>
            </div>
            :''
          }
            

          </ul>
        </div>

        <div className="google_homepage_content">
          <div className="google_homepage_content_logo">
            
            <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt=""/>
          </div>
          <div className="google_homepage_content_searchbar">
            <input type="search" placeholder="Search Google or type a URL"  required value={searchArticle.title} onChange={(e)=>setSearchArticle({...searchArticle,title:e.target.value})}/>
            <button className="speak">
              
            </button>
          </div>
          <div>
            
          {/* {

          (!user || user[0].type==0)
          ?
              <ul >
                <li style={{width:'100px'}}>Title</li>
                
                <li style={{width:'260px'}}>Description</li>
              </ul>:
              (user[0].type==1)
          ?
              <ul >
                <li style={{width:'100px'}}>Title</li>
                
                <li style={{width:'260px'}}>Description</li>
                

              </ul>:''
        } */}
        
        {
          (Articles)?
            (!user || user[0].type==0)
            ?
              Articles.map((article,i) => (
                <ul key={i} className="list-group" style={{width:'100%'}}>
                  <li data-label="first name"  className="list-group-item" style={{width:'350px',marginLeft:'5%'}}>
                    <Link to={`/article/${article.id}`} >
                    {article.title}
                    </Link>  
                  </li>

                  {/* <li data-label="last name" style={{width:'260px' , minHeight:'20px'}}>
                    <Link to={`/article/${article.id}`} >

                      {article.description}
                    </Link>
                  </li> */}

                </ul>
              )):
            (user[0].type==1)
            ?
              Articles.map((article,i) => (
                <ul key={i} className="list-group" style={{width:'100%'}}>
                  <li data-label="first name"  className="list-group-item"  style={{width:'350px',marginLeft:'5%',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>
                    <Link to={`/article/${article.id}`} >
                    {article.title}
                    </Link>  
                    <div>
                      <img src={'https://icon-library.com/images/icon-delete/icon-delete-20.jpg'} style={{width:'40px'}} onClick={()=>Delete(`${article.id}`)}/>

                      <Link to={`/update/${article.id}`}  >

                        <img style={{width:'40px'}} src={'https://toppng.com/uploads/preview/user-edit-icon-edit-icon-white-11553486095hpvoxaoebd.png'} />
      
                      </Link>
                    </div>
                  </li>

                </ul>
              ))
            :''
          :''
        }



          </div>
        </div>
      </div>

        
  </div>

  )
}
export default Home;
