const namesByLanguage = {
    all: ["Saicharan", "Mandar", "Janaki", "Shaheen", "Nikhil.P", "Lokesh", "Sonali", "Chithra", "Kamal", "Raju", "Akshay", "Bhagya", "Haresh", "Vidya", "Vishesh", "Shweta", "Gaurav", "Kirti", "Sanket", "Priyanka.K", "Darshita", "Ramya", "Priya, Tiwar", "Divyansha", "Haritha", "Suvarna", "Alekhya", "Suraiya", "Mahima", "Ankit", "Amar", "Kavya", "Nidhi", "Ashwin", "Saran", "Tarun", "Sandeep", "S. VenkateshBabu", "NagaTeja", "Indravalli", "Vaishnavi", "Divya", "Suchitra", "Srilakshmi", "Krishna", "Nikhitha", "Gayathri", "Santhosh", "Ranjith", "Ritika", "Nikhil.Sabbani","Ajitha", "Samyuktha", "Triveni", "Shivkumar", "Sushma", "Prasannatha", "Tanuja", "Harini"],
    telugu: ["Shaheen", "Lokesh", "Gayathri", "Nikhitha", "Santhosh", "Nikhil.Sabbani", "Nidhi", "Saran", "Tarun", "S. VenkateshBabu", "NagaTeja", "Indravalli", "Vaishnavi", "Divya", "Suchitra", "Srilakshmi", "Krishna", "Ajitha", "Samyuktha", "Triveni", "ShivKumar","Sushma", "Prasannatha", " Tanuja"], 
    kannada: ["Shweta", "Priyanka.K", "Kavya", "Bhagya", "Divya", "Shivkumar", "Vidya"],
    hindi: ["Saicharan", "Mandar", "Sonali", "Chitra", "Kamal", "Raju", "Akshay", "Vishesh", "Gaurav", "Kirti", "Sanket", "Mahima", "Ankit", "Amar","Divyansha"],
    tamil: ["Janaki", "Lokesh", "Darshita", "Deepan", "Suraiya", "harish", "Sandeep", "Ranjith", "Jagadeesh", "Harini"]
    
}; 
const namesByCareerLevel = {
    SSE: ["Vidya", "Vishesh", "Shweta", "Kirti", "Sanket", "Priyanka.K", "Darshita", "Priya, Tiwar", "Divyansha", "Haritha", "Suvarna", "Alekhya"],    
    SE: ["Suraiya", "Mahima", "Ankit", "Amar", "Sushma", "Kavya", "Gayathri", "Nikhitha", "Santhosh", "Ranjith", "Ritika", "Nikhil.Sabbani", "Nidhi", "Ashwin", "Saran", "Tarun", "Sandeep", "S. VenkateshBabu"],
    LeadsAndAbove: ["Saicharan", "Gaurav", "Mandar", "Janaki", "Shaheen", "Nikhil.P", "Lokesh", "Sonali", "Chitra", "Kamal", "Raju", "Akshay", "Bhagya", "Haresh"],
    ASE: ["NagaTeja", "Indravalli", "Vaishnavi", "Divya", "Suchitra", "Srilakshmi", "Krishna", "Ajitha", "Samyuktha", "Triveni", "ShivKumar", "Prasannatha", "Tanuja", "Harini"]
};
    
let selectedNames = [];

function populateNames() {
    const type = document.getElementById('type').value;
    const subtypeDropdown = document.getElementById('subtype');
    subtypeDropdown.innerHTML='';
    if(type==='language'){
        Object.keys(namesByLanguage).forEach(language=>{
            const option=document.createElement('option');
            option.value=language;
            option.textContent=language.charAt(0).toUpperCase()+language.slice(1);
            subtypeDropdown.appendChild(option);
        }); 
    }else if(type==='career') {
        Object.keys(namesByCareerLevel).forEach(level=>{
            const option=document.createElement('option');
            option.value=level;
            option.textContent=level.charAt(0).toUpperCase()+level.slice(1);
            subtypeDropdown.appendChild(option);
        });
    }
}
    
function startSpinner() {
    const spinner = document.getElementById('spinner');
    const type = document.getElementById('type').value;
    const subtype = document.getElementById('subtype').value;
    if(type==='language'){
        selectedNames=namesByLanguage[subtype] || [];
    
    }else if(type==='career'){
        selectedNames=namesByCareerLevel[subtype] || [];
    
    }
    let currentIndex = 0;
    if (selectedNames.length === 0) {
        spinner.textContent = "Please select a language!"; return;
    }

    // Spin the names quickly
    const spinnerInterval = setInterval(() => { 
        spinner.textContent = selectedNames[currentIndex];
        currentIndex = (currentIndex + 1) % selectedNames.length;
    }, 100); // change name every 100ms

    // Stop after 3 seconds and choose a random name

    setTimeout(() => {
        clearInterval(spinnerInterval);
        const randomName = selectedNames[Math.floor(Math.random() * selectedNames.length)];
        spinner.textContent = randomName;

    }, 5000);
}
 // stop spinner after 3 seconds
populateNames();


let names = [];
function addNames() {
    const nameInput = document.getElementById('name-input').value.trim();
    if (nameInput) {
        // Split the input by commas or new lines, and remove extra spaces 
        const nameArray = nameInput.split(/[\n,]+/).map(name => name.trim()).filter(name => name);
        // Add the new names to the existing list
        names = names.concat(nameArray);
        // Clear the textarea input after adding names 
        document.getElementById('name-input').value = '';
        // Display the updated list of names
        displayNames();
    } else {
        alert("Please enter at least one valid name.");
    } 

    let section1=document.getElementById("namePickersection1");
    let section2=document.getElementById("namePickersection2");
    let divSection=document.getElementById("name-list");
    let sceHeight1=section1.offsetHeight;
    let sceHeight2=section2.offsetHeight;
    if(sceHeight1>sceHeight2){ 
        section2.style.height=sceHeight1+"px";
    }else{
        section2.style.height="auto";
        divSection.style.height="auto"; 
    }
}

function displayNames() {
    const nameList=document.getElementById('name-list');
    nameList.innerHTML = "Welcome on board Buddies &#128526;...<br><br> "+names.join(', ');
}

function selectRandomName() {
    if (names.length=== 0) {
        document.getElementById('selected-name').innerText = "No names available to choose from!"; 
        document.getElementById('name-list').innerHTML="please add my buddies &#128543;";
        return;
    }

    const randomIndex = Math.floor(Math.random() * names.length);
    const selectedName = names [randomIndex];
    document.getElementById('selected-name').innerText = "Hello "+ selectedName +" are you ready..!!!";
    names.splice(randomIndex, 1);
    displayNames();
}

function divideTeams() {
    let members=document.getElementById('membersInput').value.split(/[\n,]+/);
    let teamCount=parseInt(document.getElementById('teamCount').value);
    let teamsContainer=document.getElementById('teamsContainer');
    teamsContainer.innerHTML='';
    members=members.map(member => member.trim()).filter(member=>member.length>0);
    members.sort(()=>Math.random()-0.5);
    let teams=[];
    for(let i=0;i<teamCount;i++){
        teams.push([]);
    } 
    for(let i=0;i<members.length; i++){
        teams [i%teamCount].push(members[i]);
    }
    teams.forEach((team, index)=>{
    let teamDiv=document.createElement('div');
    teamDiv.className='team';
    teamDiv.innerHTML=`<h3>Team ${index+1}</h3><ul>${team.map(member=>`<li>${member}</li>`).join('')}</ul>`;
    teamsContainer.appendChild(teamDiv);
    });
    document.getElementById("team-divide").style.height="auto";
}
