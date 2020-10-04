function candidateInfoApi(candidateFinder){
    console.log(candidateFinder)
    fetch(` https://api.github.com/users/${candidateFinder}/repos
    `)
    //callback function
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayCandidateGit(responseJson))
    .catch(error => alert(`Something went wrong. Try again later.`))
  }
  
  
  function displayCandidateGit(responseJson){
    console.log(responseJson)
    // if there are previous results, remove them
    $('#results-list').empty();
    // iterate through the candidate list
    for(let i= 0; i < responseJson.length; i++){
      //for each candidate array, add a list item to the result, list description and name.
      $(`#results-list`).append(
        `<li><a href="${responseJson[i].owner.url}"
        <h3>${responseJson[i].name}</h3></a></li>
        <p>${responseJson[i].description}</p>`
      )};
    $('#results').removeClass('hidden');
  
    
  }
  
  //This function looks out for submit events on the Form
  function watchForm(){
    $('form').submit(event =>{
      event.preventDefault();
      let candidateFinder=$('input[name="userName"]').val();
      candidateInfoApi(candidateFinder)
    })
  }
  
  //function that runs when the DOM is loaded
  $(function(){
    console.log('App loaded! Waiting for submit!');
    watchForm();
  })