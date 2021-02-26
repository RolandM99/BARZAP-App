const tableKey = 'cm-table';


let cmTable;
let cmTableDemo = {
    'Roland MANFUL' : {
        'phone' : '+250784173187', 
        'address' : 'KN 775 Street, Gisozi, Kigali, Rwanda',
        'image' : 'uploade image'
    },
    'Ibrahim Bategeka' : {
        'phone': '+250781463227',
        'address': 'KN 667 Street, Gisozi, Kigali, Rwanda ',
        'image' : 'uploade image'
    }
};

let enableDisableNameInput = (option) => {
    let newPersonName = document.getElementById('newPersonName');

    if(option === 'enable') 
        newPersonName.disabled = false;    
    else if
      (option === 'disable')
        newPersonName.disabled = true;
}

let refreshDOMTable = () => {

    let cmTableKeys = Object.keys(cmTable);
    let tableContainer = document.getElementById('cmTableContainer'); 
    let oldTableBody = document.getElementById('tableBody');
    tableContainer.removeChild(oldTableBody); 
    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContainer.appendChild(newTableBody);

    for (let i = 0; i < cmTableKeys.length; i++) {
        let currentRow = document.createElement('div');
        let currentNameCol = document.createElement('div');
        let currentPhoneCol = document.createElement('div');
        let currentAddressCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');
<<<<<<< HEAD
        let currentCallBtn = document.createElement('div');

        currentRow.className = 'cm-table-row';
=======
     

        currentRow.className = 'cm-table-row';
     
>>>>>>> master
        currentNameCol.className = 'cm-table-colm cm-name';
        currentPhoneCol.className = 'cm-table-colm cm-phone';
        currentAddressCol.className = 'cm-table-colm cm-address';
        currentEditBtn.className = 'cm-edit';
        currentDeleteBtn.className = 'cm-delete';
        currentCallBtn.className = 'cm-call';

        currentNameCol.innerHTML = cmTableKeys[i];
        currentPhoneCol.innerHTML = cmTable[cmTableKeys[i]].phone;
        currentAddressCol.innerHTML = cmTable[cmTableKeys[i]].address;
<<<<<<< HEAD
        
        currentEditBtn.innerHTML = '<i class="fas fa-user-edit"></i>'; 
=======
      

        currentEditBtn.innerHTML = '<i class="far fa-edit"></i>'; 
>>>>>>> master
        currentDeleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
        currentCallBtn.innerHTML = '<i class="fas fa-phone"></i>';
        
        currentRow.appendChild(currentNameCol);
        currentRow.appendChild(currentPhoneCol);
        currentRow.appendChild(currentAddressCol);
        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDeleteBtn);
        newTableBody.appendChild(currentRow);
        currentRow.appendChild(currentCallBtn);

    } 


    let enableDisableNewUserModal = (option) => {
        let newPersonName = document.getElementById('newPersonName') ;
        let newPersonPhone = document.getElementById('newPersonPhone');
        let newPersonAddress = document.getElementById('newPersonAddress');

        newPersonName.value = '';
        newPersonPhone.value = '';
        newPersonAddress.value = '';

        let newPersonModal = document.getElementById('newPersonModal');
        let backdrop = document.getElementById('backdrop');

         newPersonModal.className = '${option}-modal';
         backdrop.className = '${option}-modal';
    }

    let addNewEntryBtn = document.getElementById('cmAddNewEntry');
    let editBtn = document.getElementsByClassName('cm-edit');
    let deleteBtn = document.getElementsByClassName('cm-delete');

    let newPersonSubmitBtn = document.getElementById('newPersonSubmitBtn');
    let newPersonCancelBtn = document.getElementById('newPersonCancelBtn');

    newPersonSubmitBtn.addEventListener("click", () => {
        let newPersonName = document.getElementById('newPersonName').value.trim();
        let newPersonPhone = document.getElementById('newPersonPhone').value.trim();
        let newPersonAddress = document.getElementById('newPersonAddress').value.trim();
        
        if( newPersonName === '')
            document.getElementById('newPersonName').className = 'input-err';
        else 
            document.getElementById('newPersonName').className = '' ;
           
        if( newPersonPhone === '')
            document.getElementById('newPersonPhone').className = 'input-err';
        else 
            document.getElementById('newPersonPhone').className = '' ;
           
        if( newPersonAddress === '')
            document.getElementById('newPersonAddress').className = 'input-err';
        else 
            document.getElementById('newPersonAddress').className = '' ;

        if(newPersonName !== '' && newPersonPhone !== '' && newPersonAddress !== '') {
            let newPerson = {};
            cmTable[newPersonName] = {
                'phone': newPersonPhone, 
                'address': newPersonAddress
            }
            localStorage.setItem(tableKey, JSON.stringify(cmTable));
            enableDisableNewUserModal('disable');
            refreshDOMTable();
        }   
              
    });
      
    newPersonCancelBtn.addEventListener('click', () => {
        enableDisableNewUserModal('disable');
    })   
    addNewEntryBtn.addEventListener('click',() => {
        enableDisableNewUserModal('enable');
    });

    for(let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener('click', ($event) => {
            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let personToEdit = cmTable[nameToEdit];
    
            enableDisableNewUserModal('enable');

            let newPersonName = document.getElementById('newPersonName');
            let newPersonPhone = document.getElementById('newPersonPhone');
            let newPersonAddress = document.getElementById('newPersonAddress');
            newPersonName.value = nameToEdit;
            newPersonPhone.value = personToEdit.phone;
            newPersonAddress.value = personToEdit.address;
             
            enableDisableNameInput('disable');
        })
    }

    for (let i=0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', ($event) => {
            let nameToDelete = $event.target.parentElement.children[0].innerText;
            let isSure = window.confirm('Are you sure you want to delete' + nameToDelete + '?');
            if(isSure)
               deleteUserFromTable(nameToDelete);
        })
    }
}


let deleteUserFromTable = (userName) => {
    let tempTable = {};
    let cmTableKeys = Object.keys(cmTable);
    for (let i=0; i < cmTableKeys.length; i++) {
        if(userName !== cmTableKeys[i]){
            tempTable[cmTableKeys[i]] = cmTable[cmTableKeys[i]];
        }
    }
    cmTable = tempTable;
    localStorage.setItem(tableKey,JSON.stringify(cmTable));
    refreshDOMTable();

}

let init = () => {

    if(localStorage.getItem(tableKey)){
        cmTable = JSON.parse(localStorage.getItem(tableKey));
    }
    else {
        cmTable = cmTableDemo;
        localStorage.setItem(tableKey, JSON.stringify(cmTable));
    }
    refreshDOMTable();
    
    cmTable = Object.keys(cmTable).sort().reduce(
    (obj, key) => { 
      obj[key] = cmTable[key]; 
      return obj;
    }, 
    {}
  );
  
  localStorage.setItem(tableKey,JSON.stringify(cmTable));
  refreshDOMTable();
}
init();