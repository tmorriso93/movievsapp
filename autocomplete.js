//call func multiple times with reusable code inside
const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  //select div where we will inject HTML code
  root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <br/>
    <div class="dropdown" >
    <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
    </div>
    </div>
`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  //after user finishes typing fetch data
  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    //if there are no movies return earlys and do not run anything else
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    //clear search input after every search
    resultsWrapper.innerHTML = "";

    //open the dropdown menu
    dropdown.classList.add("is-active");

    //loop through list of movies and grab specific bits  of data
    for (let item of items) {
      //create div element and add our movies to it
      const option = document.createElement("a");

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);

      //detect click on an indivdual option
      option.addEventListener("click", () => {
        //update value of input and close the drop down
        dropdown.classList.remove("is-active");
        //update the text input value to the title of movie that was clicked
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      //take div element we create and append it to an element in our HTML with id of target
      resultsWrapper.appendChild(option);
    }
  };
  input.addEventListener("input", debounce(onInput, 600));

  document.addEventListener("click", (event) => {
    //if root element for auto complete doesnt contain element that has been clicked on
    //then close the drop down
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
