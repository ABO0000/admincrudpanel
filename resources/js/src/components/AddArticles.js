import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import {Navbar,Route,Link, Redirect, useHistory} from 'react-router-dom';
import api from '../../Api'
import '../../../css/login.sass'
import '../../../css/login.css'


function AddArticle() {
    let user = JSON.parse(localStorage.getItem('userData'))[0]

    var myModal = document.getElementById('myModal')
    var myInput = document.getElementById('myInput')
    
    // myModal.addEventListener('shown.bs.modal', function () {
    //   myInput.focus()
    // })

    const [addArticle,setAddArticle] = useState({
        title:'',
        description:'',
        text:'',
        imgs:[]
        
    })
    
    const [addErrors, setAddErrors] = useState({})
    const history = useHistory()
    
    

    console.log(user.id)
    const AddArticle = (e) =>{
        let data = new FormData();
        data.append('title',[ addArticle.title ]);
        data.append('description',[ addArticle.description ]);
        data.append('text',[ addArticle.text ]);
        data.append('user_id',[user.id]);
        if(addArticle.imgs.length != 0){
            for (let i = 0 ; i < addArticle.imgs[0].imgs.length ; i++) {
                data.append("data"+i, addArticle.imgs[0].imgs[i]);
            } 
        }
        if(addArticle.title=='' || addArticle.description=='' || addArticle.text=='' || addArticle.imgs==''){
            alert("You are not add article, becouse you are don't completed all fields")
        }
        else{
            const res =  api.post('/addArticle',data)
            
            .then(data => {
                if (data.status == 200) {
                    {
                        setAddArticle({
                            title:'',
                            description:'',
                            text:'',
                            imgs:[]
                        })
                    }

                }
            })
            .catch((errors) => {
                setAddErrors(errors.response.data.errors)
            })
            history.push('/')
        }

         


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

    const redirectHandler = () => history.push('/')



    return (
        

        <section className="user">
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you wont closed
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button data-dismiss="modal" onClick={() => redirectHandler()} className="btn btn-primary">Yes</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="user_options-text">
                <div className="user_options-unregistered">
                    <h2 className="user_unregistered-title"></h2>
                    <p className="user_unregistered-text"></p>
                    <p id="signup-button" ></p>
                </div>

                
            </div>
            
            <div className="user_options-forms" id="user_options-forms" style={{marginLeft:'-25%'}}>
                <div className="user_forms-login" style={{marginTop:'-50px'}}>
                    <h2 className="forms_title">Add Articles</h2>
                    <div className="forms_form " style={{marginTop:'-10px'}}>
                        <fieldset className="forms_fieldset">
                        <div className="forms_field"  style={{marginBottom:'-10px'}}>
                                <input type="text" style={{marginTop:'-10px'}} placeholder="Title" className="forms_field-input" required value={addArticle.title} onChange={(e)=>setAddArticle({...addArticle,title:e.target.value})}/>
                                <p>{addErrors.title}</p>
                            </div>
                            <div className="forms_field">
                                <input type="text" placeholder="description" style={{marginTop:'-10px'}} className="forms_field-input" required value={addArticle.description} onChange={(e)=>setAddArticle({...addArticle,description:e.target.value})}/>
                                <p>{addErrors.description}</p>
                            </div>
                            <div className="forms_field">
                                <input type="text" placeholder="text" style={{marginTop:'-10px'}} className="forms_field-input" required value={addArticle.text} onChange={(e)=>setAddArticle({...addArticle,text:e.target.value})}/>
                                <p>{addErrors.text}</p>
                            </div>
                            


                            <div className="forms_field" style={{marginTop:'-30px'}}>
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
                                
                                <div id="imgThumbnailPreview"style={{width:'100%' ,height:'40px',display:"flex"}}>
                                </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                        <div className="forms_buttons" style={{marginTop:'0'}}>
                        <input type="submit" value="Add Article" className="forms_buttons-action" style={{background:'darkgray'}} onClick={()=>AddArticle()}/>
                            <button className="profile-card__button button--blue js-message-btn" data-toggle="modal" data-target="#exampleModalCenter" >Cancelasdas</button>
                            
                        </div>
                </div>
            </div>
        </section>

    );

}

export default AddArticle;















// import React, { useState} from 'react';
// import ReactDOM from 'react-dom';
// import {Navbar,Route,Link, Redirect, useHistory} from 'react-router-dom';
// import api from '../../Api'
// import '../../../css/login.sass'
// import '../../../css/login.css'


// function AddArticle() {
//     let user = JSON.parse(localStorage.getItem('userData'))[0]

//     var myModal = document.getElementById('myModal')
//     var myInput = document.getElementById('myInput')
    
//     // myModal.addEventListener('shown.bs.modal', function () {
//     //   myInput.focus()
//     // })

//     const [addArticle,setAddArticle] = useState({
//         title:'',
//         description:'',
//         imgs:[]
        
//     })
    
//     const [addErrors, setAddErrors] = useState({})
//     const history = useHistory()
    
    

//     console.log(user.id)
//     const AddArticle = (e) =>{
//         let data = new FormData();
//         data.append('title',[ addArticle.title ]);
//         data.append('description',[ addArticle.description ]);
//         data.append('user_id',[user.id]);
//         // data.append('file', addArticle.imgs);
//         for(var x = 0; x < addArticle.imgs.length; x++) {
//             data.append("file[]", addArticle.imgs[x])
//         }
//         // if(addArticle.imgs.length != 0){
//         //     for (let i = 0 ; i < addArticle.imgs[0].imgs.length ; i++) {
//         //         data.append("data"+i, addArticle.imgs[0].imgs[i]);
//         //     } 
//         // }
//         if(addArticle.title=='' || addArticle.description=='' || addArticle.imgs==''){
//             alert("You are not add article, becouse you are don't completed all fields")
//         }
//         else{
//             const res =  api.post('/addArticle', data, {
//                 headers: {
//                     'content-type': 'multipart/form-data'
//                 }
//             })
            
//             .then(data => {
//                 if (data.status == 200) {
//                     {
//                         setAddArticle({
//                             title:'',
//                             description:'',
//                             imgs:[]
//                         })
//                     }

//                 }
//             })
//             .catch((errors) => {
//                 setAddErrors(errors.response.data.errors)
//             })
//             history.push('/')
//         }

         


//     }


//     const userForms = document.getElementById('user_options-forms')

//     window.onload = function(){
        
//         //Check File API support
//         if(window.File && window.FileList && window.FileReader)
//         {
//             var filesInput = document.getElementById("files");
            
//             filesInput.addEventListener("change", function(event){
                
//                 var files = event.target.files; //FileList object
//                 var output = document.getElementById("imgThumbnailPreview");
                
//                 for(var i = 0; i< files.length; i++)
//                 {
//                     var file = files[i];
                    
//                     //Only pics
//                     if(!file.type.match('image'))
//                     continue;
                    
//                     var picReader = new FileReader();
                    
//                     picReader.addEventListener("load",function(event){
                        
//                         var picSrc = event.target.result;
                        
//                         var imgThumbnailElem = "<div className='imgThumbContainer'><div className='IMGthumbnail' ><img  src='" + picSrc + "'" +
//                                 "title='"+file.name + "'/></div>";
                        
//                         output.innerHTML = output.innerHTML + imgThumbnailElem;            
                    
//                     });
                    
//                     //Read the image
//                     picReader.readAsDataURL(file);
//                 }                               
            
//             });
//         }
//         else
//         {
//             alert("Your browser does not support File API");
//         }
//     }

//     const redirectHandler = () => history.push('/')



//     return (
        

//         <section className="user">
//             <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered" role="document">
//                     <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
//                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                         </button>
//                     </div>
//                     <div className="modal-body">
//                         Are you wont closed
//                     </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                         <button data-dismiss="modal" onClick={() => redirectHandler()} className="btn btn-primary">Yes</button>
//                     </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="user_options-text">
//                 <div className="user_options-unregistered">
//                     <h2 className="user_unregistered-title"></h2>
//                     <p className="user_unregistered-text"></p>
//                     <p id="signup-button" ></p>
//                 </div>

                
//             </div>
            
//             <div className="user_options-forms" id="user_options-forms" style={{marginLeft:'-25%'}}>
//                     <img src='https://www.freeiconspng.com/thumbs/x-png/x-png-15.png' data-toggle="modal" data-target="#exampleModalCenter" style={{width:'20px' ,marginLeft:'97%'}}></img>
//                 <div className="user_forms-login">
//                     <h2 className="forms_title">Add Articles</h2>
//                     <div className="forms_form ">
//                         <fieldset className="forms_fieldset">
//                         <div className="forms_field">
//                                 <input type="text" placeholder="Title" className="forms_field-input" required value={addArticle.title} onChange={(e)=>setAddArticle({...addArticle,title:e.target.value})}/>
//                                 <p>{addErrors.title}</p>
//                             </div>
//                             <div className="forms_field">
//                                 <input type="text" placeholder="description" className="forms_field-input" required value={addArticle.description} onChange={(e)=>setAddArticle({...addArticle,description:e.target.value})}/>
//                                 <p>{addErrors.description}</p>
//                             </div>








//                             <div className="forms_field">
//                                 <div className='header'>Photo API - Photo Reader</div>
//                                 <div  >
//                                 <label htmlFor="files">Select multiple photo: </label>
//                                 <input id="files" type="file" multiple 
//                                     onChange ={(e)=> {
                                        
//                                         // console.log(e.target.files, "Event")
//                                         setAddArticle({
//                                             ...addArticle,
//                                             // imgs: [{
//                                             //     ...addArticle, imgs: e.target.files[0]
//                                             // }]
//                                             imgs: e.target.files
//                                         })
//                                     }}
//                                 />        
//                                 </div>
//                                 <div >
                                
//                                 <div id="imgThumbnailPreview"style={{width:'100%' ,height:'50px',display:"flex"}}>
//                                 </div>
//                                 </div>
//                             </div>
//                         </fieldset>
//                     </div>
//                         <div className="forms_buttons">
//                         <input type="submit" value="Add Article" className="forms_buttons-action" style={{background:'darkgray'}} onClick={()=>AddArticle()}/>
                        
//                         </div>
//                 </div>
//             </div>
//         </section>

//     );

// }

// export default AddArticle;

