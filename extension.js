
let myLeads = []
const inputEl = document.getElementById("input-el")
const buttoninput = document.getElementById("save-el")
const deleteEl = document.getElementById("delete-el")
const tabEl = document.getElementById("tab-el")
let ulEl= document.getElementById("ul-el")

const allleads =JSON.parse( localStorage.getItem("myLeads"))

// reassigning myLeads[]array
if(allleads){
    myLeads = allleads
    render(myLeads)
}

// rendering all the leads to display on the screeen
function render(leads){
    let listitems = ""
    for(let i=0; i<leads.length; i++){
    
    //    listitems +="<li><a href='"+myLeads[i]+"' target='_blank'>" + myLeads[i] + "</a></li>"
          listitems +=`<li>
                       <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
                       </li>`

        // or can be done in this way too..
        
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li)
    }
    ulEl.innerHTML = listitems
    }

// adding leads into the array when button clicked
buttoninput.addEventListener("click",function(){
    // here above the addeventlistener() method executes its value when its key is called
    if(inputEl.value!=""){
    myLeads.push(inputEl.value )
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    deleteEl.textContent="DELETE ALL"
    render(myLeads)
    }
})

// to delete all the leads from the local storage and to empty the array and screen
deleteEl.addEventListener("click",function(){
    
    localStorage.clear()
    myLeads=[]
    if(allleads){
    deleteEl.textContent="DELETED"
   }
   render(myLeads)
})

// to save the current tab directly from the browser using Chrome API
tabEl.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        deleteEl.textContent="DELETE ALL"
        render(myLeads)
    })
})