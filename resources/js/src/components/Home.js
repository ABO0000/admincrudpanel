
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import api from '../../Api'

import '../../../css/home.scss'
import '../../../css/home.css'
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
    if (searchArticle.title==''){
      
      api
    .post('/searchArticle', '1')
    .then(res => {
      setArticles()
    })
    }
    else if(searchArticle.title!==''){
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
            <div  style={{display:'flex',flexWrap:'wrap',justifyContent:'center' , alignItems:'center'}}>
              <li className="nav-link"><Link to='/allArticles' style={{color:'black'}}> Articles</Link></li>
              <li className="nav-link"><Link to='/login'  style={{color:'black'}} > Login</Link></li>
            </div>:
            (user[0].type==0)
            ?
            <div  style={{display:'flex',flexWrap:'wrap',justifyContent:'center' , alignItems:'center'}}>
              <h5  style={{color:'black'}}>{user[0].name} {user[0].surname} </h5>
              <li className="nav-link"><Link to='/addArticles' style={{color:'black'}}>Add articles</Link></li>
              <li className="nav-link"><Link to='/allArticles' style={{color:'black'}}> Articles</Link></li>
              <li className="nav-link"><Link to='/'  href="#button"  style={{color:'black'}} onClick={()=>Logout()} > Logout</Link></li>
            </div>:
            (user[0].type==1)?
            
            <div  style={{display:'flex',flexWrap:'wrap',justifyContent:'center' , alignItems:'center'}}>
              <h5  style={{color:'black'}}>{user[0].name} {user[0].surname} </h5>
              <li className="nav-link"><Link to='/addArticles' style={{color:'black'}}>Add articles</Link></li>
              <li className="nav-link"><Link to='/allArticles' style={{color:'black'}}> Articles</Link></li>
              <li className="nav-link" ><Link to='/'  href="#button"  style={{color:'black'}} onClick={()=>Logout()} > Logout</Link></li>
            </div>
            :''
          }
            

          </ul>
        </div>

        <div className="google_homepage_content">
          {/* <div className="google_homepage_content_logo">
            
            <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt=""/>
          </div>
          <div className="google_homepage_content_searchbar">
            <i className="fas fa-search"> </i>
            <input type="search" placeholder="Search Google or type a URL"  required value={searchArticle.title} onChange={(e)=>setSearchArticle({...searchArticle,title:e.target.value})}/>
            <div className="mic">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACrElEQVR42u2Xz2sTQRSAX8VSb1K8iNqKooJH2Ux6Ksn+iPQqxZMIehJB0do/IMhmQWsvHr2KSEGk0tSLIoWIYNUKij20F2/N7iaUZnYT0kYzzhMKs0HDJiTdLcwHDwKZSd63781LBiQSSW9JZdkhzfKm1Rz9mjZp/W9YdEU3vXv4HsQZ40FtNG36q5rls//Ej4tmbSS2T15Mvp3ExOPmEMQNbBtMMEyoljcFcQN7PqyAlqNfIG7gYQ0tYNIaxA1MrJPY3wImbUqBKAXSFv0tBSIVMOkvKRDtGKWN/T6FdqRAxFNoWwpEPIXqUqBT6ALU/UVgu8GW4GD3f6f9TRDYNJTDrk7YbtiqUumHwIYoUJuHERDAS0r4CvgFECgbY+cFAR7KT+g1POmCKFDNw6WggHc3fBtVb4CAoyauBgXIG+g1Xh5mRAGah6cggBd11fK/h7lOprIs0H6uRl6KAo5O7kOv4QmPiwJ4Jqqv4FiwCtXjvD2+tRmfK6kZ/ygI2HritK0rDVGgrClJ6DWMwYC/AGuCBMYcIC2V0CzvjmbRz3j3xUjn6CfeYreUJ2wQkGD75INPX1mFfsEFrrcIYCvdhC4paWQakxajpJMr0C9YFg54i7AsClRmh9/xnr0NHcInzZStk2aLwAcGMAD9pPIazvFKVDD5rdnhJeHLX5RTyRPQHpz5o66emMc9wdlPtvA8wF7Aq2BUHh1525qEo5JtR1WeOXpickO9cJIpyuD6xJmhYiZ5ytWSl3mlnuOaf+2zDaLDXmJrSgZ/MYVEugo+gSh+FkSBa4yd5Ul87DZ5XpFl/AyIEjzYjkau8WqshU2cr13HPbgX4gJOD97n465GZlyVvC9mSKloKI2iTnbwNT+gBX54H+IaXAtxJzE3ycSAFqSAFJACUkAikXD+AHj5/wx2o5osAAAAAElFTkSuQmCC"
            />
          </div>
            <button className="speak">
              
            </button>
          </div> */}


          <div className="google-function">
              <p>
                <span className="google-name">g</span>
                <span className="google-name">o</span>
                <span className="google-name">o</span>
                <span className="google-name">g</span>
                <span className="google-name">l</span>
                <span className="google-name">e</span>
              </p>
              
                <div style={{width:'35%',display:'flex',justifyContent:'space-around' , alignItems:'center'}}>
                  <div className="search" style={{position:'absolute',marginRight:'31%'}}>
                    <img src='https://www.freepnglogos.com/uploads/search-png/search-icon-clip-art-clkerm-vector-clip-art-online-22.png'/>
                  </div>
                  <input type="text" id="gsearch" name="gsearch" style={{width:'100%'}} required value={searchArticle.title} onChange={(e)=>setSearchArticle({...searchArticle,title:e.target.value})} autoComplete="off"/>
                  <div className="mic" style={{position:'absolute',marginLeft:'33%'}}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACrElEQVR42u2Xz2sTQRSAX8VSb1K8iNqKooJH2Ux6Ksn+iPQqxZMIehJB0do/IMhmQWsvHr2KSEGk0tSLIoWIYNUKij20F2/N7iaUZnYT0kYzzhMKs0HDJiTdLcwHDwKZSd63781LBiQSSW9JZdkhzfKm1Rz9mjZp/W9YdEU3vXv4HsQZ40FtNG36q5rls//Ej4tmbSS2T15Mvp3ExOPmEMQNbBtMMEyoljcFcQN7PqyAlqNfIG7gYQ0tYNIaxA1MrJPY3wImbUqBKAXSFv0tBSIVMOkvKRDtGKWN/T6FdqRAxFNoWwpEPIXqUqBT6ALU/UVgu8GW4GD3f6f9TRDYNJTDrk7YbtiqUumHwIYoUJuHERDAS0r4CvgFECgbY+cFAR7KT+g1POmCKFDNw6WggHc3fBtVb4CAoyauBgXIG+g1Xh5mRAGah6cggBd11fK/h7lOprIs0H6uRl6KAo5O7kOv4QmPiwJ4Jqqv4FiwCtXjvD2+tRmfK6kZ/ygI2HritK0rDVGgrClJ6DWMwYC/AGuCBMYcIC2V0CzvjmbRz3j3xUjn6CfeYreUJ2wQkGD75INPX1mFfsEFrrcIYCvdhC4paWQakxajpJMr0C9YFg54i7AsClRmh9/xnr0NHcInzZStk2aLwAcGMAD9pPIazvFKVDD5rdnhJeHLX5RTyRPQHpz5o66emMc9wdlPtvA8wF7Aq2BUHh1525qEo5JtR1WeOXpickO9cJIpyuD6xJmhYiZ5ytWSl3mlnuOaf+2zDaLDXmJrSgZ/MYVEugo+gSh+FkSBa4yd5Ul87DZ5XpFl/AyIEjzYjkau8WqshU2cr13HPbgX4gJOD97n465GZlyVvC9mSKloKI2iTnbwNT+gBX54H+IaXAtxJzE3ycSAFqSAFJACUkAikXD+AHj5/wx2o5osAAAAAElFTkSuQmCC"/>
                  </div>
                </div>

                
                <div style={{width:'35%',justifyContent:'center',marginTop:'-25px' , alignItems:'center'}}>
        {
          (Articles)?
            (!user || user[0].type==0)
            ?
              Articles.map((article,i) => (
                <ul key={i} className="list-group"  style={{width:'100%'}}>
                  <li data-label="first name"  className="list-group-item" style={{width:'100%'}}>
                    <div className="search"  style={{width:'10%',display:'flex',alignItems:'center' ,marginLeft:'-10px'}}>
                      <img src='https://www.freepnglogos.com/uploads/search-png/search-icon-clip-art-clkerm-vector-clip-art-online-22.png'/>
                      <Link to={`/article/${article.id}`} style={{marginLeft:'10px'}} >
                      {article.title}
                      </Link>  
                    </div>
                  </li>

                  

                </ul>
              )):
            (user[0].type==1)
            ?
              Articles.map((article,i) => (
                <ul key={i} className="list-group" style={{width:'100%'}}>
                  <li data-label="first name"  className="list-group-item"  style={{width:'100%',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>
                    <div className="search"  style={{width:'10%',display:'flex',alignItems:'center' ,marginLeft:'-10px'}}>
                      <img src='https://www.freepnglogos.com/uploads/search-png/search-icon-clip-art-clkerm-vector-clip-art-online-22.png'/>
                      <Link to={`/article/${article.id}`} style={{marginLeft:'10px'}} >
                      {article.title}
                      </Link>  
                    </div>
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
            <div className="button-group">
                  <button className="google-button" type="submit">Google Search</button>
                  <button className="google-button" type="submit">I'm Feeling Lucky</button>
                </div>
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
        

          </div>
        </div>
      </div>

        
  </div>

  )
}
export default Home;
