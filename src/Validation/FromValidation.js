export const validateForm = (formData, formType) => {
    const errors = {};
    console.log(formData)
    
  switch (formType) {
    case "team":
      validateTeamForm(formData, errors);
      return
    // case "place":
    //   validatePlaceForm(formData, errors);
    //   break;
    // Add more cases for different form types if needed
    default:
      break;
  }

  return errors;
};

const validateTeamForm = (formData, errors) => {
    if (formData === "") {
        errors.teamName = "Team Name Can't be empty";
    }
}
// const validatePlaceForm = (formData, errors) => {}