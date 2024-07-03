const CreateImage = async (name) => {
  const gender = `https://api.genderize.io/?name=${name}`;

  try {
    const response = await fetch(gender);
    const data = await response.json();
    const genderedName = await data.gender;

    let genderlize = (await genderedName) === "female" ? "girl" : "boy";

    const avatar = `https://avatar.iran.liara.run/public/${genderlize}?username=${name}`;

    return avatar;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export default CreateImage;
