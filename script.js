/* 
	Tell us about your project below!👇
  Which API did you use? Why did you choose that one?
  How did you interact with the API, technically?
  What does your project do/how does it work?
  If you were going to keep coding this project, what would you build next?
  
I used the Pokemon API for this project in order to create a random profile generator, since I like Pokemon and find that random generators are great as a starting point for character or story ideas. Upon clicking the button, a function is called that retrieves a random Pokemon's data from the API, then uses it to change what's displayed, such as the Pokemon's sprite for the ID's profile image and its traits such as species and type. Each click creates a new profile by using a random Pokemon ID number to get that Pokemon's data. I also used data other than the Pokemon API for Mood and Name; mood being a list that I created and name being a list of names I looked up. To get a random color for Favorite Color, I created a function that generated three random values between 0 and 255, created an rgb color using them with a low opacity version for the ID card's background, and changed the color of elements using .style. I learned how to use the fetch() function to retrive the data from an API link, and use it to change what's displayed using .querySelector and .InnerText. I found some shortcuts, such as using CSS to capitalize words instead of creating a detailed JS function. I had problems with getting the ID card to maintain the right proportions across different device sizes, but fixed the issue with the embed-responsive class. I did a lot of Googling and used code from various sites to construct the fetch function as well as the random number functions. I went with a mindset of focusing on getting the result I wanted without worrying about writing all of the code myself. At times it was difficult to figure out how to integrate what I researched with my own way of coding, but after lots of trial and error, I made it work. 
If I continued updating this project, I would add a way to save profiles, perhaps having them appear as thumbnails that expand with info upon hovering. I would also like to include pictures for favorite berry, as that was originally my plan until I found out that the berry data doesn't include images like the Pokemon data. I would also add an option to change the Pokemon's name upon saving the profile. It wouldn't hurt to update the visual design as well.
*/
moods = [
  "cheerful",
  "grumpy",
  "bored",
  "inspired",
  "curious",
  "judgy",
  "tired",
  "jumpy",
  "stylish",
  "energetic",
  "wild",
  "calm",
  "sentimental",
  "hungry",
  "murderous",
  "mischevious",
  "plotting",
  "evil",
  "shy",
  "fearful",
  "timid",
  "courageous",
  "brave",
  "confident",
  "gloomy",
  "sad",
  "annoyed",
  "peaceful",
  "woozy",
  "restless",
  "nervous",
  "silly",
  "ditzy",
  "calculating",
  "serious",
  "lonely",
  "anxious",
  "confused",
  "hyper",
  "sluggish",
  "attentive",
  "lazy",
  "relaxed"
  
]
//select "Generate Profile" button
rand_btn = document.getElementById("generate")

  // 1.1 Create the element (outside the function so that only one image is created)
let profileImg = document.createElement("img");

function createProfileImg(imageSource){
  // 1.2 Customize the element
  profileImg.setAttribute("src", imageSource);
  console.log(imageSource);
  profileImg.classList.add("profile");
  console.log(profileImg.classList);
  
  // 1.3 Append the element
  containerDiv = document.querySelector("#profile-image");
  console.log(containerDiv);
  containerDiv.appendChild(profileImg);
}

//placeholder
createProfileImg("https://placehold.co/400")

rand_btn.onclick = function(){
  
  function getRandomInt(min,max) { 
  //creates random integer
     var rand_int= Math.floor(Math.random() * (max - min) + min);
     console.log(rand_int);
     return rand_int;
  }
  function Randomize() { 
   const search_value = getRandomInt(1,897); 
  //gets random integer between min and max of Pokemon IDs
    console.log("search_value: " + search_value);
   return(search_value); 
  //uses gotten integer as Pokemon ID and search
  }

  function getRandomMood() { 
    const mood_value = getRandomInt(0,moods.length); 
  //gets random integer between min and max of Pokemon IDs
    return(moods[mood_value]); 
  //uses gotten integer as Pokemon ID and search
  }

  function getRandomName() { 
    const name_value = getRandomInt(0,names.length); 
  //gets random integer between min and max of Pokemon IDs
    return(names[name_value]); 
  //uses gotten integer as Pokemon ID and search
  }
  
  const pokeSpecies = document.querySelector("#species");
  const pokeType = document.querySelector("#type");
  const pokeMood = document.querySelector("#mood");
  pokeMood.innerText= ("Mood: " + getRandomMood());
  const pokeBerry = document.querySelector("#berry");
  const pokeName = document.querySelector("#name");
  pokeName.innerText= ("Name: " + getRandomName());
  
  // Define the API URL
  const apiUrl = ("https://pokeapi.co/api/v2/pokemon/" + Randomize());
  console.log(apiUrl);
  
  // Make a GET request  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else if (response.status === 404) {
          throw new Error('Data not found');
        } else if (response.status === 500) {
          throw new Error('Server error'); }
        return response.json();
      })
      .then(pokemon => {
        console.log(pokemon);
      pokeSpecies.innerText= ("Species: " + pokemon['name']);
      pokeTypeSplit = pokemon['types'].map(type => type.type.name);
      console.log("Poke Type: " + pokeTypeSplit);
      pokeType.innerText = ("Type: " + pokeTypeSplit);
      pokeID = pokemon['id'];
      pokeImage = (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png `);
      console.log(pokeImage);
      console.log(createProfileImg(pokeImage));
      })
      .catch(error => {
        console.error('What? Help me!', error);
      });


  function getRandomColor() {
    let color1= getRandomInt(0,255);
    let color2= getRandomInt(0,255);
    let color3= getRandomInt(0,255);
    colorArray= `${color1}, ${color2}, ${color3},`;
    return(colorArray);
  }
  //makes sure function only gets called once
  const randomColor = getRandomColor();
  //sets color of square
  document.getElementById('color-square').style.background = ("rgba(" + randomColor + "1)");
  //sets background color to be lighter version of random color
  document.getElementById('id-card').style.background = ("rgba(" + randomColor + "0.3)");
  document.getElementById('profile-image').style.borderColor = ("rgba(" + randomColor + "1)");

  
  function RandomizeBerry() { 
   const berry_value = getRandomInt(1,65); 
  //gets random integer between min and max of berry IDs
   return(berry_value);
  }


  const apiUrlBerries = ("https://pokeapi.co/api/v2/berry/" + RandomizeBerry());
  console.log(apiUrlBerries);
  
  // Make a GET request  
  fetch(apiUrlBerries)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else if (response.status === 404) {
        throw new Error('Data not found');
      } else if (response.status === 500) {
        throw new Error('Server error'); }
      return response.json();
    })
    .then(berryData => {
      console.log(berryData);
    pokeBerry.innerText= ("Favorite berry: " + berryData['name']);
    })
    .catch(error => {
      console.error('What? Help me!', error);
    });
}