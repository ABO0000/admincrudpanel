import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import {Navbar,Route,Link, Redirect} from 'react-router-dom';
import api from '../../Api'
import '../../../css/login.sass'
import '../../../css/login.css'


function AddArticle() {
    let user = JSON.parse(localStorage.getItem('userData'))[0]



    const [addArticle,setAddArticle] = useState({
        title:'',
        description:'',
        imgs:[]
        
    })
    
    const [addErrors, setAddErrors] = useState({})
    
    

    console.log(user.id)
    const AddArticle = (e) =>{
        let data = new FormData();
        data.append('title',[ addArticle.title ]);
        data.append('description',[ addArticle.description ]);
        data.append('user_id',[user.id]);
        if(addArticle.imgs.length!=0){
            for (let i = 0 ; i < addArticle.imgs[0].imgs.length ; i++) {
                data.append("data"+i, addArticle.imgs[0].imgs[i]);
            } 
        }
        // for (var elems of data) {
        //     arr.push(elems)
        // }
        const res =  api.post('/addArticle',data)
        
        .then(data => {
            if (data.status == 200) {
                {
                    setAddArticle({
                        title:'',
                        description:'',
                        imgs:[]
                    })
                }

            }
        })
        .catch((errors) => {
            setAddErrors(errors.response.data.errors)
        })
    }


    const userForms = document.getElementById('user_options-forms')

    window.onload = function(){
        
    //Check File API support
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput = document.getElementById("files");
        
        filesInput.addEventListener("change", function(event){
            
            var files = event.target.files; //FileList object
            var output = document.getElementById("imgThumbnailPreview");
            
            for(var i = 0; i< files.length; i++)
            {
                var file = files[i];
                
                //Only pics
                if(!file.type.match('image'))
                  continue;
                
                var picReader = new FileReader();
                
                picReader.addEventListener("load",function(event){
                    
                    var picSrc = event.target.result;
                    
                    var imgThumbnailElem = "<div className='imgThumbContainer'><div className='IMGthumbnail' ><img  src='" + picSrc + "'" +
                            "title='"+file.name + "'/></div>";
                    
                    output.innerHTML = output.innerHTML + imgThumbnailElem;            
                
                });
                
                 //Read the image
                picReader.readAsDataURL(file);
            }                               
           
        });
    }
    else
    {
        alert("Your browser does not support File API");
    }
}



    return (
        

        <section className="user">
                <div className="user_options-text">
                    <div className="user_options-unregistered">
                        <h2 className="user_unregistered-title"></h2>
                        <p className="user_unregistered-text"></p>
                        <p id="signup-button" ></p>
                    </div>

                    
                </div>
                
                <div className="user_options-forms" id="user_options-forms" style={{marginLeft:'-25%'}}>
                    <div className="user_forms-login">
                        <h2 className="forms_title">Add Articles</h2>
                        <div className="forms_form ">
                            <fieldset className="forms_fieldset">
                            <div className="forms_field">
                                    <input type="text" placeholder="Title" className="forms_field-input" required value={addArticle.title} onChange={(e)=>setAddArticle({...addArticle,title:e.target.value})}/>
                                    <p>{addErrors.title}</p>
                                </div>
                                <div className="forms_field">
                                    <input type="text" placeholder="description" className="forms_field-input" required value={addArticle.description} onChange={(e)=>setAddArticle({...addArticle,description:e.target.value})}/>
                                    <p>{addErrors.description}</p>
                                </div>

                                <div className="forms_field">
                                  <div className='header'>Photo API - Photo Reader</div>
                                  <div  >
                                    <label htmlFor="files">Select multiple photo: </label>
                                    <input id="files" type="file" multiple 
                                        onChange ={(e)=> {
                                            
                                            // console.log(e.target.files, "Event")
                                            setAddArticle({
                                                ...addArticle,
                                                imgs: [{
                                                    ...addArticle,imgs:e.target.files
                                                }]
                                            })
                                        }}
                                    />        
                                  </div>
                                  <div >
                                  
                                    <div id="imgThumbnailPreview"style={{width:'100%' ,height:'50px',display:"flex"}}>
                                    </div>
                                  </div>
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                            <Link to='/' > <input type="submit" value="Add Article" className="forms_buttons-action" style={{background:'darkgray',marginTop:'-30%'}} onClick={()=>AddArticle()}/></Link>
                            </div>
                        </div>
                    </div>
                    
                    
            </div>
        </section>






    );

}

export default AddArticle;




        