const loadUrl=async ()=>{
    const url=` https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(url);
        const data =await res.json();
        const Data =data.data.news_category;
       
        creatlist(Data);
        
    }
    catch (err){
        console.log(err);
    }
}
const creatlist = names => {
    const nav =document.getElementById('nav');

    names.forEach(name => {
        const navdiv = document.createElement('li');
        navdiv.classList.add('nav-item');
        navdiv.innerHTML= `<a class="nav-link active" aria-current="page" href="#"   onclick="loading(${name.category_id})">${name.category_name}</a>`;
        nav.appendChild(navdiv);
    });
}
 
const loading = async(id) => {
    try{
        const url =`https://openapi.programming-hero.com/api/news/category/0${id}`;
        const res = await fetch(url);
        const data = await res.json();
        const Data =data.data;
        creatCard(Data) ;
        length(Data.length);
        console.log(Data.length);
        
    }
    catch(err){
        console.log(err);
    }

  
}

const length =(len)=>{

 const lenid= document.getElementById('lenid');
 lenid.innerHTML="";
  lenid.innerHTML=`<h1>${len ? len : "no"}  news found</h1>`
}
 const creatCard= (data)=>{
   const cardSection = document.getElementById('cardSection');
   cardSection.innerHTML="";
   data.forEach(data => {
    const newdiv = document.createElement('div');
    newdiv.innerHTML= 
 `<div class="card mb-3 width-100 ">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${data.image_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.details.slice(0,300)}...</p>

          <div class="container">
          <div class="row">
            <div class="col">
            <span class="mx-2 "><img style="width:20px;" src="${data.author.img}" class="img-fluid rounded-circle" alt=""></span><span>${data.author.name? data.author.name:"no data found"} <br>${data.author.published_date}</span>
            </div>
            <div class="col">
               <span class="mx-2"><i class="bi bi-eye"></i></span><span>${data.total_view ? data.total_view :"no data available"}</span>
            </div>
            <div class="col">
                <button onclick="modal(data)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Details
              </button>

              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Info details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div id="hello" class="modal-body">
                     <p><strong>Author Name:  </strong>${data.author.name? data.author.name:"no data found"} </p>
                     <p><strong>Published Date:  </strong>${data.author.published_date} </p>
                     <p><strong>Trending Now:  </strong>${data.others_info.is_trending} </p>
                     <p><strong>Rating Badge:  </strong>${data.rating.badge} </p>
                     <p><strong>View:  </strong>${data.total_view ? data.total_view:"no data available"} </p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

            </div>
           </div>
          </div>

        </div>
       </div>
    </div>
  </div>`;
    cardSection.appendChild(newdiv);
});
 }



loadUrl();


